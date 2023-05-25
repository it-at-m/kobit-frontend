<template>
    <BasePageContent :icon="icon" :name="name" :info-text="infoText" :is-loading="isLoading">
        <BackButton :callback="back" />
        <v-card-text v-if="offer">
            <v-card>
                <v-card-title>{{ offer.title }}</v-card-title>
                <v-card-content>
                    <v-row>
                        <v-col cols="12" sm="12" md="6" lg="6" xl="6">
                            <v-card-text>Von {{ formatDate(offer.startDate) }} bis {{
                                formatDate(offer.endDate)
                            }}</v-card-text>
                            <v-card-text>{{ offer.description }}</v-card-text>
                        </v-col>
                        <v-col cols="12" sm="12" md="6" lg="6" xl="6">
                            <div class="image-container">
                                <div class="image-wrapper">
                                    <img :src="offer.imageLink" class="cropped-image" contain />
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
import { useGetOffer } from "@/features/commons/middleware/useGetOffer";


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

        const formatDate = (date: Date) => {
            const options = { day: "2-digit", month: "2-digit", year: "numeric" };
            return new Date(date).toLocaleDateString(undefined, options);
        };

        // Fetch the offer data when the component is mounted
        onMounted(() => {
            if (offerId.value) {
                // Call the API or perform the necessary logic to fetch the offer data based on the offerId
                // Assign the fetched offer data to the 'offer' ref
            }
        });

        return {
            name: "Angebot",
            icon: "mdi-ballot-outline",
            infoText: "Hier finden Sie Details zum Angebot.",
            isLoading,
            offer,
            error,
            back,
            formatDate,
        };
    },
});
</script>

<style scoped>

</style>
