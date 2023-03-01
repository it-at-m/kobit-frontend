<template>
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
</template>

<script lang="ts">
import {defineComponent} from "vue";

export default defineComponent({
  name: "InfoText",
  props: {
    isInfoTextActive: {
      type: Boolean
    },
    labels: {
      //typeof I18nLabel
      type: undefined
    },
    closeInfoText: {
      type: Function
    }
  }
});
</script>

<style scoped>

</style>