<template>
  <v-dialog
    v-model="isDialogActive"
    persistent
    max-width="590"
    class="ma-0 pa-0"
  >
    <v-card class="ma-0 pa-0">
      <v-card-title>
        Neuen Link hinzufügen
      </v-card-title>
      <v-card-text>
        <v-row class="ma-0 pa-0">
          <v-col cols="12">
            <v-text-field
              v-model="newLink.name"
              color="secondary"
              label="Titel"
              :rules="[nameRule]"
              prepend-inner-icon="mdi-web"
              :counter="100"
            />
          </v-col>
          <v-col cols="12">
            <v-text-field
              v-model="newLink.url"
              color="secondary"
              label="URL"
              :rules="[linkRule]"
              prepend-inner-icon="mdi-link"
              :counter="2000"
            />
          </v-col>
        </v-row>
      </v-card-text>
      <v-card-actions>
        <v-row class="ma-0 pa-0">
          <v-col
            cols="12"
            class="ma-0 pa-0"
          >
            <v-btn
              depressed
              color="success"
              :disabled="!isSavable"
              @click="$emit('addNewLink', newLink)"
            >
              <v-icon>mdi-plus</v-icon> Hinzufügen
            </v-btn>
            <v-btn
              depressed
              color="error"
              class="ml-4"
              @click="$emit('cancel')"
            >
              <v-icon>mdi-cancel</v-icon> Abbrechen
            </v-btn>
          </v-col>
        </v-row>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script lang="ts">
import { computed, defineComponent, ref } from "vue";
import { Link } from "@/features/commons/types/ContactPoint";

export default defineComponent({
  name: "AddLinkDialog",
  props: {
    isDialogActive: {
      type: Boolean
    }
  },
  setup() {
    const newLink = ref<Link>({ name: "", url: "" });

    const validUrl = (value: string) => {
      const pattern = /^(?:http(s)?:\/\/)?[\w.-]+(?:\.[\w.-]+)+[\w\-._~:/?#[\]@!$&'()*+,;=]+$/;
      return pattern.test(value);
    }

    const linkRule = (value: string) => {
      if(!validUrl(value)){
        return "Keine valide URL angeben!";
      } else if (value.length > 2000){
        return  "Der Link muss weniger als 2000 Zeichen umfassen"
      }
    }

    const nameRule = (value: string) => {
      if(value.length === 0 ){
        return "Titel muss gefüllt werden!"
      } else if (value.length > 100) {
        return  "Der Link Name muss weniger als 100 Zeichen umfassen"
      }

    }

    const isSavable = computed(() => {
      if (newLink.value.name && newLink.value.url) {
        return newLink.value.name.length > 0 && newLink.value.url.length > 0 && validUrl(newLink.value.url);
      }
      return false;
    })

    return {
      newLink,
      linkRule,
      nameRule,
      isSavable
    }
  }
})
</script>

<style scoped>

</style>