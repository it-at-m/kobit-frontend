import {useMutation} from "@tanstack/vue-query";
import {nextStepAll} from "@/features/the-unterstuetzungsfinder/api/UnterstuetzungsfinderClient";
import {QuestionAndAnswer} from "@/features/the-unterstuetzungsfinder/types/QuestionAndAnswer";

export const useNextStep = () => useMutation({
    mutationFn: (givenAnswers: QuestionAndAnswer[]) => {
        return nextStepAll(givenAnswers.map(it => it.answerCompetence));
    }
})