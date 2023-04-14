export enum Competence {


    WORKPLACE_CONFLICT = "WORKPLACE_CONFLICT",
    MOBBING = "MOBBING",
    DISCRIMINATION = "DISCRIMINATION",
    ANTI_DEMOCRACY = "ANTI_DEMOCRACY",
    SEXUAL_HARASSMENT = "SEXUAL_HARASSMENT",
    DOMESTIC_VIOLENCE = "DOMESTIC_VIOLENCE",
    PRIVATE_PROBLEMS = "PRIVATE_PROBLEMS",
    HEALTH_PROBLEMS = "HEALTH_PROBLEMS",

    EMPLOYEE = "EMPLOYEE",
    EXECUTIVE = "EXECUTIVE",
    JUNIOR = "JUNIOR",

    OPPOSITE_EMPLOYEE = "OPPOSITE_EMPLOYEE",
    OPPOSITE_JUNIOR = "OPPOSITE_JUNIOR",
    OPPOSITE_EXECUTIVE = "OPPOSITE_EXECUTIVE",
    OPPOSITE_OTHER_TEAM = "OPPOSITE_OTHER_TEAM",

    STRESS_LOW = "STRESS_LOW",
    STRESS_MEDIUM = "STRESS_MEDIUM",
    STRESS_HIGH = "STRESS_HIGH",

    ESCALATION_LOW = "ESCALATION_LOW",
    ESCALATION_MEDIUM = "ESCALATION_MEDIUM",
    ESCALATION_HIGH = "ESCALATION_HIGH",


    ETHNIC_RACIAL = "ETHNIC_RACIAL",
    DISABLED = "DISABLED",
    SEXUAL_IDENTITY = "SEXUAL_IDENTITY",

    EQUALITY = "EQUALITY",
    LGBTIQ = "LGBTIQ",

    ADDICTION = "ADDICTION",
    PHYSICAL = "PHYSICAL",
    PSYCHOLOGICAL = "PSYCHOLOGICAL",

}

export const competenceToText = new Map<string,string[]> ([


    [Competence.WORKPLACE_CONFLICT,["Arbeitsplatzkonflikt", "Das Aufeinanderprallen widerstreitender Auffassungen, Interessen oder Ähnlichem entstandenen schwierigen Situation, die zum Zerwürfnis führen kann."]],
    [Competence.MOBBING,["Mobbing", "Gezieltes Anfeinden, Schikanieren und Diskriminieren von Kolleg*innen untereinander oder durch Vorgesetzte mit dem Ziel der Ausgrenzung"]],
    [Competence.DISCRIMINATION,["Diskriminierung", "Herabwürdigung von Menschen oder eine Schlechterbehandlung ohne Grund"]],
    [Competence.ANTI_DEMOCRACY,["Demokratiefeindlichkeit", "Einstellung/Haltung, die sich gegen Demokratie richtet"]],
    [Competence.SEXUAL_HARASSMENT,["Sexuelle Belästigung", "Jedes unerwünschte, sexuell bestimmte, körperliche, verbale oder nonverbale Verhalten, das bezweckt oder bewirkt, dass die Würde der betreffenden Person verletzt wird."]],
    [Competence.DOMESTIC_VIOLENCE,["Häusliche Gewalt", "Häusliche Gewalt ist jede Art körperlicher, seelischer oder sexueller Misshandlung zwischen Personen die innerhalb einer bestehenden oder im Zusammenhang mit einer früheren häuslichen Gemeinschaft oder Beziehung verübt, versucht oder angedroht wird."]],
    [Competence.PRIVATE_PROBLEMS,["Private Probleme", "Familiäre und partnerschaftliche Probleme, schwere Erkrankungen, Verlust, Überforderungen im Alltag, Umbruchsituationen"]],
    [Competence.HEALTH_PROBLEMS,["Gesundheitliche Probleme", ""]],


    [Competence.EMPLOYEE,["Mitarbeiter*in", ""]],
    [Competence.EXECUTIVE,["Führungskraft", ""]],
    [Competence.JUNIOR,["Nachwuchskraft", ""]],

    [Competence.OPPOSITE_EMPLOYEE,["Kolleg*in", ""]],
    [Competence.OPPOSITE_JUNIOR,["Nachwuchskraft", ""]],
    [Competence.OPPOSITE_EXECUTIVE,["Führungskraft", ""]],
    [Competence.OPPOSITE_OTHER_TEAM,["teamübergreifend", ""]],


    [Competence.STRESS_LOW,["Geringe Belastung", ""]],
    [Competence.STRESS_MEDIUM,["Mittlere Belastung", ""]],
    [Competence.STRESS_HIGH,["Hohe Belastung", ""]],

    [Competence.ESCALATION_LOW,["Gering verschärft", ""]],
    [Competence.ESCALATION_MEDIUM,["Mittel verschärft", ""]],
    [Competence.ESCALATION_HIGH,["Hoch verschärft", ""]],

    [Competence.ETHNIC_RACIAL,["Diskriminierung aufgrund ethnischer oder rassistischer Motive, Religion oder Weltanschauung, Alter", ""]],
    [Competence.DISABLED,["Diskriminierung aufgrund Behinderung", ""]],
    [Competence.SEXUAL_IDENTITY,["Diskriminierung aufgrund sexueller oder geschlechtlicher Identität", ""]],

    [Competence.EQUALITY,["Gleichstellung Mann Frau", ""]],
    [Competence.LGBTIQ,["LGBTIQ*", ""]], 

    [Competence.ADDICTION,["Suchtprobleme", ""]],
    [Competence.PHYSICAL,["körperliche Probleme", ""]],
    [Competence.PSYCHOLOGICAL,["psychische Probleme", ""]],


]);


export default {
    Competence
};