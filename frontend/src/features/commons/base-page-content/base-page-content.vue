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
              {{ name }}
            </v-card-title>
            <v-card-subtitle>
              {{ infoText }}
            </v-card-subtitle>
            <slot name="default" />
          </v-card>
        </v-skeleton-loader>
      </v-col>
    </v-row>
    <div
      v-if="isLoading"
      class="v-progress-linear"
    >
      <v-progress-circular
        :size="150"
        :width="8"
        color="secondary"
        indeterminate
      />
    </div>
  </v-container>
</template>

<script lang="ts">
export default {
  name: "BasePageContent",
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
