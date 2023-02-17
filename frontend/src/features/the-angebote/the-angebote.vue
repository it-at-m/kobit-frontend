<template>
  <BasePageContent
    :icon="icon"
    :name="name"
    :info-text="infoText"
    :is-loading="false"
  >
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
  </BasePageContent>
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

  get name(): string {
    return theAngeboteRoutes.name;
  }

  get icon(): string {
    return theAngeboteRoutes.meta.icon;
  }

  get infoText(): string {
    return theAngeboteRoutes.meta.infoText;
  }


  get items(): unknown[] {
    return [];
  }
}
</script>

<style scoped>

</style>