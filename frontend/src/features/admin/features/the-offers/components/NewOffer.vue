<template>
  <v-container fluid>
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
        Neues Angebot Anlegen <span class="mdi mdi-file-document  ml-auto" />
      </v-card-title>
      <v-card-text>
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
                :value="newOffer?.name"
                label="Name der Anlaufstelle"
                :rules="[v => !!v || 'Name ist erforderlich', v => (v && v.length >= 5 && v.length <= 100) || 'Der Name muss 5 bis 100 Zeichen lang sein.']"
                :counter="100"
                prepend-inner-icon="mdi-format-letter-case"
                @input="changeName"
              />
            </v-col>
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
                    v-model="newOffer.startDate"
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
                    v-model="newOffer.endDate"
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
                  :value="newOffer?.departments"
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
                :value="newOffer.description"
                label="Beschreibung"
                rows="12"
                :rules="[v => !!v || 'Beschreibung ist erforderlich', v => (v && v.length <= 2000) || 'Die Beschreibung muss weniger als 2000 Zeichen umfassen']"
                :counter="2000"
                prepend-inner-icon="mdi-format-align-left"
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
            <v-col cols="12">
              <v-file-input
                v-model="file"
                :rules="fileRules"
                accept=".jpg,.jpeg,.png,.JPG,.JPEG,.PNG"
                placeholder="Datei auswählen"
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
      </v-card-text>
      <v-card-actions class="ma-0 pa-0">
        <SaveNewButton
          class="ml-2"
          :offer-to-save="newOffer"
          :disabled="!isFormValid"
          :file="file || undefined"
          @error="error"
        />
        <v-btn
          class="ml-0"
          color="error"
          @click="cancelForm"
        >
          <v-icon>mdi-cancel</v-icon>
          Abbruch
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-container>
</template>

<script lang="ts">
import { computed, defineComponent, ref, watch, getCurrentInstance } from "vue";
import { I18nLabel } from "@/core/core.translation";
import ErrorHandler from "@/features/commons/components/ErrorHandler.vue";
import { useGetAdminUserInfo } from "@/features/admin/components/middleware/useGetAdminUserInfoText";
import { Offer } from "@/features/commons/types/Offer";
import MarkDownAlert from "@/features/admin/features/commons/MarkDownAlert.vue";
import { marked } from "marked";
import SaveNewButton from "@/features/admin/features/the-offers/components/SaveNewButton.vue";
import { useRouter } from "vue-router/composables";

export default defineComponent({
  name: "NewOffer",
  components: { SaveNewButton, MarkDownAlert, ErrorHandler },
  props: {
    label: {
      type: Object as () => I18nLabel
    }
  },
  data: () => ({
    isFormValid: false,
  }),
  setup() {
    const newOffer = ref<Offer>();
    const isContactDialogOpen = ref(false);
    const isLinkDialogOpen = ref(false);
    const isWriteError = ref(false);
    const errorMessage = ref('');
    const router = useRouter();
    const isCentralAdmin = ref(false);
    const { data: adminUserInfo } = useGetAdminUserInfo();

    const displayStartDate = ref('');
    const displayEndDate = ref('');

    const menuStartDate = ref(false);
    const menuEndDate = ref(false);


    const formatDateForDisplay = (date: string) => {
      const options = { day: '2-digit', month: '2-digit', year: 'numeric' };
      return new Date(date).toLocaleDateString(undefined, options);
    };
    watch(newOffer, (newValue) => {
      if (!newOffer.value) {
        newOffer.value = newValue;
        // Add these lines to update displayStartDate and displayEndDate
        if (newValue) {
          displayStartDate.value = formatDateForDisplay(newValue.startDate);
          displayEndDate.value = formatDateForDisplay(newValue.endDate);
        }
      }
    });

    const changeStartDate = (value: string) => {
      newOffer.value = { ...newOffer.value, startDate: value } as Offer;
      displayStartDate.value = formatDateForDisplay(value);
    };

    const changeEndDate = (value: string) => {
      newOffer.value = { ...newOffer.value, endDate: value } as Offer;
      displayEndDate.value = formatDateForDisplay(value);
    };

    const formatDateForPicker = (date: string) => {
      // As the date is already in "yyyy-mm-dd" format from backend, just return it
      return date;
    };

    watch(adminUserInfo, (newValue) => {
      if (newValue) {
        const department = newValue.department;
        newOffer.value = { ...newOffer.value, departments: [department] } as Offer;
        isCentralAdmin.value = newValue.isCentralAdmin;
      }
    })

    const computeMarkdown = computed(() => marked.parse(newOffer.value?.description || ""));




    const changeName = (value: string) => {
      newOffer.value = { ...newOffer.value, title: value } as Offer;
    }

    const changeDepartment = (value: string[]) => {
      newOffer.value = { ...newOffer.value, departments: value } as Offer;
    }

    const cancelForm = () => {
      router.push("/admin/angebote/");
      router.go(0);

    }

    const cancel = () => {
      isLinkDialogOpen.value = false;
      isContactDialogOpen.value = false;
    }

    const error = (message: string) => {
      errorMessage.value = message;
      isWriteError.value = true;
    }
    const closeError = () => {
      isWriteError.value = false;
    }

    const instance = getCurrentInstance();
    const root = instance?.proxy.$root || null;
    const file = ref<File | null>(null);
    const fileRules = computed(() => [
      (value: File | null) => !!value || "Ein Bild muss ausgewählt werden.",
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

    const changeDescription = () => {
      const textarea = document.querySelector('#description-textarea') as HTMLTextAreaElement;
      const value = textarea.value;
      if (newOffer.value) {
        newOffer.value = {
          ...newOffer.value,
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

      const currentValue = newOffer.value?.description || '';
      const newValue =
        currentValue.substring(0, start) + newText + currentValue.substring(end);
      newOffer.value = {
        ...newOffer.value,
        description: newValue
      } as Offer;
    };

    return {
      newOffer,
      computeMarkdown,
      isContactDialogOpen,
      isLinkDialogOpen,
      isWriteError,
      errorMessage,
      isCentralAdmin,
      file,
      fileRules,
      maxFileNameInputLength,
      applyFormatting,
      customFileName,
      changeName,
      changeStartDate,
      changeEndDate,
      displayStartDate,
      displayEndDate,
      formatDateForDisplay,
      formatDateForPicker,
      menuStartDate,
      menuEndDate,
      changeDepartment,
      changeDescription,
      cancel,
      cancelForm,
      error,
      closeError
    }
  }
}
)</script>

<style scoped>

</style>