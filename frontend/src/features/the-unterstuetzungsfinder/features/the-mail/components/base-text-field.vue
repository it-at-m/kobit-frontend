<template>
  <v-text-field
    :id="id"
    v-model="vModel"
    color="secondary"
    dense
    outlined
    :label="label"
    @focus="$emit('focus', $event)"
    @blur="$emit('blur', $event)"
  />
</template>

<script lang="ts">
import {Component, Prop, Vue} from "vue-property-decorator";
import IdGenerator from "@/features/commons/types/idGenerator.type";

@Component({})
export default class BaseTextField extends Vue {
  @Prop({default(){
      return `id_base_text_field_${IdGenerator.randomId()}`;
    }})
  id!: string;
  
  @Prop({})
  label!: string

  @Prop({})
  value!: unknown
  
  get vModel(): unknown {
    return this.value;
  }
  
  set vModel(value: unknown) {
    this.$emit("input", value);
  }
}
</script>

<style scoped>

</style>