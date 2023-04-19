<template>
  <div class="text-center">
    <v-dialog
        v-model="isDialogActive"
        max-width="590"
        class="ma-0 pa-0"
        @click:outside="$emit('closeInfoDialog')"
    >
      <LoadingSpinner v-if="isLoading"/>
      <v-card v-else>
        <v-card-title class="text-h5 grey lighten-2">
          {{ labels.informationTitle }}
        </v-card-title>
        <v-card-subtitle>
          {{ departmentText }}
        </v-card-subtitle>
        <v-card-text>
          {{ infoText }}
        </v-card-text>

        <v-divider></v-divider>

        <v-card-actions>
          <v-spacer></v-spacer>
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
import {defineComponent, ref, watch} from "vue";
import {useGetAdminUserInfo} from "@/features/admin/components/userinformation/middleware/useGetAdminUserInfo";
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
    const {isLoading, isError, data: adminRole} = useGetAdminUserInfo();
    const infoText = ref();
    const labels = adminInformationLabels;
    const departmentText =  ref();

    watch(adminRole, (newValue) => {
      if(newValue) {
        if(newValue.isCentralAdmin) {
          infoText.value = labels.centralAdmin;
        } else {
          if(newValue.isDepartmentAdmin) {
            infoText.value = labels.departmentAdmin;
          } else {
            infoText.value = labels.noAdmin;
          }
        }
        departmentText.value = labels.department + newValue.department;
      }
    })

    return {
      isLoading,
      isError,
      infoText,
      departmentText,
      labels
    }
  }
}
)</script>

<style scoped>

</style>