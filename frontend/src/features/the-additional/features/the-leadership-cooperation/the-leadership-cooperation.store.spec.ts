import {GETTER_GET_LEADERSHIP_COOPERATION, theLeadershipCooperationStoreModule} from "@/features/the-additional/features/the-leadership-cooperation/the-leadership-cooperation.store.module";

describe.skip('the-leadership-cooperation-store.module', function () {

    const state = {
        leadershipCooperation: [
            {
                question: "An welche Ansprechpartner*in kann ich mich wenden?",
                answer:
                    "Alle Beschäftigten des IT-Referats können sich an jede Anlaufstelle wenden."
            }
        ]
    };
    const getter = theLeadershipCooperationStoreModule.getters[GETTER_GET_LEADERSHIP_COOPERATION];

    it('should return the glossar state', function () {
        expect(getter).toBe(state.leadershipCooperation);
    });
});