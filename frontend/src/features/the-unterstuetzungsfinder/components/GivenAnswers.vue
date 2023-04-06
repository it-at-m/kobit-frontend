<template>
  <v-col
    v-if="! isGivenAnswersEmpty"
    cols="12"
    sm="12"
    md="12"
    lg="5"
    xl="5"
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
    <v-row>
      <v-col>
        <DownloadPDF
          :given-answers="givenAnswers"
          :convo="convo"
        />
      </v-col>
    </v-row>
  </v-col>
</template>

<script lang="ts">
import {defineComponent, PropType} from "vue";
import BaseHeadLine from "@/features/the-unterstuetzungsfinder/components/base-head-line.vue";
import {QuestionAndAnswer} from "@/features/the-unterstuetzungsfinder/types/QuestionAndAnswer";
import DownloadPDF from "@/features/the-unterstuetzungsfinder/features/the-mail/components/download-pdf.vue";
import Conversation from "@/features/the-unterstuetzungsfinder/types/conversation.type";

export default defineComponent({
  name: "GivenAnswers",
  components: {DownloadPDF, BaseHeadLine},
  props: {
    isGivenAnswersEmpty: {
      type: Boolean
    },
    labels: {
      //typeof I18nLabel
      type: Object
    },
    givenAnswers: {
      type: Array as PropType<Array<QuestionAndAnswer>>
    },
    convo: {
      type: Conversation
    }
  }
});
</script>

<style scoped>

</style>