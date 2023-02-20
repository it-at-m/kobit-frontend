<template>  
  <v-container fluid>
    <BackButton
      :text="'Zurück'"
      :link="'/erfahre-mehr'"
    />
    <BasePageContent
      :is-loading="isLoading"
      :info-text="infoText"
      :name="name"
      :icon="icon"
    >
      <ContentList :items="items?.contentItemView" />
    </BasePageContent>
    <BackButton
      :text="'Zurück'"
      :link="'/erfahre-mehr'"
    />
  </v-container>
</template>

<script lang="ts">

import {defineComponent} from "vue";
import {useGetAdditionalContent} from "@/features/the-erfahre-mehr/common/middleware/AdditionalPageService";
import {PageType} from "@/features/the-erfahre-mehr/common/model/PageType";
import {
  CONFLICT_PREVENTION_ROUTE_META_ICON,
  CONFLICT_PREVENTION_ROUTE_META_INFO_TEXT,
  CONFLICT_PREVENTION_ROUTE_NAME
} from "@/features/the-erfahre-mehr/features/the-conflict-prevention/the-conflict-prevention.routes";
import BasePageContent from "@/features/commons/base-page-content/base-page-content.vue";
import ContentList from "@/features/commons/components/ContentList.vue";
import BackButton from "@/features/commons/components/BackButton.vue";

export default defineComponent({
  name: "TheConflictPrevention",
  components: {BasePageContent, ContentList, BackButton},
  setup() {
    const {isLoading, isError, data, error} = useGetAdditionalContent(PageType.PREVENTION);

    return {
      isLoading,
      isError,
      error,
      items: data,
      icon: CONFLICT_PREVENTION_ROUTE_META_ICON,
      infoText: CONFLICT_PREVENTION_ROUTE_META_INFO_TEXT,
      name: CONFLICT_PREVENTION_ROUTE_NAME
    };
  }
});
</script>

<style scoped>
</style>
