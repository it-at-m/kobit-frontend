import TheDownloads from "@/features/the-additional/features/the-downloads/the-downloads.vue";

export const DOWNLOADS_ROUTE_LINK = "/erfahre-mehr/downloads-und-links";
export const DOWNLOADS_ROUTE_NAME = "Downloads";
export const DOWNLOADS_ROUTE_META_ICON = "mdi-download";
export const DOWNLOADS_ROUTE_META_INFO_TEXT = "Hier finden Sie alle Downloads.";

export const downloadsRoutes = {
    name: DOWNLOADS_ROUTE_NAME,
    path: DOWNLOADS_ROUTE_LINK,
    component: TheDownloads,
    meta: {
        icon: DOWNLOADS_ROUTE_META_ICON,
        infoText: DOWNLOADS_ROUTE_META_INFO_TEXT
    },
    color:"#FFDC00"
};
