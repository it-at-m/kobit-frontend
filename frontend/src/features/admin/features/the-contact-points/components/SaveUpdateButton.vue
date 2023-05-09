<template>
  <div>
    <v-btn
      color="success"
      :loading="isLoading"
      :disabled="disabled || isLoading"
      @click="save"
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
    }
  },
  setup(props, { emit }) {
    const { isLoading, mutateAsync } = useUpdateContactPoint();
    const router = useRouter();
    const showSnackbar = ref(false);

    const showSuccessSnackbar = () => {
      showSnackbar.value = true;
    };

    const save = () => {
      if (!props.contactPointToSave.contact || props.contactPointToSave.contact?.length === 0) {
        emit("error", "Mindestens ein Kontakt ist erforderlich.");
        return;
      }
      mutateAsync({ contactPoint: props.contactPointToSave, id: props.id })
        .then(() => {
          showSuccessSnackbar();
          setTimeout(() => {
            router.push("/admin/contactpoints/");
            router.go(0);
          }, 1000); // delay for 1 second
        })
        .catch((error) => {
          const statusCode = error.response?.status;
          const fallbackErrorMessage = "An unexpected error occurred";
          const customErrorMessage = error.response?.data?.message || fallbackErrorMessage;

          emit("error", customErrorMessage);

        });
    };

    return {
      isLoading,
      save,
      showSnackbar
    }
  }
});
</script>

<style scoped>

</style>
