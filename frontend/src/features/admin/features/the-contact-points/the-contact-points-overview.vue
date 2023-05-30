<template>
  <BasePageContent
    :is-loading="false"
    :info-text="infoText"
    :name="name"
    :icon="icon"
  >
    <BackButton :callback="back" />
    <v-row>
      <v-col
        cols="12"
        sm="12"
        md="4"
        lg="4"
        xl="3"
      >
        <v-list
          dense
          :style="$vuetify.breakpoint.xs || $vuetify.breakpoint.sm ? 'height:33vh;' : 'height:70vh;'"
          style="overflow-y: scroll"
          class="custom-scrollbar"
          order-last
          order-sm-last
          order-md-first
        >
          <v-list>
            <NewContactPointListItem
              :label="label"
              :set-is-add-new="setIsAddNew"
              :disabled="selectedItem !== undefined || isAddNew"
            />
          </v-list>
          <v-list v-if="!isLoading && listItems.length > 0">
            <v-list-item
              v-for="item in listItems"
              :key="item.id"
              three-line
              link
              :disabled="selectedItem !== undefined || isAddNew"
              :class="{ 'selected': item === selectedItem }"
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
          v-else-if="selectedItem"
          :label="label"
          :list-item="selectedItem"
          @unselectItem="unselectItem"
        />
        <p v-else>
          Klicken Sie auf eine Anlaufstelle, um sie zu bearbeiten oder fügen Sie eine neue Anlaufstelle hinzu.
        </p>
      </v-col>
    </v-row>
  </BasePageContent>
</template>
<script lang="ts">
import { defineComponent, ref, watch, onBeforeUnmount, Ref } from "vue";
import BasePageContent from "@/features/commons/base-page-content/base-page-content.vue";
import {
  ADMIN_CONTACTPOINTS_ICON,
  ADMIN_CONTACTPOINTS_INFO_TEXT,
  ADMIN_CONTACTPOINTS_ROUTE_NAME
} from "@/features/admin/features/the-contact-points/the-contact-points-routes";
import { ContactPointListItem } from "@/features/commons/types/ContactPoint";
import { useRouter, useRoute } from "vue-router/composables";
import BackButton from "@/features/commons/components/BackButton.vue";
import NewContactPointListItem from "@/features/admin/features/the-contact-points/components/NewContactPointListItem.vue";
import { adminContactPointLabels } from "@/features/admin/features/the-contact-points/i18n";
import NewContactPointView from "@/features/admin/features/the-contact-points/components/NewContactPoint.vue";
import NewContactPoint from "@/features/admin/features/the-contact-points/components/NewContactPoint.vue";
import EditContactPoint from "@/features/admin/features/the-contact-points/components/EditContactPoint.vue";
import TheCardInitialAnlaufstellePage
  from "@/features/the-unterstuetzungsfinder/features/the-contact-points/the-card-initial-the-contact-point-page.vue";
import { useGetEditableContactPoints } from "@/features/commons/middleware/useGetContactPoints";
import { useGetAdminUserInfo } from "@/features/admin/components/middleware/useGetAdminUserInfoText";
import { VRow, VCol, VList, VListItem, VListItemContent, VListItemTitle, VListItemSubtitle, VDivider, VAlert } from "vuetify/lib";

export default defineComponent({
  name: "ContactPointsOverview",
  components: {
    TheCardInitialAnlaufstellePage,
    EditContactPoint,
    NewContactPoint, NewContactPointView, NewContactPointListItem, BackButton, BasePageContent
  },
  setup() {
    const router = useRouter();
    const route = useRoute();
    const { isLoading, isError, data: listItems, error } = useGetEditableContactPoints();
    const selectedItem = ref<ContactPointListItem | undefined>();
    const isAddNew = ref(false);
    const selectedId = ref<string | undefined>(route.params.id);

    const handleIdChange = (newId: string | undefined) => {
      if (newId === "hinzufuegen") {
        selectedItem.value = undefined;
        isAddNew.value = true;
      } else if (newId !== "hinzufuegen") {
        if (newId) {
          if (listItems.value) {
            const item = listItems.value.find(item => item.id === newId);
            if (!item && !item == undefined && item == null) {
              router.push({ name: ADMIN_CONTACTPOINTS_ROUTE_NAME });
              router.go(0);
            } else {
              selectedItem.value = item;
              isAddNew.value = false;
            }
          }
        } else {
          selectedItem.value = undefined;
          isAddNew.value = false;
        }
      }
    }

    const { data: adminUserInfo } = useGetAdminUserInfo();
    const isCentralAdmin: Ref<boolean | null> = ref(null);

    watch(adminUserInfo, (newValue) => {
      if (newValue) {
        isCentralAdmin.value = newValue.isCentralAdmin;
      }
    }, { immediate: true });

    watch(isLoading, (current, previous) => {
      if (previous === true && current === false) {
        handleIdChange(route.params.id);
      }
    });

    const unwatch = watch(() => route.params.id, newId => {
      if (!isLoading.value) {
        handleIdChange(newId);
      }
    });

    onBeforeUnmount(() => {
      unwatch();
    });

    const back = () => {
      if (selectedItem.value || isAddNew.value) {
        router.push({ path: "/admin/anlaufstellen/" });
      } else {
        router.push("/admin");
      }
    }

    const unselectItem = () => {
      selectedItem.value = undefined;
      router.push({ name: ADMIN_CONTACTPOINTS_ROUTE_NAME });
    }

    const setSelectedItem = (item: ContactPointListItem) => {
      selectedItem.value = item;
      router.push({ path: "/admin/anlaufstellen/" + selectedItem.value.id });
    }

    const setIsAddNew = () => {
      isAddNew.value = true;
      router.push({ path: "/admin/anlaufstellen/hinzufuegen" });
    }


    const cancelNew = () => {
      isAddNew.value = false;
      router.push({ name: ADMIN_CONTACTPOINTS_ROUTE_NAME });
    }

    return {
      back,
      setSelectedItem,
      setIsAddNew,
      unselectItem,
      cancelNew,
      isCentralAdmin,
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

::v-deep textarea::-webkit-scrollbar {
  width: 20px;
}

::v-deep textarea::-webkit-scrollbar-track {
  background-color: transparent;
}

::v-deep textarea::-webkit-scrollbar-thumb {
  background-color: #d6dee1;
  border-radius: 20px;
  border: 6px solid transparent;
  background-clip: content-box;
}

::v-deep textarea::-webkit-scrollbar-thumb:hover {
  background-color: #a8bbbf;
}

.selected {
  background-color: #e6f0ff;
}
</style>