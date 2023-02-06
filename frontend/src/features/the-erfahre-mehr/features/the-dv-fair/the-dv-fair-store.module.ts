import DvFair from '@/features/the-erfahre-mehr/features/the-dv-fair/DvFair.type';

export const THE_DV_FAIR_MODULE_NAME = 'theDVFairStoreModule';
export const GETTER_GET_STEPS = 'getSteps';
export const GETTER_GET_HEADERS = 'getHeaders';
export const TRIM_STRING = 'trimString';

export interface TheDvFairStoreModuleState {

    isNotFinished: boolean;
    panel: number;
    headers: DvFair[];
    steps: DvFair[];

}

export const theDvFairStoreModule = {
    namespaced: true,
    state: {
        singleStep: undefined,
        isNotFinished: true,
        headers: ['Übersicht für Betroffene', 'Übersicht für Führungskräfte'],
        steps: [
            {
                name: 'Schritt 1',
                text:
                    'Erstgespräch mit der unmittelbaren oder nächsthöheren Führungskraft oder Ansprechpartner_in der Anlaufstelle',
                optionalOption: undefined,
                alert: {
                    type: null,
                    showColoredBoarder: false,
                    borderLocation: null
                },
                header: {
                    employee: {
                        title: 'Erstgespräch',
                        text:
                            'Als Betroffene_r können Sie mit Ihrer FK oder einem/einer Ansprechpartner_in der Anlaufstellen ein Erstgespräch führen. In ' +
                            'diesem Erstgespräch wird die Situation ganzheitlich betrachtet und geklärt, ob Mobbing aufgrund einer konkreten Verhaltensweise vorliegt.Unabhängig davon, ob Mobbing oder ein belastender Konflikt vorliegt, wird nach Lösungswegen gesucht. ' +
                            '(z.B Konfliktklärung, Mediation, organisatorische Maßnahmen)'
                    },
                    boss: {
                        title: 'Erstgespräch mit betroffener Person',
                        text:
                            'Betroffene Personen haben das Recht sich an Sie als FK oder an einen/eine Ansprechpartner_in der Anlaufstellen für ein ' +
                            'Erstgespräch bzw. ein Beratungsgespräch zu wenden. Im Erstgespräch betrachten Sie die Situation gemeinsam mit dem/' +
                            'der Betroffenen. Sie klären, ob Mobbing aufgrund konkreter Sachverhalte vorliegt. Unabhängig davon, ob Mobbing oder ein ' +
                            'belastender Konflikt vorliegt, ist nach einem Lösungsweg zu suchen. (z.B Konfliktklärung, Mediation, organisatorische ' +
                            'Maßnahmen) Bei Fragen können Sie sich jederzeit an die Zentrale Stelle für Mobbing, die Zentrale Stelle für Mediation und ' +
                            'Konfliktmanagement (ZMK), die Gleichstellungsstelle oder die Psychosoziale Beratungsstelle (PSB) wenden.\n',
                        optional: undefined
                    }
                }
            },
            {
                name: 'Schritt 2',
                text: 'Einzelgespräch mit beschuldigter Person',
                optionalOption: {
                    text: 'Optional: Einzelgespräche mit allen Betroffenen',
                    item: undefined,
                    alert: {
                        type: 'info',
                        showColoredBoarder: true,
                        borderLocation: undefined
                    }
                },
                alert: {
                    type: null,
                    showColoredBoarder: false,
                    borderLocation: null
                },
                header: {
                    employee: {
                        title: 'Einzelgespräch mit der beschuldigten Person',
                        text:
                            'Ihre FK führt anschließend ein Einzelgespräch mit der beschuldigten Person, um sich den Sachverhalt aus ihrer Sicht schildern zu lassen.\n',
                        optional: {
                            title: 'Optional: Einzelgespräche mit dem/der Betroffenen',
                            text:
                                'Ihre FK entscheidet anschließend, ob sie ein weiteres Gespräch mit Ihnen führen möchte, um Ihre Einschätzungen zu besprechen.'
                        }
                    },
                    boss: {
                        title: 'Einzelgespräch mit der beschuldigten Person',
                        text:
                            'Sie führen ein Einzelgespräch mit der beschuldigten Person. Diese soll die Möglichkeit bekommen, den Sachverhalt aus ' +
                            'ihrer Sicht darzustellen. Sie nehmen eine Analyse der Situation vor und setzen sich mit subjektiven Wahrnehmungen auseinander. Wichtig ist, dass Sie stets die objektive Wahrnehmung beibehalten.\n',
                        optional: {
                            title: 'Optional: Einzelgespräche mit dem/der Betroffenen',
                            text:
                                'Sie entscheiden, ob ein optionales Einzelgespräche mit den betroffenen Personen nötig ist. Sie können Ihre Einschätzungen besprechen, insbesondere dann, wenn Sie den Mobbingvorwurf als ungerechtfertigt ansehen.'
                        }
                    }
                }
            },
            {
                name: 'Schritt 3',
                text: 'Gemeinsames Gespräch mit allen Betroffenen',
                optionalOption: {
                    text:
                        'Bei Bedarf: Zentrale Stelle für Mediation und Konfliktmanagement',
                    item: undefined,
                    alert: {
                        type: 'info',
                        showColoredBoarder: true,
                        borderLocation: undefined
                    }
                },
                alert: {
                    type: null,
                    showColoredBoarder: false,
                    borderLocation: null
                },
                header: {
                    employee: {
                        title: 'Gemeinsames Gespräch mit den Beteiligten',
                        text:
                            'In einem gemeinsamen Gespräch mit allen Beteiligten versucht Ihre FK, die Vorwürfe zu klären. Falls dies nicht gelingt,\n' +
                            'werden gemeinsam Lösungsmöglichkeiten gesucht.\n\n' +
                            'Mögliche Lösungsmöglichkeiten:\n- Konfliktklärung durch Moderation oder Mediation\n' +
                            '- Verbesserung der Organisation oder der Arbeitsbedingungen\n' +
                            '- organisatorische Maßnahmen (z.B. räumliche Trennung, Aufgabenumverteilung)\n' +
                            '- Maßnahmen zur Stabilisierung der/des Betroffenen (z.B. durch PSB)\n\n' +
                            'Wichtig: Ihre FK sendet Ihnen anschließend eine Kopie der Dokumentation zu.\n' +
                            'Falls sich der Konflikt nicht durch interne Maßnahmen lösen lässt, kann Ihre FK die ZMK mit in den Prozess einbinden.\n',
                        optional: {
                            title:
                                'Bei Bedarf: Zentrale Stelle für Mediation und Konfliktmanagement',
                            text: undefined
                        }
                    },
                    boss: {
                        title: 'Einzelgespräch mit der beschuldigten Person',
                        text:
                            'In einem gemeinsamen Gespräch versuchen Sie, die Vorwürfe zu klären. Falls dies nicht gelingt, werden gemeinsam Lösungsmöglichkeiten gesucht. Mögliche\n\n' +
                            'Lösungsmöglichkeiten:\n- Konfliktklärung durch Moderation oder Mediation\n' +
                            '- Verbesserung der Organisation oder der Arbeitsbedingungen\n' +
                            '- organisatorische Maßnahmen (z.B. räumliche Trennung, Aufgabenumverteilung)\n' +
                            '- Maßnahmen zur Stabilisierung der/des Betroffenen (z.B. durch PSB)\n\n' +
                            'Wichtig: Halten Sie Inhalte & Vereinbarungen schriftlich fest und legen Sie einen Termin für die Überprüfung der Maßnahmen fest.\n' +
                            'Senden Sie an alle beteiligten Personen eine Kopie der Dokumentation.\n' +
                            'Falls sich der Konflikt nicht durch interne Maßnahmen lösen lässt, wenden Sie sich an die ZMK.\n',
                        optional: {
                            title:
                                'Bei Bedarf: Zentrale Stelle für Mediation und Konfliktmanagement',
                            text: undefined
                        }
                    }
                }
            },
            {
                name: 'Schritt 4',
                text: 'optional Runder Tisch',
                optionalOption: {
                    text: 'Gespräch mit der nächsthöheren nicht beteiligten Führungskraft',
                    item: undefined,
                    alert: {
                        /*type: "info",
                        showColoredBoarder: true,
                        borderLocation: undefined*/
                    }
                },
                alert: {
                    type: null,
                    showColoredBoarder: false,
                    borderLocation: null
                },
                header: {
                    employee: {
                        title: 'Runder Tisch',
                        text:
                            'Werden die vereinbarten Maßnahmen nicht umgesetzt, können Beteiligte einen Runden Tisch einberufen.\n' +
                            'Voraussetzung: Vorlage einer formlosen Entbindung von der Schweigepflicht durch Sie\n' +
                            'Ziel: gemeinsame Lösung und konkrete Maßnahmen\n' +
                            'Unterstützung: durch Moderator_in möglich\n\n' +
                            'Mögliche Teilnehmer_innen\n' +
                            '- unmittelbare nächsthöhere nicht beteiligte FK\n' +
                            '- eine Vertrauensperson Ihrer Wahl\n' +
                            '- Vertretung der eingebundenen Anlaufstellen\n' +
                            '- Mitglied der zuständigen Personalvertretung bzw. ggf. Schwerbehindertenvertretung\n' +
                            '- Vertretung der zuständigen Personalstelle\n\n' +
                            'Auf Wunsch können Sie und die/der Beschuldigte sich zu Beginn äußern.\n\n' +
                            'Sie können sich wenden an die nächst höhere nicht beteiligte Führungskraft.\n' +
                            'Diese unternimmt unverzüglich einen weiteren Eignungsversuch und legt Maßnahmen fest.\n',
                        optional: {
                            title: '',
                            text: '',


                        }
                    },
                    boss: {
                        title: 'Runder Tisch',
                        text:
                            'Werden die vereinbarten Maßnahmen nicht umgesetzt, können Beteiligte einen Runden Tisch einberufen.\n' +
                            'Voraussetzung: Vorlage einer formlosen Entbindung von der Schweigepflicht der betroffenen Person\n' +
                            'Ziel: gemeinsame Lösung und konkrete Maßnahmen\n' +
                            'Unterstützung: durch Moderator_in möglich\n\n' +
                            'Mögliche Teilnehmer_innen\n' +
                            '- unmittelbare nächsthöhere nicht beteiligte FK\n' +
                            '- eine Vertrauensperson Ihrer Wahl\n' +
                            '- Vertretung der eingebundenen Anlaufstellen\n' +
                            '- Mitglied der zuständigen Personalvertretung bzw. ggf. Schwerbehindertenvertretung\n' +
                            '- Vertretung der zuständigen Personalstelle\n\n' +
                            'Auf Wunsch können Sie und die/der Beschuldigte sich zu Beginn äußern.\n\n' +
                            'Die Beteiligten können sich wenden an die nächst höhere nicht beteiligte Führungskraft.\n' +
                            'Diese unternimmt unverzüglich einen weiteren Eignungsversuch und legt Maßnahmen fest.\n',
                        optional: {
                            title: '',
                            text: '',

                        }
                    }
                }
            },
            {
                name: 'Sanktionen und Konsequenzen',
                text: 'nach §6 DV - Fairer Umgang und gegen Mobbing',
                optionalOption: undefined,
                alert: {
                    type: 'error',
                    showColoredBoarder: true,
                    borderLocation: 'top'
                },
                header: {
                    employee: {
                        title: '§ 6 DV Sanktionen und Konsequenzen \n\n',
                        text:
                            '(1) Die Ausübung, Hinnahme oder Förderung von Mobbinghandlungen stellen bei Tarifbeschäftigten einen Verstoß gegen ihre arbeitsvertragliche Pflicht zur Unterlassung betriebsschädigenden Verhaltens und bei Beamtinnen und Beamten ein Dienstvergehen dar. Gleichzeitig werden die Persönlichkeitsrechte der betroffenen Person verletzt.\n\n' +
                            '(2) Die Landeshauptstadt München verpflichtet sich, gegen Führungskräfte und Beschäftigte vorzugehen, die andere Beschäftigte nachweislich belästigen, benachteiligen, durch Mobbing in ihren Persönlichkeitsrechten verletzen oder solches Verhalten dulden. Damit die Abteilung Recht des Personal- und Organisationsreferates oder die jeweils zuständigen Stellen ihre Aufgabe erfüllen können, müssen die Beteiligten dorthin schriftlich Mitteilung machen.\n\n' +
                            '(3) Nimmt eine Führungskraft ihre Aufgaben nicht wahr, stellt dies eine Dienstpflichtverletzung dar, die disziplinar- oder arbeitsrechtlich verfolgt werden kann.\n\n' +
                            '(4) Die möglichen Sanktionen richten sich nach dem, was die einzelne Person getan oder unterlassen und/oder zu Mobbing beigetragen hat. Dabei werden insbesondere die Schwere und die Häufigkeit der Handlungen, der Umfang der Pflichtverletzungen sowie Einsicht und echtes Bemühen um Wiedergutmachung berücksichtigt.\n\n' +
                            'Bei Tarifbeschäftigten kann zum Beispiel eine Abmahnung, eine Umsetzung, ein Entzug von Führungsaufgaben, eine Änderungskündigung sowie eine Kündigung in Betracht kommen. Bei Beamtinnen und Beamten ist zum Beispiel ein Verweis, eine Geldbuße, eine Gehaltskürzung über einen längeren Zeitraum, eine Degradierung (Zurückstufung) oder eine Entfernung aus dem Dienst möglich.\n\n' +
                            '(5) Ob Pflichtverletzungen vorliegen, prüft die Abteilung Recht des Personal- und Organisationsreferates oder die jeweils zuständige Stelle. Sie sorgt dafür, dass nachweisbare Pflichtverletzungen geahndet werden.\n\n' +
                            'Die zuständigen Stellen, insbesondere die Führungskräfte und Geschäftsleitungen, sind verpflichtet, der Abteilung Recht die für die Prüfung notwendigen Auskünfte zu erteilen und Unterlagen vorzulegen.'
                    },
                    boss: {
                        title: '§ 6 DV Sanktionen und Konsequenzen \n\n',
                        text:
                            '(1) Die Ausübung, Hinnahme oder Förderung von Mobbinghandlungen stellen bei Tarifbeschäftigten einen Verstoß gegen ihre arbeitsvertragliche Pflicht zur Unterlassung betriebsschädigenden Verhaltens und bei Beamtinnen und Beamten ein Dienstvergehen dar. Gleichzeitig werden die Persönlichkeitsrechte der betroffenen Person verletzt.\n\n' +
                            '(2) Die Landeshauptstadt München verpflichtet sich, gegen Führungskräfte und Beschäftigte vorzugehen, die andere Beschäftigte nachweislich belästigen, benachteiligen, durch Mobbing in ihren Persönlichkeitsrechten verletzen oder solches Verhalten dulden. Damit die Abteilung Recht des Personal- und Organisationsreferates oder die jeweils zuständigen Stellen ihre Aufgabe erfüllen können, müssen die Beteiligten dorthin schriftlich Mitteilung machen.\n\n' +
                            '(3) Nimmt eine Führungskraft ihre Aufgaben nicht wahr, stellt dies eine Dienstpflichtverletzung dar, die disziplinar- oder arbeitsrechtlich verfolgt werden kann.\n\n' +
                            '(4) Die möglichen Sanktionen richten sich nach dem, was die einzelne Person getan oder unterlassen und/oder zu Mobbing beigetragen hat. Dabei werden insbesondere die Schwere und die Häufigkeit der Handlungen, der Umfang der Pflichtverletzungen sowie Einsicht und echtes Bemühen um Wiedergutmachung berücksichtigt.\n\n' +
                            'Bei Tarifbeschäftigten kann zum Beispiel eine Abmahnung, eine Umsetzung, ein Entzug von Führungsaufgaben, eine Änderungskündigung sowie eine Kündigung in Betracht kommen. Bei Beamtinnen und Beamten ist zum Beispiel ein Verweis, eine Geldbuße, eine Gehaltskürzung über einen längeren Zeitraum, eine Degradierung (Zurückstufung) oder eine Entfernung aus dem Dienst möglich.\n\n' +
                            '(5) Ob Pflichtverletzungen vorliegen, prüft die Abteilung Recht des Personal- und Organisationsreferates oder die jeweils zuständige Stelle. Sie sorgt dafür, dass nachweisbare Pflichtverletzungen geahndet werden.\n\n' +
                            'Die zuständigen Stellen, insbesondere die Führungskräfte und Geschäftsleitungen, sind verpflichtet, der Abteilung Recht die für die Prüfung notwendigen Auskünfte zu erteilen und Unterlagen vorzulegen.'
                    }
                }
            }
        ]
    } as unknown as TheDvFairStoreModuleState,
    getters: {
        [GETTER_GET_STEPS](state: TheDvFairStoreModuleState): DvFair[] {
            return state.steps;
        },
        [GETTER_GET_HEADERS](state: TheDvFairStoreModuleState): DvFair[] {
            return state.headers;
        },
    },
    filters: {
        [TRIM_STRING](str: string): string {
            return str.slice(9);
        }
    }
};

function toNamespace(toAddNamespace: string): string {
    return `${THE_DV_FAIR_MODULE_NAME}/${toAddNamespace}`;
}

export function getSteps(): string {
    return toNamespace(GETTER_GET_STEPS);
}

export function getHeaders(): string {
    return toNamespace(GETTER_GET_HEADERS);
}

export function trimString(): string {
    return toNamespace(TRIM_STRING);
}