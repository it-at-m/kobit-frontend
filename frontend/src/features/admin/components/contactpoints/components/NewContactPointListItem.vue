<template>
  <v-list-item
    three-line
    link
    @click="setIsAddNew"
  >
    <v-list-item-icon>
      <v-icon text="Hinzufügen">
        {{ "mdi-plus" }}
      </v-icon>
    </v-list-item-icon>
    <v-list-item-content>
      <v-list-item-title>
        {{ label.addNewTitle }}
      </v-list-item-title>
      <v-list-item-subtitle>
        {{ label.addNewDescription }}
      </v-list-item-subtitle>
    </v-list-item-content>
  </v-list-item>
</template>

<script lang="ts">
import {defineComponent} from "vue";
import {I18nLabel} from "@/core/core.translation";

export default defineComponent({
  name: "NewContactPointListItem",
  props: {
    label: {
      type: Object as () => I18nLabel
    },
    setIsAddNew: {
      type: Function
    }
  }
}
)</script>

<style scoped>

</style>