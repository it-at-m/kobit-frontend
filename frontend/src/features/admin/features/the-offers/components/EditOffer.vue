<template>
  <v-container fluid>
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
      <v-card-title class="pa-0">
        Angebot - Bearbeiten <span class="mdi mdi-pencil  ml-auto" />
      </v-card-title>
      <v-card-text>
        <div v-if="!isLoading && writableOffer">
          <v-form v-model="isFormValid">
            <v-row>
              <v-col
                cols="12"
                sm="12"
                md="12"
                lg="12"
                xl="12"
              >
                <v-text-field
                  :value="writableOffer.title"
                  label="Angebotname"
                  :rules="[v => !!v || 'Name ist erforderlich', v => (v && v.length >= 5 && v.length <= 100) || 'Der Name muss 5 bis 100 Zeichen lang sein.']"
                  :counter="100"
                  @input="changeName"
                />
              </v-col>
            </v-row>
            <v-row>
              <v-col
                cols="12"
                sm="12"
                md="6"
                lg="6"
                xl="6"
              >
                <v-menu
                  v-model="menuStartDate"
                  :close-on-content-click="false"
                  :nudge-right="40"
                  transition="scale-transition"
                  offset-y
                  min-width="290px"
                >
                  <template v-slot:activator="{ on, attrs }">
                    <v-text-field
                      v-model="displayStartDate"
                      label="Startdatum"
                      :rules="[v => !!v || 'Startdatum ist erforderlich']"
                      prepend-icon="mdi-calendar"
                      readonly
                      v-bind="attrs"
                      v-on="on"
                    />
                  </template>
                  <v-date-picker
                    v-model="writableOffer.startDate"
                    locale="de"
                    @input="changeStartDate"
                  />
                </v-menu>
              </v-col>
              <v-col
                cols="12"
                sm="12"
                md="6"
                lg="6"
                xl="6"
              >
                <v-menu
                  v-model="menuEndDate"
                  :close-on-content-click="false"
                  :nudge-right="40"
                  transition="scale-transition"
                  offset-y
                  min-width="290px"
                >
                  <template v-slot:activator="{ on, attrs }">
                    <v-text-field
                      v-model="displayEndDate"
                      label="Enddatum"
                      :rules="[v => !!v || 'Enddatum ist erforderlich']"
                      prepend-icon="mdi-calendar"
                      readonly
                      v-bind="attrs"
                      v-on="on"
                    />
                  </template>
                  <v-date-picker
                    v-model="writableOffer.endDate"
                    locale="de"
                    @input="changeEndDate"
                  />
                </v-menu>
              </v-col>

              <v-col
                cols="12"
                sm="12"
                md="3"
                lg="3"
                xl="3"
              >
                <v-combobox
                  :value="writableOffer.departments"
                  :label="label.addDepartment"
                  multiple
                  persistent-hint
                  small-chips
                  :disabled="!isCentralAdmin"
                  @input="changeDepartment"
                >
                  <template v-slot:no-data>
                    <v-list-item>
                      <v-list-item-content>
                        <v-list-item-title>
                          {{ label.addDepartmentHint }}
                        </v-list-item-title>
                      </v-list-item-content>
                    </v-list-item>
                  </template>
                </v-combobox>
              </v-col>
            </v-row>
            <v-divider class="mt-3 mb-5" />
            <MarkDownAlert :label="label" />
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
              <v-col cols="6">
                <v-textarea
                  id="description-textarea"
                  v-model="writableOffer.description"
                  rows="12"
                  :rules="[v => !!v || 'Beschreibung ist erforderlich', v => (v && v.length <= 2000) || 'Die Beschreibung muss weniger als 2000 Zeichen umfassen']"
                  label="Beschreibung"
                  :counter="2000"
                  @input="changeDescription"
                />
              </v-col>
              <v-col cols="6">
                <div
                  style="border-bottom: 2px solid #eee"
                  class="markdown-content"
                  v-html="computeMarkdown"
                />
              </v-col>
            </v-row>
            <v-divider class="mt-3 mb-5" />
            <v-row>
              <v-col
                cols="12"
                class="mb-0 pb-0"
              >
                <h3 class="pa-0">
                  Foto
                </h3>
              </v-col>
            </v-row>
            <v-row>
              <v-col
                lg="12"
                md="12"
                sm="12"
                cols="12"
              >
                <img
                  v-if="writableOffer.imageLink"
                  :src="writableOffer.imageLink.toString()"
                  style="max-width: 300px; max-height: 300px;"
                >

                <p v-if="writableOffer.imageLink">
                  Aktuelle Datei: <a
                    style="color:blue;"
                    target="_blank"
                    :href="writableOffer.imageLink.toString()"
                  >{{
                    writableOffer.imageLink ? getFileNameFromLink(writableOffer.imageLink.toString()) : ''
                  }}</a>
                </p>

                <v-file-input
                  v-model="file"
                  :rules="fileRules"
                  accept=".jpg,.jpeg,.png,.JPG,.JPEG,.PNG"
                  placeholder="Neue Datei auswählen und ersetzen"
                >
                  <template v-slot:selection>
                    <span>{{ customFileName(file? file.name : '', maxFileNameInputLength) }}</span>
                  </template>
                </v-file-input>
              </v-col>
            </v-row>
            <v-divider class="mt-3 mb-5" />
            <v-row>
              <v-col cols="12">
                <p>
                  Hinweis: Kompetenzen können nur über den Unterstützungsfinder eingepflegt werden.
                </p>
              </v-col>
            </v-row>
            <v-divider class="mt-3 mb-5" />
          </v-form>
        </div>
      </v-card-text>
      <v-card-actions>
        <SaveUpdate
          :id="listItem.id"
          class="ml-4"
          :offer-to-save="writableOffer"
          :disabled="!isFormValid"
          :file="file || undefined"
          @error="error($event)"
        />
        <v-btn
          class="ma-2"
          color="error"
          @click="cancelForm"
        >
          <v-icon>mdi-cancel</v-icon> Abbruch
        </v-btn>
        <DeleteButton
          :current-item="listItem"
          class=""
          @error="error"
        />
      </v-card-actions>
    </v-card>
  </v-container>
</template>

<script lang="ts">
import { computed, defineComponent, ref, watch, getCurrentInstance } from "vue";
import { I18nLabel } from "@/core/core.translation";
import { Offer, OfferListItem } from "@/features/commons/types/Offer";
import LoadingSpinner from "@/features/commons/components/LoadingSpinner.vue";
import { marked } from "marked";
import SaveUpdate from "@/features/admin/features/the-offers/components/SaveUpdateButton.vue";
import ErrorHandler from "@/features/commons/components/ErrorHandler.vue";
import { useRouter } from "vue-router/composables";
import MarkDownAlert from "@/features/admin/features/commons/MarkDownAlert.vue";
import DeleteButton from "@/features/admin/features/the-offers/components/DeleteButton.vue";
import { useGetOffer } from "@/features/commons/middleware/useGetOffers";
import { useGetAdminUserInfo } from "@/features/admin/components/middleware/useGetAdminUserInfoText";
export default defineComponent({
  name: "EditOffer",
  components: { DeleteButton, MarkDownAlert, ErrorHandler, SaveUpdate, LoadingSpinner },
  props: {
    label: {
      type: Object as () => I18nLabel
    },
    listItem: {
      type: Object as () => OfferListItem
    },
    file: {
      type: File,
      default: null
    }
  },
  data: () => ({
    isFormValid: false,
  }),
  setup(props) {
    const id = ref(props.listItem?.id);
    const { isLoading, isError: isReadError, data: Offer } = useGetOffer(id);
    const isWriteError = ref(false);
    const isLinkDialogOpen = ref(false);
    const isContactDialogOpen = ref(false);
    const router = useRouter();

    const errorMessage = ref('');
    const { data: adminUserInfo } = useGetAdminUserInfo();
    const isCentralAdmin = ref(false);

    const displayStartDate = ref('');
    const displayEndDate = ref('');

    const menuStartDate = ref(false);
    const menuEndDate = ref(false);



    const writableOffer = ref<Offer>();


    watch(adminUserInfo, (newValue) => {
      if (newValue) {
        isCentralAdmin.value = newValue.isCentralAdmin;
      }
    });


    const formatDateForDisplay = (date: string) => {
      const options = { day: '2-digit', month: '2-digit', year: 'numeric' };
      return new Date(date).toLocaleDateString(undefined, options);
    };

    watch(Offer, (newValue) => {
      if (!writableOffer.value) {
        writableOffer.value = newValue;
        // Add these lines to update displayStartDate and displayEndDate
        if (newValue) {
          displayStartDate.value = formatDateForDisplay(newValue.startDate);
          displayEndDate.value = formatDateForDisplay(newValue.endDate);
        }
      }
    });

    const changeStartDate = (value: string) => {
      writableOffer.value = { ...writableOffer.value, startDate: value } as Offer;
      displayStartDate.value = formatDateForDisplay(value);
    };

    const changeEndDate = (value: string) => {
      writableOffer.value = { ...writableOffer.value, endDate: value } as Offer;
      displayEndDate.value = formatDateForDisplay(value);
    };


    const formatDateForPicker = (date: string) => {
      // As the date is already in "yyyy-mm-dd" format from backend, just return it
      return date;
    };
    const cancelForm = () => {
      router.push("/admin/angebote/");
      router.go(0);

    }
    const cancel = () => {
      isLinkDialogOpen.value = false;
      isContactDialogOpen.value = false;
    }
    const computeMarkdown = computed(() => marked.parse(writableOffer.value?.description || ""));
    const changeName = (value: string) => writableOffer.value = {
      ...writableOffer.value,
      title: value
    } as Offer;



    const error = (message: string) => {
      errorMessage.value = message;
      isWriteError.value = true;
    };

    const changeDepartment = (value: string[]) => {
      writableOffer.value = { ...writableOffer.value, departments: value } as Offer;
    }

    const closeError = () => {
      isWriteError.value = false;
    }

    const instance = getCurrentInstance();
    const root = instance?.proxy.$root || null;
    const file = ref<File | null>(null);
    const fileRules = computed(() => [
      (value: File | null) => {
        if (!value) return true;
        const allowedTypes = ["image/jpeg", "image/jpg", "image/png"];
        return allowedTypes.includes(value.type) || "Nur JPG, JPEG und PNG-Dateien sind erlaubt.";
      }
    ]);

    const customFileName = (fileName: string, maxFileNameInputLength: number) => {
      if (!fileName) return '';
      if (fileName.length <= maxFileNameInputLength) return fileName.toUpperCase();

      const halfLength = Math.floor((maxFileNameInputLength - 3) / 2);
      return (
        fileName.slice(0, halfLength) +
        '...' +
        fileName.slice(fileName.length - halfLength)
      ).toUpperCase();
    };


    const maxFileNameInputLength = computed(() => {
      switch (root?.$vuetify.breakpoint.name) {
        case 'xs':
          return 25;
        case 'sm':
          return 40;
        case 'md':
          return 50;
        case 'lg':
          return 60;
        case 'xl':
          return 70;
        default:
          return 50;
      }
    });


    const getFileNameFromLink = (link: string) => {
      if (!link) {
        return '';
      }
      try {
        const url = new URL(link);
        return url.pathname.split('/').pop() || '';
      } catch (error) {
        console.error(`Invalid URL: ${link}`);
        return '';
      }
    }


    const changeDescription = () => {
      const textarea = document.querySelector('#description-textarea') as HTMLTextAreaElement;
      const value = textarea.value;
      if (writableOffer.value) {
        writableOffer.value = {
          ...writableOffer.value,
          description: value
        };
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

      const currentValue = writableOffer.value?.description || '';
      const newValue =
        currentValue.substring(0, start) + newText + currentValue.substring(end);
      writableOffer.value = {
        ...writableOffer.value,
        description: newValue
      } as Offer;
    };
    return {
      isLoading,
      writableOffer,
      computeMarkdown,
      isLinkDialogOpen,
      isContactDialogOpen,
      errorMessage,
      isReadError,
      isWriteError,
      isCentralAdmin,
      file,
      applyFormatting,
      customFileName,
      getFileNameFromLink,
      fileRules,
      maxFileNameInputLength,
      cancelForm,
      cancel,
      changeName,
      changeStartDate,
      changeEndDate,
      displayStartDate,
      displayEndDate,
      formatDateForDisplay,
      formatDateForPicker,
      menuStartDate,
      menuEndDate,
      changeDescription,
      changeDepartment,
      error,
      closeError,

    }
  }
})
</script>

<style scoped>

</style>