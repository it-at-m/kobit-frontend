import TheAnlaufstellen from "@/features/the-unterstuetzungsfinder/features/the-contact-points/the-contact-points.vue";

export const THE_ANLAUFSTELLEN_ROUTE_NAME = "Anlaufstellen";
export const THE_ANLAUFSTELLEN_ROUTE_PATH = `/anlaufstellen`;
export const THE_ANLAUFSTELLEN_ROUTE_META_ICON = "mdi-card-account-details-outline";


export const theAnlaufstellenRoutes = {
    name: THE_ANLAUFSTELLEN_ROUTE_NAME,
    path: THE_ANLAUFSTELLEN_ROUTE_PATH,
    component: TheAnlaufstellen,
    meta: {
        icon: THE_ANLAUFSTELLEN_ROUTE_META_ICON,
        infoText: `Hier finden Sie eine Übersicht über die Anlaufstellen, die Sie in schwierigen Situationen und Konflikten unterstützen. Diese sind in alphabetischer Reihenfolge angeordnet.`,
    }
};