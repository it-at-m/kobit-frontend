<template>
  <v-card-text>
    <v-card
      v-if="step.tabs.length > 0"
      elevation="3"
      tile
      min-height="250px"
    >
      <v-card-text>
        <v-tabs
          color="secondary"
          show-arrows
          center-active
        >
          <v-tab
            v-for="(tab, tabIndex) in step.tabs"
            :key="tabIndex"
          >
            <span v-if="$vuetify.breakpoint.xs || $vuetify.breakpoint.sm">
              {{ String(tab.header).slice(9) }}
            </span>
            <span v-else> {{ tab.header }}</span>
          </v-tab>
          <v-tab-item
            v-for="(tab, tabIndex) in step.tabs"
            :key="tabIndex"
          >
            <v-card>
              <v-card-title
                v-if="step.name"
              >
                <h5>{{ step.name }}</h5>
              </v-card-title>
              <v-card-title
                v-else
              >
                <h5>Schritt {{ step.stepCount }}</h5>
              </v-card-title>
              <v-card-text>
                <div
                  v-for="(solution, solutionIndex) in tab.possibleSolutions"
                  :key="solutionIndex"
                >
                  <p><b>{{ solution.header }}</b></p>
                  <p>{{ solution.text }}</p>
                </div>
              </v-card-text>
            </v-card>
          </v-tab-item>
        </v-tabs>
      </v-card-text>
    </v-card>
  </v-card-text>
</template>

<script lang="ts">
import {defineComponent} from 'vue';
import {Step} from '../StepView';

export default defineComponent({
  name: 'StepItems',
  props: {
    step: {
      type: Step
    },
    currentStep: {
      type: Number
    }
  }
});
</script>
