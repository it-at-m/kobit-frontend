import Conversation from "@/features/the-unterstuetzungsfinder/types/conversation.type";
import {ActionContext} from "vuex";
import UnterstuetzungsfinderService
    from "@/features/the-unterstuetzungsfinder/api/the-unterstuetzungsfinder-service.api";

import Anlaufstelle from "@/features/the-unterstuetzungsfinder/features/the-anlaufstellen/types/anlaufstelle.type";
import AnlaufstelleService
    from "@/features/the-unterstuetzungsfinder/features/the-anlaufstellen/the-anlaufstellen-service.api";
import {Loading} from "@/core/services/api/types/Loading.type";
import {Competence} from "@/features/the-unterstuetzungsfinder/types/competence.type";
import {RootState} from "@/core/core.store";

export const THE_UNTERSTUEZUNGSFINDER_MODULE_NAME  = 'theUnterstuezungsfinderStoreModule';

const ACTION_SET_INIT = "ACTION_SET_INIT";
const ACTION_SET_NEXT_CONVO = "ACTION_SET_NEXT_CONVO";

const MUTATION_DROP_STATE = "MUTATION_DROP_STATE";
const MUTATION_SET_FINISHED = "MUTATION_SET_FINISHED";
const GETTER_IS_FINISHED = "GETTER_IS_FINISHED";

const MUTATION_SET_GIVEN_ANSWERS = "MUTATION_SET_GIVEN_ANSWERS";
const ACTION_SET_GIVEN_ANSWERS = "ACTION_SET_GIVEN_ANSWERS";
const GETTER_GET_GIVEN_ANSWERS = "GETTER_GET_GIVEN_ANSWERS";
const GETTER_GET_GIVEN_ANSWERS_COMPETENCIES = "GETTER_GET_GIVEN_ANSWERS_COMPETENCIES";

const MUTATION_SET_CONVO = "MUTATION_SET_CONVO";
const MUTATION_SET_NEXT_CONVO = "MUTATION_SET_NEXT_CONVO";
const GETTER_GET_CONVO = "GETTER_GET_CONVO";

const MUTATION_PUSH_ANSWER = "MUTATION_PUSH_ANSWER";
const MUTATION_SET_ANSWERS = "MUTATION_SET_ANSWERS";
const GETTER_GET_ANSWERS = "GETTER_GET_ANSWERS";

const MUTATION_SET_ANLAUFSTELLEN = "MUTATION_SET_ANLAUFSTELLEN";
const ACTION_SET_ANLAUFSTELLEN = "ACTION_SET_ANLAUFSTELLEN";
const GETTER_GET_ANLAUFSTELLEN = "GETTER_GET_ANLAUFSTELLEN";

const MUTATION_SET_API_STATE = "MUTATION_SET_API_STATE";
const GETTER_GET_API_STATE = "GETTER_GET_API_STATE";

const MUTATION_SET_COMPETENCIES = "MUTATION_SET_COMPETENCIES";
const MUTATION_PUT_COMPETENCIES = "MUTATION_PUT_COMPETENCIES";
const ACTION_PUT_COMPETENCIES = "ACTION_PUT_COMPETENCIES";
const GETTER_GET_COMPETENCIES = "GETTER_GET_COMPETENCIES";

const MUTATION_TOGGLE_INFOTEXT_ACTIVE = "MUTATION_TOGGLE_INFOTEXT_ACTIVE";
const GETTER_IS_INFOTEXT_ACTIVE = "GETTER_IS_INFOTEXT_ACTIVE";

export interface QuestionAndAnswer {
    questionAnswered: string;
    answerCompetence: string;
    answerValue: string;
}

export interface TheUnterstuezungsfinderStoreState {
    givenAnswers: QuestionAndAnswer[];
    currentConvo: Conversation;
    nextConvo: Conversation;


    answers: string[];
    isFinished: boolean;
    competencies: string[];
    anlaufstellen: Anlaufstelle[];
    apiState: Loading;
    isInfoTextActive: boolean;
}
export const theUnterstuezungsfinderStoreModule = {
    namespaced: true,

    state: {
        givenAnswers: [],
        currentConvo: Conversation.createEmptyConversation(),
        nextConvo: Conversation.createEmptyConversation(),
        answers: [],
        isFinished: false,
        anlaufstellen: [],
        competencies: [],
        apiState: Loading.INIT,
        isInfoTextActive: true
    } as TheUnterstuezungsfinderStoreState,

    mutations: {
        [MUTATION_SET_GIVEN_ANSWERS]
        (state: TheUnterstuezungsfinderStoreState, payload: QuestionAndAnswer): void {
            state.givenAnswers.push(payload);
        },
        [MUTATION_DROP_STATE]
        (state: TheUnterstuezungsfinderStoreState): void {
            state.givenAnswers = [];
            state.currentConvo =  Conversation.createEmptyConversation();
            state.nextConvo =  Conversation.createEmptyConversation();
            state.answers = [];
            state.isFinished = false;
            state.anlaufstellen = [];
            state.competencies = [];
            state.isInfoTextActive = true;
            state.apiState = Loading.INIT;
        },
        [MUTATION_SET_FINISHED]
        (state: TheUnterstuezungsfinderStoreState, payload: boolean): void {
            state.isFinished = payload;
        },
        [MUTATION_PUSH_ANSWER]
        (state: TheUnterstuezungsfinderStoreState, payload: string): void {
            state.answers.push(payload);
        },
        [MUTATION_SET_ANSWERS]
        (state: TheUnterstuezungsfinderStoreState, payload: string[]): void {
            state.answers = payload;
        },
        [MUTATION_SET_CONVO]
        (state: TheUnterstuezungsfinderStoreState, payload: Conversation): void {
            state.currentConvo = payload;
        },
        [MUTATION_SET_NEXT_CONVO]
        (state: TheUnterstuezungsfinderStoreState, payload: Conversation): void {
            state.nextConvo = payload;
        },
        [MUTATION_SET_ANLAUFSTELLEN]
        (state: TheUnterstuezungsfinderStoreState, payload: Anlaufstelle[]): void {
            state.anlaufstellen = payload;
        },
        [MUTATION_SET_API_STATE](state: TheUnterstuezungsfinderStoreState, payload: Loading): void {
            state.apiState = payload;
        },
        [MUTATION_SET_COMPETENCIES](state: TheUnterstuezungsfinderStoreState, payload: Competence[]): void {
            state.competencies = payload;
        },
        [MUTATION_PUT_COMPETENCIES](state: TheUnterstuezungsfinderStoreState, payload: Competence[]): void {
            payload.forEach(competence => {state.competencies.push(competence);}
            );
        },
        [MUTATION_TOGGLE_INFOTEXT_ACTIVE](state: TheUnterstuezungsfinderStoreState, payload: boolean): void {
            state.isInfoTextActive = payload;
        },   
    },
    actions: {
        async [ACTION_SET_INIT]({commit}: ActionContext<TheUnterstuezungsfinderStoreState, RootState>): Promise<void> {

            await UnterstuetzungsfinderService.initCommunication().then((result: Conversation) => {
 

                const mappedConversation = Conversation.createEmptyConversation()
                .withDecisionPoint(result.decisionPoint)
                .withContactPoints(result.contactPoints);

                commit(MUTATION_SET_CONVO, mappedConversation);

            });

        },
        async [ACTION_SET_NEXT_CONVO]
        ({commit}: ActionContext<TheUnterstuezungsfinderStoreState, RootState>, payload: string[]
        ): Promise<void> {

            commit(MUTATION_SET_API_STATE,Loading.INIT);
            await UnterstuetzungsfinderService.postNextAnswer(JSON.parse(JSON.stringify(payload))).then(result => {
                

                const mappedConversation = Conversation.createEmptyConversation()
                .withDecisionPoint(result.decisionPoint)
                .withContactPoints(result.contactPoints);



                commit(MUTATION_SET_API_STATE,Loading.LOADING);
                commit(MUTATION_SET_CONVO, mappedConversation);
                

            });

            commit(MUTATION_SET_API_STATE,Loading.LOADED);
        },        


        [ACTION_SET_GIVEN_ANSWERS]({commit}: ActionContext<TheUnterstuezungsfinderStoreState, RootState>, payload: QuestionAndAnswer): void {
            commit(MUTATION_SET_GIVEN_ANSWERS, payload);
        },
        [ACTION_SET_ANLAUFSTELLEN]
        ({commit}: ActionContext<unknown, unknown>, payload: string[]): void {
            commit(MUTATION_SET_API_STATE,Loading.INIT);
                AnlaufstelleService.getAnlaufstellenByCompetence(payload).then(result => {
                    commit(MUTATION_SET_API_STATE,Loading.LOADING);
                    commit(MUTATION_SET_ANLAUFSTELLEN, result);
                });
            commit(MUTATION_SET_API_STATE,Loading.LOADED);
        },
        [ACTION_PUT_COMPETENCIES]({commit}: ActionContext<TheUnterstuezungsfinderStoreState, RootState>, payload: string
        ): void {
            commit(MUTATION_PUT_COMPETENCIES, payload);
        },
    },

    getters: {

        [GETTER_GET_GIVEN_ANSWERS](state: TheUnterstuezungsfinderStoreState): QuestionAndAnswer[] {
            return state.givenAnswers;
        },

        [GETTER_GET_GIVEN_ANSWERS_COMPETENCIES](state: TheUnterstuezungsfinderStoreState): string[] {

            const mappedGivenAnswersCompetencies: string[] = [];

            state.givenAnswers.forEach(answer => {

                mappedGivenAnswersCompetencies.push(answer.answerCompetence);


            });
            return mappedGivenAnswersCompetencies;
        },

        

        [GETTER_GET_ANSWERS](state: TheUnterstuezungsfinderStoreState): Conversation[] {
            let sortedAnswers = JSON.parse(JSON.stringify(state.answers));
            sortedAnswers = sortedAnswers.sort((a: { text: string }, b: { text: string }) => a.text.localeCompare(b.text));


            return sortedAnswers;
        },
        [GETTER_GET_CONVO](state: TheUnterstuezungsfinderStoreState): Conversation {
            return state.currentConvo;
        },
        [GETTER_IS_FINISHED](state: TheUnterstuezungsfinderStoreState): boolean {
            return state.isFinished;
        },
        [GETTER_GET_ANLAUFSTELLEN](state: TheUnterstuezungsfinderStoreState): Anlaufstelle[] {
            const sortedAnlaufstellen = JSON.parse(JSON.stringify(state.anlaufstellen));
            return sortedAnlaufstellen.sort((a: { shortCut: string }, b: { shortCut: string }) => a.shortCut.localeCompare(b.shortCut));
        },
        [GETTER_GET_API_STATE](state: TheUnterstuezungsfinderStoreState): Loading {
            return state.apiState;
        },
        [GETTER_GET_COMPETENCIES](state: TheUnterstuezungsfinderStoreState): string[] {
            return state.competencies;
        },
        [GETTER_IS_INFOTEXT_ACTIVE](state: TheUnterstuezungsfinderStoreState): boolean {
            return state.isInfoTextActive;
        },
    }
};

function namespaced(toAddNamespace: string): string {
    return THE_UNTERSTUEZUNGSFINDER_MODULE_NAME + '/' + toAddNamespace;
}

export function initTree(): string {
    return namespaced(ACTION_SET_INIT);
}

export function setNextQuestion(): string {
    return namespaced(ACTION_SET_NEXT_CONVO);
}


export function setGivenAnswers(): string {
    return namespaced(ACTION_SET_GIVEN_ANSWERS);
}
export function getGivenAnswers(): string {
    return namespaced(GETTER_GET_GIVEN_ANSWERS);
}
export function getGivenAnswersCompetencies(): string {
    return namespaced(GETTER_GET_GIVEN_ANSWERS_COMPETENCIES);
}


export function dropGivenAnswers(): string {
    return namespaced(MUTATION_DROP_STATE);
}


export function setFinished(): string {
    return namespaced(MUTATION_SET_FINISHED);
}
export function isFinished(): string {
    return namespaced(GETTER_IS_FINISHED);
}


export function getConvo(): string {
    return namespaced(GETTER_GET_CONVO);
}

export function getAnswers(): string {
    return namespaced(GETTER_GET_ANSWERS);
}
export function setAnlaufstellen(): string {
    return namespaced(ACTION_SET_ANLAUFSTELLEN);
}
export function getAnlaufstellen(): string {
    return namespaced(GETTER_GET_ANLAUFSTELLEN);
}

export function getApiState(): string {
    return namespaced(GETTER_GET_API_STATE);
}
export function putCompetencies(): string {
    return namespaced(ACTION_PUT_COMPETENCIES);
}
export function getCompetencies(): string {
    return namespaced(GETTER_GET_COMPETENCIES);
}
export function isInfoTextActive(): string {
    return namespaced(GETTER_IS_INFOTEXT_ACTIVE);
}
export function toggleInfoTextActive(): string {
    return namespaced(MUTATION_TOGGLE_INFOTEXT_ACTIVE);
}


