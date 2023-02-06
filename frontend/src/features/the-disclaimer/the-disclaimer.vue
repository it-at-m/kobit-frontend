<template>
  <v-snackbar
    v-model="isActive"
    timeout="-1"
    class="mb-15"
  >
    <v-row>
      <v-col>
        <v-icon>{{ icon }}</v-icon>
        {{ disclaimerMessage }}
      </v-col>
      <v-btn
        icon
        @click="isActive = false"
      >
        <v-icon>mdi-close</v-icon>
      </v-btn>
    </v-row>
  </v-snackbar>
</template>

<script lang="ts">
import {Component, Vue} from "vue-property-decorator";
import {
  getDisclaimerMessage,
  getIcon,
  getIsActive,
  setIsActive
} from "@/features/the-disclaimer/the-disclaimer-store.module";

@Component({})
export default class TheDisclaimer extends Vue {

  set isActive(value: boolean) {
    this.$store.commit(setIsActive(),value);
  }

  get isActive(): boolean {
    return this.$store.getters[getIsActive()];
  }

  get icon(): string {
    return this.$store.getters[getIcon()];
  }

  get disclaimerMessage(): string {
    return this.$store.getters[getDisclaimerMessage()];
  }
}
</script>

<style scoped>

</style>