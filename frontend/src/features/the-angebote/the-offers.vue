<template>
  <the-offer :id="selectedItemId" v-if="selectedItemId" />
  <BasePageContent
    :icon="icon"
    :name="name"
    :info-text="infoText"
    :is-loading="isLoading"
    v-else
  >
    <v-card-text>
      <BackButton :callback="back" />
      <v-row
        justify="start"
        v-if="listItems && listItems.length > 0"
      >
        <v-col
          v-for="(item, itemIndex) in listItems"
          :key="itemIndex"
          cols="12"
          sm="12"
          md="6"
          lg="4"
          xl="3"
        >
          <router-link :to="'/angebot/' + item.id">
            <v-card flat outlined>
              <div class="image-container">
                <div class="image-wrapper">
                  <img :src="item.imageLink" class="cropped-image" contain />
                </div>
              </div>
              <v-card-title>{{ item.title }}</v-card-title>
              <v-card-subtitle>{{ formatDate(item.startDate) }} - {{ formatDate(item.endDate) }}</v-card-subtitle>
            </v-card>
          </router-link>
        </v-col>
      </v-row>
      <div v-else>
        Zurzeit sind keine Angebote verfügbar. Schauen Sie später wieder vorbei.
      </div>
    </v-card-text>
  </BasePageContent>
</template>


<script lang="ts">
import { defineComponent, ref, watch, onBeforeUnmount } from "vue";
import BasePageContent from "@/features/commons/base-page-content/base-page-content.vue";
import BaseLinkCard from "@/features/commons/base-link-card/base-link-card.vue";
import BackButton from "@/features/commons/components/BackButton.vue";
import { useRoute, useRouter } from "vue-router/composables";
import { useGetOfferListItems, useGetOffer } from "@/features/commons/middleware/useGetOffer";
import TheOffer from "@/features/the-angebote/the-offer.vue";

import {
  THE_OFFER_ROUTE_NAME,
  THE_OFFER_ROUTE_META_ICON,
  THE_OFFER_ROUTE_META_INFO_TEXT
} from "@/features/the-angebote/the-offers.routes";

export default defineComponent({
  name: "TheOffers",
  components: { BackButton, BasePageContent, BaseLinkCard, TheOffer },
  setup() {
    const router = useRouter();
    const route = useRoute();
    const selectedItemId = ref<string | undefined>(route.params.id);
    const { isLoading, isError, listItems, error } = useGetOfferListItems();

    const back = () => {
      router.push("/");
    }

    const formatDate = (date: Date) => {
      const options = { day: '2-digit', month: '2-digit', year: 'numeric' };
      return new Date(date).toLocaleDateString(undefined, options);
    };

    watch(() => route.params.id, (newId) => {
      console.log( route.params.id)
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
      formatDate,
      back,
    };
  },
});
</script>


<style scoped>
.image-container {
  max-height: 250px;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
}

.image-wrapper {
  position: relative;
  height: 250px;
}

.image-fill {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 100%;
  height: 100%;
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;
}
</style>