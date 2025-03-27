<template>
  <div
    v-if="isLoading"
    class="v-progress-linear"
    style="position: absolute; left: 45%; top: 45%; z-index: 1000"
  >
    <v-progress-circular
      :size="150"
      :width="10"
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