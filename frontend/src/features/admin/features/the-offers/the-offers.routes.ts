import OffersOverview from "@/features/admin/features/the-offers/the-offers-overview.vue";


export const ADMIN_OFFERS_PATH = "/admin/angebote/:id?";
export const ADMIN_OFFERS_ROUTE_NAME = "Angebote bearbeiten";
export const ADMIN_OFFERS_ICON = "mdi-ballot-outline";
export const ADMIN_OFFERS_INFO_TEXT = "Hier können Anlaufstellen angelegt und verändert werden.";

export const adminOffersRoutes = {
  name: ADMIN_OFFERS_ROUTE_NAME,
  path: ADMIN_OFFERS_PATH,
  component: OffersOverview,
  meta: {
    icon: ADMIN_OFFERS_ICON,
    infoText: ADMIN_OFFERS_INFO_TEXT,
  },
  alias: "/admin/angebote", // Add alias to hide the :id parameter from hover text
};