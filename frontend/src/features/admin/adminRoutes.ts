import AdminOverview from "@/features/admin/AdminOverview.vue";

export const ADMIN_PATH = "/admin";
export const ADMIN_ROUTE_NAME = "Admin";
export const ADMIN_ICON = "mdi-school";
export const ADMIN_INFO_TEXT = "Hier können Sie änderungen an Inhalten vornehmen.";


export const adminRoutes = {
    name: ADMIN_ROUTE_NAME,
    path: ADMIN_PATH,
    component: AdminOverview,
    meta: {
        icon: ADMIN_ICON,
        infoText: ADMIN_INFO_TEXT
    }
};
