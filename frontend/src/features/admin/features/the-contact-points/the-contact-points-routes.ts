import ContactPointsOverview from "@/features/admin/features/the-contact-points/the-contact-points-overview.vue";

export const ADMIN_CONTACTPOINTS_PATH = "/admin/anlaufstellen/:id?";
export const ADMIN_CONTACTPOINTS_ROUTE_NAME = "Anlaufstellen bearbeiten";
export const ADMIN_CONTACTPOINTS_ICON = "mdi-card-account-details-outline";
export const ADMIN_CONTACTPOINTS_INFO_TEXT = "Hier können Anlaufstellen angelegt und verändert werden. ";

export const adminContactPointsRoutes = {
  name: ADMIN_CONTACTPOINTS_ROUTE_NAME,
  path: ADMIN_CONTACTPOINTS_PATH,
  component: ContactPointsOverview,
  meta: {
    icon: ADMIN_CONTACTPOINTS_ICON,
    infoText: ADMIN_CONTACTPOINTS_INFO_TEXT,
  },
  alias: "/admin/anlaufstellen", // Add alias to hide the :id parameter from hover text
};