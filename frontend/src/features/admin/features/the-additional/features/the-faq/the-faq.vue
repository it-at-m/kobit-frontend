<template>
  <v-container fluid>
    <BackButton :callback="back" />
    <base-page-content
      :icon="icon"
      :name="name"
      :info-text="infoText"
      :is-loading="isLoading"
    >
    <v-row v-if="isCentralAdmin">
      <v-card-text class="pb-10">
        <v-row>
          <v-col>
            <v-text-field
              id="id_faq_search"
              v-model="searchText"
              color="secondary"
              label="Faq durchsuchen"
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
            class="d-flex justify-end"
          >
            <v-btn
              color="success"
              @click="openAddDialog"
            >
              <v-icon>mdi mdi-plus</v-icon> Hinzufügen
            </v-btn>
          </v-col>
        </v-row>
        <v-row>
          <v-col>
            <TextList
              :page-type="pageType"
              :items="filteredFaqy"
            />
          </v-col>
        </v-row>
      </v-card-text>
    </v-row>
    <v-row v-else>
        <v-col cols="12">
          <v-alert dense type="info" color="secondary" class="ml-4 mr-4">
            <p>Hinweis: Nur ein*e zentrale*r Administrator*in kann diesen Bereich bearbeiten.</p>
          </v-alert>
        </v-col>
      </v-row>
    </base-page-content>
    <BackButton v-if="isCentralAdmin" :callback="back" />
    <AddDialog
      :page-type="pageType"
      :show-dialog.sync="addDialog"
      @save:show-dialog="addDialog = $event"
    />
  </v-container>
</template>

<script lang="ts">

import { computed, defineComponent, Ref, ref, watch } from "vue";
import TextList from "@/features/admin/features/the-additional/commons/TextList.vue";
import BasePageContent from "@/features/commons/base-page-content/base-page-content.vue";
import { useGetAdditionalContent } from "@/features/the-additional/common/middleware/AdditionalPageService";
import { PageType } from "@/features/the-additional/common/model/PageType";
import {
  ADMIN_FAQ_ROUTE_NAME,
  ADMIN_FAQ_ROUTE_META_ICON,
  ADMIN_FAQ_ROUTE_META_INFO_TEXT
} from "@/features/admin/features/the-additional/features/the-faq/the-faq.routes";
import BackButton from "@/features/commons/components/BackButton.vue";
import { useRouter } from "vue-router/composables";
import AddDialog from "@/features/admin/features/the-additional/commons/AddTextItemDialog.vue";
import { useGetAdminUserInfo } from "@/features/admin/components/middleware/useGetAdminUserInfoText";

export default defineComponent({
  name: "TheFaq",
  components: { TextList, BasePageContent, BackButton, AddDialog },
  setup() {
    const searchText = ref<string>("");
    const filterLetter = ref<string>("");
    const { isLoading, isError, data, error } = useGetAdditionalContent(PageType.FAQ);
    const router = useRouter();
    const addDialog = ref(false);


    const { data: adminUserInfo } = useGetAdminUserInfo();
    const isCentralAdmin: Ref<boolean | null> = ref(null);

    watch(adminUserInfo, (newValue) => {
      if (newValue) {
        isCentralAdmin.value = newValue.isCentralAdmin;
      }
    }, { immediate: true });

    function openAddDialog() {
      addDialog.value = true;
    }
    function back() {
      router.push('/admin/erfahre-mehr');
    }
    const filteredFaqy = computed(() => {
      return data.value?.textItemView?.filter((item) => {
        return (
          item.header
            .toLowerCase()
            .indexOf(searchText.value.toLowerCase()) != -1
          &&
          item.header
            .toLowerCase()
            .startsWith(filterLetter.value.toLowerCase()))
          ;
      }) ?? [];
    });

    const faqyAlphabet = computed(() => data.value?.textItemView
      ?.map((it) =>
        it.header.charAt(0).toUpperCase())
      .sort()
      .filter((it, i, self) => self.indexOf(it) == i)
      ?? []
    );

    const pageType = computed(() => PageType.FAQ);

    return {
      isLoading,
      isError,
      filteredFaqy,
      faqyAlphabet,
      filterLetter,
      searchText,
      error,
      pageType,
      addDialog,
      isCentralAdmin,
      icon: ADMIN_FAQ_ROUTE_META_ICON,
      infoText: ADMIN_FAQ_ROUTE_META_INFO_TEXT,
      name: ADMIN_FAQ_ROUTE_NAME,
      back,
      openAddDialog
    };
  }
});

</script>
<style scoped>

</style>