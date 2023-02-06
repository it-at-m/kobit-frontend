import EscalationSteps from "@/features/the-erfahre-mehr/features/the-escalation-steps/EscalationSteps.type";

export const THE_ESCALATION_STEPS_MODULE_NAME = 'theEscalationStepsStoreModule';
export const GETTER_GET_ESCALATION_STEPS = "GETTER_GET_ESCALATION_STEPS";

export interface TheEscalationStepsStoreModuleState {
    escalationSteps: EscalationSteps[];
}

export const theEscalationStepsStoreModule = {
    namespaced: true,

    state: {
      escalationSteps: [
        {
          name: "Ebene 1" + "\n Win - Win",
          description: "In den ersten drei Stufen können Konflikte noch gut selbst gelöst werden. Bereiten Sie sich in Ruhe auf ein Gespräch vor, fragen Sie nach der Sichtweise des Gegenübers und tauschen Sie sich darüber aus. Treffen Sie gemeinsam Vereinbarungen. Dadurch können beide Konfliktparteien zufrieden aus dem Konflikt hervorgehen.",
          color:"#caeef8",
          steps: [
            {
              name: "Verhärtung",
              description: "Es prallen unterschiedliche Meinungen aufeinander und erste Spannungen entstehen. Es kommt zu Ausrutschern in Tonfall und Wortwahl.  Aber es gibt noch keine starren Lager.",
              texts: [
                "* (moderierte) Gespräche",
                "* Kollegiale Konfliktberatung",
                "* Kollegiale Beratung",
                "* Erstgespräch",
                "* TeamBegleitung",
                "* Moderation",
                "* Coaching",
                "* Gewaltfreie Kommunikation"
              ],
              index: 1
            },
            {
              name: "Debatte & Polarisation",
              description: "Es wird viel diskutiert. Argumente werden aber kaum mehr gehört und ernst genommen. Widersprüche der anderen Seite werden deutlich vor Augen geführt. Schwarz-Weiß-Denken nimmt zu. ",
              texts: [
                "* (moderierte) Gespräche",
                "* Kollegiale Konfliktberatung",
                "* Kollegiale Beratung",
                "* Erstgespräch",
                "* TeamBegleitung",
                "* Moderation",
                "* Coaching",
                "* Gewaltfreie Kommunikation"
              ],
              index: 2
            },
            {
              name: "Taten statt Worte",
              description: "Man glaubt, Reden allein hilft nicht mehr und bricht Gespräche ab. Eigene Absichten sollen durchgesetzt werden. Das Gegenüber wird vor vollendete Tatsachen gestellt. ",
              texts: [
                "* (moderierte) Gespräche",
                "* Kollegiale Konfliktberatung",
                "* Kollegiale Beratung",
                "* Erstgespräch",
                "* TeamBegleitung",
                "* Moderation",
                "* Coaching",
                "* Gewaltfreie Kommunikation"
              ],
              index: 3
            },
          ]
        },
        {
          name: "Ebene 2" + "\n Win - Lose",
          description: "Wenn Sie sich keine professionelle Hilfe von außen holen, wird es in den Stufen vier bis sechs in der Regel nur die Kategorie Gewinner*in/Verlierer*in geben. Um in diesen Stufen den Konflikt noch konstruktiv zu lösen („win-win“), braucht es eine Vermittlung von einer unparteiischen dritten Person.",
          color:"#adeaf2",
          steps: [
            {
              name: "Koalitionen und Polemik",
              description: "Zur eigenen Unterstützung werden immer mehr Personen miteinbezogen. Es geht vor allem ums Gewinnen. Man steckt die andere Person in eine Schublade und wertet sie ab. ",
              texts: [
                "* (moderierte) Gespräche",
                "* Mediative Konfliktgespräche",
                "* Konfliktberatung",
                "* TeamBegleitung",
                "* Konfliktcoaching für Führungskräfte",
                "* Mediation",
                "* Dialogverfahren"
              ],
              index: 4
            },
            {
              name: "Gesichtsverlust",
              description: "Der Gegenseite werden negative Motive unterstellt. Sie wird öffentlich bloßgestellt. Gegenseitiges Misstrauen entsteht. Die streitenden Parteien werden zu Feinden.",
              texts: [
                "* (moderierte) Gespräche",
                "* Mediative Konfliktgespräche",
                "* Konfliktberatung",
                "* TeamBegleitung",
                "* Konfliktcoaching für Führungskräfte",
                "* Mediation",
                "* Dialogverfahren"
              ],
              index: 5
            },
            {
              name: "Drohen",
              description: "Die Beteiligten wollen die Situation durch Drohungen kontrollieren. Auf Drohung folgt Gegendrohung. Durch Setzen von Ultimaten steigt das Stresslevel.",
              texts: [
                "* (moderierte) Gespräche",
                "* Mediative Konfliktgespräche",
                "* Konfliktberatung",
                "* TeamBegleitung",
                "* Konfliktcoaching für Führungskräfte",
                "* Mediation",
                "* Dialogverfahren"
              ],
              index: 6
            },
          ]
        },
        {
          name: "Ebene 3" + "\n Lose - Lose",
          description: "In den Stufen sieben bis neun gibt es keine Gewinner*innen mehr. Konflikte können nur noch mit Macht durch eine höhere Stelle entschieden werden. Eine kooperative Konfliktlösung ist nicht mehr möglich.",
          color:"#9bc4d2",
          steps: [
            {
              name: "Begrenzte Vernichtungsschläge",
              description: "Der gegnerischen Person wird absichtlich Schaden zugefügt. Sie wird nicht mehr respektiert und menschliche Qualitäten werden ihr abgesprochen.",
              texts: [
                "* Disziplinarische Maßnahmen",
                "* Gespräch bei GL1-L",
                "* Machteingriff",
                "* Konfliktcoaching für Führungskräfte",
                "* strukturierter Klärungsdialog (POR)",
                "* organisatorische Maßnahmen (Disposition)"
              ],
              index: 7
            },
            {
              name: "Gezielte Angriffe und Zersplitterung",
              description: "Die Gegenseite und ihr Netzwerk sollen vernichtet werden und zwar so, dass sie nicht mehr arbeitsfähig sind.",
              texts: [
                "* Disziplinarische Maßnahmen",
                "* Gespräch bei GL1-L",
                "* Machteingriff",
                "* Konfliktcoaching für Führungskräfte",
                "* strukturierter Klärungsdialog (POR)",
                "* organisatorische Maßnahmen (Disposition)"
              ],
              index: 8
            },
            {
              name: "Gemeinsam in den Abgrund",
              description: "Es gibt keinen Weg mehr zurück. Der eigene Untergang wird für die Vernichtung der gegnerischen Person in Kauf genommen: z.B. Scheitern eines Projekts, Kündigung, Auflösung von Teams",
              texts: [
                "* Disziplinarische Maßnahmen",
                "* Gespräch bei GL1-L",
                "* Machteingriff",
                "* Konfliktcoaching für Führungskräfte",
                "* strukturierter Klärungsdialog (POR)",
                "* organisatorische Maßnahmen (Disposition)"
              ],
              index: 9
            }
          ]
        },
      ],
    } as unknown as TheEscalationStepsStoreModuleState,
    getters: {
        [GETTER_GET_ESCALATION_STEPS](state: TheEscalationStepsStoreModuleState): EscalationSteps[] {
            return state.escalationSteps;
        }
    }
};

function toNamespace(toAddNamespace: string): string {
    return `${THE_ESCALATION_STEPS_MODULE_NAME}/${toAddNamespace}`;
}

export function getEscalationSteps(): string {
    return toNamespace(GETTER_GET_ESCALATION_STEPS);
}
