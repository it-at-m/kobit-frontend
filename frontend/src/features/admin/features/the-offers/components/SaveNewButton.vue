<template>
  <div>
    <v-btn
      class="ma-2"
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
import { defineComponent, ref } from "vue";
import { Offer } from "@/features/commons/types/Offer";
import { useCreateNewOffer } from "@/features/admin/features/the-offers/middelware/useOffers";
import { useRouter } from "vue-router/composables";

export default defineComponent({
  name: "SaveNewButton",
  props: {
    offerToSave: {
      type: Object as () => Offer
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
    const { isLoading, mutateAsync } = useCreateNewOffer();
    const router = useRouter();
    const showSnackbar = ref(false);
    const isWriteError = ref(false);
    const errorMessage = ref('');
    const showSuccessSnackbar = () => {
      showSnackbar.value = true;
    };

    function saveAdd(file?: File | null) {
      const headers = {
        'Content-Type': 'multipart/form-data'
      };

      mutateAsync({
        offer: props.offerToSave,
        file: file ? file : undefined,
        image: props.offerToSave?.imageLink
      })
        .then(() => {
          showSuccessSnackbar();
          setTimeout(() => {
            router.push("/admin/angebote/");
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
    }

    return {
      isLoading,
      saveAdd,
      showSnackbar
    };
  },
});
</script>

<style scoped>

</style>
