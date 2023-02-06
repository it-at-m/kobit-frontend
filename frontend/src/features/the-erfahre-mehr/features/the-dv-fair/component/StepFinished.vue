<template>
  <v-card-text>
    <v-container class="full-height">
      <v-row>
        <v-col
          cols="12"
          sm="12"
          md="12"
          lg="12"
          xl="12"
        >
          <v-card
            elevation="0"
            min-height="250px"
            class="d-flex align-center justify-center"
          >
            <v-container>
              <v-card-title class="justify-center text-center">
                Verfahren beendet
              </v-card-title>
              <v-card-actions class="justify-center">
                <v-btn
                  outlined
                  tile
                  color="blue lighten-2"
                  @click="restartProcess"
                >
                  Neues Verfahren
                </v-btn>
              </v-card-actions>
            </v-container>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </v-card-text>
</template>

<script lang="ts">
import {defineComponent} from 'vue';

export default defineComponent({
  name: 'StepFinished',
  props: {
    restartProcess: {
      type: Function,
      required: true
    }
  }
});
</script>

<style scoped>

</style>