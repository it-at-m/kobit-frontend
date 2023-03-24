<template>
  <v-app-bar
    app
    clipped-left
  >
    <v-app-bar-nav-icon @click.stop="changeDrawer" />
    <v-toolbar-title>
      <a
        style="color:#111;text-decoration: none;"
        href="/"
      >KoBIT. Digital. Erleben.</a>
    </v-toolbar-title>
    <v-spacer />
    <a
      href="https://www.muenchen.de"
      target="_blank"
    >
      <img
        class="float-right"
        style="width:220px !important; height:56px !important;"
        src="/images/logo-lhm.svg"
        alt="Logo der Stadt München mit Link auf die offizielle Homepage"
      >
    </a>
  </v-app-bar>
</template>

<script lang="ts">

import {defineComponent} from "vue";

export default defineComponent({
  name: "TheTitleBarMain",
  props: {
    drawer: {
      type: Boolean
    },
    changeDrawer: {
      type: Function
    }
  }
})
</script>

<style scoped>

</style>
