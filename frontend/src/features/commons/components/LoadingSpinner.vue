<template>
  <div
    v-if="isLoading"
    class="v-progress-linear"
    style="position: absolute; left: 50%; top: 30%; z-index: 1000"
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