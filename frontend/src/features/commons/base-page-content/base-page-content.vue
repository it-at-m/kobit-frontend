<template>
  <v-container fluid>
    <v-row>
      <v-col>
        <v-skeleton-loader
          class="mx-auto"
          type="article"
          :loading="isLoading"
        >
          <v-card>
            <v-card-title>
              <v-icon
                color="secondary"
                left
              >
                {{ icon }}
              </v-icon>
              <div v-html="name">{{ name }}</div> 
            </v-card-title>
            <v-card-subtitle>
            {{ infoText }}
            </v-card-subtitle>
            <slot name="default" />
          </v-card>
        </v-skeleton-loader>
      </v-col>
    </v-row>
    <LoadingSpinner :is-loading="isLoading" />
  </v-container>
</template>

<script lang="ts">
import LoadingSpinner from "@/features/commons/components/LoadingSpinner.vue";

export default {
  name: "BasePageContent",
  components: {LoadingSpinner},
  props: {
    isLoading: {
      type: Boolean,
      default: false
    }, 
    icon: {
      type: String,
      default: ""
    }, 
    infoText: {
      type: String,
      default: ""
    }, 
    name: {
      type: String,
      default: ""
    }
  }
};
</script>

<style scoped>
.v-progress-linear {
  display: block;
  margin: 0 auto;
  width: 100px;
}
</style>
