import TheLeadershipCooperation from "@/features/admin/features/the-experience-more/features/the-leadership-cooperation/the-leadership-cooperation.vue";

export const ADMIN_LEADERSHIP_COOPERATION_ROUTE_LINK = "/admin/erfahre-mehr/grundsaetze-fuer-fuehrung-und-zusammenarbeit";
export const ADMIN_LEADERSHIP_COOPERATION_ROUTE_NAME = "Grundsätze für Führung und Zusammenarbeit Bearbeiten";
export const ADMIN_LEADERSHIP_COOPERATION_ROUTE_META_ICON = "mdi-handshake";
export const ADMIN_LEADERSHIP_COOPERATION_ROUTE_META_INFO_TEXT = "Hier können Sie die Grundsätze für Führung und Zusammenarbeit Seite verändern.";

export const adminLeadershipCooperationRoutes = {
    name: ADMIN_LEADERSHIP_COOPERATION_ROUTE_NAME,
    path: ADMIN_LEADERSHIP_COOPERATION_ROUTE_LINK,
    component: TheLeadershipCooperation,
    meta: {
        icon: ADMIN_LEADERSHIP_COOPERATION_ROUTE_META_ICON,
        infoText: ADMIN_LEADERSHIP_COOPERATION_ROUTE_META_INFO_TEXT
    },
    color:"#0074D9"
};