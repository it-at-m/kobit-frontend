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
            color="error"
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
      color="error"
      bottom
    >
      <p class="pa-0 ma-0">
        {{ snackbarMessage }} <v-icon>mdi-check</v-icon>
      </p>
    </v-snackbar>
  </v-row>
</template>

<script lang="ts">
import { defineComponent, watch, PropType, ref, computed } from "vue";
import { TextItem } from "@/features/commons/types/Item";
import { VDialog, VCard, VCardTitle, VCardText, VCardActions, VSpacer, VBtn } from "vuetify/lib";
import { UseDeleteTextItem } from "../features/middelware/useTextItem";
import { useRouter } from "vue-router/composables";
import { PageType } from "@/features/the-additional/common/model/PageType";

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
    pageType: {
      type: String as PropType<PageType>,
      default: PageType.GLOSSARY
    }
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
      mutateAsync({ id: props.currentItem.id, pageType: props.currentItem.pageType, link: props.currentItem.link,  textItem: props.currentItem })
        .then(() => {
          isSnackbarActive.value = true;
          setTimeout(() => {
            if (props.currentItem.pageType == "GLOSSARY") {
              router.push("/admin/erfahre-mehr/glossar");
            } else if (props.currentItem.pageType == "FAQ") {
              router.push("/admin/erfahre-mehr/faq");
            } else if (props.currentItem.pageType == "DOWNLOADS") {
              router.push("/admin/erfahre-mehr/downloads-und-links");
            } else {
              router.push("/admin/erfahre-mehr/");
            }
            router.go(0);
          }, 1000); // delay for 1 second
        })
        .catch(() => emit("error"));

    };

    const snackbarMessage = computed(() => {
      switch (props.pageType) {
        case PageType.GLOSSARY:
          return "Definition erfolgreich gelöscht!";
        case PageType.FAQ:
          return "FAQ erfolgreich gelöscht!";
        default:
          return "Eintrag erfolgreich gelöscht!";
      }
    });

    return {
      localShowDialog,
      isSnackbarActive,
      snackbarMessage,
      cancel,
      deleteItem,
      SNACKBAR_TIMEOUT: 3000, // in milliseconds
    };
  },
});
</script>
