<template>
  <v-container fluid>
    <BackButton :callback="back" />
    <BasePageContent
      :icon="icon"
      :name="name"
      :info-text="infoText"
      :is-loading="isLoading"
    >
      <div v-if="! isFinished">
        <StepperHeader
          v-if="step !== undefined"
          :step="step"
          :current-step="currentStep"
          :next-step="nextStep"
          :set-is-finished="setIsFinished"
        />
        <StepItems 
          :step="step"
          :current-step="currentStep"
        />
      </div>
      <div v-if="isFinished">
        <StepFinished
          :restart-process="restartProcess"
        />
      </div>
    </BasePageContent>
    <BackButton :callback="back" />
  </v-container>
</template>

<script lang="ts">

import {defineComponent, ref} from 'vue';
import StepperHeader from '@/features/the-experience-more/features/the-dv-fair/component/StepperHeader.vue';
import StepItems from '@/features/the-experience-more/features/the-dv-fair/component/StepItems.vue';
import StepFinished from '@/features/the-experience-more/features/the-dv-fair/component/StepFinished.vue';
import {
  DV_FAIR_ROUTE_META_ICON,
  DV_FAIR_ROUTE_META_INFO_TEXT,
  DV_FAIR_ROUTE_NAME
} from '@/features/the-experience-more/features/the-dv-fair/the-dv-fair.routes';
import BasePageContent from '@/features/commons/base-page-content/base-page-content.vue';
import {useMutation} from '@tanstack/vue-query';
import {getStepByPosition} from '@/features/the-experience-more/features/the-dv-fair/api/DVStepClient';
import BackButton from "@/features/commons/components/BackButton.vue";
import {useRouter} from "vue-router/composables";

export default defineComponent ({
  name: 'the-dv-fair',
  components: {BasePageContent, StepFinished, StepItems, StepperHeader, BackButton},
  setup() {
    const currentStep = ref(1);
    const isFinished = ref<boolean>(false);
    const { isLoading, isError, mutate, data} = useMutation({
      mutationFn: (newStep: number) => getStepByPosition(newStep),
    });
    const router = useRouter();
    function back() {
      router.push('/erfahre-mehr');
    }

    function setIsFinished() {
      isFinished.value = true;
    }

    function nextStep() {
      currentStep.value++;
      mutate(currentStep.value);
    }

    function restartProcess() {
      isFinished.value = false;
      currentStep.value = 1;
      mutate(currentStep.value);
    }

    mutate(currentStep.value);

    return {
      name: DV_FAIR_ROUTE_NAME,
      icon: DV_FAIR_ROUTE_META_ICON,
      infoText: DV_FAIR_ROUTE_META_INFO_TEXT,
      isFinished,
      currentStep,
      isLoading,
      isError,
      step: data,
      restartProcess,
      setIsFinished,
      nextStep,
      back
    };

  }
});

</script>