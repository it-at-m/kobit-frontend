<template>
  <div>
    <v-card
      class="mx-3 px-2"
      color="#f3f3f3"
      elevation="0"
    >
      <v-list-item-content>
        <div class="headline text-lg-h3">
          {{ labels.headline }}
        </div>
        <div class="subtitle-1 text-lg-h6">
          {{ labels.subtitle }}
        </div>
      </v-list-item-content>
    </v-card>
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