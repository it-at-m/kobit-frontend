<template>
  <v-dialog
    v-model="isDialogActive"
    persistent
    max-width="590"
    class="ma-0 pa-0"
  >
    v-model="isDialogActive"
    persistent
    max-width="590"
    >
    <v-card class="ma-0 pa-0">
      <v-card-title>
        Neuen Kontakt hinzufügen
      </v-card-title>
      <v-card-text>
        <v-row class="ma-0 pa-0">
          <v-col cols="12">
            <v-text-field
              v-model="newContact.email"
              label="E-Mail"
              :rules="[rule]"
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
              @click="$emit('addNewContact', newContact)"
            >
              Hinzufügen
            </v-btn>
            <v-btn
              depressed
              color="error"
              class="ml-4"
              @click="$emit('cancel')"
            >
              Abbrechen
            </v-btn>
          </v-col>
        </v-row>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script lang="ts">
import { computed, defineComponent, ref } from "vue";
import { Contact } from "@/features/commons/types/ContactPoint";

export default defineComponent({
  name: "AddContactDialog",
  props: {
    isDialogActive: {
      type: Boolean
    }
  },
  setup() {
    const newContact = ref<Contact>({ email: "" });

    const validMail = (value: string) => {
      const pattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      return pattern.test(value);
    }
    const rule = (value: string) => {
      return validMail(value) || "Keine valide E-Mail!";
    }

    const isSavable = computed(() => {
      if (!newContact.value) {
        return false;
      } else {
        return validMail(newContact.value.email) && (newContact.value.email.length > 1);
      }
    })

    return { newContact, rule, isSavable }
  }
}
)</script>

<style scoped>

</style>