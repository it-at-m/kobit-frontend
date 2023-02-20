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
import ContentList from "@/features/commons/components/ContentList.vue";
import BasePageContent from "@/features/commons/base-page-content/base-page-content.vue";
import {
  LEADERSHIP_COOPERATION_ROUTE_META_ICON,
  LEADERSHIP_COOPERATION_ROUTE_META_INFO_TEXT,
  LEADERSHIP_COOPERATION_ROUTE_NAME
} from "@/features/the-erfahre-mehr/features/the-leadership-cooperation/the-leadership-cooperation.routes";
import BackButton from "@/features/commons/components/BackButton.vue";

export default defineComponent({
  name: "TheLeadershipCooperation",
  components: {ContentList, BasePageContent, BackButton},
  setup() {
    const {isLoading, isError, data, error} = useGetAdditionalContent(PageType.LEADERSHIP);

    return {
      isLoading,
      isError,
      error,
      items: data,
      icon: LEADERSHIP_COOPERATION_ROUTE_META_ICON,
      infoText: LEADERSHIP_COOPERATION_ROUTE_META_INFO_TEXT,
      name: LEADERSHIP_COOPERATION_ROUTE_NAME
    };
  }

});
</script>