<template>
  <v-row>
    <v-col
    cols="12"
    xl="6"
    lg="6"
    md="6"
    sm="12">
      <v-list subheader>
        <v-subheader>Verfügbare Anlaufstellen</v-subheader>
      </v-list>
    </v-col>
    <v-col
        cols="12"
        xl="6"
        lg="6"
        md="6"
        sm="12">
      <v-list subheader>
        <v-subheader>Anlaufstellen als Antworten auf diesen Pfad</v-subheader>
      </v-list>
      <v-list-item
        :v-for="contactPoint in conversation.contactPoints"
        :key="contactPoint.id">
        <v-list-item-action>
          <v-checkbox
            color="primary"
            @change=""
        </v-list-item-action>
      </v-list-item>
    </v-col>
  </v-row>
</template>

<script lang="ts">
import {defineComponent, ref} from "vue";
import Conversation from "@/features/the-unterstuetzungsfinder/types/conversation.type";
import {QuestionAndAnswer} from "@/features/the-unterstuetzungsfinder/types/QuestionAndAnswer";
import {useGetContactPointListItems} from "@/features/commons/middleware/useGetContactPoints";
import {ContactPoint} from "@/features/commons/types/ContactPoint";

export default defineComponent({
  name: "CompetenceSelector",
  props: {
    conversation: {
      type: Object as () => Conversation
    },
    givenAnswers: {
      type: Array as () => QuestionAndAnswer[]
    },
    restart: {
      type: Function
    }
  },
  setup() {
    const {isLoading, isError, data: listItems, error} = useGetContactPointListItems();
    const itemsToRemove = ref<ContactPoint[]>([])
    const itemsToAdd = ref<ContactPoint[]>([])

    const handleRemoveListAction = (contactPoint: ContactPoint) => {
      if (itemsToRemove.value.map(it => it.id).includes(contactPoint.id)) {
        itemsToRemove.value = itemsToRemove.value.filter(it => it.id !== contactPoint.id)
      }else {
        itemsToRemove.value.push(contactPoint);
      }
    }

    const handleAddListAction = (contactPoint: ContactPoint) => {
      if (itemsToAdd.value.map(it => it.id).includes(contactPoint.id)) {
        itemsToAdd.value = itemsToAdd.value.filter(it => it.id !== contactPoint.id)
      }else {
        itemsToAdd.value.push(contactPoint);
      }
    }
    //TODO List implementieren für neue und bestehende Anlaufstellen
    // umsetzen wie Rollen bei Keycloak
    // mit dem drücken auf hinzufügen wird es in der DB gespeichert und nicht die Seite neu geladen

    
  }
}
)</script>

<style scoped>

</style>