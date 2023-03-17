<template>
  <div>
    <LoadingSpinner :is-loading="isLoading" />
    <the-title-bar-main
      :drawer="drawer"
      :change-drawer="changeDrawer"
    />
    <the-drawer-main
      :is-admin="isAdmin"
      :drawer="drawer"
    />
  </div>
</template>

<script lang="ts">

import {defineComponent, ref} from "vue";
import TheTitleBarMain from "@/features/the-app-bar/features/the-title-bar-main/the-title-bar-main.vue";
import TheDrawerMain from "@/features/the-app-bar/features/the-drawer-main/the-drawer-main.vue";
import {useIsAdmin} from "@/core/middelware/UserService";
import LoadingSpinner from "@/features/commons/components/LoadingSpinner.vue";

export default defineComponent({
  name: "TheAppBar",
  components: {LoadingSpinner, TheTitleBarMain, TheDrawerMain},
  setup() {
    const {isLoading, isError, isAdmin} = useIsAdmin();
    const drawer = ref(false);

    function changeDrawer() {
      drawer.value = !drawer.value;
    }

    return {
      isLoading,
      isError,
      isAdmin,
      drawer,
      changeDrawer
    }

  }
})
</script>

<style scoped>

</style>