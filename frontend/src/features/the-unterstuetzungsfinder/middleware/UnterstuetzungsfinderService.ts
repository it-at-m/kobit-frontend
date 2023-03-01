import {useMutation} from "@tanstack/vue-query";
import {nextStep} from "@/features/the-unterstuetzungsfinder/api/UnterstuetzungsfinderClient";

export const useNextStep = (competence: string[]) => {
    const {isLoading, isError, mutate, data} = useMutation({
        mutationFn: () => {
            return nextStep(competence);
        }
    });
    return {isLoading, isError, mutate, data};
};
