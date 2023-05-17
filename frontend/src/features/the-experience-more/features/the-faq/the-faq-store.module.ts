import Faq from "@/features/the-experience-more/features/the-faq/Faq.type";

export const THE_FAQ_MODULE_NAME = 'theFaqStoreModule';
export const GETTER_GET_FAQS = "getFaqs";

export interface TheFaqStoreModuleState {
    faqs: Faq[];
}

export const theFaqStoreModule = {
    namespaced: true,
    state: {
        faqs: [
            {
                question: "An welche*n Ansprechpartner*in kann ich mich wenden?",
                answer:
                    "Alle Beschäftigten des IT-Referats können sich an jede Anlaufstelle wenden."
            },
            {
                question: "Wie läuft ein Erstgespräch ab?",
                answer:
                    "Das Erstgespräch findet in einem geschützen Rahmen statt, bei dem die betroffene Person ihr Anliegen erzählen kann."
            },

        ]
    } as TheFaqStoreModuleState,
    getters: {
        [GETTER_GET_FAQS](state: TheFaqStoreModuleState): Faq[] {
            return state.faqs;
        }
    }
};

function toNamespace(toAddNamespace: string): string {
    return `${THE_FAQ_MODULE_NAME}/${toAddNamespace}`;
}

export function getFaqs(): string {
    return toNamespace(GETTER_GET_FAQS);
}

