<template>
  <div class="text-center">
    <v-dialog
      v-model="isDialogActive"
      max-width="590"
      class="ma-0 pa-0"
      @click:outside="$emit('closeInfoDialog')"
    >
      <LoadingSpinner v-if="isLoading" />
      <v-card v-else>
        <v-card-title class="text-h5 grey lighten-2">
          {{ labels.informationTitle }}
        </v-card-title>
        <v-card-subtitle class="mt-1">
          Servicebereich: {{ adminRole?.department }}
        </v-card-subtitle>
        <v-card-text>
          {{ adminRole?.infoText }}
        </v-card-text>

        <v-divider />

        <v-card-actions>
          <v-spacer />
          <v-btn
            color="secondary"
            text
            @click="$emit('closeInfoDialog')"
          >
            Schließen
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script lang="ts">
import {defineComponent} from "vue";
import {useGetAdminUserInfoText} from "@/features/admin/components/middleware/useGetAdminUserInfoText";
import LoadingSpinner from "@/features/commons/components/LoadingSpinner.vue";
import {adminInformationLabels} from "@/features/admin/i18n";

export default defineComponent({
  name: "UserInformationDialog",
      components: {LoadingSpinner},
  props: {
    isDialogActive: {
      type: Boolean
    }
  },
  setup() {
    const {isLoading, isError, data: adminRole} = useGetAdminUserInfoText();
    const labels = adminInformationLabels;

    return {
      isLoading,
      isError,
      adminRole,
      labels
    }
  }
}
)</script>

<style scoped>

</style>