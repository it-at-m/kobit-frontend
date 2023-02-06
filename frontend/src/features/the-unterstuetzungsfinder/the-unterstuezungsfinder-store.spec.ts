import {
    theUnterstuezungsfinderStoreModule
} from "@/features/the-unterstuetzungsfinder/the-unterstuezungsfinder-store.module";
import Conversation from "@/features/the-unterstuetzungsfinder/types/conversation.type";
import {Loading} from "@/core/services/api/types/Loading.type";
import Anlaufstelle from "@/features/the-unterstuetzungsfinder/features/the-anlaufstellen/types/anlaufstelle.type";
import {Competence} from "@/features/the-unterstuetzungsfinder/types/competence.type";

import fetch from "jest-fetch-mock";

interface AnswerOption {
    competence: string;
    germanDescription: string;
    shortDescription: string;

}

interface DecisionPoint {
    competence: "";
    question: string | undefined;
    answerOptions: AnswerOption[];

}

describe("the-unterstuezungsfinder-store.module.ts", () => {

    const state = theUnterstuezungsfinderStoreModule.state;
    const mutations = theUnterstuezungsfinderStoreModule.mutations;
    const getters = theUnterstuezungsfinderStoreModule.getters;

    const commit = jest.fn();

    const initialState = {
        givenAnswers: [],
        currentConvo: Conversation.createEmptyConversation(),
        nextConvo: Conversation.createEmptyConversation(),
        answers: [],
        isFinished: false,
        anlaufstellen: [],
        competencies: [],
        apiState: Loading.INIT,
        isInfoTextActive: true

    };

    beforeEach(() => {
        mutations.MUTATION_DROP_STATE(state);
        commit.mockRestore();
        fetch.mockClear();
    });

    
    test("if state is initial empty", () => {
       expect(state).toEqual(initialState);
    });

    describe("mutations", () => {

        test('if finder is finished after mutation call', () => {
            expect(state.isFinished).toBeFalsy();
            mutations.MUTATION_SET_FINISHED(state,true);
            expect(state.isFinished).toBeTruthy();
        });

        it('should set anlaufstellen after mutation call', () => {
            expect(state.anlaufstellen).toEqual([]);
            const anlaufstellen = [Anlaufstelle.createEmptyAnlaufstelle().withId("1")];
            mutations.MUTATION_SET_ANLAUFSTELLEN(state,anlaufstellen);
            expect(getters.GETTER_GET_ANLAUFSTELLEN(state)).toEqual(anlaufstellen);
        });
        test('right api state on mutation call', () => {
            expect(state.apiState).toBe(Loading.INIT);
            mutations.MUTATION_SET_API_STATE(state,Loading.ERROR);
            expect(getters.GETTER_GET_API_STATE(state)).toEqual(Loading.ERROR);
        });
        it('should set competencies after mutation call', () => {
            expect(state.competencies).toEqual([]);
            const competencies = [Competence.HEALTH_PROBLEMS];
            mutations.MUTATION_SET_COMPETENCIES(state,competencies);
            expect(getters.GETTER_GET_COMPETENCIES(state)).toEqual(competencies);
        });
        it('should add competencies after mutation call', () => {
            expect(state.competencies).toEqual([]);
            const firstCompetence = Competence.ADDICTION;
            const secondCompetence = Competence.PHYSICAL;
            const thirdCompetence = Competence.PSYCHOLOGICAL;
            mutations.MUTATION_PUT_COMPETENCIES(state,[firstCompetence,thirdCompetence]);
            mutations.MUTATION_PUT_COMPETENCIES(state,[secondCompetence]);
            expect(getters.GETTER_GET_COMPETENCIES(state)).toEqual([firstCompetence,thirdCompetence,secondCompetence]);
        });
        it('should toggle state of the infotext', () => {
            expect(state.isInfoTextActive).toBeTruthy();
            mutations.MUTATION_TOGGLE_INFOTEXT_ACTIVE(state,false);
            expect(getters.GETTER_IS_INFOTEXT_ACTIVE(state)).toBeFalsy();
        });




    });

    describe('actions', () => {


    });

    describe("getter", () => {

    });


});