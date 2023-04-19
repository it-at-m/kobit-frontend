<template>
  <BasePageContent
    :is-loading="false"
    :info-text="infoText"
    :name="name"
    :icon="icon"
  >
    <v-container fluid>
      <BackButton
        :text="'Zurück'"
        :callback="back"
      />
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
              :lg="linkIndex >= 4 ? '4' : '4'"
              :xl="linkIndex >= 4 ? '4' : '4'"
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
  </BasePageContent>
</template>
  
  <script lang="ts">
import { defineComponent, ref } from "vue";
import BasePageContent from "@/features/commons/base-page-content/base-page-content.vue";
import { useRouter } from "vue-router/composables";
import BackButton from "@/features/commons/components/BackButton.vue";
import BaseLinkCard from "@/features/commons/base-link-card/base-link-card.vue";
import {
  ADMIN_EXPERIENCEMORE_ICON,
  ADMIN_EXPERIENCEMORE_INFO_TEXT,
  ADMIN_EXPERIENCEMORE_ROUTE_NAME
} from "@/features/admin/features/the-experience-more/experienceMoreRoutes";

import {
    adminConflictPreventionRoutes
  } from "@/features/admin/features/the-experience-more/features/the-conflict-prevention/the-conflict-prevention.routes";
  import {
    adminDownloadsRoutes
  } from "@/features/admin/features/the-experience-more/features/the-downloads/the-downloads.routes";
  import {
    adminFaqRoutes
  } from "@/features/admin/features/the-experience-more/features/the-faq/the-faq.routes";
  import {
    adminGlossarRoutes
  } from "@/features/admin/features/the-experience-more/features/the-glossar/the-glossar.routes";
  import {
    adminLeadershipCooperationRoutes
  } from "@/features/admin/features/the-experience-more/features/the-leadership-cooperation/the-leadership-cooperation.routes";

export default defineComponent({
  name: "ExperienceMoreOverview",
  components: {
    BackButton,
    BaseLinkCard,
    BasePageContent
  },
  setup() {
    const router = useRouter();
    const back = () => {
      return router.push("/admin");
    }

    const links =  [{
        name: adminConflictPreventionRoutes.name,
        path: "/#" + adminConflictPreventionRoutes.path,
        meta: adminConflictPreventionRoutes.meta,
        color: adminConflictPreventionRoutes.color
      },
        {
          name: adminLeadershipCooperationRoutes.name,
          path: "/#" + adminLeadershipCooperationRoutes.path,
          meta: adminLeadershipCooperationRoutes.meta,
          color: adminLeadershipCooperationRoutes.color
        },
        {
          name: adminGlossarRoutes.name,
          path: "/#" + adminGlossarRoutes.path,
          meta: adminGlossarRoutes.meta,
          color: adminGlossarRoutes.color
        },
        {
          name: adminFaqRoutes.name,
          path: "/#" + adminFaqRoutes.path,
          meta: adminFaqRoutes.meta,
          color: adminFaqRoutes.color
        },
  
        {
          name: adminDownloadsRoutes.name,
          path: "/#" + adminDownloadsRoutes.path,
          meta: adminDownloadsRoutes.meta,
          color: adminDownloadsRoutes.color
        }
  
      ];

    return {
      back,
      links,
      icon: ADMIN_EXPERIENCEMORE_ICON,
      name: ADMIN_EXPERIENCEMORE_ROUTE_NAME,
      infoText: ADMIN_EXPERIENCEMORE_INFO_TEXT
    };
  },
});
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
  
  </style>
  