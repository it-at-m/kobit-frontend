<template>
  <div>
    <the-title-bar-main />
    <the-drawer-main />
  </div>
</template>

<script lang="ts">
import {Component, Vue} from "vue-property-decorator";
import TheTitleBarMain from "@/features/the-app-bar/features/the-title-bar-main/the-title-bar-main.vue";
import TheDrawerMain from "@/features/the-app-bar/features/the-drawer-main/the-drawer-main.vue";

@Component({
  components: {TheDrawerMain, TheTitleBarMain}
})
export default class TheAppBar extends Vue {

}
</script>

<style scoped>

</style>