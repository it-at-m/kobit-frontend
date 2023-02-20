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
      <v-card-text>
        <v-row>
          <v-col>
            <v-text-field
              id="id_faq_search"
              v-model="searchText"
              label="FAQs durchsuchen"
              placeholder="Eingabe"
              outlined
              append-icon="mdi-magnify"
              single-line
            />
          </v-col>
        </v-row>
        <TextList :items="filteredFaqs" />
      </v-card-text>
    </BasePageContent>
    <BackButton
      :text="'Zurück'"
      :link="'/erfahre-mehr'"
    />
  </v-container>
</template>

<script lang="ts">

import {computed, defineComponent, ref} from "vue";
import {
  FAQ_ROUTE_META_ICON,
  FAQ_ROUTE_META_INFO_TEXT,
  FAQ_ROUTE_NAME
} from "@/features/the-erfahre-mehr/features/the-faq/the-faq.routes";
import BasePageContent from "@/features/commons/base-page-content/base-page-content.vue";
import TextList from "@/features/commons/components/TextList.vue";
import {useGetAdditionalContent} from "@/features/the-erfahre-mehr/common/middleware/AdditionalPageService";
import {PageType} from "@/features/the-erfahre-mehr/common/model/PageType";
import BackButton from "@/features/the-erfahre-mehr/common/components/BackButton.vue";

export default defineComponent({
  name: "TheFaq",
  components: {TextList, BasePageContent, BackButton},
  setup() {
    const searchText = ref<string>("");
    const {isLoading, isError, data, error} = useGetAdditionalContent(PageType.FAQ);

    const filteredFaqs = computed(() => {
      return data.value?.textItemView.filter((item) => {
        return (
            item.header
                .toLowerCase()
                .indexOf(searchText.value.toLowerCase()) != -1);
      });
    });

    return {
      isLoading,
      isError,
      error,
      searchText,
      filteredFaqs,
      icon: FAQ_ROUTE_META_ICON,
      infoText: FAQ_ROUTE_META_INFO_TEXT,
      name: FAQ_ROUTE_NAME
    };
  }
});
</script>

<style scoped>
/* For catching the line breaks in the data */
.v-list-item__content p {
  white-space: pre-wrap;
  text-indent: 0em !important;
}
</style>