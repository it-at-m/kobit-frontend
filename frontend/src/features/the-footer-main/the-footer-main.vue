<template>
  <v-footer
    min-height="75px"
    padless
    color="transparent"
    class="align-center justify-center"
  >
    <v-row>
      <v-col
        :cols="showAdminInfo() ? 4 : 5"
        :sm="showAdminInfo() ? 6 : 7"
        :md="showAdminInfo() ? 7 : 8"
        :lg="showAdminInfo() ? 8 : 9"
        :xl="showAdminInfo() ? 9 : 10"
        class="ma-0 pa-0"
      />


      <v-col
        cols="7"
        sm="5"
        md="4"
        lg="3"
        xl="2"
        class="ma-0 pa-0"
      >
        <PrivacyPolicy />
      </v-col>
      <v-col
        v-if="showAdminInfo()"
        cols="1"
        class="ma-0 pa-0"
      >
        <v-tooltip top>
          <template v-slot:activator="{ on, attrs }">
            <v-btn
              class="mx-2"
              color="secondary"
              v-bind="attrs"
              @click="openInfoDialog"
              v-on="on"
            >
              <v-icon>mdi-information-outline</v-icon>
            </v-btn>
          </template>
          <span>{{ infoLabels.informationTitle }}</span>
        </v-tooltip>
      </v-col>
    </v-row>
    <UserInformationDialog
      :is-dialog-active="isInfoDialogActive"
      @closeInfoDialog="closeInfoDialog"
    />
  </v-footer>
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