<template>
  <p>
    <v-btn
      v-if="item !== undefined"
      plain
      :href="item.textItemView[0].link"
      :download="item.textItemView[0].header"
      :loading="isLoading"
    >
      Datenschutzhinweis <v-icon>mdi-download</v-icon>
    </v-btn>
  </p>
</template>

<script lang="ts">
import { defineComponent } from "vue";

import { useGetAdditionalContent } from "@/features/the-additional/common/middleware/AdditionalPageService";
import { PageType } from "@/features/the-additional/common/model/PageType";

export default defineComponent({
  name: "PrivacyPolicy",
  setup() {
    const { isLoading, isError, data, error } = useGetAdditionalContent(
      PageType.PRIVACY_POLICY
    );

    return {
      isLoading,
      isError,
      item: data,
      error,
    };
  },
});
</script>

<style scoped></style>
