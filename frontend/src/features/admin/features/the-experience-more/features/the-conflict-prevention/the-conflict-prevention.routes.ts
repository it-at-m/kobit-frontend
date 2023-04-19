import TheConflictPrevention from "@/features/admin/features/the-experience-more/features/the-conflict-prevention/the-conflict-prevention.vue";

export const ADMIN_CONFLICT_PREVENTION_ROUTE_LINK = "/admin/erfahre-mehr/konfliktpreavention";
export const ADMIN_CONFLICT_PREVENTION_ROUTE_NAME = "Konfliktprävention Bearbeiten";
export const ADMIN_CONFLICT_PREVENTION_ROUTE_META_ICON = "mdi-close-octagon";
export const ADMIN_CONFLICT_PREVENTION_ROUTE_META_INFO_TEXT = "Hier können Sie die Konfliktprävention Seite verändern.";

export const adminConflictPreventionRoutes = {
    name: ADMIN_CONFLICT_PREVENTION_ROUTE_NAME,
    path: ADMIN_CONFLICT_PREVENTION_ROUTE_LINK,
    component: TheConflictPrevention,
    meta: {
        icon: ADMIN_CONFLICT_PREVENTION_ROUTE_META_ICON,
        infoText: ADMIN_CONFLICT_PREVENTION_ROUTE_META_INFO_TEXT
    },
    color: "#3D9970"
};