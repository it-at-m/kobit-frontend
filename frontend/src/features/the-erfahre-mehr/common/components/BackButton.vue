<template>
  <v-row
    class="fixed"
    fixed-header
    cols="12"
    sm="12"
    md="12"
    lg="12"
    xl="12"
  >
    <v-col>
      <v-btn
        :to="link"
        depressed
        color="secondary"
        class="ml-4"
      >
        <v-icon>mdi-arrow-left-bold</v-icon> {{ text }}
      </v-btn>
    </v-col>
  </v-row>
</template>

<script lang="ts">

import { defineComponent } from "vue";

export default defineComponent({
  name: "BackButton",
  props: {
    text: {
      type: String,
      default: "Zurück"
    },
    link: {
      type: String,
      default: "/"
    },
  }
});
</script>
<style scoped>

</style>