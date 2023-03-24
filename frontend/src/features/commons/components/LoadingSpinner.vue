<template>
  <div
    v-if="isLoading"
    class="v-progress-linear"
  >
    <v-progress-circular
      :size="150"
      :width="8"
      color="secondary"
      indeterminate
    />
  </div>
</template>

<script lang="ts">
import {defineComponent} from "vue";

export default defineComponent({
  name: "LoadingSpinner",
  props: {
    isLoading: {
      type: Boolean
    }
  }
})
</script>

<style scoped>

</style>