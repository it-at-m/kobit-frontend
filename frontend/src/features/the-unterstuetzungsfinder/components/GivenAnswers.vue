<template>
  <v-col
    v-if="! isGivenAnswersEmpty"
    cols="12"
    sm="12"
    md="12"
    lg="3"
    xl="3"
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
</template>

<script lang="ts">
import {defineComponent, PropType} from "vue";
import BaseHeadLine from "@/features/the-unterstuetzungsfinder/components/base-head-line.vue";
import {QuestionAndAnswer} from "@/features/the-unterstuetzungsfinder/types/QuestionAndAnswer";

export default defineComponent({
  name: "GivenAnswers",
  components: {BaseHeadLine},
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
    }
  }
});
</script>

<style scoped>

</style>