<template>
  <v-container fluid>
    <LoadingSpinner :is-loading="isLoading"/>
    <v-row>
      <v-col>
        <v-card
            flat
            :style="$vuetify.breakpoint.xs || $vuetify.breakpoint.sm? 'border-top:1px solid #eee;' : ''"
        >
          <v-card-title>{{ contactPoint?.name }}</v-card-title>
          <v-card-text>
            <span v-html="computeMarkdown"/>
            <base-fields-contact
                v-if="contactPoint?.contact"
                :contactPoint="contactPoint"
            />
            <base-fields-additional-content
                v-if="linksInDownLoads?.length > 0"
                :links="linksInDownLoads"
            />
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts">

import {computed, defineComponent, ref, watch} from "vue";
import {useGetContactPoint} from "@/features/commons/middleware/useGetContactPoints";
import LoadingSpinner from "@/features/commons/components/LoadingSpinner.vue";
import {marked} from "marked";
import BaseFieldsContact from "@/features/the-unterstuetzungsfinder/features/the-anlaufstellen/base-fields-contact.vue";
import BaseFieldsAdditionalContent
  from "@/features/the-unterstuetzungsfinder/features/the-anlaufstellen/base-fields-additional-content.vue";
import {useRoute} from "vue-router/composables";
import {Link} from "@/features/commons/types/ContactPoint";

export default defineComponent({
  name: "BaseCardAnlaufstelle",
  components: {BaseFieldsAdditionalContent, BaseFieldsContact, LoadingSpinner},
  setup() {
    const route = useRoute();
    const pageId = ref<string>(route.params.id);
    const {isLoading, isError, data: contactPoint, error, refetch} = useGetContactPoint(pageId);
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
