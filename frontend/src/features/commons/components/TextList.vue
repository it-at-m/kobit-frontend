<template>
  <v-list>
    <v-list-item
      v-for="(item, i) in items"
      :key="i"
      two-line
      :href="item.link"
    >
      <v-list-item-content>
        <v-list-item-title><b>{{ item.header }}</b></v-list-item-title>
        <v-list-item-subtitle><p>{{ item.entry }}</p></v-list-item-subtitle>
      </v-list-item-content>
    </v-list-item>
  </v-list>
</template>

<script lang="ts">

import {defineComponent} from "vue";

export default defineComponent ( {
  name: "TextList",
  props: {
    items: {
      //type of TextItem
      type: Array,
      default: () => []
    }
  }
});
</script>

<style scoped>

</style>