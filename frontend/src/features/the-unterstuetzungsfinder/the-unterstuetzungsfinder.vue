<template>
  <base-page-content
    :icon="icon"
    :name="name"
    :info-text="infoText"
    :is-loading="false"
  >
    <v-container
      id="id_chat_container"
      style="max-width: 100%;"
      class="justify-center mt-4 mr-1 ml-1"
    >
      <v-row>
        <v-col
          v-if="isFinished"
          cols="12"
          sm="12"
          :md="givenAnswersAreNotEmpty() === false ? '0': '12'"
          :lg="givenAnswersAreNotEmpty() === false ? '0': '10'"
          :xl="givenAnswersAreNotEmpty() === false ? '0': '10'"
        >
          <v-row v-if="currentConvo.contactPoints.length === 0">
            <v-col>
              <base-head-line :text="labels.noResults" />
            </v-col>
          </v-row>
          <template v-else>
            <v-row>
              <v-col>
                <base-head-line :text="labels.pointOfContacts" />
              </v-col>
            </v-row>
            <v-divider class="mt-3 mb-5" />
            <v-row>
              <v-col>
                <the-unterstuetzungsfinder-ergebnis />
              </v-col>
            </v-row>
          </template>
          <v-row>
            <v-col>
              <v-btn
                color="secondary"
                text
                outlined
                :aria-label="labels.restartFinder"
                @click="resetQuestions()"
              >
                {{ labels.restartFinder }}
              </v-btn>
            </v-col>
          </v-row>
        </v-col>
        <v-col
          v-if="!isFinished && currentConvo.decisionPoint != null"

          cols="12"
          sm="12"
          :md="givenAnswersAreNotEmpty() === false ? '12': '12'"
          :lg="givenAnswersAreNotEmpty() === false ? '12': '10'"
          :xl="givenAnswersAreNotEmpty() === false ? '12': '10'"
        >
          <v-row>
            <v-col>
              <v-alert
                v-if="isInfoTextActive"
                id="id_info_banner"
                elevation="4"
                outlined
              >
                <v-row>
                  <v-col>
                    {{ labels.text }}
                  </v-col>
                  <v-btn
                    icon
                    :aria-label="labels.close"
                    @click="closeInfoText()"
                  >
                    <v-icon>mdi-close</v-icon>
                  </v-btn>
                </v-row>
              </v-alert>
            </v-col>
          </v-row>
          <v-row>
            <v-col>
              <base-head-line :text="currentConvo.decisionPoint.question" />
            </v-col>
          </v-row>
          <v-divider class="mt-3 mb-5" />
          <v-row no-gutters>
            <v-expansion-panels>
              <v-col
                v-for="(answer, answerIndex) in currentConvo.decisionPoint.answerOptions"
                :key="answerIndex"
                class="pa-2"
                cols="12"
                sm="12"
                :md="givenAnswersAreNotEmpty() === false ? '6': '12'"
                :lg="givenAnswersAreNotEmpty() === false ? '4': '12'"
                :xl="givenAnswersAreNotEmpty() === false ? '4': '12'"
              >
                <v-alert
                  dense
                  border="left"
                  colored-border
                  color="secondary"
                  class="mb-1 finder-pointer"
                  elevation="3"
                  :aria-label="answer"
                >
                  <v-card-title class="text-body-1">
                    <v-row>
                      <v-col
                        cols="11"
                        sm="11"
                        @click="updateConversation(answer.competence, answer.germanDescription, currentConvo.decisionPoint.question)"
                      >
                        <p style="font-size: 14px;">
                          {{ answer.germanDescription }}
                        </p>
                      </v-col>
                      <v-col
                        cols="1"
                        sm="1"
                        class="pl-0 pr-0"
                        @click="selectedTooltip !== answerIndex ? (openSelectedTooltip(answerIndex), show = true) : (closeAllTooltips(), show = false)"
                      >
                        <v-row v-if="answer.shortDescription">
                          <v-col cols="12">
                            <p
                              v-if="selectedTooltip !== answerIndex"
                              style="text-align: right;"
                            >
                              <i class="mdi mdi-information secondary--text" />
                            </p>
                            <p
                              v-if="selectedTooltip === answerIndex"
                              style="text-align: right;"
                            >
                              <i class="mdi mdi-close secondary--text" />
                            </p>
                          </v-col>
                          <v-col
                            cols="12"
                            class="mt-0 mb-0 pt-0 pb-0"
                            style="height:0 !important;"
                          >
                            <v-tooltip
                              v-if="selectedTooltip === answerIndex"
                              v-model="show"
                              bottom
                            >
                              <template v-slot:activator="{ on, attrs }">
                                <span
                                  v-bind="attrs"
                                  v-on="on"
                                />
                              </template>
                              <p> {{ answer.shortDescription }}</p>
                            </v-tooltip>
                          </v-col>
                        </v-row>
                      </v-col>
                    </v-row>
                  </v-card-title>
                  <v-card-actions class="pt-0 mt-0 pb-0 mb-0">
                    <v-row class="pt-0 mt-0 pb-0 mb-0">
                      <v-col
                        class="pt-0 mt-0 pb-0 mb-0"
                        offset="10"
                        offset-sm="11"
                        cols="2"
                        sm="1"
                        @click="updateConversation(answer.competence, answer.germanDescription, currentConvo.decisionPoint.question)"
                      >
                        <v-row class="pt-0 mt-0 pb-0 mb-0">
                          <v-col
                            class="pt-0 mt-0 pb-0 mb-0"
                            cols="12"
                          >
                            <p class="pt-0 mt-0 pb-0 mb-0">
                              <i class="mdi mdi-menu-right secondary--text" />
                            </p>
                          </v-col>
                        </v-row>
                      </v-col>
                    </v-row>
                  </v-card-actions>
                </v-alert>
              </v-col>
            </v-expansion-panels>
          </v-row>
        </v-col>
        <v-col
          v-if="givenAnswersAreNotEmpty() === true"
          cols="12"
          sm="12"
          md="12"
          lg="2"
          xl="2"
        >
          <v-row>
            <v-col>
              <base-head-line :text="labels.answers" />
            </v-col>
          </v-row>
          <v-divider class="mt-3 mb-5" />
          <v-row>
            <v-col>
              <v-card
                v-for="(element, elementIndex) in givenAnswers"
                :key="elementIndex"
                outlined
                flat
                class="mb-1"
                elevation="3"
              >
                <v-card-title><h5>{{ element.questionAnswered }}</h5></v-card-title>
                <v-card-subtitle>{{ element.answerValue }}</v-card-subtitle>
              </v-card>
            </v-col>
          </v-row>
        </v-col>
      </v-row>
    </v-container>
  </base-page-content>
</template>

<script lang="ts">
import {
  Component,
  Vue
} from "vue-property-decorator";
import BasePageContent from "@/features/commons/base-page-content/base-page-content.vue";
import {
  theUnterstuetzungsfinderRoutes
} from "@/features/the-unterstuetzungsfinder/the-unterstuetzungsfinder.routes";
import Conversation from "@/features/the-unterstuetzungsfinder/types/conversation.type";
import {
  dropGivenAnswers,
  getAnswers,
  getApiState,
  getGivenAnswers,
  getGivenAnswersCompetencies,
  getCompetencies,
  getConvo,
  initTree,
  setNextQuestion,
  isFinished,
  isInfoTextActive,
  QuestionAndAnswer,
  setFinished,
  setGivenAnswers,
  toggleInfoTextActive
} from "@/features/the-unterstuetzungsfinder/the-unterstuezungsfinder-store.module";
import BaseHeadLine from "@/features/the-unterstuetzungsfinder/components/base-head-line.vue";
import TheUnterstuetzungsfinderErgebnis
  from "@/features/the-unterstuetzungsfinder/features/the-mail/the-unterstuetzungsfinder-ergebnis.vue";
import {
  Loading
} from "@/core/services/api/types/Loading.type";
import {
  Competence
} from "@/features/the-unterstuetzungsfinder/types/competence.type";
import {
  finderLabels
} from "@/features/the-unterstuetzungsfinder/the-unterstuetzungsfinder.translation";

@Component({
  components: {
    TheUnterstuetzungsfinderErgebnis,
    BaseHeadLine,
    BasePageContent
  }
})
export default class TheUnterstuetzungsfinder extends Vue {
  show = false;
  labels = finderLabels;
  selectedTooltip = -1;


  get isInfoTextActive(): boolean {
    return this.$store.getters[isInfoTextActive()];
  }

  set isInfoTextActive(value: boolean) {
    this.$store.commit(toggleInfoTextActive(), value);
  }

  get loading(): boolean {
    return this.apiState > Loading.LOADED;
  }

  get apiState(): Loading {
    return this.$store.getters[getApiState()];
  }

  get isFinished(): boolean {
    return this.$store.getters[isFinished()];
  }

  set isFinished(value: boolean) {
    this.$store.commit(setFinished(), value);
  }

  get name(): string {
    return theUnterstuetzungsfinderRoutes.name;
  }

  get icon(): string {
    return theUnterstuetzungsfinderRoutes.meta.icon;
  }

  get infoText(): string {
    return theUnterstuetzungsfinderRoutes.meta.infoText;
  }

  get givenAnswers(): QuestionAndAnswer[] {
    return this.$store.getters[getGivenAnswers()];
  }

  get currentConvo(): Conversation {
    return this.$store.getters[getConvo()];
  }

  get answers(): Conversation[] {
    return this.$store.getters[getAnswers()];
  }

  get kompetenzen(): Competence[] {
    return this.$store.getters[getCompetencies()];
  }

  openSelectedTooltip(value: number): void {
    this.selectedTooltip = value;
  }

  closeAllTooltips(): void {
    this.selectedTooltip = -1;
  }

  async setNextQuestion(value: string[]): Promise<void> {
    await this.$store.dispatch(setNextQuestion(), value);
  }

  updateGivenAnswers(answerCompetence: string, answerValue: string, questionAnswered: string): void {
    this.$store.dispatch(setGivenAnswers(), {
      questionAnswered: questionAnswered,
      answerCompetence: answerCompetence,
      answerValue: answerValue,
    });
  }

  closeInfoText(): void {
    this.isInfoTextActive ? this.isInfoTextActive = false : this.isInfoTextActive;
  }

  async updateConversation(answerCompetence: string, answerValue: string, questionAnswered: string): Promise<void> {


    this.updateGivenAnswers(answerCompetence, answerValue, questionAnswered);
    await this.setNextQuestion(this.$store.getters[getGivenAnswersCompetencies()]);
    if (this.currentConvo.decisionPoint === null) {
      this.isFinished = true;
      this.closeInfoText();

    } else {
      this.isFinished = false;
    }

  }

  givenAnswersAreNotEmpty(): boolean {
    return this.givenAnswers.length > 0;
  }

  resetQuestions(): void {
    this.$store.commit(dropGivenAnswers());
    this.$store.dispatch(initTree());
  }
}
</script>

<style lang="scss" scoped>

h5 {
  white-space: pre-wrap !important;
  text-indent: 0em !important;
  word-break: keep-all;
  line-height: normal;
}


@import "@/features/the-unterstuetzungsfinder/the-unterstuetzungsfinder.style.scss";
</style>
