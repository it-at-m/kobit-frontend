import TheDVFair from "@/features/the-additional/features/the-dv-fair/the-dv-fair.vue";

export const DV_FAIR_ROUTE_NAME = "DV-fair";
export const DV_FAIR_ROUTE_LINK = "/erfahre-mehr/dv-fair";
export const DV_FAIR_ROUTE_META_ICON = "mdi-file";
export const DV_FAIR_ROUTE_META_INFO_TEXT = "Hier finden Sie die einzelnen Schritte des Verfahrensablaufs nach der Dienstvereinbarung zum fairen Umgang am Arbeitsplatz und gegen Mobbing. ";

export const dvFairRoutes = {
    name: DV_FAIR_ROUTE_NAME,
    path: DV_FAIR_ROUTE_LINK,
    component: TheDVFair,
    meta: {
        icon: DV_FAIR_ROUTE_META_ICON,
        infoText: DV_FAIR_ROUTE_META_INFO_TEXT,
    },
    color:"#FF4136"
};