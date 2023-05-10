<template>
  <BasePageContent
    :icon="icon"
    :name="name"
    :info-text="infoText"
    :is-loading="false"
  >
    <BackButton
      :callback="back"
    />
    <v-row>
      <v-col
        cols="12"
        sm="12"
        md="4"
        lg="4"
        xl="3"
      >
        <v-list
          v-if="listItems?.length > 0"
          dense
          :style="$vuetify.breakpoint.xs || $vuetify.breakpoint.sm? 'height:33vh;' : 'height:70vh;'"
          style="overflow-y: scroll"
          class="custom-scrollbar"
          order-last
          order-sm-last
          order-md-first
        >
          <v-list-item
            v-for="listItem in listItems"
            :key="listItem.id"
            three-line
            link
            @click="setSelectedItem(listItem)"
          >
            <v-list-item-content>
              <v-list-item-title>
                {{ listItem.name }}
              </v-list-item-title>
              <v-list-item-subtitle v-if="listItem.shortCut">
                {{ listItem.shortCut }}
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
        <the-card-initial-anlaufstelle-page v-if="selectedItemId === undefined" />
        <base-card-anlaufstelle v-else />
      </v-col>
    </v-row>
  </BasePageContent>
</template>

<script lang="ts">

import {defineComponent, ref, watch} from "vue";
import {ContactPointListItem} from "@/features/commons/types/ContactPoint";
import {useGetContactPointListItems} from "@/features/commons/middleware/useGetContactPoints";
import {
  THE_ANLAUFSTELLEN_ROUTE_NAME
} from "@/features/the-unterstuetzungsfinder/features/the-anlaufstellen/the-anlaufstellen.routes";
import {THE_ANGEBOTE_ROUTE_META_ICON} from "@/features/the-angebote/the-angebote.routes";
import {THE_ERFAHRE_MEHR_ROUTE_META_INFO_TEXT} from "@/features/the-erfahre-mehr/the-erfahre-mehr.routes";
import {useRoute, useRouter} from "vue-router/composables";
import TheCardInitialAnlaufstellePage
  from "@/features/the-unterstuetzungsfinder/features/the-anlaufstellen/the-card-initial-anlaufstelle-page.vue";
import BaseCardAnlaufstelle
  from "@/features/the-unterstuetzungsfinder/features/the-anlaufstellen/base-card-anlaufstelle.vue";
import BasePageContent from "@/features/commons/base-page-content/base-page-content.vue";
import BackButton from "@/features/commons/components/BackButton.vue";

export default defineComponent({
  name: "TheAnlaufstellen",
  components: {BackButton, BasePageContent, BaseCardAnlaufstelle, TheCardInitialAnlaufstellePage},
  setup() {
    const router = useRouter();
    const route = useRoute();
    const selectedItemId = ref<string>();
    const {isLoading, isError, listItems, error} = useGetContactPointListItems();

    watch(() => route.params.id, (newId) => {
      selectedItemId.value = newId
    });

    const setSelectedItem = (value: ContactPointListItem) => {
      selectedItemId.value = value.id;
      if(value?.id) {
        router.push({path: "/anlaufstellen/"+selectedItemId.value});
      }
    }

    const back = () => {
      router.push("/");
    }

    return {
      name: THE_ANLAUFSTELLEN_ROUTE_NAME,
      icon: THE_ANGEBOTE_ROUTE_META_ICON,
      infoText: THE_ERFAHRE_MEHR_ROUTE_META_INFO_TEXT,
      isLoading,
      isError,
      listItems,
      error,
      selectedItemId,
      setSelectedItem,
      back,
    }
  }
})

/*@Component({
  components: {
    BackButton,
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

  back() {
    this.$router.push('/');
  }

}*/
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
