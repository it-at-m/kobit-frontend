import TheAnlaufstellen from "@/features/the-unterstuetzungsfinder/features/the-contact-points/the-contact-points.vue";

export const THE_ANLAUFSTELLEN_ROUTE_NAME = "Anlaufstellen";
export const THE_ANLAUFSTELLEN_ROUTE_PATH = `/anlaufstellen/:id?`;
export const THE_ANLAUFSTELLEN_ROUTE_META_ICON = "mdi-card-account-details-outline";


export const theAnlaufstellenRoutes = {
    name: THE_ANLAUFSTELLEN_ROUTE_NAME,
    path: THE_ANLAUFSTELLEN_ROUTE_PATH,
    component: TheAnlaufstellen,
    props: true, // Pass route.params to props
    meta: {
        icon: THE_ANLAUFSTELLEN_ROUTE_META_ICON,
        infoText: `Sie finden hier einen Überblick über die Anlaufstellen für die Unterstützung in schwierigen Situationen und bei Konflikten. Diese sind in alphabetischer Reihenfolge angeordnet. Sie können sich sofort und direkt via E-Mail oder telefonisch mit der entsprechenden Anlaufstelle Ihrer Wahl in Verbindung setzen.`,
    },

};
