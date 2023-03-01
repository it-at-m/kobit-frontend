<template>
  <v-container fluid>
    <BackButton
      :text="'Zurück'"
      :callback="back"
    />
    <BasePageContent
      :icon="icon"
      :info-text="infoText"
      :is-loading="isLoading"
      :name="name"
    >
      <TextList :items="items?.textItemView" />
    </BasePageContent>
    <BackButton
      :text="'Zurück'"
      :callback="back"
    />
  </v-container>
</template>

<script lang="ts">
import BasePageContent from "@/features/commons/base-page-content/base-page-content.vue";
import {
  DOWNLOADS_ROUTE_META_ICON,
  DOWNLOADS_ROUTE_META_INFO_TEXT,
  DOWNLOADS_ROUTE_NAME
} from "@/features/the-erfahre-mehr/features/the-downloads/the-downloads.routes";
import {PageType} from "@/features/the-erfahre-mehr/common/model/PageType";
import TextList from "@/features/commons/components/TextList.vue";
import {defineComponent} from 'vue';
import {useGetAdditionalContent} from "@/features/the-erfahre-mehr/common/middleware/AdditionalPageService";
import BackButton from "@/features/commons/components/BackButton.vue";
import {useRouter} from "vue-router/composables";

export default defineComponent({
  name: 'TheDownloads',
  components: {TextList, BasePageContent, BackButton},
  setup() {

    const {isLoading, isError, data, error} = useGetAdditionalContent(PageType.DOWNLOADS);
    const router = useRouter();
    function back() {
      router.push('/erfahre-mehr');
    }

    return {
      isLoading,
      isError,
      items: data,
      error,
      icon: DOWNLOADS_ROUTE_META_ICON,
      infoText: DOWNLOADS_ROUTE_META_INFO_TEXT,
      name: DOWNLOADS_ROUTE_NAME,
      back
    };
  },
});


</script>

<style scoped>
.v-list-item__content p {
  white-space: pre-wrap;
  text-indent: 0em !important;
}
</style>