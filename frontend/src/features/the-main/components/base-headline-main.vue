<template>
  <div>
    <div class="headline text-lg-h3">
      {{ labels.headline }}
    </div>
    <div class="subtitle-1 text-lg-h6">
      {{ labels.subtitle }}
    </div>
  </div>
</template>

<script lang="ts">
import {defineComponent} from "vue";
import {I18nLabel} from "@/core/core.translation";

export default defineComponent({
  name: "BaseHeadlineMain",
  props: {
    labels: {
      type: Object as () => I18nLabel
    }
  }
})
</script>

<style scoped>

</style>