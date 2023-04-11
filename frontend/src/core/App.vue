<template>
  <v-app>
    <transition mode="out-in">
      <the-app-bar key="the-app-bar" />
    </transition>
    <the-background />
    <the-content />
    <the-disclaimer />
    <the-footer-main />
  </v-app>
</template>

<script lang="ts">

import {Component} from "vue-property-decorator";
import Vue from "vue";
import TheBackground from "@/features/the-background/the-background.vue";
import TheFooterMain from "@/features/the-footer-main/the-footer-main.vue";
import TheAppBar from "@/features/the-app-bar/the-app-bar.vue";
import {
  initAnlaufstellen
} from "@/features/the-unterstuetzungsfinder/features/the-anlaufstellen/the-anlaufstellen-store.module";
import TheDisclaimer from "@/features/the-disclaimer/the-disclaimer.vue";

import DownloadProvider from "@/core/services/downloads/download-provider.mixin.vue";
import TheContent from "@/features/the-content/the-content.vue";


@Component({
  components: {TheContent, TheDisclaimer, TheAppBar, TheFooterMain, TheBackground},
  mixins: [DownloadProvider]
})
export default class App extends Vue{

  created(): void {
    this.$store.dispatch(initAnlaufstellen());
  }
}
</script>

<style>
.v-main {
  padding-top: 64px !important; /* or whatever value you want for the padding */
}
.v-navigation-drawer {
  top: 64px !important; /* or whatever value you want for the top position */
  display: flex;
  flex-direction: column;
  height: 100% !important;
  max-height: calc(100% - 64px) !important;
}
/* Move the navigation drawer to the top on mobile devices */
@media (max-width: 1280px) {
  .v-navigation-drawer {
    top: 0 !important; /* or whatever value you want for the top position */
  display: flex;
  flex-direction: column;
  height: 100% !important;
  max-height: calc(100% - 0px) !important;
  }
 .v-main {
  padding: 128px 0px 0px 0px;
}
}
@media screen and (max-width: 960px)  {
  /* mobile scrollbar */
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
}

</style>
