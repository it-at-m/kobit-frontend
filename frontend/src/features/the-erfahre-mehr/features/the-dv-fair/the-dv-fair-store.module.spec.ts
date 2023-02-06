import {GETTER_GET_STEPS, theDvFairStoreModule} from "@/features/the-erfahre-mehr/features/the-dv-fair/the-dv-fair-store.module";

describe.skip('the-dv-fair-store.module', function () {

    const state = {
        steps: [
            {
                step: "An welche Ansprechpartner*in kann ich mich wenden?",
                description:
                    "Alle Beschäftigten des IT-Referats können sich an jede Anlaufstelle wenden.",
                information: "",
            }
        ]
    };
    const getter = theDvFairStoreModule.getters[GETTER_GET_STEPS];

    it('should return the dv_fair state', function () {
        expect(getter).toBe(state.steps);
    });
});