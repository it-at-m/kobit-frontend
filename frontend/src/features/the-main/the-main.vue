<template>
  <v-container>
    <v-row>
      <v-col>
        <the-random-quote-generator />
        <base-headline-main />
        <v-container>
          <v-row>
            <v-col
              cols="12"
              sm="12"
              md="12"
              lg="4"
            >
              <base-link-card :item="anlaufstellen" />
            </v-col>
            <v-col
              cols="12"
              sm="12"
              md="12"
              lg="4"
            >
              <base-link-card :item="unterstuetzungsfinder" />
            </v-col>
            <v-col
              cols="12"
              sm="12"
              md="12"
              lg="4"
            >
              <base-link-card :item="erfahreMehr" />
            </v-col>
          </v-row>
        </v-container>
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts">
import {Component, Vue} from "vue-property-decorator";
import TheRandomQuoteGenerator from "@/features/random-quote-generator/the-random-quote-generator.vue";
import BaseHeadlineMain from "@/features/the-main/components/base-headline-main.vue";
import BaseLinkCard from "@/features/commons/base-link-card/base-link-card.vue";
import {theAnlaufstellenRoutes} from "@/features/the-unterstuetzungsfinder/features/the-anlaufstellen/the-anlaufstellen.routes";
import {theUnterstuetzungsfinderRoutes} from "@/features/the-unterstuetzungsfinder/the-unterstuetzungsfinder.routes";
import {theAngeboteRoutes} from "@/features/the-angebote/the-angebote.routes";
import {erfahreMehrRoutes} from "@/features/the-erfahre-mehr/the-erfahre-mehr.routes";

@Component({
  components: {BaseLinkCard, BaseHeadlineMain, TheRandomQuoteGenerator}
})
export default class Main extends Vue {

  get anlaufstellen(): unknown {
    return theAnlaufstellenRoutes;
  }

  get unterstuetzungsfinder(): unknown {
    return theUnterstuetzungsfinderRoutes;
  }

  get angebote(): unknown {
    return theAngeboteRoutes;
  }

  get erfahreMehr(): unknown {
    return erfahreMehrRoutes;
  }
}
</script>

<style scoped>

</style>
