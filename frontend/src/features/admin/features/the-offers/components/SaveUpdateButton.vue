<template>
  <div>
    <v-btn
      color="success"
      :loading="isLoading"
      :disabled="disabled || isLoading"
      @click="() => saveAdd(file)"
    >
      <v-icon>mdi-content-save</v-icon> Speichern
    </v-btn>
    <v-snackbar
      v-model="showSnackbar"
      color="success"
      :timeout="3000"
      bottom
    >
      <p class="pa-0 ma-0">
        Erfolgreich gespeichert! <v-icon>mdi-check</v-icon>
      </p>
    </v-snackbar>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, watch } from "vue";
import { Offer } from "@/features/commons/types/Offer";
import { useUpdateOffer } from "@/features/admin/features/the-offers/middelware/useOffers";
import { useRouter } from "vue-router/composables";
import { VBtn, VIcon, VSnackbar } from "vuetify/lib";

export default defineComponent({
  name: "SaveUpdate",
  props: {
    offerToSave: {
      type: Object as () => Offer
    },
    id: {
      type: String
    },
    disabled: {
      type: Boolean,
      default: false
    },
    file: {
      type: File,
      default: null
    }
  },
  setup(props, { emit }) {
    const { isLoading, mutateAsync } = useUpdateOffer();
    const router = useRouter();
    const showSnackbar = ref(false);
    const isWriteError = ref(false);
    const errorMessage = ref('');
    const editedOffer = ref<Offer | null>(null);

    const showSuccessSnackbar = () => {
      showSnackbar.value = true;
    };

    function saveAdd(file?: File | null) {
      const headers = {
        'Content-Type': 'multipart/form-data'
      };

      if (!props.offerToSave?.imageLink || props.offerToSave.imageLink.length === 0) {
        emit("error", "Bild ist erforderlich.");
        return;
      }

      editedOffer.value = { ...props.offerToSave }; // Create a copy of offerToSave
      if (editedOffer.value) {
        mutateAsync({
          offer: editedOffer.value,
          id: props.offerToSave.id,
          file: file ? file : undefined,
          image: editedOffer.value.imageLink,
        })
          .then(() => {
            showSuccessSnackbar();
            setTimeout(() => {
              router.push("/admin/angebote/" + editedOffer.value?.id);
              router.go(0);
            }, 1000); // delay for 1 second

          })
          .catch((error) => {
            const fallbackErrorMessage = "An unexpected error occurred";
            const customErrorMessage = error.response?.data?.message || fallbackErrorMessage;
            errorMessage.value = customErrorMessage;
            isWriteError.value = true;

            // Emit the error event to the parent component
            emit("error", customErrorMessage);
          });
      } else {
        // handle case where editedOffer.value is null
        emit("error", "No offer is available for editing.");
      }
    }



    return {
      isLoading,
      saveAdd,
      showSnackbar
    }
  }

});
</script>

<style scoped>

</style>
