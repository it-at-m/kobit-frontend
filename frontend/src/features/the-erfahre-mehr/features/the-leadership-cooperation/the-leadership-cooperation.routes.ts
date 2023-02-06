import TheLeadershipCooperation from "@/features/the-erfahre-mehr/features/the-leadership-cooperation/the-leadership-cooperation.vue";

export const LEADERSHIP_COOPERATION_ROUTE_LINK = "/erfahre-mehr/grundsaetze-fuer-fuehrung-und-zusammenarbeit";
export const LEADERSHIP_COOPERATION_ROUTE_NAME = "Grundsätze für Führung und Zusammenarbeit";
export const LEADERSHIP_COOPERATION_ROUTE_META_ICON = "mdi-handshake";
export const LEADERSHIP_COOPERATION_ROUTE_META_INFO_TEXT = "Hier finden Sie Informationen zu den Grundsätzen, die auch für den Umgang mit Konflikten gelten.";

export const leadershipCooperationRoutes = {
    name: LEADERSHIP_COOPERATION_ROUTE_NAME,
    path: LEADERSHIP_COOPERATION_ROUTE_LINK,
    component: TheLeadershipCooperation,
    meta: {
        icon: LEADERSHIP_COOPERATION_ROUTE_META_ICON,
        infoText: LEADERSHIP_COOPERATION_ROUTE_META_INFO_TEXT
    },
    color:"#0074D9"
};