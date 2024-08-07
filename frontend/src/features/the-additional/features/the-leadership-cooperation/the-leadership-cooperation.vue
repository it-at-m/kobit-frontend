<template>
  <v-container fluid>
    <BackButton :callback="back" />
    <BasePageContent
      :is-loading="isLoading"
      :info-text="infoText"
      :name="name"
      :icon="icon"
    >
      <ContentList :items="items?.contentItemView" />
    </BasePageContent>
    <BackButton :callback="back" />
  </v-container>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { useRouter } from "vue-router/composables";

import BasePageContent from "@/features/commons/base-page-content/base-page-content.vue";
import BackButton from "@/features/commons/components/BackButton.vue";
import ContentList from "@/features/commons/components/ContentList.vue";
import { useGetAdditionalContent } from "@/features/the-additional/common/middleware/AdditionalPageService";
import { PageType } from "@/features/the-additional/common/model/PageType";
import {
  LEADERSHIP_COOPERATION_ROUTE_META_ICON,
  LEADERSHIP_COOPERATION_ROUTE_META_INFO_TEXT,
  LEADERSHIP_COOPERATION_ROUTE_NAME,
} from "@/features/the-additional/features/the-leadership-cooperation/the-leadership-cooperation.routes";

export default defineComponent({
  name: "TheLeadershipCooperation",
  components: { ContentList, BasePageContent, BackButton },
  setup() {
    const { isLoading, isError, data, error } = useGetAdditionalContent(
      PageType.LEADERSHIP
    );
    const router = useRouter();
    function back() {
      router.push("/erfahre-mehr");
    }

    return {
      isLoading,
      isError,
      error,
      items: data,
      icon: LEADERSHIP_COOPERATION_ROUTE_META_ICON,
      infoText: LEADERSHIP_COOPERATION_ROUTE_META_INFO_TEXT,
      name: LEADERSHIP_COOPERATION_ROUTE_NAME,
      back,
    };
  },
});
</script>
