<template>
  <v-container fluid>
    <LoadingSpinner :is-loading="isLoading" />
    <v-row>
      <v-col>
        <v-card
          flat
          :style="$vuetify.breakpoint.xs || $vuetify.breakpoint.sm ? 'border-top:1px solid #eee;' : ''"
        >
          <v-card-title>{{ contactPoint?.name }}</v-card-title>
          <v-card-text>
            <v-row>
              <v-col cols="12">
                <span v-html="computeMarkdown" />
              </v-col>
            </v-row>
            <v-row>
              <v-col
                cols="12"
                sm="12"
                md="12"
                lg="6"
                xl="6"
              >
                <base-fields-contact
                  v-if="contactPoint?.contact"
                  :contact-point="contactPoint"
                />
                <base-fields-additional-content
                  v-if="linksInDownLoads?.length > 0"
                  :links="linksInDownLoads"
                />
              </v-col>
              <v-col
                cols="12"
                sm="12"
                md="12"
                lg="6"
                xl="6"
              >
                <img
                  v-if="contactPoint?.image"
                  :src="contactPoint.image.toString()"
                  style="width: 100%; max-height:400px; object-fit: contain;"
                >
              </v-col>
            </v-row>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>
<script lang="ts">
import { computed, defineComponent, ref, watch } from "vue";
import { useGetContactPoint } from "@/features/commons/middleware/useGetContactPoints";
import LoadingSpinner from "@/features/commons/components/LoadingSpinner.vue";
import { marked } from "marked";
import BaseFieldsContact from "@/features/the-unterstuetzungsfinder/features/the-contact-points/base-fields-contact.vue";
import BaseFieldsAdditionalContent
  from "@/features/the-unterstuetzungsfinder/features/the-contact-points/base-fields-additional-content.vue";
import { useRoute } from "vue-router/composables";
import { Link } from "@/features/commons/types/ContactPoint";

export default defineComponent({
  name: "BaseCardAnlaufstelle",
  components: { BaseFieldsAdditionalContent, BaseFieldsContact, LoadingSpinner },
  setup() {
    const route = useRoute();
    const pageId = ref<string>(route.params.id);
    const { isLoading, isError, data: contactPoint, error, refetch } = useGetContactPoint(pageId);
    const linksInDownLoads = ref<Link[]>();
    watch(() => route.params.id, (newId) => {
      pageId.value = newId;
      refetch();
    });

    computed(() => linksInDownLoads.value = contactPoint.value?.links?.filter(it => it.inDownloads))
    const computeMarkdown = computed(() => marked.parse(contactPoint.value?.description || ""));
    return {
      isLoading,
      isError,
      contactPoint,
      error,
      computeMarkdown,
      linksInDownLoads
    }
  }
})
</script>

<style lang="scss" scoped>
.theme--light.v-list-item:not(.v-list-item--active):not(.v-list-item--disabled) {
  color: #00000099 !important;
  padding: 0;
}
</style>
