<template>
  <base-page-content :item="angeboteModel">
    <v-card-text>
      <v-card
        v-for="(item, itemIndex) in items"
        :key="itemIndex"
        :item="item"
        :href="item.path"
        target="_blank"
        flat
        outlined
      >
        <v-card-title>{{ item.name }}</v-card-title>
        <v-card-subtitle>{{ item.meta.infoText }}</v-card-subtitle>
      </v-card>
    </v-card-text>
  </base-page-content>
</template>

<script lang="ts">
import {Component, Vue} from "vue-property-decorator";
import BasePageContent from "@/features/commons/base-page-content/base-page-content.vue";
import {theAngeboteRoutes} from "@/features/the-angebote/the-angebote.routes";
import BaseLinkCard from "@/features/commons/base-link-card/base-link-card.vue";

@Component({
  components: {BaseLinkCard, BasePageContent}
})
export default class TheAngebote extends Vue {

  get angeboteModel(): unknown {
    return theAngeboteRoutes;
  }

  get items(): unknown[] {
    return [];
  }
}
</script>

<style scoped>

</style>