<template>
  <v-navigation-drawer
    app
    clipped
    :value="drawer"
  >
    <base-list-drawer :list-items="listItems" />
  </v-navigation-drawer>
</template>

<script lang="ts">
import {Component, Vue} from "vue-property-decorator";
import BaseListDrawer from "@/features/the-app-bar/features/the-drawer-main/base-list-drawer.vue";
import {drawerGetter} from "@/features/the-app-bar/features/the-title-bar-main/the-title-bar-main-store.module";
import {ListItem} from "@/features/the-app-bar/features/the-title-bar-main/list-item.type";
import {listItemsGetter} from "@/features/the-app-bar/features/the-drawer-main/the-drawer-main-store.module";

@Component({
  components: {BaseListDrawer}
})
export default class TheDrawerMain extends Vue {
  get listItems(): ListItem[] {
    return this.$store.getters[listItemsGetter()];
  }

  get drawer(): boolean {
    return this.$store.getters[drawerGetter()];
  }
}
</script>

<style scoped>

</style>