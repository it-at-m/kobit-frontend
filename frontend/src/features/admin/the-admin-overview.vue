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
import {defineComponent, ref} from "vue";
import BaseHeadlineMain from "@/features/the-main/components/base-headline-main.vue";
import TheRandomQuoteGenerator from "@/features/random-quote-generator/the-random-quote-generator.vue";
import BaseLinkCard from "@/features/commons/base-link-card/base-link-card.vue";
import {theUnterstuetzungsfinderRoutes} from "@/features/the-unterstuetzungsfinder/the-unterstuetzungsfinder.routes";
import {adminExperienceMoreRoutes} from "@/features/admin/features/the-additional/the-additional-overview-routes";
import {adminBaseHeadLineLabels} from "@/features/admin/i18n";
import {adminContactPointsRoutes} from "@/features/admin/features/the-contact-points/the-contact-points-routes";
import {adminExperienceMoreRoutes} from "@/features/admin/features/the-experience-more/experienceMoreRoutes";
import {adminBaseHeadLineLabels, adminInformationLabels} from "@/features/admin/i18n";
import {adminContactPointsRoutes} from "@/features/admin/features/the-contact-points/contactPointsRoutes";
import UserInformationDialog from "@/features/admin/components/userinformation/UserInformationDialog.vue";
import {adminUFinderRoutes} from "@/features/admin/components/u-finder/u-finder.routes";

export default defineComponent({
  name: "AdminOverview",
  components: { BaseLinkCard, TheRandomQuoteGenerator, BaseHeadlineMain},
  setup() {
    const isInfoDialogActive = ref(false);

    function closeInfoDialog() {
      isInfoDialogActive.value = false;
    }


    const anlaufstellen = {
    ...adminContactPointsRoutes,
    path: adminContactPointsRoutes.path.replace('/:id?', '/')
     };

    return {
      labels: adminBaseHeadLineLabels,
      anlaufstellen: adminContactPointsRoutes,
      unterstuetzungsfinder: adminUFinderRoutes,
      infoLabels: adminInformationLabels,
      anlaufstellen,
      unterstuetzungsfinder: theUnterstuetzungsfinderRoutes,
      erfahreMehr: adminExperienceMoreRoutes
    }
  }
})
</script>

<style scoped>


</style>