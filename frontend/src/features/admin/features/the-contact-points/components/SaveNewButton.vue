<template>
  <div>
    <v-btn
      class="ma-2"
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
import { useCreateNewContactPoint } from "@/features/admin/features/the-contact-points/middelware/useContactPoints";
import { useRouter } from "vue-router/composables";

export default defineComponent({
  name: "SaveNewButton",
  props: {
    contactPointToSave: {
      type: Object as () => ContactPoint
    },
    disabled: {
      type: Boolean,
      default: false
    }
  },
  setup(props, { emit }) {
    const { isLoading, mutateAsync } = useCreateNewContactPoint();
    const router = useRouter();
    const showSnackbar = ref(false);

    const showSuccessSnackbar = () => {
      showSnackbar.value = true;
    };

    const save = async () => {
      if (!props.contactPointToSave.contact || props.contactPointToSave.contact.length === 0) {
        emit("error", "Mindestens ein Kontakt ist erforderlich.");
        return;
      }
      try {
        const result = await mutateAsync(props.contactPointToSave);
        showSuccessSnackbar();
          setTimeout(() => {
            router.push("/admin/contactpoints/");
            router.go(0);
          }, 1000); // delay for 1 second
      } catch (error) {
        const typedError = error as any;
        emit("error", typedError.response.data.error);
      }
    };

    return {
      isLoading,
      save,
      showSnackbar
    };
  },
});
</script>

<style scoped>

</style>
