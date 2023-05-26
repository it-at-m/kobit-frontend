<template>
  <v-container>
    <v-row>
      <v-col>
        <v-row>
          <v-col
            cols="4"
            offset="4"
          >
            <TheRandomQuoteGenerator />
          </v-col>
        </v-row>
        <base-headline-main :labels="labels" />
        <v-container>
          <v-row>
            <v-col
              cols="12"
              sm="12"
              md="6"
              lg="6"
              xl="3"
            >
              <base-link-card :item="anlaufstellen" />
            </v-col>
            <v-col
              cols="12"
              sm="12"
              md="6"
              lg="6"
              xl="3"
            >
              <base-link-card :item="unterstuetzungsfinder" />
            </v-col>
            <v-col
              cols="12"
              sm="12"
              md="6"
              lg="6"
              xl="3"
            >
              <base-link-card :item="angebote" />
            </v-col>
            <v-col
              cols="12"
              sm="12"
              md="6"
              lg="6"
              xl="3"
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
import {Component, Vue} from "vue-property-decorator";
import BaseHeadlineMain from "@/features/the-main/components/base-headline-main.vue";
import TheRandomQuoteGenerator from "@/features/random-quote-generator/the-random-quote-generator.vue";
import BaseLinkCard from "@/features/commons/base-link-card/base-link-card.vue";

import {adminAdditionalRoutes} from "@/features/admin/features/the-additional/the-additional-overview-routes";
import {adminBaseHeadLineLabels} from "@/features/admin/i18n";
import {adminContactPointsRoutes} from "@/features/admin/features/the-contact-points/the-contact-points-routes";

import {adminOffersRoutes} from "@/features/admin/features/the-offers/the-offers.routes";


import {adminUFinderRoutes} from "@/features/admin/components/u-finder/u-finder.routes";
import { I18nLabel } from "@/core/core.translation";
import { VContainer, VRow, VCol } from "vuetify/lib";



@Component({
  components: {BaseLinkCard, BaseHeadlineMain, TheRandomQuoteGenerator}
})
export default class AdminOverview extends Vue {

  get labels(): I18nLabel {
    return adminBaseHeadLineLabels;
  }

  get anlaufstellen(): unknown {
    adminContactPointsRoutes.path = "/admin/anlaufstellen/"
    return adminContactPointsRoutes;
  }

  get unterstuetzungsfinder(): unknown {
    return adminUFinderRoutes;
  }

  get angebote(): unknown {
    adminOffersRoutes.path = "/admin/angebote/"
    return adminOffersRoutes;
  }

  get erfahreMehr(): unknown {
    return adminAdditionalRoutes;
  }
}
</script>

<style scoped>


</style>