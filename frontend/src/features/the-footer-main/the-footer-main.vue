<template>
  <v-footer
    min-height="75px"
    padless
    color="transparent"
    class="align-center justify-center"
  >
    <v-row>
      <v-col
        cols="5"
        sm="7"
        md="8"
        lg="9"
        xl="10"
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
    </v-row>
  </v-footer>
</template>

<script lang="ts">
import {Component, Inject, Vue} from "vue-property-decorator";
import {DOWNLOAD_DATENSCHUTZ, DownloadProviderService} from "@/core/services/downloads/download-provider.service";
import PrivacyPolicy from "@/core/services/downloads/privacypolicy.vue";

@Component({
  components: {PrivacyPolicy}
})
export default class TheFooterMain extends Vue {

  @Inject(DOWNLOAD_DATENSCHUTZ)
  download!: DownloadProviderService;

}
</script>

<style scoped>
.v-html ::v-deep a{
  color:#333;
}

</style>