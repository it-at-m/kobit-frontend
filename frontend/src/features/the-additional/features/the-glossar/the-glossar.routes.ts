import TheGlossar from "@/features/the-additional/features/the-glossar/the-glossar.vue";

export const GLOSSAR_ROUTE_NAME = "Glossar";
export const GLOSSAR_ROUTE_LINK = "/erfahre-mehr/glossar";
export const GLOSSAR_ROUTE_META_ICON = "mdi-page-next";
export const GLOSSAR_ROUTE_META_INFO_TEXT = "Hier finden Sie wichtige Definitionen und Erklärungen.";

export const glossarRoutes = {
    name: GLOSSAR_ROUTE_NAME,
    path: GLOSSAR_ROUTE_LINK,
    component: TheGlossar,
    meta: {
        icon: GLOSSAR_ROUTE_META_ICON,
        infoText: GLOSSAR_ROUTE_META_INFO_TEXT,
    },
    color:"#FF851B"
};