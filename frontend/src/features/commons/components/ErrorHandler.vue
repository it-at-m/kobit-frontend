<template>
  <v-overlay :value="isError">
    <v-card>
      <v-card-title>
        Es ist ein Fehler aufgetreten!
      </v-card-title>
      <v-card-text>
        {{ message }}
      </v-card-text>
      <v-btn
        class="ma-2"
        color="error"
        @click="$emit('closeError')"
      >
        Schließen
      </v-btn>
    </v-card>
  </v-overlay>
</template>

<script lang="ts">
import {defineComponent} from "vue";

export default defineComponent({
  name: "ErrorHandler",
  props: {
    isError: {
      type: Boolean,
      default: false
    },
    message: {
      type: String
    }
  }
}
)</script>

<style scoped>

</style>