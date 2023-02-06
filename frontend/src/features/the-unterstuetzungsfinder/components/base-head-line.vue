<template>
  <span
    :id="`id_headline_${text}`"
    class="headline"
  >{{ text }}</span>
</template>

<script lang="ts">
import {Component, Prop, Vue} from "vue-property-decorator";

@Component({})
export default class BaseHeadLine extends Vue {
 @Prop({type: String, default: ""})
  text!: string;
}
</script>

<style scoped>
</style>