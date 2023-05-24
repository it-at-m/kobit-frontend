import {GETTER_GET_FAQS, theFaqStoreModule} from "@/features/the-additional/features/the-faq/the-faq-store.module";

describe.skip('the-faq-store.module', function () {

    const state = {
        faqs: [
            {
                question: "An welche*n Ansprechpartner*in kann ich mich wenden?",
                answer:
                    "Alle Beschäftigten des IT-Referats können sich an jede Anlaufstelle wenden."
            }
        ]
    };
    const getter = theFaqStoreModule.getters[GETTER_GET_FAQS];

    it('should return the faq state', function () {
        expect(getter).toBe(state.faqs);
    });
});