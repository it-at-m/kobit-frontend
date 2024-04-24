<template>
  <v-list>
    <v-list-item
      v-for="(item, i) in sortedItems"
      :key="i"
      two-line
      :href="item.link"
    >
      <v-list-item-content>
        <v-list-item-title><b>{{ item.header }}</b></v-list-item-title>
        <v-list-item-subtitle>
          <p class="item-entry">
            {{ item.entry }}
          </p>
        </v-list-item-subtitle>
      </v-list-item-content>
    </v-list-item>
  </v-list>
</template>

<script lang="ts">

import { defineComponent, computed } from "vue";

export default defineComponent({
  name: "TextList",
  props: {
    items: {
      //type of TextItem
      type: Array,
      default: () => []
    }
  },
  setup(props) {
    const sortedItems = computed(() => {
      return [...props.items].sort((a, b) => {
        return a.header.localeCompare(b.header, undefined, { sensitivity: 'base' });
      });
    });

    return {
      sortedItems
    };

  }
});
</script>

<style scoped>
.item-entry {
  word-wrap: break-word;
  overflow-wrap: break-word;
  white-space: pre-wrap;
  max-width: 100%;
  text-indent: 0em !important;
}
</style>