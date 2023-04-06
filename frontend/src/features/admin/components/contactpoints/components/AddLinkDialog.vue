<template>
  <v-row justify="center">
    <v-dialog
        v-model="isDialogActive"
        persistent
        max-width="590"
    >
    <v-card>
      <v-card-title>
        Neuen Link hinzufügen
      </v-card-title>
      <v-row>
        <v-col>
          <v-text-field
              label="Titel"
              :rules="[nameRule]"
              v-model="newLink.name"
          />
        </v-col>
      </v-row>
      <v-row>
        <v-col>
          <v-text-field
              label="URL"
              :rules="[linkRule]"
              v-model="newLink.url"
          />
        </v-col>
      </v-row>
      <v-spacer></v-spacer>
      <v-btn
          depressed
          color="secondary"
          class="ml-4 black--text"
          :disabled="!isSavable"
          @click="$emit('addNewLink', newLink)"
      >
        Hinzufügen
      </v-btn>
      <v-btn
          depressed
          color="secondary"
          class="ml-4 black--text"
          @click="$emit('cancel')">
        Abbrechen
      </v-btn>
    </v-card>
    </v-dialog>
  </v-row>
</template>

<script lang="ts">
import {computed, defineComponent, ref} from "vue";
import {Link} from "@/features/commons/types/ContactPoint";

export default defineComponent ({
  name: "AddLinkDialog",
  props: {
    isDialogActive: {
      type: Boolean
    }
  },
  setup() {
    const newLink = ref<Link>({name:"", url:""});

    const validUrl = (value: string) => {
      const pattern = /^(?:http(s)?:\/\/)?[\w.-]+(?:\.[\w.-]+)+[\w\-._~:/?#[\]@!$&'()*+,;=]+$/;
      return pattern.test(value);
    }

    const linkRule = (value: string) => {
      return validUrl(value) || "Keine valide URL angeben!";
    }

    const nameRule = (value: string) => {
      return value.length>0 || "Titel muss gefüllt werden!"
    }

    const isSavable = computed(() => {
      if(newLink.value.name && newLink.value.url) {
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