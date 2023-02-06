<template>
  <base-page-content :item="erfahreMehrModel">
    <v-container fluid>
      <v-row>
        <v-col>
          <v-row>
            <v-col
              v-for="(link, linkIndex) in links"
              :key="linkIndex"
              class="ma-0 pa-2"
              cols="12"
              sm="12"
              md="6"
              :lg="linkIndex >= 3 ? '3' : '3'"
              xl="linkIndex >= 3 ? '3' : '3'"
            >
              <a
                :href="link.path"
                style="text-decoration: none"
                :target="link.name === 'Konfliktnavigator' ? '_blank' : '_self'"
              >

                <v-card
                  class="d-flex flex-column"
                  v:id="`id_alert_${link.name}`"
                  content-class="elevation-0"
                  height="100%"
                  width="100%"
                >

                  <v-card-title class="page-titles gray--text">{{ link.name }}</v-card-title>
                  <v-card-text class="text--text ma-0 pa-0">
                    <v-container class="fill-height">
                      <v-row class="align-center">

                        <v-col cols="2">
                          <p class="secondary--text">
                            <v-icon
                              color="secondary"
                              left
                              align-center
                            >
                              {{ link.meta.icon }}
                            </v-icon>
                          </p>
                        </v-col>
                        <v-col cols="10">
                          <p class="gray--text">{{ link.meta.infoText }}</p>
                        </v-col>
                      </v-row>
                    </v-container>
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
                          <p class="secondary--text ma-0 pa-0"><i class="mdi mdi-menu-right" /></p>
                        </v-col>
                      </v-row>
                    </v-container>
                  </v-card-actions>

                </v-card>
              </a>
            </v-col>
          </v-row>
        </v-col>
      </v-row>
    </v-container>
  </base-page-content>
</template>

<script lang="ts">
import {
    Component,
    Vue
} from "vue-property-decorator";
import BaseLinkCard from "@/features/commons/base-link-card/base-link-card.vue";
import {
    conflictPreventionRoutes
} from "@/features/the-erfahre-mehr/features/the-conflict-prevention/the-conflict-prevention.routes";
import {
    downloadsRoutes
} from "@/features/the-erfahre-mehr/features/the-downloads/the-downloads.routes";
import {
    faqRoutes
} from "@/features/the-erfahre-mehr/features/the-faq/the-faq.routes";
import {
    glossarRoutes
} from "@/features/the-erfahre-mehr/features/the-glossar/the-glossar.routes";
import {
    leadershipCooperationRoutes
} from "@/features/the-erfahre-mehr/features/the-leadership-cooperation/the-leadership-cooperation.routes";
import {
    dvFairRoutes
} from "@/features/the-erfahre-mehr/features/the-dv-fair/the-dv-fair.routes";
import {
    escalationStepsRoutes
} from "@/features/the-erfahre-mehr/features/the-escalation-steps/the-escalation-steps.routes";

import {
    erfahreMehrRoutes
} from "@/features/the-erfahre-mehr/the-erfahre-mehr.routes";

import BasePageContent from "@/features/commons/base-page-content/base-page-content.vue";

@Component({
    components: {
        BaseLinkCard,
        BasePageContent
    }
})
export default class TheErfahreMehr extends Vue {
    get links(): unknown {
        return [{
                name: conflictPreventionRoutes.name,
                path: "/#" + conflictPreventionRoutes.path,
                meta: conflictPreventionRoutes.meta,
                color: conflictPreventionRoutes.color
            },
            {
                name: escalationStepsRoutes.name,
                path: "/#" + escalationStepsRoutes.path,
                meta: escalationStepsRoutes.meta,
                color: escalationStepsRoutes.color
            },
            {
                name: dvFairRoutes.name,
                path: "/#" + dvFairRoutes.path,
                meta: dvFairRoutes.meta,
                color: dvFairRoutes.color

            },
            {
                name: leadershipCooperationRoutes.name,
                path: "/#" + leadershipCooperationRoutes.path,
                meta: leadershipCooperationRoutes.meta,
                color: leadershipCooperationRoutes.color
            },
            {
                name: glossarRoutes.name,
                path: "/#" + glossarRoutes.path,
                meta: glossarRoutes.meta,
                color: glossarRoutes.color
            },
            {
                name: faqRoutes.name,
                path: "/#" + faqRoutes.path,
                meta: faqRoutes.meta,
                color: faqRoutes.color
            },

            {
                name: downloadsRoutes.name,
                path: "/#" + downloadsRoutes.path,
                meta: downloadsRoutes.meta,
                color: downloadsRoutes.color
            }

        ];
    }

    get erfahreMehrModel(): unknown {
        return erfahreMehrRoutes;
    }

}
</script>

<style scoped>
.page-titles {
    white-space: pre-wrap !important;
    text-indent: 0em !important;
    word-break: keep-all;
}

.mdi {
    font-size: 28px;
}

.mdi-menu-right {
    position: absolute;
    bottom: 0;
    right: 0;
    padding: 2px 5px;
}

.mdi-stairs {
    transform: rotateY(180deg);
}

.v-alert {
    box-shadow: none !important;
}
</style>