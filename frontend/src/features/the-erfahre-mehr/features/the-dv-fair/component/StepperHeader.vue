<template>
  <v-card-text>
    <v-stepper v-model="currentStep">
      <v-stepper-header>
        <v-stepper-step
          v-for="(position) in lastStep"
          :key="position"
          :complete="currentStep > position"
          :step="String(position)"
          :color="stepColor(position)"
          complete-icon="mdi-close"
          :class="{ 'active' : position === currentStep}"
        >
          Schritt
        </v-stepper-step>
        <v-divider v-if="!step.hasNext" />
      </v-stepper-header>
      <v-stepper-content
        :step="currentStep"
      >
        <v-card
          class="mb-10"
          min-height="125px"
          :elevation="0"
        >
          <v-alert
            v-if="!step.hasNext"
            class="pa-4 mb-0"
            tile
            type="error"
            :colored-border="true"
            border="top"
            elevation="0"
          >
            {{ step.header }}
          </v-alert>
          <v-alert
            v-if="step.hasNext"
            class="pa-4 mb-0"
            tile
            elevation="0"
          >
            {{ step.header }}
          </v-alert>
          <div
            v-for="optionalText in step.optionalTexts"
            :key="optionalText"
          >
            <v-divider />
            <v-alert
              v-if="optionalText"
              class="pa-4 mb-0"
              tile
              type="info"
              :colored-border="true"
              elevation="0"
            >
              {{ optionalText }}
            </v-alert>
          </div>
          <v-divider />
        </v-card>
        <v-card :elevation="0">
          <v-row>
            <v-col
              cols="12"
              sm="6"
              md="3"
              lg="2"
              xl="2"
            >
              <v-btn
                class="mr-0"
                width="100%"
                tile
                dark
                color="green dark-3"
                @click="setIsFinished"
              >
                Klärung
              </v-btn>
            </v-col>
            <v-col
              cols="12"
              sm="6"
              md="3"
              lg="2"
              xl="2"
            >
              <v-btn
                v-if="step.hasNext"
                width="100%"
                color="red darke-3"
                dark
                tile
                @click="nextStep"
              >
                Keine Klärung
              </v-btn>
            </v-col>
          </v-row>
        </v-card>
      </v-stepper-content>
    </v-stepper>
  </v-card-text>
</template>

<script lang="ts">
import {defineComponent} from 'vue';
import {useGetLastStep} from '../middleware/StepService';
import {Step} from '../StepView';

export default defineComponent({
  name: 'StepperHeader',
  props: {
    step: {
      type: Step
    },
    setIsFinished: {
      type: Function
    },
    nextStep: {
      type: Function
    },
    currentStep: {
      type: Number
    }
  },
  setup(props) {
    const {isLoading, isError, data} = useGetLastStep();

    function stepColor(stepCount: number) {
      return props.currentStep === stepCount ? 'secondary' : 'red darke-3';
    }

    return {
      isLoading, lastStep: data, isError, stepColor
    };
  }
});
</script>

<style scoped>
/* For rendering the line breaks in the text data */
.v-card__text,
.v-card__title {
  white-space: pre-wrap;
  word-wrap: normal;
  word-break: normal;
  text-indent: 0em !important;
}

.active {
  background: aliceblue !important;
}

.v-stepper__step__step.primary {
  background-color: aliceblue !important;
}
</style>