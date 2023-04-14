<template>
  <v-btn
    class="ma-2"
    color="success"
    :loading="isLoading"
    :disabled="disabled || isLoading"
    @click="save"
  >
  <v-icon>mdi-content-save</v-icon> Speichern
  </v-btn>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { ContactPoint } from "@/features/commons/types/ContactPoint";
import { useCreateNewContactPoint } from "@/features/admin/components/contactpoints/middelware/useContactPoints";
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

    const save = async () => {
      // Check if there's at least one contact in the array
      if (!props.contactPointToSave.contact || props.contactPointToSave.contact.length === 0) {
        emit("error", "Mindestens ein Kontakt ist erforderlich.");
        return;
      }
      try {
        const result = await mutateAsync(props.contactPointToSave);
        router.push("/anlaufstellen/" + result.id);
      } catch (error) {
        const typedError = error as any;
        emit("error", typedError.response.data.error);
      }
    };

    return {
      isLoading,
      save,
    };
  },
});
</script>

<style scoped>

</style>
