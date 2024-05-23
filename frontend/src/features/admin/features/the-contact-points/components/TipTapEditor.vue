<template>
  <div>
    <!-- Use the component in the right place of the template -->
    <tiptap-vuetify
        v-model="content"
        :extensions="extensions"
    />
  </div>
</template>

<script lang="ts">
import {Vue, Component} from 'vue-property-decorator';

@Component({})
export default class TipTapEditor extends Vue {

}
</script>



<style scoped>

</style>