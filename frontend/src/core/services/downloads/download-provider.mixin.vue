<script lang="ts">
import {Component, Provide, Vue} from "vue-property-decorator";
import {DOWNLOAD_DATENSCHUTZ, DownloadProviderService} from "@/core/services/downloads/download-provider.service";
import {allDownloads, downloadsPath} from "@/core/services/downloads/downloads";

@Component({})
export default class DownloadProvider extends Vue {
  @Provide(DOWNLOAD_DATENSCHUTZ)
  datenschutzdownload = {name: allDownloads[1].filename, path: downloadsPath} as DownloadProviderService
}
</script>