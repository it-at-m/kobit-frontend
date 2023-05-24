<template>
  <BasePageContent
    :icon="icon"
    :name="name"
    :info-text="infoText"
    :is-loading="isLoading"
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
          :md="isGivenAnswersEmpty ? '0': '12'"
          :lg="isGivenAnswersEmpty ? '0': '7'"
          :xl="isGivenAnswersEmpty ? '0': '7'"
        >
          <v-row v-if="conversation?.contactPoints.length === 0">
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
                <the-unterstuetzungsfinder-ergebnis
                  :convo="conversation"
                  :given-answers="givenAnswers"
                  :restart="restart"
                />
              </v-col>
            </v-row>
          </template>
        </v-col>
        <v-col
          v-if="!isFinished && conversation?.decisionPoint !== null"
          cols="12"
          sm="12"
          :md="isGivenAnswersEmpty ? '12': '12'"
          :lg="isGivenAnswersEmpty ? '12': '7'"
          :xl="isGivenAnswersEmpty ? '12': '7'"
        >
          <v-row>
            <InfoText
              :is-info-text-active="isInfoTextActive"
              :labels="labels"
              :close-info-text="closeInfoText"
            />
          </v-row>
          <v-row>
            <v-col>
              <base-head-line :text="conversation?.decisionPoint.question" />
            </v-col>
          </v-row>
          <v-divider class="mt-3 mb-5" />
          <v-row no-gutters>
            <v-expansion-panels>
              <v-col
                v-for="(answer, answerIndex) in conversation?.decisionPoint.answerOptions"
                :key="answerIndex"
                class="pa-2"
                cols="12"
                sm="12"
                :md="isGivenAnswersEmpty ? '6': '12'"
                :lg="isGivenAnswersEmpty ? '4': '12'"
                :xl="isGivenAnswersEmpty ? '4': '12'"
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
                        @click="updateGivenAnswers(answer.competence, answer.germanDescription, conversation?.decisionPoint.question)"
                      >
                        <p style="font-size: 14px;">
                          {{ answer.germanDescription }}
                        </p>
                      </v-col>
                      <v-col
                        cols="1"
                        sm="1"
                        class="pl-0 pr-0"
                        @click="selectedToolTip !== answerIndex ? openToolTip(answerIndex) : closeToolTips()"
                      >
                        <v-row v-if="answer.shortDescription">
                          <v-col cols="12">
                            <p
                              v-if="selectedToolTip !== answerIndex"
                              style="text-align: right;"
                            >
                              <i class="mdi mdi-information secondary--text" />
                            </p>
                            <p
                              v-if="selectedToolTip === answerIndex"
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
                              v-if="selectedToolTip === answerIndex"
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
                        @click="updateGivenAnswers(answer.competence, answer.germanDescription, conversation?.decisionPoint.question)"
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
          <BackButton
            v-if="givenAnswers.length > 0"
            :callback="getPreviousAnswer"
          />
          <BackButton
            v-else
            :callback="back"
          />
        </v-col>
        <GivenAnswers
          :is-given-answers-empty="isGivenAnswersEmpty"
          :labels="labels"
          :given-answers="givenAnswers"
          :convo="conversation"
        />
      </v-row>
    </v-container>
  </BasePageContent>
</template>

<script lang="ts">
import {computed, defineComponent, ref} from "vue";
import GivenAnswers from "@/features/the-unterstuetzungsfinder/components/GivenAnswers.vue";
import BaseHeadLine from "@/features/the-unterstuetzungsfinder/components/base-head-line.vue";
import InfoText from "@/features/the-unterstuetzungsfinder/components/InfoText.vue";
import TheUnterstuetzungsfinderErgebnis
  from "@/features/the-unterstuetzungsfinder/features/the-mail/the-unterstuetzungsfinder-ergebnis.vue";
import BasePageContent from "@/features/commons/base-page-content/base-page-content.vue";
import {
  THE_UNTERSTUETZUNGSFINDER_ROUTE_META_ICON,
  THE_UNTERSTUETZUNGSFINDER_ROUTE_META_INFO_TEXT,
  THE_UNTERSTUETZUNGSFINDER_ROUTE_NAME
} from "@/features/the-unterstuetzungsfinder/the-unterstuetzungsfinder.routes";
import {finderLabels} from "@/features/the-unterstuetzungsfinder/the-unterstuetzungsfinder.translation";
import BackButton from "@/features/commons/components/BackButton.vue";
import {QuestionAndAnswer} from "@/features/the-unterstuetzungsfinder/types/QuestionAndAnswer";
import {useMutation} from "@tanstack/vue-query";
import {nextStep} from "@/features/the-unterstuetzungsfinder/api/UnterstuetzungsfinderClient";
import {useRouter} from "vue-router/composables";

export default defineComponent({
  name: "TheUnterstuetzungsfinder",
  components: {
    BackButton,
    BasePageContent,
    TheUnterstuetzungsfinderErgebnis,
    InfoText,
    BaseHeadLine,
    GivenAnswers
  },
  setup() {
    const isInfoTextActive = ref<boolean>(true);
    const givenAnswers = ref<QuestionAndAnswer[]>([]);
    const isGivenAnswersEmpty = computed(() => givenAnswers.value.length < 1);
    const selectedToolTip = ref(-1);
    const show = ref(false);
    const router = useRouter();
    const {isLoading, isError, mutate, data} = useMutation({
      mutationFn: () => {
        return nextStep(givenAnswers.value.map(it => it.answerCompetence));
      }
    });
    const isFinished = computed(() => data.value?.decisionPoint === null);

    function back() {
      router.push('/');
    }

    function closeToolTips() {
      selectedToolTip.value = -1;
      show.value = false;
    }

    function openToolTip(value: number) {
      selectedToolTip.value = value;
      show.value = true;
    }

    function closeInfoText() {
      isInfoTextActive.value = false;
    }

    function updateGivenAnswers(answerCompetence: string, answerValue: string, questionAnswered: string) {
      givenAnswers.value.push({
        questionAnswered: questionAnswered,
        answerCompetence: answerCompetence,
        answerValue: answerValue,
      });
      mutate();
    }

    function getPreviousAnswer() {
      if (givenAnswers.value.length > 0) {
        givenAnswers.value?.pop();
        mutate();
      }
    }

    function restart() {
      givenAnswers.value = [];
      mutate();
    }

    mutate();

    return {
      isFinished,
      isGivenAnswersEmpty,
      isInfoTextActive,
      selectedToolTip,
      show,
      givenAnswers,
      isLoading,
      isError,
      conversation: data,
      openToolTip,
      closeToolTips,
      updateGivenAnswers,
      closeInfoText,
      restart,
      getPreviousAnswer,
      back,
      labels: finderLabels,
      icon: THE_UNTERSTUETZUNGSFINDER_ROUTE_META_ICON,
      name: THE_UNTERSTUETZUNGSFINDER_ROUTE_NAME,
      infoText: THE_UNTERSTUETZUNGSFINDER_ROUTE_META_INFO_TEXT
    };
  }
});

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