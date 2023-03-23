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
              <b>Zum Unterstützungsfinder</b>
            </v-btn>
          </v-card-actions>
          <v-card-text>
            <div style="text-align: center;">
              <img
                :style="$vuetify.breakpoint.xs || $vuetify.breakpoint.sm? 'max-height:30vh;' : 'max-height:50vh;'"
                style="max-width:90%;"
                src="/images/hands_wide.jpg"
                alt="Man sieht jeweils einen Arm von 10 Menschen, die im Kreis stehen. Diese haben ihre Hände aufeinander gelegt."
              >
            </div>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts">
import {Vue} from "vue-property-decorator";
import {theUnterstuetzungsfinderRoutes} from "@/features/the-unterstuetzungsfinder/the-unterstuetzungsfinder.routes";

export default class TheCardInitialAnlaufstellePage extends Vue {

  get unterstuezungsfinder(): unknown {
    return theUnterstuetzungsfinderRoutes;
  }
}
</script>

<style scoped>

</style>