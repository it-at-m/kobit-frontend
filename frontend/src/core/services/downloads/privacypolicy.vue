<template>
  <p>
    <v-btn
      v-if="item !== undefined"
      plain
      :href="item[0]?.textItemView.link"
      :download="item[0]?.textItemView.header"
      :loading="isLoading"
    >
      Datenschutzhinweis <v-icon>mdi-download</v-icon>
    </v-btn>
  </p>
</template>

<script lang="ts">
import {defineComponent} from "vue";
import {PageType} from "@/features/the-erfahre-mehr/common/model/PageType";
import {useGetAdditionalContent} from "@/features/the-erfahre-mehr/common/middleware/AdditionalPageService";


export default defineComponent ({
  name: "PrivacyPolicy",
  setup() {
    const {isLoading, isError, data, error} = useGetAdditionalContent(PageType.PRIVACY_POLICY);

    return {
      isLoading,
      isError,
      item: data,
      error
    };
  }
});

</script>

<style scoped>

</style>