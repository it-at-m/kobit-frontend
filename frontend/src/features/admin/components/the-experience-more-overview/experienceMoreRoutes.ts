import ExperienceMoreOverview from "@/features/admin/components/the-experience-more-overview/ExperienceMoreOverview.vue";

export const ADMIN_EXPERIENCEMORE_PATH = "/admin/erfahre-mehr";
export const ADMIN_EXPERIENCEMORE_ROUTE_NAME = "Erfahre Mehr bearbeiten";
export const ADMIN_EXPERIENCEMORE_ICON = "mdi-school";
export const ADMIN_EXPERIENCEMORE_INFO_TEXT = "Hier können Erfahre Mehr Seiten bearbeitet und verändert werden. ";


export const adminExperienceMoreRoutes = {
    name: ADMIN_EXPERIENCEMORE_ROUTE_NAME,
    path: ADMIN_EXPERIENCEMORE_PATH,
    component: ExperienceMoreOverview,
    meta: {
        icon: ADMIN_EXPERIENCEMORE_ICON,
        infoText: ADMIN_EXPERIENCEMORE_INFO_TEXT
    }
};
