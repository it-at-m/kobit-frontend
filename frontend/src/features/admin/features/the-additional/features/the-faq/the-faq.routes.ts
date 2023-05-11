import TheFaq from "@/features/admin/features/the-additional/features/the-faq/the-faq.vue";

export const ADMIN_FAQ_ROUTE_NAME = "FAQ Bearbeiten";
export const ADMIN_FAQ_ROUTE_LINK = "/admin/erfahre-mehr/faq";
export const ADMIN_FAQ_ROUTE_META_ICON = "mdi-frequently-asked-questions";
export const ADMIN_FAQ_ROUTE_META_INFO_TEXT = "Hier können Sie die FAQs für die FAQ Seite anlegen und verändern.";

export const adminFaqRoutes = {
    name: ADMIN_FAQ_ROUTE_NAME,
    path: ADMIN_FAQ_ROUTE_LINK,
    component: TheFaq,
    meta: {
        icon: ADMIN_FAQ_ROUTE_META_ICON,
        infoText: ADMIN_FAQ_ROUTE_META_INFO_TEXT,
    },
    color:"#85144b"
};