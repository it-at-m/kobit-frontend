<template>
  <v-row class="text-right justify-end">
    <v-col
      cols="12"
      class="mr-4"
    >
      <v-btn
        color="error"
        :loading="isLoading"
        :disabled="isLoading"
        @click="openDialog"
      >
        <v-icon>mdi-delete</v-icon> Löschen
      </v-btn>
      <v-dialog
        v-model="isDialogActive"
        persistent
        max-width="590"
      >
        <v-card>
          <v-card>Soll die Anlaufstelle wirklich gelöscht werden?</v-card>
          <v-card-text>
            Das Löschen der Anlaufstelle kann nicht rückgängig gemacht werden. Eine Löschung kann nur durch das
            erneute Anlegen der Anlaufstelle bereinigt werden.
          </v-card-text>
          <v-card-actions>
            <v-spacer />
            <v-btn
              color="error"
              text
              @click="isDialogActive = false"
            >
              Abbruch
            </v-btn>
            <v-btn
              color="error"
              text
              @click="deleteContactPoint"
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
          Anlaufstelle erfolgreich gelöscht! <v-icon>mdi-check</v-icon>
        </p>
      </v-snackbar>
    </v-col>
  </v-row>
</template>

<script lang="ts">
import { defineComponent, ref, PropType } from "vue";
import { useDeleteContactPoint } from "@/features/admin/features/the-contact-points/middelware/useContactPoints";
import { useRouter } from "vue-router/composables";
import { ContactPoint } from "@/features/commons/types/ContactPoint";

export default defineComponent({
  name: "DeleteButton",
  props: {
    currentItem: {
      type: Object as PropType<ContactPoint | null>,
      default: null,
    },
  },
  setup(props, { emit }) {
    const router = useRouter();
    const { isLoading, mutateAsync } = useDeleteContactPoint();
    const isDialogActive = ref(false);
    const isSnackbarActive = ref(false);

    const openDialog = () => {
      isDialogActive.value = true;
    };

    const deleteContactPoint = () => {
      if (props.currentItem) {
        emit("delete", props.currentItem);
      }
      isDialogActive.value = false;
      mutateAsync(props.currentItem)
        .then(() => {
          isSnackbarActive.value = true;
          setTimeout(() => {
            router.push("/admin/anlaufstellen/");
          }, 1000); // delay for 1 second
        })
        .catch(() => emit("error"));
    };


    return {
      isLoading,
      isDialogActive,
      isSnackbarActive,
      openDialog,
      deleteContactPoint,
      SNACKBAR_TIMEOUT: 3000, // in milliseconds
    };
  },
});
</script>

<style scoped>

</style>
