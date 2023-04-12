<template>
  <v-card flat>
    <v-card-title>
      Downloads
    </v-card-title>
    <v-card-text>
      <v-list v-if="links">
        <div
          v-for="(download, downloadIndex) in links"
          :key="downloadIndex"
        >
          <v-list-item
            v-if="download.inDownloads === true"
            :id="`id_base_fields_additional_content_downloads_${downloadIndex}`"
            :href="download.url"
            target="_blank"
          >
            {{ download.name }}
          </v-list-item>
        </div>
      </v-list>
    </v-card-text>
  </v-card>
</template>

<script lang="ts">
import {Component, Prop, Vue} from "vue-property-decorator";
import {Link} from "@/features/commons/types/ContactPoint";

@Component({})
export default class BaseFieldsAdditionalContent extends Vue {

  @Prop()
  links?: Link[];
}
</script>

<style scoped>

</style>