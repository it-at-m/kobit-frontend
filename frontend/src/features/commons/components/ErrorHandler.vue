<template>
  <v-overlay :value="isError">
    <v-card>
      <v-card-title>
        Es ist ein Fehler aufgetreten!
      </v-card-title>
      <v-card-text>
        <p v-if="message">
          {{ message }}
        </p>
        <ul v-if="validationErrors">
          <li
            v-for="(error, index) in validationErrors"
            :key="index"
          >
            {{ error }}
          </li>
        </ul>
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
import { defineComponent } from "vue";

export default defineComponent({
  name: "ErrorHandler",
  props: {
    isError: {
      type: Boolean,
      default: false
    },
    message: {
      type: String
    },
    validationErrors: {
      type: Array,
      default: () => []
    }
  }
});
</script>

<style scoped>

</style>
