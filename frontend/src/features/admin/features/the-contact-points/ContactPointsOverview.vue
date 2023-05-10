<template>
  <BasePageContent
      :is-loading="false"
      :info-text="infoText"
      :name="name"
      :icon="icon"
  >
    <BackButton
        :callback="back"
    />
    <v-row>
      <v-col
          cols="12"
          sm="12"
          md="4"
          lg="4"
          xl="3"
      >
        <v-list
            v-if="!isLoading && listItems.length > 0"
            dense
            :style="$vuetify.breakpoint.xs || $vuetify.breakpoint.sm? 'height:33vh;' : 'height:70vh;'"
            style="overflow-y: scroll"
            class="custom-scrollbar"
            order-last
            order-sm-last
            order-md-first
        >
          <NewContactPointListItem
              :label="label"
              :set-is-add-new="setIsAddNew"
              :disabled="selectedItem !== undefined || isAddNew"
          />
          <v-list-item
              v-for="item in listItems"
              :key="item.id"
              three-line
              link
              :disabled="selectedItem !== undefined || isAddNew "
              @click="setSelectedItem(item)"
          >
            <v-list-item-content>
              <v-list-item-title>
                {{ item.name }}
              </v-list-item-title>
              <v-list-item-subtitle v-if="item.shortCut">
                {{ item.shortCut }}
              </v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>
        </v-list>
      </v-col>
      <v-divider
          vertical
          class="mb-3 mt-2"
      />
      <v-col
          cols="12"
          sm="12"
          md="8"
          lg="8"
          xl="9"
          order-first
          order-sm-first
          order-md-last
      >
        <NewContactPoint
            v-if="isAddNew"
            :label="label"
            @cancel="cancelNew"
        />
        <EditContactPoint
            v-if="selectedItem"
            :label="label"
            :list-item="selectedItem"
            @unselectItem="unselectItem"
        />
      </v-col>
    </v-row>
  </BasePageContent>
</template>

<script lang="ts">
import {defineComponent, ref} from "vue";
import BasePageContent from "@/features/commons/base-page-content/base-page-content.vue";
import {
  ADMIN_CONTACTPOINTS_ICON,
  ADMIN_CONTACTPOINTS_INFO_TEXT,
  ADMIN_CONTACTPOINTS_ROUTE_NAME
} from "@/features/admin/features/the-contact-points/contactPointsRoutes";
import {ContactPointListItem} from "@/features/commons/types/ContactPoint";
import {useRouter} from "vue-router/composables";
import BackButton from "@/features/commons/components/BackButton.vue";
import NewContactPointListItem from "@/features/admin/features/the-contact-points/components/NewContactPointListItem.vue";
import {adminContactPointLabels} from "@/features/admin/features/the-contact-points/i18n";
import NewContactPointView from "@/features/admin/features/the-contact-points/components/NewContactPoint.vue";
import NewContactPoint from "@/features/admin/features/the-contact-points/components/NewContactPoint.vue";
import EditContactPoint from "@/features/admin/features/the-contact-points/components/EditContactPoint.vue";
import TheCardInitialAnlaufstellePage
  from "@/features/the-unterstuetzungsfinder/features/the-anlaufstellen/the-card-initial-anlaufstelle-page.vue";
import {useGetEditableContactPoints} from "@/features/commons/middleware/useGetContactPoints";

export default defineComponent({
  name: "ContactPointsOverview",
  components: {
    TheCardInitialAnlaufstellePage,
    EditContactPoint,
    NewContactPoint, NewContactPointView, NewContactPointListItem, BackButton, BasePageContent
  },
  setup() {
    const router = useRouter();
    const {isLoading, isError, data: listItems, error} = useGetEditableContactPoints();
    const selectedItem = ref<ContactPointListItem>();
    const isAddNew = ref(false);

    const back = () => {
      return router.push("/admin");
    }

    const unselectItem = () => {
      selectedItem.value = undefined;
    }

    const setSelectedItem = (item: ContactPointListItem) => {
      selectedItem.value = item;
    }

    const setIsAddNew = () => {
      isAddNew.value = true
    }

    const cancelNew = () => {
      isAddNew.value = false;
    }

    return {
      back,
      setSelectedItem,
      setIsAddNew,
      unselectItem,
      cancelNew,
      isAddNew,
      isLoading,
      isError,
      listItems,
      error,
      selectedItem,
      icon: ADMIN_CONTACTPOINTS_ICON,
      name: ADMIN_CONTACTPOINTS_ROUTE_NAME,
      infoText: ADMIN_CONTACTPOINTS_INFO_TEXT,
      label: adminContactPointLabels
    }
  }

})
</script>

<style scoped>
::-webkit-scrollbar {
  width: 20px;
}

::-webkit-scrollbar-track {
  background-color: transparent;
}

::-webkit-scrollbar-thumb {
  background-color: #d6dee1;
  border-radius: 20px;
  border: 6px solid transparent;
  background-clip: content-box;
}

::-webkit-scrollbar-thumb:hover {
  background-color: #a8bbbf;
}
</style>