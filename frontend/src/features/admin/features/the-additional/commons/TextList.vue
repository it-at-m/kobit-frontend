<template>
  <div>
    <v-expansion-panels>
      <v-expansion-panel
        v-for="(item, i) in sortedItems"
        :key="i"
      >
        <v-expansion-panel-header style="border-bottom: solid 1px #cccccc">
          <v-list-item two-line>
            <v-list-item-content>
              <v-list-item-title class="item-header">
                <b>{{ item.header }}</b>
              </v-list-item-title>
              <v-list-item-subtitle>
                <p class="item-entry">{{ item.entry }}</p>
              </v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>
        </v-expansion-panel-header>
        <v-expansion-panel-content>
          <v-row
            v-if="item.link"
            class="pt-5"
          >
            <v-col
              cols="12"
              sm="12"
              md="12"
              lg="12"
              xl="12"
            >
              <p v-if="item.link && item.link.endsWith('.pdf')">
                <embed
                  :src="item.link + '#view=FitH'"
                  type="application/pdf"
                  width="100%"
                  height="300px"
                >
              </p>
              <p v-else-if="item.link">
                No preview available
              </p>
            </v-col>
          </v-row>
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
                color="error ml-2"
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
      :page-type="pageType"
      @update:showDialog="editDialog = $event"
    />
    <delete-dialog
      :show-dialog="deleteDialog"
      :current-item="currentItem"
      :page-type="pageType"
      @update:showDialog="deleteDialog = $event"
    />
  </div>
</template>
  
  
<script lang="ts">
import { defineComponent, ref, PropType, computed } from "vue";
import EditDialog from "@/features/admin/features/the-additional/commons/EditTextItemDialog.vue";
import DeleteDialog from "@/features/admin/features/the-additional/commons/DeleteTextItemDialog.vue";
import { TextItem } from "@/features/commons/types/Item";
import LoadingSpinner from "@/features/commons/components/LoadingSpinner.vue";
import { PageType } from "@/features/the-additional/common/model/PageType";

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
    pageType: {
      type: String as PropType<PageType>,
      default: PageType.GLOSSARY
    }
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
<style scoped>
.item-header,
.item-entry {
  word-wrap: break-word;
  overflow-wrap: break-word;
  white-space: pre-wrap;
  max-width: 100%;
}
</style>