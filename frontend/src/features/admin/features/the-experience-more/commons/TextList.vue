<template>
  <div>
    <v-expansion-panels>
      <v-expansion-panel
        v-for="(item, i) in sortedItems"
        :key="i"
      >
        <v-expansion-panel-header style="border-bottom: solid 1px #cccccc">
          <v-list-item
            two-line
            :href="item.link"
          >
            <v-list-item-content>
              <v-list-item-title class="item-header">
                <b>{{ item.header }}</b>
              </v-list-item-title>
              <v-list-item-subtitle>
                <p class="item-entry">
                  {{ item.entry }}
                </p>
              </v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>
        </v-expansion-panel-header>
        <v-expansion-panel-content>
          <v-row class="pt-5">
            <v-col
              cols="12"
              sm="12"
              md="12"
              lg="12"
              xl="12"
            >
              <v-btn
                color="success"
                @click="openEditDialog(item)"
              >
                <v-icon>mdi-pencil</v-icon> Bearbeiten
              </v-btn>
              <v-btn
                color="green darken-1 ml-2 white--text"
                @click="openDeleteDialog(item)"
              >
                <v-icon>mdi-delete</v-icon> Löschen
              </v-btn>
            </v-col>
          </v-row>
        </v-expansion-panel-content>
      </v-expansion-panel>
    </v-expansion-panels>
  
    <edit-dialog
      :show-dialog="editDialog"
      :current-item="currentItem"
      @update:showDialog="editDialog = $event"
    />
    <delete-dialog
      :show-dialog="deleteDialog"
      :current-item="currentItem"
      @update:showDialog="deleteDialog = $event"
    />
  </div>
</template>
  
  
<script lang="ts">
import { defineComponent, ref, computed } from "vue";
import EditDialog from "@/features/admin/features/the-experience-more/commons/EditDialog.vue";
import DeleteDialog from "@/features/admin/features/the-experience-more/commons/DeleteDialog.vue";
import { TextItem } from "@/features/commons/types/Item";
import LoadingSpinner from "@/features/commons/components/LoadingSpinner.vue";

export default defineComponent({
    name: "TextList",
    components: {
        LoadingSpinner,
        EditDialog,
        DeleteDialog,
    },
    props: {
        items: {
            type: Array,
            default: () => [],
        },
    },
    setup(props) {
        const editDialog = ref(false);
        const deleteDialog = ref(false);
        const currentItem = ref<TextItem | null>(null);

        function openEditDialog(item: TextItem) {
            currentItem.value = item;
            editDialog.value = true;
        }

        function openDeleteDialog(item: TextItem) {
            currentItem.value = item;
            deleteDialog.value = true;
        }

        const sortedItems = computed(() => {
          return [...props.items].sort((a, b) => {
            return a.header.localeCompare(b.header, undefined, { sensitivity: 'base' });
          });
        });

        return {
            editDialog,
            deleteDialog,
            currentItem,
            openEditDialog,
            openDeleteDialog,
            sortedItems
        };
    },
});
</script>
