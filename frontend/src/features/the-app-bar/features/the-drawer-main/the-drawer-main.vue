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
import {Component, Prop, Vue} from "vue-property-decorator";
import BaseListDrawer from "@/features/the-app-bar/features/the-drawer-main/base-list-drawer.vue";
import {ListItem} from "@/features/the-app-bar/features/the-title-bar-main/list-item.type";
import {listItemsGetter} from "@/features/the-app-bar/features/the-drawer-main/the-drawer-main-store.module";

@Component({
  components: {BaseListDrawer}
})
export default class TheDrawerMain extends Vue {
  @Prop()
  isAdmin?: boolean

  @Prop()
  drawer!: boolean

  get listItems(): ListItem[] {
    const items = this.$store.getters[listItemsGetter()];
    if(this.isAdmin != undefined && this.isAdmin) {
      return items;
    }else {
      return items.filter((it: { name: string }) => it.name != "Admin")
    }
  }
}
</script>

<style scoped>

</style>