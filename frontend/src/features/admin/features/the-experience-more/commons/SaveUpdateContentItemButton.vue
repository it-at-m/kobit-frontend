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
import { ContentItem } from "@/features/commons/types/Item";

import { useUpdateContactPoint } from "@/features/admin/features/the-contact-points/middelware/useContactPoints";
import { useUpdateContentItem } from "@/features/admin/features/the-experience-more/features/middelware/useContentItem";


import { useRouter } from "vue-router/composables";

export default defineComponent({
  name: "SaveUpdateContentItem",
  props: {
    contentItemToSave: {
      type: Object as () => ContentItem
    },
    id: {
      type: String
    },
    pageType: {
      type: String
    },
    disabled: {
      type: Boolean,
      default: false
    }
  },
  setup(props, { emit }) {
    const { isLoading, mutateAsync } = useUpdateContentItem();
    const router = useRouter();
    const showSnackbar = ref(false);

    const showSuccessSnackbar = () => {
      showSnackbar.value = true;
    };

    const save = () => {
      if (!props.contentItemToSave?.content || props.contentItemToSave.content?.length === 0) {
        emit("error", "Textbereich darf nicht leer sein.");
        return;
      }
      mutateAsync({id: props.id, pageType: props.pageType, contentItem: props.contentItemToSave })
        .then(() => {
          showSuccessSnackbar();
          setTimeout(() => {
            router.push("/admin/erfahre-mehr/");
            router.go(0);
          }, 1000); // delay for 1 second
        })
        .catch((error) => {
          const statusCode = error.response?.status;
          const fallbackErrorMessage = "An unexpected error occurred";
          const customErrorMessage = error.response?.data?.error || fallbackErrorMessage;

          emit("error", error.response?.data?.error);

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
