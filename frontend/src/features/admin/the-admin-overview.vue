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
              v-if="adminInfoLoaded"
              cols="12"
              sm="12"
              md="12"
              class="text-center"
            >
              <span v-if="isCentralAdmin">Sie sind Zentraler Admin.</span>
              <span v-else>Sie sind Berreichsadmin.</span>
            </v-col>
            <template>
              <v-col
                v-if="adminInfoLoaded"
                cols="12"
                sm="12"
                md="12"
                :lg="isCentralAdmin ? 4 : 6"
              >
                <base-link-card :item="anlaufstellen" />
              </v-col>
              <v-col
                v-if="adminInfoLoaded"
                cols="12"
                sm="12"
                md="12"
                :lg="isCentralAdmin ? 4 : 6"
              >
                <base-link-card :item="unterstuetzungsfinder" />
              </v-col>
              <v-col
                v-if="isCentralAdmin"
                cols="12"
                sm="12"
                md="12"
                lg="4"
              >
                <base-link-card :item="erfahreMehr" />
              </v-col>
            </template>
          </v-row>
        </v-container>
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import BaseHeadlineMain from "@/features/the-main/components/base-headline-main.vue";
import TheRandomQuoteGenerator from "@/features/random-quote-generator/the-random-quote-generator.vue";
import BaseLinkCard from "@/features/commons/base-link-card/base-link-card.vue";

import { adminAdditionalRoutes } from "@/features/admin/features/the-additional/the-additional-overview-routes";
import { adminBaseHeadLineLabels } from "@/features/admin/i18n";
import { adminContactPointsRoutes } from "@/features/admin/features/the-contact-points/the-contact-points-routes";
import { adminUnterstuetzungsfinderRoutes } from "@/features/admin/components/u-finder/u-finder.routes";

import { getAdminUserInfo } from "@/features/admin/components/userinformation/api/AdminInfoClient";

export default defineComponent({
  name: "AdminOverview",
  components: { BaseLinkCard, TheRandomQuoteGenerator, BaseHeadlineMain },
  setup() {
    const isCentralAdmin = ref<null | boolean>(null);
    const adminInfoLoaded = ref(false);

    getAdminUserInfo().then((info) => {
      isCentralAdmin.value = info.isCentralAdmin;
      adminInfoLoaded.value = true;
    });

    const anlaufstellen = {
      ...adminContactPointsRoutes,
      path: adminContactPointsRoutes.path.replace('/:id?', '/')
    };

    return {
      labels: adminBaseHeadLineLabels,
      anlaufstellen,
      unterstuetzungsfinder: adminUnterstuetzungsfinderRoutes,
      erfahreMehr: adminAdditionalRoutes,
      isCentralAdmin,
      adminInfoLoaded
    };
  }
});
</script>

<style scoped>
</style>
