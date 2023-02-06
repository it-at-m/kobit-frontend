<template>
  <v-img
    src="@/assets/background-hex2.svg"
    class="background"
  />
</template>

<script lang="ts">
import {Component, Vue} from "vue-property-decorator";

@Component({})
export default class TheBackGround extends Vue {
}
</script>

<style scoped>
.background {
  background-size: cover;
  background-position-x: 70%;
  background-position-y: 50%;
  position: fixed;
  width: 100%;
  height: 100%;
}
</style>