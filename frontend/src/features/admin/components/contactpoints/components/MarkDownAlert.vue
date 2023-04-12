<template>
  <v-alert
    dismissible
    class="black--text"
    type="info"
    color="grey"
  >
    {{ label.markdownHint }}
    <a
      href="https://www.w3schools.io/file/markdown-cheatsheet/"
      target="_blank"
    >W3Schools</a>
  </v-alert>
</template>

<script lang="ts">
import {defineComponent} from "vue";
import {I18nLabel} from "@/core/core.translation";

export default defineComponent({
  name: "MarkDownAlert",
  props: {
    label: {
      type: Object as () => I18nLabel
    }
  }
}
)</script>

<style scoped>

</style>