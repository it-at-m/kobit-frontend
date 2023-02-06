import TheAngebote from "@/features/the-angebote/the-angebote.vue";

export const THE_ANGEBOTE_ROUTE_NAME = "Angebote";
export const THE_ANGEBOTE_ROUTE_PATH = "/angebote";
export const THE_ANGEBOTE_ROUTE_META_ICON = "mdi-ballot-outline";


export const theAngeboteRoutes = {
    name: THE_ANGEBOTE_ROUTE_NAME,
    path: THE_ANGEBOTE_ROUTE_PATH,
    component: TheAngebote,
    meta: {
        icon: THE_ANGEBOTE_ROUTE_META_ICON,
        infoText: `Hier finden Sie Angebote für Ihr Anliegen.`,
    },
};