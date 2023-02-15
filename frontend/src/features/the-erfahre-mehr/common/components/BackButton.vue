<template>
  <v-row class="fixed" fixed-header cols="12" sm="12" md="12" lg="12" xl="12">
      <v-col>
            <v-btn             
              to="/erfahre-mehr"
              depressed
              color="secondary"
              class="ml-4"
            >
              <v-icon>mdi-arrow-left-bold</v-icon> Zurück
            </v-btn>
      </v-col>
      </v-row>
  </template>
  
  <script lang="ts">
  
  import {defineComponent} from "vue";
  
  export default defineComponent ( {
    name: "BackButton",
    props: {
      items: {
        //type of BackButton
        type: Array,
        default: () => []
      }
    }
  });
  </script>
  
  <style scoped>
 
  </style>