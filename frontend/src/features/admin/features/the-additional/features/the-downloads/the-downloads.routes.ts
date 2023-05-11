import TheDownloads from "@/features/admin/features/the-additional/features/the-downloads/the-downloads.vue";

export const ADMIN_DOWNLOADS_ROUTE_LINK = "/admin/erfahre-mehr/downloads-und-links";
export const ADMIN_DOWNLOADS_ROUTE_NAME = "Downloads Bearbeiten";
export const ADMIN_DOWNLOADS_ROUTE_META_ICON = "mdi-download";
export const ADMIN_DOWNLOADS_ROUTE_META_INFO_TEXT = "Hier können Sie Dateien für die Download Seite anlegen und verändern.";

export const adminDownloadsRoutes = {
    name: ADMIN_DOWNLOADS_ROUTE_NAME,
    path: ADMIN_DOWNLOADS_ROUTE_LINK,
    component: TheDownloads,
    meta: {
        icon: ADMIN_DOWNLOADS_ROUTE_META_ICON,
        infoText: ADMIN_DOWNLOADS_ROUTE_META_INFO_TEXT
    },
    color:"#FFDC00"
};
