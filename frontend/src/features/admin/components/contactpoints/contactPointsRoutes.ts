import ContactPointsOverview from "@/features/admin/components/contactpoints/ContactPointsOverview.vue";

export const ADMIN_CONTACTPOINTS_PATH = "/admin/contactpoints";
export const ADMIN_CONTACTPOINTS_ROUTE_NAME = "Anlaufstellen bearbeiten";
export const ADMIN_CONTACTPOINTS_ICON = "mdi-card-account-details-outline";
export const ADMIN_CONTACTPOINTS_INFO_TEXT = "Hier können Anlaufstellen angelegt und verändert werden. ";


export const adminContactPointsRoutes = {
    name: ADMIN_CONTACTPOINTS_ROUTE_NAME,
    path: ADMIN_CONTACTPOINTS_PATH,
    component: ContactPointsOverview,
    meta: {
        icon: ADMIN_CONTACTPOINTS_ICON,
        infoText: ADMIN_CONTACTPOINTS_INFO_TEXT
    }
};
