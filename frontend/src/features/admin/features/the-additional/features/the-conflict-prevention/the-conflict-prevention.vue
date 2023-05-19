<template>
  <v-container fluid>
    <BasePageContent
      :is-loading="false"
      :info-text="infoText"
      :name="name"
      :icon="icon"
    >
      <LoadingSpinner :is-loading="isLoading" />
      <ErrorHandler
        :is-error="isWriteError"
        :message="errorMessage"
        @closeError="closeError"
      />
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
            <v-form v-model="isFormValid">
              <v-row>
                <v-col cols="12">
                  <v-btn
                    icon
                    @click="applyFormatting('bold')"
                  >
                    <v-icon>mdi-format-bold</v-icon>
                  </v-btn>
                  <v-btn
                    icon
                    @click="applyFormatting('italic')"
                  >
                    <v-icon>mdi-format-italic</v-icon>
                  </v-btn>
                  <v-btn
                    icon
                    @click="applyFormatting('underline')"
                  >
                    <v-icon>mdi-format-underline</v-icon>
                  </v-btn>
                  <v-btn
                    icon
                    @click="applyFormatting('ordered-list')"
                  >
                    <v-icon>mdi-format-list-numbered</v-icon>
                  </v-btn>
                  <v-btn
                    icon
                    @click="applyFormatting('unordered-list')"
                  >
                    <v-icon>mdi-format-list-bulleted</v-icon>
                  </v-btn>
                  <v-btn
                    icon
                    @click="applyFormatting('line-break')"
                  >
                    <v-icon>mdi-format-line-spacing</v-icon>
                  </v-btn>
                  <v-btn
                    icon
                    @click="applyFormatting('h1')"
                  >
                    <v-icon>mdi-format-header-1</v-icon>
                  </v-btn>
                  <v-btn
                    icon
                    @click="applyFormatting('h2')"
                  >
                    <v-icon>mdi-format-header-2</v-icon>
                  </v-btn>
                  <v-btn
                    icon
                    @click="applyFormatting('h3')"
                  >
                    <v-icon>mdi-format-header-3</v-icon>
                  </v-btn>
                  <v-btn
                    icon
                    @click="applyFormatting('h4')"
                  >
                    <v-icon>mdi-format-header-4</v-icon>
                  </v-btn>
                  <v-btn
                    icon
                    @click="applyFormatting('h5')"
                  >
                    <v-icon>mdi-format-header-5</v-icon>
                  </v-btn>
                </v-col>
              </v-row>
              <v-row class="ma-0 pa-0">
                <v-col
                  cols="12"
                  sm="12"
                  md="12"
                  lg="6"
                  xl="6"
                >
                  <v-textarea
                    id="description-textarea"
                    class="custom-textarea"
                    :value="writableContentItem.contentItemView?.[0]?.content ?? ''"
                    label="Beschreibung"
                    rows="20"
                    :rules="[v => !!v || 'Beschreibung ist erforderlich', v => (v && v.length <= 5000) || 'Die Beschreibung muss weniger als 5000 Zeichen umfassen']"
                    :counter="5000"
                    @input="changeContent"
                  />
                </v-col>
                <v-col
                  cols="12"
                  sm="12"
                  md="12"
                  lg="6"
                  xl="6"
                >
                  <div
                    style="border-bottom: 2px solid #eee"
                    class="markdown-content"
                    v-html="computeMarkdown"
                  />
                </v-col>
              </v-row>
            </v-form>
          </div>
        </v-card-text>
        <v-card-actions>
          <SaveUpdateContentItem
            :id="writableContentItem?.contentItemView[0].id"
            :page-type="writableContentItem?.contentItemView[0].pageType"
            :content-item-to-save="writableContentItem?.contentItemView[0]"
            :disabled="!isFormValid"
            class="ml-2"
            @error="error"
          />
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
import { useGetAdditionalContent } from "@/features/the-additional/common/middleware/AdditionalPageService";
import { PageType } from "@/features/the-additional/common/model/PageType";
import {
  ADMIN_CONFLICT_PREVENTION_ROUTE_NAME,
  ADMIN_CONFLICT_PREVENTION_ROUTE_META_ICON,
  ADMIN_CONFLICT_PREVENTION_ROUTE_META_INFO_TEXT
} from "@/features/admin/features/the-additional/features/the-conflict-prevention/the-conflict-prevention.routes";
import { marked } from "marked";
import BasePageContent from "@/features/commons/base-page-content/base-page-content.vue";
import ContentList from "@/features/commons/components/ContentList.vue";
import { useRouter } from "vue-router/composables";
import { ItemWrapper } from "@/features/commons/types/Item";
import MarkDownAlert from "@/features/admin/features/commons/MarkDownAlert.vue";
import { I18nLabel } from "@/core/core.translation";
import { adminContentItemLabels } from "@/features/admin/features/the-additional/i18n";
import SaveUpdateContentItem from "@/features/admin/features/the-additional/commons/SaveUpdateContentItemButton.vue";
import ErrorHandler from "@/features/commons/components/ErrorHandler.vue";

export default defineComponent({
  name: "TheConflictPrevention",
  components: { BasePageContent, MarkDownAlert, ContentList, LoadingSpinner, ErrorHandler, SaveUpdateContentItem },
  props: {
    label: {
      type: Object as () => I18nLabel
    },
  },
  data: () => ({
    isFormValid: false,
  }),
  setup() {

    const errorMessage = ref('');
    const isWriteError = ref(false);
    const { isLoading, isError, data: itemWrapper, isError: isReadError, } = useGetAdditionalContent(PageType.PREVENTION);
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

    const applyFormatting = (format: string) => {
      const textarea = document.querySelector('#description-textarea') as HTMLTextAreaElement | null;
      if (!textarea) return;

      const start = textarea.selectionStart;
      const end = textarea.selectionEnd;
      const selectedText = textarea.value.substring(start, end);

      let newText = '';
      switch (format) {
        case 'bold':
          newText = `<b>${selectedText}</b>`;
          break;
        case 'italic':
          newText = `<i>${selectedText}</i>`;
          break;
        case 'underline':
          newText = `<u>${selectedText}</u>`;
          break;
        case 'ordered-list':
          newText = `\n<ol>\n<li>${selectedText}</li>\n<li></li>\n<li></li>\n</ol>\n`;
          break;
        case 'unordered-list':
          newText = `\n<ul>\n<li>${selectedText}</li>\n<li></li>\n<li></li>\n</ul>\n`;
          break;
        case 'line-break':
          newText = '<br />';
          break;
        case 'h1':
          newText = `<h1>${selectedText}</h1>`;
          break;
        case 'h2':
          newText = `<h2>${selectedText}</h2>`;
          break;
        case 'h3':
          newText = `<h3>${selectedText}</h3>`;
          break;
        case 'h4':
          newText = `<h4>${selectedText}</h4>`;
          break;
        case 'h5':
          newText = `<h5>${selectedText}</h5>`;
          break;
        default:
          newText = selectedText;
          break;
      }

      if (writableContentItem.value?.contentItemView?.[0]) {
        const currentValue = writableContentItem.value?.contentItemView[0].content || '';
        const newValue =
          currentValue.substring(0, start) + newText + currentValue.substring(end);

        writableContentItem.value.contentItemView[0].content = newValue;
      }
    };

    function back() {
      router.push('/admin/erfahre-mehr');
    }
    const cancelForm = () => {
      router.push("/admin/erfahre-mehr/");
      router.go(0);

    }
    const error = (message: string) => {
      errorMessage.value = message;
      isWriteError.value = true;
    };

    const closeError = () => {
      isWriteError.value = false;
    }


    return {
      label: adminContentItemLabels,
      writableContentItem,
      isLoading,
      isError,
      errorMessage,
      isReadError,
      isWriteError,
      computeMarkdown,
      itemWrapper,
      icon: ADMIN_CONFLICT_PREVENTION_ROUTE_META_ICON,
      infoText: ADMIN_CONFLICT_PREVENTION_ROUTE_META_INFO_TEXT,
      name: ADMIN_CONFLICT_PREVENTION_ROUTE_NAME,
      back,
      cancelForm,
      error,
      closeError,
      changeContent,
      applyFormatting
    };
  }


});
</script>

<style scoped>
::v-deep textarea::-webkit-scrollbar {
  width: 20px;
}

::v-deep textarea::-webkit-scrollbar-track {
  background-color: transparent;
}

::v-deep textarea::-webkit-scrollbar-thumb {
  background-color: #d6dee1;
  border-radius: 20px;
  border: 6px solid transparent;
  background-clip: content-box;
}

::v-deep textarea::-webkit-scrollbar-thumb:hover {
  background-color: #a8bbbf;
}
</style>