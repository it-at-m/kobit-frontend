<template>
  <v-card flat>
    <v-card-title>
      Downloads
    </v-card-title>
    <v-card-text>
      <v-list v-if="anlaufstelle?.links">
        <div
          v-for="(download, downloadIndex) in anlaufstelle.links"
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
import Anlaufstelle from "@/features/the-unterstuetzungsfinder/features/the-anlaufstellen/types/anlaufstelle.type";

@Component({})
export default class BaseFieldsAdditionalContent extends Vue{

  @Prop()
  anlaufstelle?: Anlaufstelle;
}
</script>

<style scoped>

</style>