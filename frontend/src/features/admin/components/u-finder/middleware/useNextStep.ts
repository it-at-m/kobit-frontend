import {useMutation} from "@tanstack/vue-query";
import {nextStep} from "@/features/the-unterstuetzungsfinder/api/UnterstuetzungsfinderClient";
import {QuestionAndAnswer} from "@/features/the-unterstuetzungsfinder/types/QuestionAndAnswer";

export const useNextStep = () => useMutation({
    mutationFn: (givenAnswers: QuestionAndAnswer[]) => {
        return nextStep(givenAnswers.map(it => it.answerCompetence));
    }
})