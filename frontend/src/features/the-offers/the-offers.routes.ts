import TheOffers from "@/features/the-offers/the-offers.vue";

export const THE_OFFER_ROUTE_NAME = "Angebote";
export const THE_OFFER_ROUTE_PATH = "/angebot/:id?"; // Add ":id" as a dynamic route parameter
export const THE_OFFER_ROUTE_META_ICON = "mdi-ballot-outline";
export const THE_OFFER_ROUTE_META_INFO_TEXT = "Hier finden Sie Angebote für Ihr Anliegen.";

export const theOfferRoutes = {
  name: THE_OFFER_ROUTE_NAME,
  path: THE_OFFER_ROUTE_PATH,
  component: TheOffers,
  meta: {
    icon: THE_OFFER_ROUTE_META_ICON,
    infoText: THE_OFFER_ROUTE_META_INFO_TEXT
  },
};