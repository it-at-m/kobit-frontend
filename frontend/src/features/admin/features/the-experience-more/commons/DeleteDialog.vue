<template>
  <v-row>
    <v-dialog
      v-model="localShowDialog"
      max-width="750px"
      @click:outside="cancel"
    >
      <v-card>
        <v-card-title class="text-h5">
          Soll die Definition wirklich gelöscht werden?
        </v-card-title>
        <v-card-text>
          Das Löschen der Definition kann nicht rückgängig gemacht werden. Eine Löschung kann nur
          durch das erneute Anlegen der Definition bereinigt werden.
        </v-card-text>
        <v-card-actions>
          <v-spacer />
          <v-btn
            color="error"
            @click="cancel"
          >
            <v-icon>mdi-cancel</v-icon> Abbruch
          </v-btn>
          <v-btn
            color="green darken-1 white--text"
            @click="deleteItem"
          >
            <v-icon>mdi-delete</v-icon> Löschen
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
import { UseDeleteTextItem } from "../features/middelware/useTextItem";
import { useRouter } from "vue-router/composables";

export default defineComponent({
    name: "DeleteDialog",
    props: {
        showDialog: {
            type: Boolean,
            default: false,
        },
        currentItem: {
            type: Object as PropType<TextItem | null>,
            default: null,
        },
    },
    setup(props, { emit }) {
        const localShowDialog = ref(props.showDialog);
        const { mutateAsync } = UseDeleteTextItem();
        const isSnackbarActive = ref(false);
        const router = useRouter();

        watch(
            () => props.showDialog,
            (newVal) => {
                localShowDialog.value = newVal;
            }
        );

        const cancel = () => {
            emit("update:showDialog", false);
        };

        const deleteItem = () => {
            if (props.currentItem) {
                emit("delete", props.currentItem);
            }
            emit("update:showDialog", false);
            mutateAsync({ id: props.currentItem.id, pageType: props.currentItem.pageType, textItem: props.currentItem })
                .then(() => {
                    isSnackbarActive.value = true;
                    setTimeout(() => {
                        router.push("/admin/erfahre-mehr/glossar/");
                        router.go(0);
                    }, 1000); // delay for 1 second
                })
                .catch(() => emit("error"));

        };

        return {
            localShowDialog,
            isSnackbarActive,
            cancel,
            deleteItem,
            SNACKBAR_TIMEOUT: 3000, // in milliseconds
        };
    },
});
</script>
