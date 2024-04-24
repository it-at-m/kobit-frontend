<template>
  <the-offer
    v-if="selectedItemId"
    :id="selectedItemId"
  />
  <BasePageContent
    v-else
    :icon="icon"
    :name="name"
    :info-text="infoText"
    :is-loading="isLoading"
  >
    <BackButton :callback="back" />
    <v-card-text>
      <v-row v-if="listItems && listItems.length > 0">
        <v-col
          xl="6"
          lg="6"
          md="12"
          sm="12"
          cols="12"
          class="pr-0"
        >
          <v-card-title class="pl-0 ml-0">
            Termingebundene Angebote
          </v-card-title>
          <div class="column-content pr-10">
            <v-row justify="start">
              <v-col
                v-for="(item, itemIndex) in nonNullItems"
                :key="'non-null-' + itemIndex"
                cols="12"
                sm="12"
                md="12"
                lg="6"
                xl="4"
              >
                <router-link
                  :to="'/angebot/' + item.id"
                  class="router-link-no-underline"
                >
                  <v-card
                    flat
                    outlined
                    style="height:275px; !important"
                  >
                    <div class="image-container">
                      <div class="image-wrapper">
                        <img
                          :src="item.imageLink"
                          class="cropped-image"
                          contain
                        >
                      </div>
                    </div>
                    <v-card-title>
                      <h5 class="text-no-underline">
                        {{ item.title }}
                      </h5>
                    </v-card-title>
                    <v-card-subtitle>{{ item.startDate }} - {{ item.endDate }}</v-card-subtitle>
                  </v-card>
                </router-link>
              </v-col>
            </v-row>
          </div>
        </v-col>

        <v-col
          xl="6"
          lg="6"
          md="12"
          sm="12"
          cols="12"
          class="pl-0"
        >
          <v-card-title class="pl-10 ml-0">
            Selbstlernangebote
          </v-card-title>
          <div class="pl-10">
            <v-row justify="start">
              <v-col
                v-for="(item, itemIndex) in nullItems"
                :key="'null-' + itemIndex"
                cols="12"
                sm="12"
                md="12"
                lg="6"
                xl="4"
              >
                <router-link
                  :to="'/angebot/' + item.id"
                  class="router-link-no-underline"
                >
                  <v-card
                    flat
                    outlined
                    style="height:275px; !important"
                  >
                    <div class="image-container">
                      <div class="image-wrapper">
                        <img
                          :src="item.imageLink"
                          class="cropped-image"
                          contain
                        >
                      </div>
                    </div>
                    <v-card-title style="font-size:14;">
                      <h5 class="text-no-underline">
                        {{ item.title }}
                      </h5>
                    </v-card-title>
                  </v-card>
                </router-link>
              </v-col>
            </v-row>
          </div>
        </v-col>
      </v-row>


      <div v-else>
        Zurzeit sind keine Angebote verfügbar. Schauen Sie später wieder vorbei.
      </div>
    </v-card-text>
    <BackButton :callback="back" />
  </BasePageContent>
</template>
<script lang="ts">
import { defineComponent, ref, watch, onBeforeUnmount, computed } from "vue";
import BasePageContent from "@/features/commons/base-page-content/base-page-content.vue";
import BaseLinkCard from "@/features/commons/base-link-card/base-link-card.vue";
import BackButton from "@/features/commons/components/BackButton.vue";
import { useRoute, useRouter } from "vue-router/composables";
import { useGetOfferListItems, useGetOffer } from "@/features/commons/middleware/useGetOffers";
import TheOffer from "@/features/the-offers/the-offer.vue";

import {
  THE_OFFER_ROUTE_NAME,
  THE_OFFER_ROUTE_META_ICON,
  THE_OFFER_ROUTE_META_INFO_TEXT
} from "@/features/the-offers/the-offers.routes";
import { RouterLink } from "vue-router";
import { VCardText, VRow, VCol, VCard, VCardTitle, VCardSubtitle } from "vuetify/lib";

export default defineComponent({
  name: "TheOffers",
  components: { BackButton, BasePageContent, BaseLinkCard, TheOffer },
  setup() {
    const router = useRouter();
    const route = useRoute();
    const selectedItemId = ref<string | undefined>(route.params.id);
    const { isLoading, isError, data: listItems, error } = useGetOfferListItems();

    const nonNullItems = computed(() => {
      if (listItems.value && Array.isArray(listItems.value)) {
        return listItems.value.filter(item => item.startDate !== null && item.endDate !== null);
      } else {
        return [];
      }
    });

    const nullItems = computed(() => {
      if (listItems.value && Array.isArray(listItems.value)) {
        return listItems.value.filter(item => item.startDate === null || item.endDate === null);
      } else {
        return [];
      }
    });

    const back = () => {
      router.push("/");
    }

    watch(() => route.params.id, (newId) => {
      selectedItemId.value = newId;
    });

    return {
      name: THE_OFFER_ROUTE_NAME,
      icon: THE_OFFER_ROUTE_META_ICON,
      infoText: THE_OFFER_ROUTE_META_INFO_TEXT,
      isLoading,
      isError,
      listItems,
      error,
      selectedItemId,
      nonNullItems,
      nullItems,
      back,
    };
  },
});
</script>


<style scoped>
.image-container {
  max-height: 180px;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
}

.cropped-image{
  max-height: 180px;
}

.image-fill {
  position: absolute;
  top: 25%;
  left: 25%;
  transform: translate(-25%, -25%);
  width: 100%;
  height: 100%;
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;
}

.column-content {
  border-right: 1px solid #ccc;
}
.router-link-no-underline {
  text-decoration: none;
}

.router-link-no-underline:hover {
  text-decoration: none;
}

.text-no-underline {
  text-decoration: none;
}

.text-no-underline:hover {
  text-decoration: none;
}

h5 {
  white-space: pre-wrap !important;
  text-indent: 0em !important;
  word-break: keep-all;
  line-height: normal;
}

h5 {
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2; /* Number of lines to show */
  -webkit-box-orient: vertical;
}

</style>