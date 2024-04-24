<template>
  <BasePageContent
    :icon="icon"
    :name="name"
    :info-text="infoText"
    :is-loading="isLoading"
  >
    <BackButton :callback="back" />
    <v-card-text v-if="offer">
      <v-card>
        <v-card-title>{{ offer.title }}</v-card-title>
        <v-card-content>
          <v-row>
            <v-col
              cols="12"
              sm="12"
              md="6"
              lg="6"
              xl="6"
            >
              <v-card-text v-if="offer.startDate && offer.endDate">
                Von {{ offer.startDate }} bis {{
                  offer.endDate
                }}
              </v-card-text>
              <v-card-text>
                <span v-html="offer.description" />
              </v-card-text>
            </v-col>
            <v-col
              cols="12"
              sm="12"
              md="6"
              lg="6"
              xl="6"
            >
              <div class="image-container">
                <div class="image-wrapper">
                  <img
                    :src="offer.imageLink"
                    class="cropped-image"
                    contain
                  >
                </div>
              </div>
            </v-col>
          </v-row>
        </v-card-content>
      </v-card>
    </v-card-text>
    <div v-else>
      Loading offer...
    </div>
  </BasePageContent>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted } from "vue";
import BasePageContent from "@/features/commons/base-page-content/base-page-content.vue";
import BackButton from "@/features/commons/components/BackButton.vue";
import { useRoute, useRouter } from "vue-router/composables";
import { useGetOffer } from "@/features/commons/middleware/useGetOffers";


export default defineComponent({
    name: "TheOffer",
    components: { BasePageContent, BackButton },
    setup() {
        const route = useRoute();
        const router = useRouter();
        const offerId = ref<string>(route.params.id);
        const { isLoading, data: offer, error } = useGetOffer(offerId);

        const back = () => {
            router.push("/angebot");
        };

        return {
            name: "Angebot",
            icon: "mdi-ballot-outline",
            infoText: "Hier finden Sie Details zum Angebot.",
            isLoading,
            offer,
            error,
            back,
        };
    },
});
</script>
<style scoped>

</style>
