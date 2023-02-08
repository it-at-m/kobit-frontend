<template>
  <v-card flat>
    <v-card-title>
      Kontakt
    </v-card-title>
    <v-card-text>
      <v-list v-if="anlaufstelle?.contact">
        <v-list-item
          v-for="(contact, contactIndex) in anlaufstelle?.contact"
          :id="`id_base_fields_contact_email${contactIndex}`"
          :key="contactIndex"
          :href="`mailto:${contact.email}`"
        >
          {{ contact.email }}
        </v-list-item>
      </v-list>
      <v-list v-if="hasLinksNotDownloads">
        <div
          v-for="(link, linkIndex) in anlaufstelle?.links"
          :key="linkIndex"
        >
          <v-list-item
            v-if="link.inDownloads === false"
            :id="`id_base_fields_contact_link_${linkIndex}`"
            :href="link.url"
            target="_blank"
          >
            {{ link.name }}
          </v-list-item>
        </div>
      </v-list>
    </v-card-text>
  </v-card>
</template>

<script lang="ts">
import {Component, Prop, Vue} from "vue-property-decorator";
import Anlaufstelle from "./types/anlaufstelle.type";

@Component({})
export default class BaseFieldsContact extends Vue {

  @Prop()
  anlaufstelle?: Anlaufstelle;

  get hasLinksNotDownloads(): boolean {
    return (this.anlaufstelle?.links?.filter(function (o) {
      return o.inDownloads == false;
    })?.length > 0);
  }
}
</script>

<style scoped>

</style>