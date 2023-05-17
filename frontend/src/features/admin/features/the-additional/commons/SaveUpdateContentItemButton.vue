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
import { ContentItem } from "@/features/commons/types/Item";
import { UseUpdateContentItem } from "@/features/admin/features/the-additional/features/middelware/useContentItem";
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
    const { isLoading, mutateAsync } = UseUpdateContentItem();
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
      mutateAsync({ id: props.id, pageType: props.pageType, contentItem: props.contentItemToSave })
        .then(() => {
          showSuccessSnackbar();
          setTimeout(() => {
            router.go(0); // Reload the current page
          }, 1000); // Delay for 1 second
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
