import TheUnterstuetzungsfinder from "@/features/the-unterstuetzungsfinder/the-unterstuetzungsfinder.vue";

export const THE_UNTERSTUETZUNGSFINDER_ROUTE_PATH = "/unterstuetzungsfinder";
export const THE_UNTERSTUETZUNGSFINDER_ROUTE_NAME = "Unterstützungsfinder";
export const THE_UNTERSTUETZUNGSFINDER_ROUTE_META_ICON = "mdi-arrow-decision";
export const THE_UNTERSTUETZUNGSFINDER_ROUTE_META_INFO_TEXT = `Auf dieser Seite erhalten Sie eine Empfehlung für die geeignete Anlaufstelle in Ihrer aktuellen Situation. Wenige Fragen helfen Ihnen bei der Auswahl. `;
export const THE_UNTERSTUETZUNGSFINDER_ROUTE_META_INFO_TEXT_COMPLETE = `Auf dieser Seite erhalten Sie eine Empfehlung für die geeignete Anlaufstelle in Ihrer aktuellen Situation. Wenige Fragen helfen Ihnen bei der Auswahl. Klicken Sie dazu jeweils das Feld an, das aus Ihrer Sicht am besten zum Anliegen passt. Es werden keinerlei Informationen gespeichert. `;

export const theUnterstuetzungsfinderRoutes = {
    name: THE_UNTERSTUETZUNGSFINDER_ROUTE_NAME,
    path: THE_UNTERSTUETZUNGSFINDER_ROUTE_PATH,
    component: TheUnterstuetzungsfinder,
    meta: {
        icon: THE_UNTERSTUETZUNGSFINDER_ROUTE_META_ICON,
        infoText: THE_UNTERSTUETZUNGSFINDER_ROUTE_META_INFO_TEXT,
        infoTextComplete: THE_UNTERSTUETZUNGSFINDER_ROUTE_META_INFO_TEXT_COMPLETE
    }
};
