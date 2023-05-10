import {useQuery} from "@tanstack/vue-query";
import {getLastStep, getStepByPosition} from "@/features/the-experience-more/features/the-dv-fair/api/DVStepClient";

export const useGetLastStep = () => {
    const {isLoading, isError, data} = useQuery(
        ['lastStep'],
        () => getLastStep()
    );
    return {isLoading, isError, data};
};

export const useGetStep = (stepCount: number) => {
    const {isLoading, isError, data} = useQuery(
        ['step', stepCount],
        () => getStepByPosition(stepCount)
    );
    return {isLoading, isError, data};
};