<template>
  <v-container>
    <v-footer
      min-height="75px"
      padless
      color="transparent"
      class="align-center justify-right"
    >
      <v-row>
        <v-col cols="12">
          <div class="d-flex align-center justify-end">
            <div>
              <PrivacyPolicy />
            </div>

            <div
              v-if="showAdminInfo()"
              class="ml-2 d-flex align-center justify-end"
            >
              <v-btn
                class="mx-2 pt-0 mt-0"
                color="secondary"
                v-bind="attrs"
                @click="openInfoDialog"
                v-on="on"
              >
                <v-icon>mdi-information-outline</v-icon> {{ infoLabels.informationTitle }}
              </v-btn>
            </div>
          </div>
        </v-col>
      </v-row>
      <UserInformationDialog
        :is-dialog-active="isInfoDialogActive"
        @closeInfoDialog="closeInfoDialog"
      />
    </v-footer>
  </v-container>
</template>

<script lang="ts">
import { ref, inject } from 'vue';
import { DOWNLOAD_DATENSCHUTZ } from '@/core/services/downloads/download-provider.service';
import PrivacyPolicy from '@/core/services/downloads/privacypolicy.vue';
import { adminInformationLabels } from '@/features/admin/i18n';
import UserInformationDialog from "@/features/admin/components/userinformation/UserInformationDialog.vue";
import { useRoute } from "vue-router/composables";

export default {
  components: { PrivacyPolicy, UserInformationDialog },

  setup() {
    const download = inject(DOWNLOAD_DATENSCHUTZ);
    const isInfoDialogActive = ref(false);
    const route = useRoute();

    function closeInfoDialog() {
      isInfoDialogActive.value = false;
    }

    function openInfoDialog() {
      isInfoDialogActive.value = true;
    }

    function showAdminInfo(): boolean {
      return /^\/admin(\/|$)/.test(route.path);
    }

    return {
      showAdminInfo,
      closeInfoDialog,
      openInfoDialog,
      isInfoDialogActive,
      infoLabels: adminInformationLabels,
      download,
    };
  },
};
</script>

<style scoped>
.v-html ::v-deep a {
  color: #333;
}


</style>