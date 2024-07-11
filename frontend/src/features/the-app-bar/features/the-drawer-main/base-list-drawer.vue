<template>
  <v-list
    tile
  >
    <v-list-item
      v-for="(item, itemIndex) in listItems"
      :key="itemIndex"
      :to="item.path"
      class="black--text"
      active-class="active-tab-class"
      background-color="#f1f1f1"
    >
      <v-list-item-icon v-if="item.meta.icon">
        <v-icon color="secondary">
          {{ item.meta.icon }}
        </v-icon>
      </v-list-item-icon>
      <v-list-item-content>
        <v-list-item-title>{{ item.name }}</v-list-item-title>
      </v-list-item-content>
    </v-list-item>
  </v-list>
</template>

<script lang="ts">
import {Component, Prop, Vue} from "vue-property-decorator";
import {ListItem} from "@/features/the-app-bar/features/the-title-bar-main/list-item.type";

@Component({})
export default class BaseListDrawer extends Vue {
  @Prop()
  listItems!: ListItem[];
}
</script>

<style scoped>
.active-tab-class {
  color: black !important;
  font-weight: 500 !important;
}
</style>