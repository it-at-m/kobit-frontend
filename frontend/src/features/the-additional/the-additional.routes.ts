import TheErfahreMehr from "@/features/the-additional/the-additional.vue";
export const THE_ERFAHRE_MEHR_ROUTE_PATH = "/erfahre-mehr";
export const THE_ERFAHRE_MEHR_ROUTE_NAME = "Erfahre Mehr";
export const THE_ERFAHRE_MEHR_ROUTE_META_ICON = "mdi-school";
export const THE_ERFAHRE_MEHR_ROUTE_META_INFO_TEXT = "Hier finden Sie Informationen zu allen Anlaufstellen.";


export const erfahreMehrRoutes = {
    name: THE_ERFAHRE_MEHR_ROUTE_NAME,
    path: THE_ERFAHRE_MEHR_ROUTE_PATH,
    component: TheErfahreMehr,
    meta: {
        icon: THE_ERFAHRE_MEHR_ROUTE_META_ICON,
        infoText: THE_ERFAHRE_MEHR_ROUTE_META_INFO_TEXT
    }
};
