import Glossar from "@/features/the-erfahre-mehr/features/the-glossar/Glossar.type";

export const THE_GLOSSAR_MODULE_NAME = 'theGlossarStoreModule';
export const GETTER_GET_GLOSSARS = "GETTER_GET_GLOSSARS";

export interface TheGlossarStoreModuleState {
    glossars: Glossar[];
}

export const theGlossarStoreModule = {
    namespaced: true,
    state: {
        glossars: [
            {
                word: "Coaching:",
                definition:
                "Coaching ist die individuelle, ziel- und lösungsorientierte sowie zeitlich begrenzte Unterstützung für ein breites Spektrum berufs- und arbeitsplatzbezogener Fragestellungen. Im Coaching werden eigene Ressourcen wie Kommunikationsstile, Feedback geben oder Aktives Zuhören gestärkt. Ziel von Coaching ist die Förderung von Selbstreflexion und Selbststeuerung bei den städtischen Führungskräften, die Verbesserung der eigenen Wahrnehmung, Perspektivwechsel und die Entwicklung neuer Verhaltensoptionen."
            },
            {
                word: "Diskriminierung:",
                definition: "Im allgemeinen Sprachgebrauch versteht man unter einer Diskriminierung die Herabwürdigung von Menschen oder eine Schlechterbehandlung, ohne dass es einen Grund dafür gibt. Im AGG wird der Begriff Diskriminierung nicht verwendet, sondern das Wort Benachteiligung. Denn nicht jede unterschiedliche Behandlung, die einen Nachteil zur Folge hat, muss diskriminierend sein.  In sehr engen Grenzen sind zum Beispiel unterschiedliche Behandlungen im Beruf zulässig, wenn die geforderte Eigenschaft für die Ausübung der Tätigkeit wesentlich und fast unerlässlich ist."
            },
            {
                word: "Dienstvereinbarung Fairer Umgang und gegen Mobbing (DV-fair):",
                definition:
                    "Die Dienstvereinbarung zum fairen Umgang am Arbeitsplatz und gegen Mobbing findet Anwendung bei Mobbing aber auch bei belastenden Konflikten, die sich von Mobbing nicht eindeutig abgrenzen lassen. Der Fokus der neuen Dienstvereinbarung liegt auf der Prävention und dem Beitrag aller Beschäftigten zu einem konstruktiven Miteinander.\n\nBetroffene sowie deren Führungskräfte können sich an dem Leitfaden orientieren, der in genauen Verfahrensschritten regelt, wie in Mobbing- und Konfliktsituationen vorgegangen werden soll."
            },
            {
                word: "Eskalationsstufen nach Glasl:",
                definition:
                    "Das Modell der 9 Eskalationsstufen nach Glasl dient dazu, sich im Konfliktgeschehen zu orientieren und zu erkennen, wo sich die Konfliktparteien in der Entwicklung des Konflikts befinden."
            },
            {
                word: "Konfliktnavigator:",
                definition:
                    "Der Konfliktnavigator (ein wollmux-Formular) bietet die Möglichkeit, durch ausgewählte Fragen die Situation zu reflektieren und zu analysieren.  Die*der Anwender*in erhält dadurch die Chance, mehr Klarheit für sich zu gewinnen und erste Handlungsschritte für sich zu erkennen."
            },
            {
                word: "Häusliche Gewalt:",
                definition:
                    "Häusliche Gewalt ist jede Art körperlicher, seelischer oder sexueller Misshandlung zwischen Personen, die innerhalb einer bestehenden oder im Zusammenhang mit einer früheren häuslichen Gemeinschaft oder Beziehung verübt, versucht oder angedroht wird. Sie ist gekennzeichnet durch den Missbrauch von Macht und das Ausüben von Kontrolle über einen anderen Menschen."
            },
            {
                word: "Konflikt:",
                definition:
                    "Von einem Konflikt (lat. confligere = zusammentreffen, kämpfen) spricht man im Falle einer durch das Aufeinanderprallen widerstreitender Auffassungen, Interessen oder Ähnlichem entstandenen schwierigen Situation, die zum Zerwürfnis führen kann.\n\nEine häufig verwendete Begriffsdefinition ist die von Prof. Dr. rer. Pol., Dr. h.c. Friedrich Glasl für den sozialen Konflikt. Ein sozialer Konflikt ist demnach eine Interaktion zwischen Aktoren (Individuen, Gruppen, Organisationen usw.), wobei wenigstens ein Aktor Unvereinbarkeiten im Denken/Vorstellen/Wahrnehmen und/oder Fühlen und/oder Wollen mit dem anderen Aktor (den anderen Aktoren) in der Art erlebt, dass im Realisieren eine Beeinträchtigung durch einen anderen Aktor (die anderen Aktoren) erfolgt.\n\nWeitere Definitionen finden Sie in Anlage 1 der Dienstvereinbarung zum fairen Umgang und gegen Mobbing (DV-fair)."
            },
            {
                word: "Konfliktmanagement:",
                definition:
                    "Konfliktmanagement ist der systematische, bewusste und zielgerichtete Umgang mit Konflikten. Auswahl und Gestaltung eines geeigneten Verfahrens sollen Transparenz, Steuerbarkeit und Effizienz der Konfliktbearbeitung sicherstellen."
            },
            {
                word: "Konfliktprävention:",
                definition:
                    "Eine gute Kommunikationskultur stärkt die Konfliktfähigkeit jeder*jedes Einzelnen. Prävention von Konflikten bedeutet nicht, dass Streit und Konflikte verhindert werden. Vielmehr liegt der Gedanke der Prävention in der Stärkung der individuellen Konfliktfähigkeit. Denn wo offen und wertschätzend miteinander gesprochen wird und Wege, Aufgaben und Rollen transparent sind, können auch frühzeitig schwierige Anlässe bearbeitet und Lösungen gefunden werden, bereits bevor der Konflikt entsteht oder eskaliert."
            },
            {
                word: "Mediation:",
                definition:
                    "Mediation bedeutet Vermittlung und ist eine moderne, sehr wirksame Methode zur Beilegung von Konflikten. Unter Leitung der*des Mediator*in, entwickeln die Parteien selbst in einem strukturierten, vertraulichen Verfahren zukunftsorientierte Lösungen für ihren Konflikt.\n\nEin*e Mediator*in ist eine unabhängige und neutrale Person ohne Entscheidungsbefugnis, die die Parteien durch die Mediation führt."
            },
            {
                word: "Moderation:",
                definition:
                    "Moderation ist eine Methode zur gemeinsamen Arbeit in Gruppen, die durch eine*einen Moderator*in unterstützt wird.\n\nEine Moderation ist insbesondere sinnvoll, wenn:\n•	die Meinungen, Erfahrungen und die Kreativität mehrerer Personen für die Zielerreichung wichtig ist\n•	kritische oder konfliktträchtige Problemstellungen gelöst werden sollen\n•	komplexe Fragestellungen zu bearbeiten sind oder\n•	Informationsveranstaltungen für große Gruppen durchzuführen sind."
            },
            {
                word: "Mobbing:",
                definition:
                    "Mobbing liegt vor, wenn jemand am Arbeitsplatz oder in Zusammenhang mit dem Beschäftigungsverhältnis durch mehrere Verhaltensweisen, häufig, über einen längeren Zeitraum, mit dem Ziel der Ausgrenzung, gezielt schikaniert, drangsaliert oder benachteiligt und ausgegrenzt wird und dabei unterlegen ist. (§ 3 Abs.4 DV-fair)\n\nMobbing liegt im Regelfall nicht vor:\n•   bei einmaligen Konflikten oder kurzfristigen Konfliktsituationen,\n•   bei Auseinandersetzungen über Schlechtleistungen, dienstliches Fehlverhalten und Fragen der Leistungsfähigkeit,\n•   bei einzelnen Konflikten, die bei jeder Zusammenarbeit gelegentlich auftreten,\n•   bei einem sich steigernden Konflikt, zu dem die Konfliktbeteiligten wechselseitig beigetragen haben. (§ 3 Abs.5 DV-fair)"
            },
            {
                word: "Sexuelle Belästigung:",
                definition:
                    "Sexuelle Belästigung am Arbeitsplatz ist jedes unerwünschte, sexuell bestimmte, körperliche, verbale oder nonverbale Verhalten, das bezweckt oder bewirkt, dass die Würde der betreffenden Person verletzt wird; insbesondere unerwünschte sexuelle Handlungen und Aufforderungen zu diesen, sexuell bestimmte körperliche Berührungen, Bemerkungen sexuellen Inhalts sowie unerwünschtes Zeigen und sichtbares Anbringen von pornographischen Darstellungen, auch mittels IT.\n\nWenn sich ein*e Mitarbeiter*in sexuell belästigt fühlt, kann sie*er sich jederzeit  – ohne Einhaltung des Dienstweges – an die Zentrale Beschwerdestelle für sexuelle Belästigung oder wahlweise an die zentrale Beschwerdestelle nach dem AGG wenden."
            },            
            {
                word: "strukturierter Klärungsdialog:",
                definition:
                    "Ein strukturierter Klärungsdialog ist eine Methode, die bei Konflikten zwischen verschiedenen Abteilungen und bei Konflikten zwischen Führungskraft und Team von der zentralen Anlaufstelle für Mediation und Konfliktmanagement angeboten wird. Der Strukturierte Klärungsdialog ist im Gegensatz zur klassischen Mediation auch verpflichtend möglich. Die Mediator*innen, die die Klärungsdialoge strukturieren und moderieren, arbeiten vertraulich und unterstützen Sie während des gesamten Verfahrens. Ziele sind der durch die Mediator*innen moderierte Dialog und das Finden gemeinsamer Lösungen."
            },
            {
                word: "Teamentwicklung:",
                definition:
                "Teamentwicklungsmaßnahmen haben das Ziel, die Zusammenarbeit und die Kommunikation im Team zu verbessern, Arbeitsabläufe zu optimieren und Veränderungs- und Strategieprozesse vorzubereiten oder zu gestalten.\n\nTeamentwicklungsmaßnahmen können auch genutzt werden, um konfliktreiche Themen anzugehen. Durch das Know-How und das Erfahrungswissen können externe Trainer*innen ein Team bei der Bearbeitung von kritischen und schwierigen Fragestellungen unterstützen. Sie haben eher präventiven Charakter und sind für Konflikte mit niedriger Eskalationsstufe sinnvoll."
            }, 
        ]
    } as TheGlossarStoreModuleState,
    getters: {
        [GETTER_GET_GLOSSARS](state: TheGlossarStoreModuleState): Glossar[] {
            const sortedGlossar = JSON.parse(JSON.stringify(state.glossars));
            return sortedGlossar.sort((a: { word: string }, b: { word: string }) => a.word.localeCompare(b.word));
        }
    }
};

function toNamespace(toAddNamespace: string): string {
    return `${THE_GLOSSAR_MODULE_NAME}/${toAddNamespace}`;
}

export function getGlossars(): string {
    return toNamespace(GETTER_GET_GLOSSARS);
}
