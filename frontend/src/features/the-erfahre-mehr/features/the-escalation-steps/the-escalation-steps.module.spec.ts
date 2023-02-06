import {GETTER_GET_ESCALATION_STEPS, theEscalationStepsStoreModule} from "@/features/the-erfahre-mehr/features/the-escalation-steps/the-escalation-steps-store.module";

describe.skip('the-escalation-steps-store.module', function () {

    const state = {
        escalationSteps: [
            {
                question: "An welche Ansprechpartner*in kann ich mich wenden?",
                answer:
                    "Alle Beschäftigten des IT-Referats können sich an jede Anlaufstelle wenden."
            }
        ]
    };
    const getter = theEscalationStepsStoreModule.getters[GETTER_GET_ESCALATION_STEPS];

    it('should return the escalation steps state', function () {
        expect(getter).toBe(state.escalationSteps);
    });
});