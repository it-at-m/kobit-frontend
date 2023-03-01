import Anlaufstelle from "@/features/the-unterstuetzungsfinder/features/the-anlaufstellen/types/anlaufstelle.type";
import {Competence} from "@/features/the-unterstuetzungsfinder/types/competence.type";


interface AnswerOption {
    competence: string;
    germanDescription: Competence;
    shortDescription: string;

}

interface DecisionPoint {
    competence: string;
    question: string | undefined;
    answerOptions: AnswerOption[];

}

export default class Conversation {

    decisionPoint: DecisionPoint;
    contactPoints: Anlaufstelle[];

    constructor() {

        this.decisionPoint = {
            competence: "",
            question: "",
            answerOptions: []
        
        };
        this.contactPoints = [];
    }


    withDecisionPoint(value: DecisionPoint): Conversation {
        this.decisionPoint = value;
        return this;
    }  

    withContactPoints(value: Anlaufstelle[]): Conversation {
        this.contactPoints = value;
        return this;
    }  

    static createEmptyConversation(): Conversation {
        return new Conversation();
    }
}