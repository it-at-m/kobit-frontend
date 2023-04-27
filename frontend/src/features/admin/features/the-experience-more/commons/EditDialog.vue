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
                    label="Header"
                    :rules="[headerRule]"
                    maxlength="200"
                    counter
                  />
                </v-col>
              </v-row>
              <v-row>
                <v-col cols="12">
                  <v-textarea
                    v-model="editedItem.entry"
                    label="Entry"
                    :rules="[entryRule]"
                    maxlength="1500"
                    counter
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
      color="green darken-1"
      bottom
    >
      <p class="pa-0 ma-0">
        Definition erfolgreich gelöscht! <v-icon>mdi-check</v-icon>
      </p>
    </v-snackbar>
  </v-row>
</template>

<script lang="ts">
import { defineComponent, watch, PropType, ref } from "vue";
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

        const headerRule = (value: string) => {
            if (!value || value.length < 5) {
                return "Die Kopfzeile muss mindestens 5 Zeichen lang sein.";
            } else if (value.length > 200) {
                return "Die Kopfzeile darf nicht länger als 200 Zeichen sein.";
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
            mutateAsync({ id: editedItem.value.id, pageType: editedItem.value.pageType as PageType, textItem: editedItem.value })
                .then(() => {
                    isSnackbarActive.value = true;
                    setTimeout(() => {
                        router.push("/admin/erfahre-mehr/glossar");
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
            dialog,
            editedItem,
            errorMessage,
            isWriteError,
            cancelEdit,
            saveEdit,
            headerRule,
            entryRule,
            closeDialog,
            error,
            closeError,
            isSnackbarActive,
            isLoading,
            SNACKBAR_TIMEOUT: 3000, // in milliseconds
        };
    }
});
</script>

<style scoped>

</style>
