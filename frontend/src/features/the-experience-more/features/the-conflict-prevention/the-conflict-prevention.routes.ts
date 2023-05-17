import TheConflictPrevention from "@/features/the-experience-more/features/the-conflict-prevention/the-conflict-prevention.vue";

export const CONFLICT_PREVENTION_ROUTE_LINK = "/erfahre-mehr/konfliktpreavention";
export const CONFLICT_PREVENTION_ROUTE_NAME = "Konfliktprävention";
export const CONFLICT_PREVENTION_ROUTE_META_ICON = "mdi-close-octagon";
export const CONFLICT_PREVENTION_ROUTE_META_INFO_TEXT = "Hier finden Sie Informationen, wie Sie Konflikten vorbeugen und sie zeitnah ansprechen können.";

export const conflictPreventionRoutes = {
    name: CONFLICT_PREVENTION_ROUTE_NAME,
    path: CONFLICT_PREVENTION_ROUTE_LINK,
    component: TheConflictPrevention,
    meta: {
        icon: CONFLICT_PREVENTION_ROUTE_META_ICON,
        infoText: CONFLICT_PREVENTION_ROUTE_META_INFO_TEXT
    },
    color: "#3D9970"
};