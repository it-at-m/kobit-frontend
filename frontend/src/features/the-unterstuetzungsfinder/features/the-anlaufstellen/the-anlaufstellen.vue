<template>
  <BasePageContent
      :icon="icon"
      :name="name"
      :info-text="infoText"
      :is-loading="false"
  >
    <v-row>
      <v-col
          cols="12"
          sm="12"
          md="4"
          lg="4"
          xl="3"
      >
        <v-list
            v-if="anlaufstellen.length > 0"
            dense
            :style="$vuetify.breakpoint.xs || $vuetify.breakpoint.sm? 'height:33vh;' : 'height:70vh;'"
            style="overflow-y: scroll"
            class="custom-scrollbar"
            order-last
            order-sm-last
            order-md-first
        >
          <v-list-item
              v-for="anlaufstelle in anlaufstellen"
              :key="anlaufstelle.id"
              three-line
              link
              @click="setSelectedAnlaufstelle(anlaufstelle)"
          >
            <v-list-item-content>
              <v-list-item-title>
                {{ anlaufstelle.name }}
              </v-list-item-title>
              <v-list-item-subtitle v-if="anlaufstelle.shortCut">
                {{ anlaufstelle.shortCut }}
              </v-list-item-subtitle>
              <v-list-item-subtitle v-if="anlaufstelle.department">
                {{ anlaufstelle.department }}
              </v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>
        </v-list>
      </v-col>
      <v-divider
          vertical
          class="mb-3 mt-2"
      />

      <v-col
          cols="12"
          sm="12"
          md="8"
          lg="8"
          xl="9"
          order-first
          order-sm-first
          order-md-last
      >
        <base-card-anlaufstelle
            v-if="selectedAnlaufstelle"
            :value="selectedAnlaufstelle"
        />
        <the-card-initial-anlaufstelle-page v-else/>
      </v-col>
    </v-row>
  </BasePageContent>
</template>

<script lang="ts">
import {Component, Vue} from "vue-property-decorator";
import {
  getAnlaufstellen,
  getApiState
} from "@/features/the-unterstuetzungsfinder/features/the-anlaufstellen/the-anlaufstellen-store.module";
import BasePageContent from "@/features/commons/base-page-content/base-page-content.vue";
import Anlaufstelle from "@/features/the-unterstuetzungsfinder/features/the-anlaufstellen/types/anlaufstelle.type";
import BaseCardAnlaufstelle
  from "@/features/the-unterstuetzungsfinder/features/the-anlaufstellen/base-card-anlaufstelle.vue";
import {
  theAnlaufstellenRoutes
} from "@/features/the-unterstuetzungsfinder/features/the-anlaufstellen/the-anlaufstellen.routes";
import {Loading} from "@/core/services/api/types/Loading.type";
import TheCardInitialAnlaufstellePage
  from "@/features/the-unterstuetzungsfinder/features/the-anlaufstellen/the-card-initial-anlaufstelle-page.vue";


@Component({
  components: {
    TheCardInitialAnlaufstellePage,
    BaseCardAnlaufstelle,
    BasePageContent
  }
})
export default class TheAnlaufstellen extends Vue {

  selectedAnlaufstelle: Anlaufstelle | null = null;

  get loading(): boolean {
    return this.apiState > Loading.LOADED;
  }

  get anlaufstellen(): Anlaufstelle[] {
    return this.$store.getters[getAnlaufstellen()];
  }

  get name(): string {
    return theAnlaufstellenRoutes.name;
  }

  get icon(): string {
    return theAnlaufstellenRoutes.meta.icon
  }

  get infoText(): string {
    return theAnlaufstellenRoutes.meta.infoText
  }

  get apiState(): Loading {
    return this.$store.getters[getApiState()];
  }

  setSelectedAnlaufstelle(value: Anlaufstelle): void {
    this.selectedAnlaufstelle = value;
  }

}
</script>

<style scoped>
/* custom scrollbar */
::-webkit-scrollbar {
  width: 20px;
}

::-webkit-scrollbar-track {
  background-color: transparent;
}

::-webkit-scrollbar-thumb {
  background-color: #d6dee1;
  border-radius: 20px;
  border: 6px solid transparent;
  background-clip: content-box;
}

::-webkit-scrollbar-thumb:hover {
  background-color: #a8bbbf;
}
</style>
