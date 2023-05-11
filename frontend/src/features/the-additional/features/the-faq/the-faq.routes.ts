import TheFaq from "@/features/the-additional/features/the-faq/the-faq.vue";

export const FAQ_ROUTE_NAME = "FAQ";
export const FAQ_ROUTE_LINK = "/erfahre-mehr/faq";
export const FAQ_ROUTE_META_ICON = "mdi-frequently-asked-questions";
export const FAQ_ROUTE_META_INFO_TEXT = "Hier finden Sie häufig gestellte Fragen.";

export const faqRoutes = {
    name: FAQ_ROUTE_NAME,
    path: FAQ_ROUTE_LINK,
    component: TheFaq,
    meta: {
        icon: FAQ_ROUTE_META_ICON,
        infoText: FAQ_ROUTE_META_INFO_TEXT,
    },
    color:"#85144b"
};