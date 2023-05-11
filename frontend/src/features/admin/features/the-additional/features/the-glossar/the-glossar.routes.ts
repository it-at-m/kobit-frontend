import TheGlossar from "@/features/admin/features/the-additional/features/the-glossar/the-glossar.vue";

export const ADMIN_GLOSSAR_ROUTE_NAME = "Glossar Bearbeiten";
export const ADMIN_GLOSSAR_ROUTE_LINK = "/admin/erfahre-mehr/glossar";
export const ADMIN_GLOSSAR_ROUTE_META_ICON = "mdi-page-next";
export const ADMIN_GLOSSAR_ROUTE_META_INFO_TEXT = "Hier können Sie die Wörter mit Definitionen für die Glossar Seite anlegen und verändern.";

export const adminGlossarRoutes = {
    name: ADMIN_GLOSSAR_ROUTE_NAME,
    path: ADMIN_GLOSSAR_ROUTE_LINK,
    component: TheGlossar,
    meta: {
        icon: ADMIN_GLOSSAR_ROUTE_META_ICON,
        infoText: ADMIN_GLOSSAR_ROUTE_META_INFO_TEXT,
    },
    color:"#FF851B"
};