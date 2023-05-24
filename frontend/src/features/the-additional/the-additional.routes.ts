import TheErfahreMehr from "@/features/the-additional/the-additional.vue";
export const THE_ERFAHRE_MEHR_ROUTE_PATH = "/erfahre-mehr";
export const THE_ERFAHRE_MEHR_ROUTE_NAME = "Erfahre Mehr";
export const THE_ERFAHRE_MEHR_ROUTE_META_ICON = "mdi-school";
export const THE_ERFAHRE_MEHR_ROUTE_META_INFO_TEXT = "Hier finden Sie Informationen zum Thema „Umgang mit Konflikten“, von der DV-fair über die Eskalationsstufen nach Glasl bis hin zu FAQs.";


export const erfahreMehrRoutes = {
    name: THE_ERFAHRE_MEHR_ROUTE_NAME,
    path: THE_ERFAHRE_MEHR_ROUTE_PATH,
    component: TheErfahreMehr,
    meta: {
        icon: THE_ERFAHRE_MEHR_ROUTE_META_ICON,
        infoText: THE_ERFAHRE_MEHR_ROUTE_META_INFO_TEXT
    }
};
