import SupportFinderAdmin from "@/features/admin/components/u-finder/SupportFinderAdmin.vue";

export const THE_UNTERSTUETZUNGSFINDER_ADMIN_ROUTE_PATH = "/admin/unterstuetzungsfinder";
export const THE_UNTERSTUETZUNGSFINDER_ADMIN_ROUTE_NAME = "Unterstützungsfinder - Admin Bereich";
export const THE_UNTERSTUETZUNGSFINDER_ROUTE_META_ICON = "mdi-arrow-decision";
export const THE_UNTERSTUETZUNGSFINDER_ADMIN_ROUTE_META_INFO_TEXT = `Hier können sie den einzelnen Pfaden des Unterstützungsfinder entsprechende Anlaufstellen zuordnen. Dafür müssen die einzelnen Pfade genau wie im "normalen" Unterstützungsfinder durchlaufen werden.`;

export const adminUFinderRoutes = {
    name: THE_UNTERSTUETZUNGSFINDER_ADMIN_ROUTE_NAME,
    path: THE_UNTERSTUETZUNGSFINDER_ADMIN_ROUTE_PATH,
    component: SupportFinderAdmin,
    meta: {
        icon: THE_UNTERSTUETZUNGSFINDER_ROUTE_META_ICON,
        infoText: THE_UNTERSTUETZUNGSFINDER_ADMIN_ROUTE_META_INFO_TEXT
    }
};
