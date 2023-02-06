<template>
  <v-container>
    <v-row>
      <v-col>
        <v-card
          flat
          :style="$vuetify.breakpoint.xs || $vuetify.breakpoint.sm? 'border-top:1px solid #eee;' : ''"
        >
          <v-card-actions>
            <v-btn
              
              style="font-size: large;padding: 25px 16px;"
              :style="$vuetify.breakpoint.xs || $vuetify.breakpoint.sm? 'width:100%;' : ''"
              
              text
              :to="unterstuezungsfinder.path"
            >
              <b>zum Unterstützungsfinder</b>
            </v-btn>
          </v-card-actions>
          <v-card-text>
            <center>
              <img
                :style="$vuetify.breakpoint.xs || $vuetify.breakpoint.sm? 'max-height:30vh;' : 'max-height:50vh;'"
                style="max-width:90%;"
                src=""
              >
            </center>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts">
import {Component, Vue} from "vue-property-decorator";
import {theUnterstuetzungsfinderRoutes} from "@/features/the-unterstuetzungsfinder/the-unterstuetzungsfinder.routes";

@Component({})
export default class TheCardInitialAnlaufstellePage extends Vue {

  get unterstuezungsfinder(): unknown {
    return theUnterstuetzungsfinderRoutes;
  }
}
</script>

<style scoped>

</style>