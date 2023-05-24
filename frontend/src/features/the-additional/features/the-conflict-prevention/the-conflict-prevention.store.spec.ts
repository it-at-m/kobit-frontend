import {GETTER_GET_CONFLICT_PREVENTION, theConflictPreventionStoreModule} from "@/features/the-additional/features/the-conflict-prevention/the-conflict-prevention.store.module";

describe.skip('the-conflict-prevention-store.module', function () {

    const state = {
        conflictPrevention: [
            {
                question: "An welche Ansprechpartner*in kann ich mich wenden?",
                answer:
                    "Alle Beschäftigten des IT-Referats können sich an jede Anlaufstelle wenden."
            }
        ]
    };
    const getter = theConflictPreventionStoreModule.getters[GETTER_GET_CONFLICT_PREVENTION];

    it('should return the glossar state', function () {
        expect(getter).toBe(state.conflictPrevention);
    });
});