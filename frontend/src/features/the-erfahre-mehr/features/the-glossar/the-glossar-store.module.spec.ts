import {GETTER_GET_GLOSSARS, theGlossarStoreModule} from "@/features/the-erfahre-mehr/features/the-glossar/the-glossar-store.module";

describe.skip('the-glossar-store.module', function () {

    const state = {
        glossars: [
            {
                question: "An welche Ansprechpartner*in kann ich mich wenden?",
                answer:
                    "Alle Beschäftigten des IT-Referats können sich an jede Anlaufstelle wenden."
            }
        ]
    };
    const getter = theGlossarStoreModule.getters[GETTER_GET_GLOSSARS];

    it('should return the glossar state', function () {
        expect(getter).toBe(state.glossars);
    });
});