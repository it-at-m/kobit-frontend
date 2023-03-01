<template>
  <v-container fluid>
    <BackButton :callback="back"/>

    <BasePageContent
      :icon="icon"
      :name="name"
      :info-text="infoText"
      :is-loading="false"
    >
      <div>
        <v-container
          v-for="(layer, layerIndex) in escalationSteps"
          :key="layerIndex"
          class="mb-0  mt-0"
          fluid
          :style="{ 'background': layer.color }"
        >
          <v-row no-gutters>
            <v-col
              cols="12"
              sm="12"
              class="mr-0 pr-0"
            >
              <v-expansion-panels
                style="background:none !important;"
                flat
              >
                <v-expansion-panel style="background:none !important;">
                  <v-expansion-panel-header
                    :key="layerIndex"
                    class="pl-0"
                  >
                    {{ layer.name }}
                  </v-expansion-panel-header>

                  <v-expansion-panel-content>
                    <p>{{ layer.description }}</p>
                  </v-expansion-panel-content>
                </v-expansion-panel>
              </v-expansion-panels>
            </v-col>
            <v-col
              v-for="(step, stepIndex) in layer.steps"
              :key="stepIndex"
              class="mt-3"
              :offset="0"
              :offset-sm="0"
              :offset-md="layerIndex"
              :offset-lg="layerIndex"
              :offset-xl="layerIndex"
              cols="12"
              sm="12"
            >
              <v-row no-gutters>
                <v-col
                  :offset="0"
                  :offset-sm="0"
                  :offset-md="stepIndex + layerIndex * 2"
                  :offset-lg="stepIndex + layerIndex * 2"
                  :offset-xl="stepIndex + layerIndex * 2"
                  cols="12"
                  sm="12"
                  md="12"
                  lg="12"
                  xl="12"
                >
                  <v-expansion-panels
                    v-model="$data['panel_' + stepIndex]"
                    :class="{ 'isMobile': $vuetify.breakpoint.smAndDown, 'isDesktop': $vuetify.breakpoint.mdAndUp }"
                  >
                    <v-expansion-panel>
                      <v-expansion-panel-header
                        :class="{ 'justify-center text-center': $vuetify.breakpoint.xs || $vuetify.breakpoint.sm }"
                      >
                        Stufe {{ stepIndex + (layerIndex * escalationSteps.length) + 1 }}: {{ step.name }}
                      </v-expansion-panel-header>
                      <v-expansion-panel-content>
                        <p>{{ step.description }}</p>
                      </v-expansion-panel-content>
                    </v-expansion-panel>
                  </v-expansion-panels>
                </v-col>
              </v-row>
            </v-col>
          </v-row>
        </v-container>
      </div>
    </BasePageContent>
    <BackButton :callback="back"/>
  </v-container>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import {
  getEscalationSteps
} from "@/features/the-erfahre-mehr/features/the-escalation-steps/the-escalation-steps-store.module";
import EscalationSteps from "@/features/the-erfahre-mehr/features/the-escalation-steps/EscalationSteps.type";
import BasePageContent from "@/features/commons/base-page-content/base-page-content.vue";
import {
  escalationStepsRoutes
} from "@/features/the-erfahre-mehr/features/the-escalation-steps/the-escalation-steps.routes";
import BackButton from "@/features/commons/components/BackButton.vue";
import {useRouter} from "vue-router/composables";

@Component({
  components: {
    BasePageContent, BackButton
  }
})
export default class TheEscalationSteps extends Vue {

  get name(): string {
    return escalationStepsRoutes.name;
  }

  get icon(): string {
    return escalationStepsRoutes.meta.icon;
  }

  get infoText(): string {
    return escalationStepsRoutes.meta.infoText;
  }

  get escalationSteps(): EscalationSteps[] {
    return this.$store.getters[getEscalationSteps()];
  }

  isNotLastObject(escalationStepsIndex: number): boolean {
    return escalationStepsIndex !== this.escalationSteps.length - 1;
  }

  back() {
    this.$router.push('/erfahre-mehr');
  }

}
</script>

<style scoped>
.isMobile {
  max-width: 100% !important;
}


.isDesktop {
  max-width: 300px !important;
}
</style>
