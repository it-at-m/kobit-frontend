<template>
  <v-card-text>
    <v-row>
      <v-col>
        <v-list>
          <div
            v-for="(item, i) in items"
            :key="i"
          >
            <v-list-item>
              <v-list-item-content>
                <v-list-item-title>
                  <p
                    class="v-html"
                    v-html="item.content"
                  />
                </v-list-item-title>
              </v-list-item-content>
            </v-list-item>
          </div>
        </v-list>
      </v-col>
    </v-row>
  </v-card-text>
</template>

<script lang="ts">

import {defineComponent} from "vue";

export default defineComponent({
  name: "ContentList",
  props: {
    items: {
      //type of ContentItem
      type: Array,
      default: () => []
    }
  }
});
</script>

<style scoped>
/* For catching the line breaks in the data */
p {
  white-space: pre-wrap;
  text-indent: 0em !important;
}

.v-html ::v-deep hr {
  height: 1px;
  color: #eeeeee;
  background-color: #eeeeee;
  border: none;
}

.v-html ::v-deep a {
  color: #1b98d5;
}

</style>