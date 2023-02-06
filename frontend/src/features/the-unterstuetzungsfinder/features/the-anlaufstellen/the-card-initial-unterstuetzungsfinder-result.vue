<template>
  <v-container>
    <v-row>
      <v-col>
        <v-card
          flat
          :style="$vuetify.breakpoint.xs || $vuetify.breakpoint.sm? 'border-top:1px solid #eee;' : ''"
        >
          <v-card-text>
            Hier finden Sie passende Anlaufstellen für Ihr Anliegen. Wenn Sie auf eine Anlaufstelle klicken, finden Sie eine kurze Übersicht über deren Aufgaben, deren Kontaktdaten und Link.
          </v-card-text>
          <v-card-actions />
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts">
import {Component, Vue} from "vue-property-decorator";
import {theUnterstuetzungsfinderRoutes} from "@/features/the-unterstuetzungsfinder/the-unterstuetzungsfinder.routes";

@Component({})
export default class TheCardInitialUnterstuetzungsfinderResult extends Vue {

  get unterstuezungsfinder(): unknown {
    return theUnterstuetzungsfinderRoutes;
  }
}
</script>

<style scoped>

</style>