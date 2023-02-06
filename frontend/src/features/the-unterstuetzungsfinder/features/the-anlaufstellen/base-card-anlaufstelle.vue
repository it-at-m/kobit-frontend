<template>
  <v-container fluid>
    <v-row>
      <v-col>
        <v-card
          flat
          :style="$vuetify.breakpoint.xs || $vuetify.breakpoint.sm? 'border-top:1px solid #eee;' : ''"
        >
          <v-card-title>{{ anlaufstelle.name }}</v-card-title>
          <v-card-text>
            <span v-html="anlaufstelle.description" />
            <base-fields-contact
              v-if="anlaufstelle.contact"
              :anlaufstelle="anlaufstelle"
            />
            <base-fields-additional-content
              v-if="isAdditionalContentAvailable"
              :anlaufstelle="anlaufstelle"
            />
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts">
import {Component, Prop, Vue} from "vue-property-decorator";
import Anlaufstelle from "@/features/the-unterstuetzungsfinder/features/the-anlaufstellen/types/anlaufstelle.type";
import BaseFieldsContact from "@/features/the-unterstuetzungsfinder/features/the-anlaufstellen/base-fields-contact.vue";
import BaseFieldsAdditionalContent from "@/features/the-unterstuetzungsfinder/features/the-anlaufstellen/base-fields-additional-content.vue";

@Component({
  components: {BaseFieldsAdditionalContent, BaseFieldsContact}
})
export default class BaseCardAnlaufstelle extends Vue {
  @Prop()
  id!: string;

  @Prop()
  value!: Anlaufstelle;


  get anlaufstelle(): Anlaufstelle {
    return this.value;
  }

  get isAdditionalContentAvailable(): boolean {

   if (this.anlaufstelle.links) {
     return (this.anlaufstelle.links.filter(function(o){ return o.inDownloads == true; }).length > 0 );
   } else {
     return false;
   }
  }
}
</script>

<style lang="scss" scoped>
.theme--light.v-list-item:not(.v-list-item--active):not(.v-list-item--disabled) {
  color: #00000099 !important;
  padding: 0;
}
</style>
