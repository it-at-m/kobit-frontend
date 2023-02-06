<template>
  <v-app>
    <the-app-bar />
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
import {initAnlaufstellen} from "@/features/the-unterstuetzungsfinder/features/the-anlaufstellen/the-anlaufstellen-store.module";
import {initTree} from "@/features/the-unterstuetzungsfinder/the-unterstuezungsfinder-store.module";
import {initUserMail} from "@/features/the-unterstuetzungsfinder/features/the-mail/the-mail-user-store.module";
import TheDisclaimer from "@/features/the-disclaimer/the-disclaimer.vue";

import DownloadProvider from "@/core/services/downloads/download-provider.mixin.vue";
import TheContent from "@/features/the-content/the-content.vue";


@Component({
  components: {TheContent, TheDisclaimer, TheAppBar, TheFooterMain, TheBackground},
  mixins: [DownloadProvider]
})
export default class App extends Vue{

  created(): void {
    this.$store.dispatch(initTree());
    this.$store.dispatch(initAnlaufstellen());
    this.$store.dispatch(initUserMail());
  }
}
</script>

<style>

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
