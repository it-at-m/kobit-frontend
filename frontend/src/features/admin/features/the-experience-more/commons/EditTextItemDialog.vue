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
          <span class="text-h5">Element Bearbeiten</span>
        </v-card-title>
        <v-card-text>
          <v-container>
            <v-form v-model="isFormValid">
              <v-row>
                <v-col cols="12">
                  <v-text-field
                    v-model="editedItem.header"
                    :label="headerLabel"
                    :rules="[headerRule]"
                    maxlength="250"
                    counter
                  />
                </v-col>
              </v-row>
              <v-row>
                <v-col cols="12">
                  <v-textarea
                    v-model="editedItem.entry"
                    :label="entryLabel"
                    :rules="[entryRule]"
                    maxlength="1500"
                    counter
                  />
                </v-col>
              </v-row>
              <v-row v-if="props.pageType === 'DOWNLOADS'">
                <v-col cols="12">
                  <p>{{ editedItem.link }}</p>
                  <v-file-input
                    v-model="editedItem.link"
                    :rules="fileRules"
                    accept=".pdf,.doc,.docx,.odf"
                    placeholder="Datei auswählen"
                  />
                </v-col>
              </v-row>
            </v-form>
          </v-container>
        </v-card-text>
        <v-card-actions>
          <v-spacer />
          <v-btn
            color="error"
            @click="cancelEdit"
          >
            <v-icon>mdi-cancel</v-icon> Abbruch
          </v-btn>
          <v-btn
            color="success"
            :loading="isLoading"
            :disabled="!isFormValid || isLoading"
            @click="saveEdit"
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
import { defineComponent, watch, PropType, computed, ref } from "vue";
import { TextItem } from "@/features/commons/types/Item";
import { VDialog, VCard, VCardTitle, VCardText, VCardActions, VSpacer, VBtn } from "vuetify/lib";
import { UseUpdateTextItem } from "../features/middelware/useTextItem";
import { useRouter } from "vue-router/composables";
import ErrorHandler from "@/features/commons/components/ErrorHandler.vue";
import { PageType } from "@/features/the-experience-more/common/model/PageType";

export default defineComponent({
  name: "EditDialog",
  components: { ErrorHandler },
  data: () => ({
    isFormValid: false,
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
    const editedItem = ref({} as TextItem);
    const { isLoading, mutateAsync } = UseUpdateTextItem();
    const isSnackbarActive = ref(false);
    const router = useRouter();
    const isWriteError = ref(false);
    const errorMessage = ref('');

    watch(
      () => props.showDialog,
      (val) => {
        if (val && props.currentItem) {
          editedItem.value = { ...props.currentItem };
        }
        dialog.value = val;
      }
    );

    const file = ref<File | null>(null);
    const fileRules = computed(() => [
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
        default:
          return "Definition";
      }
    });

    const snackbarMessage = computed(() => {
      switch (props.pageType) {
        case PageType.GLOSSARY:
          return "Definition erfolgreich geändert!";
        case PageType.FAQ:
          return "FAQ erfolgreich geändert!";
        default:
          return "Eintrag erfolgreich geändert!";
      }
    });

    function closeDialog() {
      dialog.value = false;
      emit("update:showDialog", false);
    }

    function cancelEdit() {
      closeDialog();
    }

    const error = (message: string) => {
      errorMessage.value = message;
      isWriteError.value = true;
    };

    const closeError = () => {
      isWriteError.value = false;
    }


    function saveEdit() {
      mutateAsync({ id: editedItem.value.id, pageType: editedItem.value.pageType as PageType, textItem: editedItem.value, link: editedItem.value.link })
        .then(() => {
          isSnackbarActive.value = true;
          setTimeout(() => {
            if (editedItem.value.pageType == "GLOSSARY") {
              router.push("/admin/erfahre-mehr/glossar");
            } else if (editedItem.value.pageType == "FAQ") {
              router.push("/admin/erfahre-mehr/faq");
            } else if (editedItem.value.pageType == "DOWNLOADS") {
              router.push("/admin/erfahre-mehr/downloads-und-links");
            } else {
              router.push("/admin/erfahre-mehr/");
            }
            router.go(0);
          }, 1000); // delay for 1 second

          emit("update:showDialog", false);
          emit("save", editedItem.value);
          dialog.value = false;
        })
        .catch((error) => {
          const statusCode = error.response?.status;
          const fallbackErrorMessage = "An unexpected error occurred";
          const customErrorMessage = error.response?.data?.error || fallbackErrorMessage;

          errorMessage.value = customErrorMessage;
          isWriteError.value = true;
        });
    }


    return {
      props,
      fileRules,
      file,
      dialog,
      editedItem,
      errorMessage,
      isWriteError,
      headerLabel,
      entryLabel,
      cancelEdit,
      saveEdit,
      headerRule,
      entryRule,
      closeDialog,
      error,
      closeError,
      isSnackbarActive,
      isLoading,
      snackbarMessage,
      SNACKBAR_TIMEOUT: 3000, // in milliseconds
    };
  }
});
</script>

<style scoped>

</style>
