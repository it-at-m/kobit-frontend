import TheAnlaufstellen from "@/features/the-unterstuetzungsfinder/features/the-contact-points/the-contact-points.vue";

export const THE_ANLAUFSTELLEN_ROUTE_NAME = "Anlaufstellen";
export const THE_ANLAUFSTELLEN_ROUTE_PATH = `/anlaufstellen/:id?`;
export const THE_ANLAUFSTELLEN_ROUTE_META_ICON = "mdi-card-account-details-outline";
export const THE_ANLAUFSTELLEN_INFO_TEXT = "Sie können sich auch direkt an eine Anlaufstelle wenden. Hier finden Sie eine Übersicht über die Anlaufstellen, die Sie in schwierigen Situationen und Konflikten unterstützen. Diese sind in alphabetischer Reihenfolge angeordnet.";

export const theAnlaufstellenRoutes = {
    name: THE_ANLAUFSTELLEN_ROUTE_NAME,
    path: THE_ANLAUFSTELLEN_ROUTE_PATH,
    component: TheAnlaufstellen,
    props: true, // Pass route.params to props
    meta: {
        icon: THE_ANLAUFSTELLEN_ROUTE_META_ICON,
        infoText: THE_ANLAUFSTELLEN_INFO_TEXT,
    },

};
