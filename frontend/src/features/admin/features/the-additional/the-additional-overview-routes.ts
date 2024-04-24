import AdditionalOverview from "@/features/admin/features/the-additional/the-additional-overview.vue";

export const ADMIN_ADDITIONAL_PATH = "/admin/erfahre-mehr";
export const ADMIN_ADDITIONAL_ROUTE_NAME = "Erfahre Mehr bearbeiten";
export const ADMIN_ADDITIONAL_ICON = "mdi-school";
export const ADMIN_ADDITIONAL_INFO_TEXT = "Hier können Erfahre Mehr Seiten bearbeitet und verändert werden.";


export const adminAdditionalRoutes = {
    name: ADMIN_ADDITIONAL_ROUTE_NAME,
    path: ADMIN_ADDITIONAL_PATH,
    component: AdditionalOverview,
    meta: {
        icon: ADMIN_ADDITIONAL_ICON,
        infoText: ADMIN_ADDITIONAL_INFO_TEXT
    }
};
