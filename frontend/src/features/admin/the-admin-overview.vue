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
          <v-col
            offset="2"
            cols="1"
          >
            <v-tooltip right>
              <template v-slot:activator="{ on, attrs }">
                <v-btn
                  class="mx-2"
                  color="secondary"
                  v-bind="attrs"
                  @click="openInfoDialog"
                  v-on="on"
                >
                  <v-icon>mdi-information-outline</v-icon>
                </v-btn>
              </template>
              <span>{{ infoLabels.informationTitle }}</span>
            </v-tooltip>
          </v-col>
        </v-row>
        <UserInformationDialog
          :is-dialog-active="isInfoDialogActive"
          @closeInfoDialog="closeInfoDialog"
        />
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
import {adminBaseHeadLineLabels, adminInformationLabels} from "@/features/admin/i18n";
import {adminContactPointsRoutes} from "@/features/admin/features/the-contact-points/the-contact-points-routes";
import UserInformationDialog from "@/features/admin/components/userinformation/UserInformationDialog.vue";

export default defineComponent({
  name: "AdminOverview",
  components: {UserInformationDialog, BaseLinkCard, TheRandomQuoteGenerator, BaseHeadlineMain},
  setup() {
    const isInfoDialogActive = ref(false);
    function closeInfoDialog() {
      isInfoDialogActive.value = false;
    }

    function openInfoDialog() {
      isInfoDialogActive.value = true;
    }

    const anlaufstellen = {
    ...adminContactPointsRoutes,
    path: adminContactPointsRoutes.path.replace('/:id?', '/')
     };

    return {
      closeInfoDialog,
      openInfoDialog,
      isInfoDialogActive,
      labels: adminBaseHeadLineLabels,
      anlaufstellen,
      unterstuetzungsfinder: theUnterstuetzungsfinderRoutes,
      infoLabels: adminInformationLabels,
      erfahreMehr: adminExperienceMoreRoutes
    }
  }
})
</script>

<style scoped>


</style>