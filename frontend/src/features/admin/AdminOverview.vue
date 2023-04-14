<template>
  <v-container>
    <v-row>
      <v-col>
        <TheRandomQuoteGenerator />
        <base-headline-main :labels="labels" />
        <v-container>
          <v-row>
            <v-col
              cols="12"
              sm="12"
              md="12"
              lg="4"
            >
              <base-link-card :item="anlaufstellen" />
            </v-col>
            <v-col
              cols="12"
              sm="12"
              md="12"
              lg="4"
            >
              <base-link-card :item="unterstuetzungsfinder" />
            </v-col>
            <v-col
              cols="12"
              sm="12"
              md="12"
              lg="4"
            >
              <base-link-card :item="erfahreMehr" />
            </v-col>
          </v-row>
        </v-container>
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts">
import {defineComponent} from "vue";
import BaseHeadlineMain from "@/features/the-main/components/base-headline-main.vue";
import TheRandomQuoteGenerator from "@/features/random-quote-generator/the-random-quote-generator.vue";
import BaseLinkCard from "@/features/commons/base-link-card/base-link-card.vue";
import {theUnterstuetzungsfinderRoutes} from "@/features/the-unterstuetzungsfinder/the-unterstuetzungsfinder.routes";
import {erfahreMehrRoutes} from "@/features/the-erfahre-mehr/the-erfahre-mehr.routes";
import {adminBaseHeadLineLabels} from "@/features/admin/i18n";
import {adminContactPointsRoutes} from "@/features/admin/components/contactpoints/contactPointsRoutes";

export default defineComponent({
  name: "AdminOverview",
  components: {BaseLinkCard, TheRandomQuoteGenerator, BaseHeadlineMain},
  setup() {
    return {
      labels: adminBaseHeadLineLabels,
      anlaufstellen: adminContactPointsRoutes,
      unterstuetzungsfinder: theUnterstuetzungsfinderRoutes,
      erfahreMehr: erfahreMehrRoutes
    }
  }
})
</script>

<style scoped>

</style>