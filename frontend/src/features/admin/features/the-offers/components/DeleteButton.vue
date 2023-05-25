<template>
  <v-row class="text-right justify-end">
    <v-col
      cols="12"
      class="mr-4"
    >
      <v-btn
        color="warning"
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
          <v-card>Soll das Angebote wirklich gelöscht werden?</v-card>
          <v-card-text>
            Das Löschen der Angebote kann nicht rückgängig gemacht werden. Eine Löschung kann nur durch das
            erneute Anlegen der Angebote bereinigt werden.
          </v-card-text>
          <v-card-actions>
            <v-spacer />
            <v-btn
              color="green darken-1"
              text
              @click="isDialogActive = false"
            >
              Abbruch
            </v-btn>
            <v-btn
              color="green darken-1"
              text
              @click="deleteOffer"
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
          Angebote erfolgreich gelöscht! <v-icon>mdi-check</v-icon>
        </p>
      </v-snackbar>
    </v-col>
  </v-row>
</template>

<script lang="ts">
import { defineComponent, ref, PropType } from "vue";
import { useDeleteOffer } from "@/features/admin/features/the-offers/middelware/useOffers";
import { useRouter } from "vue-router/composables";
import { Offer } from "@/features/commons/types/Offer";

export default defineComponent({
  name: "DeleteButton",
  props: {
    currentItem: {
      type: Object as PropType<Offer | null>,
      default: null,
    },
  },
  setup(props, { emit }) {
    const router = useRouter();
    const { isLoading, mutateAsync } = useDeleteOffer();
    const isDialogActive = ref(false);
    const isSnackbarActive = ref(false);

    const openDialog = () => {
      isDialogActive.value = true;
    };

    const deleteOffer = () => {
      if (props.currentItem) {
        emit("delete", props.currentItem);
      }
      isDialogActive.value = false;
      mutateAsync(props.currentItem)
        .then(() => {
          isSnackbarActive.value = true;
          setTimeout(() => {
            router.push("/admin/angebote/");
            router.go(0);
          }, 1000); // delay for 1 second
        })
        .catch(() => emit("error"));
    };


    return {
      isLoading,
      isDialogActive,
      isSnackbarActive,
      openDialog,
      deleteOffer,
      SNACKBAR_TIMEOUT: 3000, // in milliseconds
    };
  },
});
</script>

<style scoped>

</style>
