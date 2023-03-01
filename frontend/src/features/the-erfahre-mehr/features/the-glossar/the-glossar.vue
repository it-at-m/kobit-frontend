<template>
  <v-container fluid>
    <BackButton :callback="back"/>
    <base-page-content
      :icon="icon"
      :name="name"
      :info-text="infoText"
      :is-loading="isLoading"
    >
      <v-card-text>
        <v-row>
          <v-col>
            <v-text-field
              id="id_glossar_search"
              v-model="searchText"
              label="Glossar durchsuchen"
              placeholder="Eingabe"
              outlined
              append-icon="mdi-magnify"
              single-line
            />
          </v-col>
        </v-row>
        <v-row>
          <v-col
            cols="12"
            sm="12"
            md="12"
            lg="12"
            xl="12"
          >
            <p class="text-xs-center text-sm-center text-md-center text-lg-center text-xl-center">
              <button
                :class="{ active: filterLetter === '' }"
                class="pa-2"
                @click="filterLetter = ''"
              >
                Filter Zurücksetzen
              </button>

              <span
                v-for="(letter, letterIndex) in glossaryAlphabet"
                :key="letterIndex"
              ><button
                :key="letterIndex"
                :class="{ active: filterLetter === letter }"
                class="pa-2"
                @click="filterLetter = letter"
              >{{
                letter
              }}</button><span v-if="letterIndex + 1 !== glossaryAlphabet.length">·</span></span>
            </p>
          </v-col>
        </v-row>
        <v-row>
          <v-col>
            <TextList :items="filteredGlossary" />
          </v-col>
        </v-row>
      </v-card-text>
    </base-page-content>
    <BackButton :callback="back"/>
  </v-container>
</template>

<script lang="ts">

import { computed, defineComponent, ref } from "vue";
import TextList from "@/features/commons/components/TextList.vue";
import BasePageContent from "@/features/commons/base-page-content/base-page-content.vue";
import { useGetAdditionalContent } from "@/features/the-erfahre-mehr/common/middleware/AdditionalPageService";
import { PageType } from "@/features/the-erfahre-mehr/common/model/PageType";
import {
  GLOSSAR_ROUTE_META_ICON,
  GLOSSAR_ROUTE_META_INFO_TEXT,
  GLOSSAR_ROUTE_NAME
} from "@/features/the-erfahre-mehr/features/the-glossar/the-glossar.routes";
import BackButton from "@/features/commons/components/BackButton.vue";
import {useRouter} from "vue-router/composables";


export default defineComponent({
  name: "TheGlossar",
  components: { TextList, BasePageContent, BackButton },
  setup() {
    const searchText = ref<string>("");
    const filterLetter = ref<string>("");
    const { isLoading, isError, data, error } = useGetAdditionalContent(PageType.GLOSSARY);
    const router = useRouter();
    function back() {
      router.push('/erfahre-mehr');
    }
    const filteredGlossary = computed(() => {
      return data.value?.textItemView.filter((item) => {
        return (
          item.header
            .toLowerCase()
            .indexOf(searchText.value.toLowerCase()) != -1
          &&
          item.header
            .toLowerCase()
            .startsWith(filterLetter.value.toLowerCase()))
          ;
      });
    });

    const glossaryAlphabet = computed(() => data.value?.textItemView
      .map((it) =>
        it.header.charAt(0).toUpperCase())
      .sort()
      .filter((it, i, self) => self.indexOf(it) == i)
    );

    return {
      isLoading,
      isError,
      filteredGlossary,
      glossaryAlphabet,
      filterLetter,
      searchText,
      error,
      icon: GLOSSAR_ROUTE_META_ICON,
      infoText: GLOSSAR_ROUTE_META_INFO_TEXT,
      name: GLOSSAR_ROUTE_NAME,
      back
    };
  }
});

</script>
<style scoped>

</style>