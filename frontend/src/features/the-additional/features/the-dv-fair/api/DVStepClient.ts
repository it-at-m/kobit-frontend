import {httpGetJson} from "@/core/plugins/http";
import {Step} from '@/features/the-additional/features/the-dv-fair/StepView';

export const getLastStep = () => {
    return httpGetJson<number>("/service-agreement/steps");
};

export const getStepByPosition = (stepCount: number) => {
    return httpGetJson<Step[]>("/service-agreement/"+stepCount);
};
