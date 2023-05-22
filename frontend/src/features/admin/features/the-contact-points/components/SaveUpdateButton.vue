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
import { defineComponent, ref } from "vue";
import { ContactPoint } from "@/features/commons/types/ContactPoint";
import { useUpdateContactPoint } from "@/features/admin/features/the-contact-points/middelware/useContactPoints";
import { useRouter } from "vue-router/composables";

export default defineComponent({
  name: "SaveUpdate",
  props: {
    contactPointToSave: {
      type: Object as () => ContactPoint
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
    const { isLoading, mutateAsync } = useUpdateContactPoint();
    const router = useRouter();
    const showSnackbar = ref(false);
    const isWriteError = ref(false);
    const errorMessage = ref('');
    const editedContactPoint = ref<ContactPoint | null>(null);

    const showSuccessSnackbar = () => {
      showSnackbar.value = true;
    };

    function saveAdd(file?: File | null) {
      if (!props.contactPointToSave?.contact || props.contactPointToSave.contact.length === 0) {
        emit("error", "Mindestens ein Kontakt ist erforderlich.");
        return;
      }
      const headers = {
        'Content-Type': 'multipart/form-data'
      };

      editedContactPoint.value = { ...props.contactPointToSave }; // Create a copy of contactPointToSave

      if (editedContactPoint.value) {
        mutateAsync({
          contactPoint: editedContactPoint.value,
          id: props.contactPointToSave.id,
          file: file ? file : undefined,
          image: editedContactPoint.value.image
        })
          .then(() => {
            showSuccessSnackbar();
            setTimeout(() => {
              router.push("/admin/anlaufstellen/" + editedContactPoint.value?.id);
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
        // handle case where editedContactPoint.value is null
        emit("error", "No contact point is available for editing.");
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
