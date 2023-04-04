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
              v-model="newLink.name"
          />
        </v-col>
      </v-row>
      <v-row>
        <v-col>
          <v-text-field
              label="URL"
              v-model="newLink.url"
          />
        </v-col>
      </v-row>
      <v-spacer></v-spacer>
      <v-btn
          depressed
          color="secondary"
          class="ml-4 black--text"
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
import {defineComponent, ref} from "vue";
import Link from "@/features/commons/types/link.type";

export default defineComponent ({
  name: "AddLinkDialog",
  props: {
    isDialogActive: {
      type: Boolean
    }
  },
  setup() {
    const newLink = ref<Link>(new Link());

    return {
      newLink
    }
  }
})
</script>

<style scoped>

</style>