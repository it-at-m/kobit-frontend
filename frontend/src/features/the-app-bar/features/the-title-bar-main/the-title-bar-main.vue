<template>
  <v-app-bar
    app
    clipped-left
  >
    <v-app-bar-nav-icon @click.stop="drawer = !drawer" />

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
        alt="Logo der Stadt München mit Link auf die offizielle Homepage">
    </a>
  </v-app-bar>
</template>

<script lang="ts">
import {
  Component,
  Vue
} from "vue-property-decorator";
import {
  drawerGetter,
  drawerMutator
} from "@/features/the-app-bar/features/the-title-bar-main/the-title-bar-main-store.module";

@Component({})
export default class TheTitleBarMain extends Vue {

  get drawer(): boolean {
    return this.$store.getters[drawerGetter()];
  }

  set drawer(value: boolean) {
    this.$store.commit(drawerMutator(), value);
  }
}
</script>

<style scoped>

</style>
