<template>
  <BasePageContent
    :is-loading="false"
    :info-text="infoText"
    :name="name"
    :icon="icon"
  >
    <BackButton :callback="back" />
    <v-row v-if="isCentralAdmin">
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
            <NewOfferListItem
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
                  {{ item.title }}
                </v-list-item-title>
                <v-list-item-subtitle v-if="item.startDate && item.endDate">
                  {{ item.startDate }} - {{ item.endDate }}
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
        <NewOffer
          v-if="isAddNew"
          :label="label"
          @cancel="cancelNew"
        />
        <EditOffer
          v-else-if="selectedItem"
          :label="label"
          :list-item="selectedItem"
          @unselectItem="unselectItem"
        />
        <p v-else>
          Klicken Sie auf ein Angebot, um es zu bearbeiten oder fügen Sie eine neues Angebot hinzu.
        </p>
      </v-col>
    </v-row>
    <v-row v-else>
      <v-col cols="12">
        <v-alert
          dense
          type="info"
          color="secondary"
          class="ml-4 mr-4"
        >
          <p>Hinweis: Nur ein*e zentrale*r Administrator*in kann diesen Bereich bearbeiten.</p>
        </v-alert>
      </v-col>
    </v-row>
  </BasePageContent>
</template>
<script lang="ts">
import { defineComponent, ref, watch, onBeforeUnmount } from "vue";
import BasePageContent from "@/features/commons/base-page-content/base-page-content.vue";

import {
  ADMIN_OFFERS_ICON,
  ADMIN_OFFERS_INFO_TEXT,
  ADMIN_OFFERS_ROUTE_NAME
} from "@/features/admin/features/the-offers/the-offers.routes";

import { OfferListItem } from "@/features/commons/types/Offer";
import { useRouter, useRoute } from "vue-router/composables";
import BackButton from "@/features/commons/components/BackButton.vue";
import NewOfferListItem from "@/features/admin/features/the-offers/components/NewOfferListItem.vue";
import { adminOfferLabels } from "@/features/admin/features/the-offers/i18n";
import NewOfferView from "@/features/admin/features/the-offers/components/NewOffer.vue";
import NewOffer from "@/features/admin/features/the-offers/components/NewOffer.vue";
import EditOffer from "@/features/admin/features/the-offers/components/EditOffer.vue";
import { useGetEditableOffers } from "@/features/commons/middleware/useGetOffers";
import { useGetAdminUserInfo } from "@/features/admin/components/middleware/useGetAdminUserInfoText";

export default defineComponent({
  name: "OffersOverview",
  components: {

    EditOffer,
    NewOffer, NewOfferView, NewOfferListItem, BackButton, BasePageContent
  },
  setup() {
    const router = useRouter();
    const route = useRoute();
    const { isLoading, isError, data: listItems, error } = useGetEditableOffers();
    const selectedItem = ref<OfferListItem | undefined>();
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
              router.push({ name: ADMIN_OFFERS_ROUTE_NAME });
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
        router.push({ path: "/admin/angebote/" });
        router.go(0);
      } else {
        router.push("/admin");
        router.go(0);
      }
    }

    const { data: adminUserInfo } = useGetAdminUserInfo();
    const isCentralAdmin = ref(false);
    watch(adminUserInfo, (newValue) => {
      if (newValue) {
        isCentralAdmin.value = newValue.isCentralAdmin;
      }
    });

    const unselectItem = () => {
      selectedItem.value = undefined;
      router.push({ name: ADMIN_OFFERS_ROUTE_NAME });
    }

    const setSelectedItem = (item: OfferListItem) => {
      selectedItem.value = item;
      router.push({ path: "/admin/angebote/" + selectedItem.value.id });
    }

    const setIsAddNew = () => {
      isAddNew.value = true;
      router.push({ path: "/admin/angebote/hinzufuegen" });
      router.go(0);
    }


    const cancelNew = () => {
      isAddNew.value = false;
      router.push({ name: ADMIN_OFFERS_ROUTE_NAME });
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
      icon: ADMIN_OFFERS_ICON,
      name: ADMIN_OFFERS_ROUTE_NAME,
      infoText: ADMIN_OFFERS_INFO_TEXT,
      label: adminOfferLabels
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