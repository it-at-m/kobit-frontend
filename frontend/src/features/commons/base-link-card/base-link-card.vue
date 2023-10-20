<template>
  <v-hover
    v-slot="{ hover }"
    color="secondary"
  >
    <router-link
      :to="item.path"
      class="text-decoration-none"
    >
      <v-card
        height="100%"
        width="100%"
      >
        <v-responsive
          aspect-ratio="2"
          height="100%"
        >
          <v-alert
            :id="`id_alert_${item.name}`"
            tile
            :elevation="hover ? 12 : 3"
            class="pa-3"
            shape
            height="100%"
            :icon="item.meta.icon"
            border="left"
            colored-border
            color="secondary"
            link
          >
            <v-card-title class="title">
              {{ item.name }}
            </v-card-title>
            <v-card-text class="text--text">
              {{ item.meta.infoText }}
            </v-card-text>
            <v-spacer />
            <v-card-actions
              height="100%"
              class="text--text ma-0 pa-0 fill-height"
            >
              <v-container class="fill-height">
                <v-row class="justify-end align-end ma-0 pa-0 fill-height">
                  <v-col
                    cols="12"
                    class="ma-0 pa-0 text-right text-bottom fill-height"
                  >
                    <p class="secondary--text ma-0 pa-0">
                      <i class="mdi mdi-menu-right" />
                    </p>
                  </v-col>
                </v-row>
              </v-container>
            </v-card-actions>
          </v-alert>
        </v-responsive>
      </v-card>
    </router-link>
  </v-hover>
</template>

<script lang="ts">
import {
    Component,
    Prop,
    Vue
} from "vue-property-decorator";

@Component({})
export default class BaseLinkCard extends Vue {

    @Prop({
        default: () => {
            return {
                meta: {
                    icon: "mdi-plus",
                    infoText: "Lorem ipsum dolor sit amet, consectetur adipisicing elit.",
                },
                name: "Barfoo",
                path: "/"
            };
        }
    })
    item!: unknown;

}
</script>

<style scoped>


.mdi-menu-right {
    position: absolute;
    bottom: 0;
    right: 0;
    padding: 2px 5px;
    font-size: 28px;
}
.title{
  white-space: pre-wrap !important;
  text-indent: 0em !important;
  word-break: keep-all;
  line-height: normal;
}
</style>
