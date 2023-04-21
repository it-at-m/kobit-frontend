<template>
  <v-container fluid>
    <BasePageContent
      :is-loading="false"
      :info-text="infoText"
      :name="name"
      :icon="icon"
    >
      <LoadingSpinner :is-loading="isLoading" />
      <v-card
        flat
        :style="$vuetify.breakpoint.xs || $vuetify.breakpoint.sm ? 'border-top:1px solid #eee;' : ''"
        class="ma-0 pa-0"
      >
        <v-card-title class="pa-0" />
        <v-card-text>
          <div v-if="!isLoading && writableContentItem">
            <v-divider class="mt-3 mb-5" />
            <MarkDownAlert :label="label" />
            <v-row class="ma-0 pa-0">
              <v-col cols="6">
                <v-textarea
                  :value="writableContentItem.contentItemView?.[0]?.content ?? ''"
                  label="Beschreibung"
                  :rules="[v => !!v || 'Beschreibung ist erforderlich', v => (v && v.length <= 2000) || 'Die Beschreibung muss weniger als 2000 Zeichen umfassen']"
                  :counter="2000"
                  @input="changeContent"
                />
              </v-col>
              <v-col cols="6">
                <div
                  style="border-bottom: 2px solid #eee"
                  v-html="computeMarkdown"
                />
              </v-col>
            </v-row>
          </div>
        </v-card-text>
        <v-card-actions class="ma-0 pa-0">
          <!--<SaveUpdate
          :id="listItem.id"
          :contact-point-to-save="writableContactPoint"
          :disabled="!isFormValid"
          @error="error"
        />-->
          <v-btn
            class="ma-2"
            color="error"
            @click="cancelForm"
          >
            <v-icon>mdi-cancel</v-icon> Abbruch
          </v-btn>
        </v-card-actions>
      </v-card>
    </BasePageContent>
  </v-container>
</template>

<script lang="ts">
import { computed, defineComponent, ref, watch } from "vue";
import LoadingSpinner from "@/features/commons/components/LoadingSpinner.vue";
import { useGetAdditionalContent } from "@/features/the-experience-more/common/middleware/AdditionalPageService";
import { PageType } from "@/features/the-experience-more/common/model/PageType";
import {
  ADMIN_CONFLICT_PREVENTION_ROUTE_NAME,
  ADMIN_CONFLICT_PREVENTION_ROUTE_META_ICON,
  ADMIN_CONFLICT_PREVENTION_ROUTE_META_INFO_TEXT
} from "@/features/admin/features/the-experience-more/features/the-conflict-prevention/the-conflict-prevention.routes";
import { marked } from "marked";
import BasePageContent from "@/features/commons/base-page-content/base-page-content.vue";
import ContentList from "@/features/commons/components/ContentList.vue";
import { useRouter } from "vue-router/composables";
import { ItemWrapper } from "@/features/commons/types/Item";
import MarkDownAlert from "@/features/admin/features/commons/MarkDownAlert.vue";
import { I18nLabel } from "@/core/core.translation";
import {adminContentItemLabels} from "@/features/admin/features/the-experience-more/i18n";
export default defineComponent({
  name: "TheConflictPrevention",
  components: { BasePageContent, MarkDownAlert, ContentList, LoadingSpinner },
  props: {
    label: {
      type: Object as () => I18nLabel
    },
  },
  setup() {

    const { isLoading, isError, data: itemWrapper, error } = useGetAdditionalContent(PageType.PREVENTION);
    const router = useRouter();

    const writableContentItem = ref<ItemWrapper>();

    watch(itemWrapper, (newValue) => {
      if (!writableContentItem.value) {
        writableContentItem.value = newValue;
      }
    })
    const computeMarkdown = computed(() => marked.parse(writableContentItem.value?.contentItemView?.[0]?.content || ""));

    const changeContent = (value: string) => {
      if (writableContentItem.value?.contentItemView?.[0]) {
        writableContentItem.value.contentItemView[0].content = value;
      }
    };


    function back() {
      router.push('/admin/erfahre-mehr');
    }
    const cancelForm = () => {
      router.push("/admin/erfahre-mehr/");
      router.go(0);
        
    }

    return {
      label: adminContentItemLabels,
      writableContentItem,
      isLoading,
      isError,
      error,
      computeMarkdown,
      itemWrapper,
      icon: ADMIN_CONFLICT_PREVENTION_ROUTE_META_ICON,
      infoText: ADMIN_CONFLICT_PREVENTION_ROUTE_META_INFO_TEXT,
      name: ADMIN_CONFLICT_PREVENTION_ROUTE_NAME + "<span class=\"mdi mdi-pencil  ml-auto\" />",
      back,
      cancelForm,
      changeContent
    };
  }


});
</script>

<style scoped>
::-webkit-scrollbar {
  width: 20px;
}

::-webkit-scrollbar-track {
  background-color: transparent;
}

::-webkit-scrollbar-thumb {
  background-color: #d6dee1;
  border-radius: 20px;
  border: 6px solid transparent;
  background-clip: content-box;
}

::-webkit-scrollbar-thumb:hover {
  background-color: #a8bbbf;
}
</style>