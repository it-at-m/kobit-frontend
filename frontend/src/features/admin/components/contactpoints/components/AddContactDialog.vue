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
                :rules="[rule]"
            />
          </v-col>
        </v-row>
        <v-spacer></v-spacer>
        <v-btn
            depressed
            color="secondary"
            class="ml-4 black--text"
          :disabled="! isSavable"
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
import {computed, defineComponent, ref} from "vue";
import {Contact} from "@/features/commons/types/ContactPoint";

export default defineComponent({
      name: "AddContactDialog",
      props: {
        isDialogActive: {
          type: Boolean
        }
      },
      setup() {
        const newContact = ref<Contact>({email: ""});

        const validMail = (value: string) => {
          const pattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
          return pattern.test(value);
        }
        const rule = (value: string) => {
          return validMail(value) || "Keine valide E-Mail!";
        }

        const isSavable = computed(() => {
          if(! newContact.value){
            return false;
          }else {
            return validMail(newContact.value.email) && (newContact.value.email.length > 1);
          }
        })

        return {newContact, rule, isSavable}
      }
    }
)</script>

<style scoped>

</style>