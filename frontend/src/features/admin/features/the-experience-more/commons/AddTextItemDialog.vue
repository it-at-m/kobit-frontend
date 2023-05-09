<template>
  <v-row>
    <v-dialog
      v-model="dialog"
      max-width="1000px"
      @click:outside="closeDialog"
    >
      <ErrorHandler
        :is-error="isWriteError"
        :message="errorMessage"
        @closeError="closeError"
      />
      <v-card>
        <v-card-title>
          <span class="text-h5">Element Hinzufügen</span>
        </v-card-title>
        <v-card-text>
          <v-container>
            <v-form v-model="isFormValid">
              <v-row>
                <v-col cols="12">
                  <v-text-field
                    v-model="addedItem.header"
                    :label="headerLabel"
                    :rules="[headerRule]"
                    max-file-name-input-length="250"
                    counter
                  />
                </v-col>
              </v-row>
              <v-row>
                <v-col cols="12">
                  <v-textarea
                    v-model="addedItem.entry"
                    :label="entryLabel"
                    :rules="[entryRule]"
                    max-file-name-input-length="1500"
                    counter
                  />
                </v-col>
              </v-row>
              <v-row v-if="props.pageType === 'DOWNLOADS'">
                <v-col cols="12">
                  <v-file-input
                    v-model="file"
                    :rules="fileRules"
                    accept=".pdf,.doc,.docx,.odf"
                    placeholder="Datei auswählen"
                  >
                    <template v-slot:selection>
                      <span>{{ customFileName(file? file.name : '', maxFileNameInputLength) }}</span>
                    </template>
                  </v-file-input>
                </v-col>
              </v-row>
            </v-form>
          </v-container>
        </v-card-text>
        <v-card-actions>
          <v-spacer />
          <v-btn
            color="error"
            @click="cancelAdd"
          >
            <v-icon>mdi-cancel</v-icon> Abbruch
          </v-btn>
          <v-btn
            color="success"
            :loading="isLoading"
            :disabled="!isFormValid || isLoading"
            @click="() => saveAdd(file)"
          >
            <v-icon>mdi-content-save</v-icon> Speichern
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <v-snackbar
      v-model="isSnackbarActive"
      :timeout="SNACKBAR_TIMEOUT"
      color="success"
      bottom
    >
      <p class="pa-0 ma-0">
        {{ snackbarMessage }} <v-icon>mdi-check</v-icon>
      </p>
    </v-snackbar>
  </v-row>
</template>

<script lang="ts">
import { defineComponent, watch, PropType, computed, ref, onMounted, getCurrentInstance } from "vue";
import { TextItem } from "@/features/commons/types/Item";
import { VDialog, VCard, VCardTitle, VCardText, VCardActions, VSpacer, VBtn, VCol, VContainer, VFileInput, VForm, VIcon, VRow, VSnackbar, VTextarea, VTextField } from "vuetify/lib";
import { useCreateNewTextItem } from "../features/middelware/useTextItem";
import { useRouter } from "vue-router/composables";
import ErrorHandler from "@/features/commons/components/ErrorHandler.vue";
import { PageType } from "@/features/the-experience-more/common/model/PageType";

export default defineComponent({
  name: "AddDialog",
  components: { ErrorHandler },
  data: () => ({
    isFormValid: false
  }),
  props: {
    showDialog: {
      type: Boolean,
      default: false
    },
    currentItem: {
      type: Object as () => TextItem | null,
      default: () => null
    },
    pageType: {
      type: String as PropType<PageType>,
      default: PageType.GLOSSARY
    }

  },
  setup(props, { emit }) {
    const dialog = ref(false);
    const addedItem = ref({} as TextItem);
    const { isLoading, mutateAsync } = useCreateNewTextItem();
    const isSnackbarActive = ref(false);
    const router = useRouter();
    const isWriteError = ref(false);
    const errorMessage = ref('');
    const instance = getCurrentInstance();
    const root = instance?.proxy.$root || null;

    watch(
      () => props.showDialog,
      (val) => {
        if (val && props.currentItem) {
          addedItem.value = { ...props.currentItem };
        }
        dialog.value = val;
      }
    );

    const file = ref<File | null>(null);
    const fileRules = computed(() => [
      (value: File | null) => !!value || "Eine Datei muss ausgewählt werden.",
      (value: File | null) =>
        !!value && ["application/pdf", "application/msword", "application/vnd.openxmlformats-officedocument.wordprocessingml.document", "application/vnd.oasis.opendocument.text"].includes(value.type) ||
        "Nur PDF-, DOC-, DOCX- und ODF-Dateien sind erlaubt."
    ]);

    const headerRule = (value: string) => {
      if (!value || value.length < 3) {
        return "Die Kopfzeile muss mindestens 3 Zeichen lang sein.";
      } else if (value.length > 250) {
        return "Die Kopfzeile darf nicht länger als 250 Zeichen sein.";
      } else {
        return true;
      }
    };

    const entryRule = (value: string) => {
      if (!value || value.length < 5) {
        return "Die Definition muss mindestens 5 Zeichen lang sein.";
      } else if (value.length > 1500) {
        return "Die Definition darf nicht länger als 1500 Zeichen sein.";
      } else {
        return true;
      }
    };

    const headerLabel = computed(() => {
      switch (props.pageType) {
        case PageType.GLOSSARY:
          return "Kopfzeile";
        case PageType.FAQ:
          return "Frage";
        case PageType.DOWNLOADS:
        return "Download Name";
        default:
          return "Kopfzeile";
      }
    });

    const entryLabel = computed(() => {
      switch (props.pageType) {
        case PageType.GLOSSARY:
          return "Definition";
        case PageType.FAQ:
          return "Antwort";
          case PageType.DOWNLOADS:
        return "Download Beschreibung";
        default:
          return "Definition";
      }
    });

    const snackbarMessage = computed(() => {
      switch (props.pageType) {
        case PageType.GLOSSARY:
          return "Definition erfolgreich gespeichert!";
        case PageType.FAQ:
          return "FAQ erfolgreich gespeichert!";
        default:
          return "Eintrag erfolgreich gespeichert!";
      }
    });

    function closeDialog() {
      dialog.value = false;
      emit("update:showDialog", false);
    }

    function cancelAdd() {
      closeDialog();
    }

    const error = (message: string) => {
      errorMessage.value = message;
      isWriteError.value = true;
    };

    const closeError = () => {
      isWriteError.value = false;
    };

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

    function saveAdd(file?: File | null) {
      addedItem.value.pageType = props.pageType;

      const headers = {
        'Content-Type': 'multipart/form-data'
      };

      mutateAsync({
        pageType: addedItem.value.pageType as PageType,
        textItem: addedItem.value,
        link: addedItem.value.link,
        file: file ? file : undefined,
      })
        .then(() => {
          isSnackbarActive.value = true;
          setTimeout(() => {
            if (addedItem.value.pageType == "GLOSSARY") {
              router.push("/admin/erfahre-mehr/glossar");
            } else if (addedItem.value.pageType == "FAQ") {
              router.push("/admin/erfahre-mehr/faq");
            } else if (addedItem.value.pageType == "DOWNLOADS") {
              router.push("/admin/erfahre-mehr/downloads-und-links");
            } else {
              router.push("/admin/erfahre-mehr/");
            }
            router.go(0);
          }, 1000); // delay for 1 second

          emit("update:showDialog", false);
          emit("save", addedItem.value);
          dialog.value = false;
        })
        .catch((error) => {
          const statusCode = error.response?.status;
          const fallbackErrorMessage = "An unexpected error occurred";
          const customErrorMessage = error.response?.data?.message || fallbackErrorMessage;
          errorMessage.value = customErrorMessage;
          isWriteError.value = true;
        });
    }



    return {
      props,
      fileRules,
      file,
      dialog,
      addedItem,
      errorMessage,
      isWriteError,
      headerLabel,
      entryLabel,
      snackbarMessage,
      cancelAdd,
      saveAdd,
      headerRule,
      entryRule,
      closeDialog,
      error,
      closeError,
      maxFileNameInputLength,
      customFileName,
      isSnackbarActive,
      isLoading,
      SNACKBAR_TIMEOUT: 3000, // in milliseconds
    };
  }
});
</script>

<style scoped>

</style>
