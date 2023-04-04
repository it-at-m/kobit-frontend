<template>
  <v-row justify="center">
    <v-dialog
        v-model="isDialogActive"
        persistent
        max-width="590"
    >
      <v-card>
        <v-card-title>
          Neuen Kontakt hinzufügen
        </v-card-title>
        <v-row>
          <v-col>
            <v-text-field
                label="E-Mail"
                v-model="newContact.email"
                :rules="[rules]"
            />
          </v-col>
        </v-row>
        <v-spacer></v-spacer>
        <v-btn
            depressed
            color="secondary"
            class="ml-4 black--text"
            @click="$emit('addNewContact', newContact)"
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
import Contact from "@/features/commons/types/contact.type";

export default defineComponent({
      name: "AddContactDialog",
      props: {
        isDialogActive: {
          type: Boolean
        }
      },
      setup() {
        const newContact = ref(new Contact());

        const rules = (value: string) => {
          const pattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
          return pattern.test(value) || "Keine valide E-Mail!";
        }

        return {newContact, rules}
      }
    }
)</script>

<style scoped>

</style>