import Vue from "vue";
import Router from "vue-router";
// Add this import at the top of core.router.ts
import vuetify, { adminTheme, kobitTheme } from "@/core/plugins/vuetify";

import {theMainRoutes} from "@/features/the-main/the-main.routes";
import {erfahreMehrRoutes} from "@/features/the-experience-more/the-experience-more.routes";
import {
    conflictPreventionRoutes
} from "@/features/the-experience-more/features/the-conflict-prevention/the-conflict-prevention.routes";
import {downloadsRoutes} from "@/features/the-experience-more/features/the-downloads/the-downloads.routes";
import {faqRoutes} from "@/features/the-experience-more/features/the-faq/the-faq.routes";
import {glossarRoutes} from "@/features/the-experience-more/features/the-glossar/the-glossar.routes";
import {
    leadershipCooperationRoutes
} from "@/features/the-experience-more/features/the-leadership-cooperation/the-leadership-cooperation.routes";
import {dvFairRoutes} from "@/features/the-experience-more/features/the-dv-fair/the-dv-fair.routes";
import {
    escalationStepsRoutes
} from "@/features/the-experience-more/features/the-escalation-steps/the-escalation-steps.routes";
import {
    theAnlaufstellenRoutes
} from "@/features/the-unterstuetzungsfinder/features/the-anlaufstellen/the-anlaufstellen.routes";
import {theAngeboteRoutes} from "@/features/the-angebote/the-angebote.routes";
import {theUnterstuetzungsfinderRoutes} from "@/features/the-unterstuetzungsfinder/the-unterstuetzungsfinder.routes";
import {
    theAnlaufstellenDetailsRoutes
} from "@/features/the-unterstuetzungsfinder/features/the-anlaufstellen/the-anlaufstellen-details.routes";

import {adminRoutes} from "@/features/admin/adminRoutes";
import {adminContactPointsRoutes} from "@/features/admin/features/the-contact-points/contactPointsRoutes";
import {adminExperienceMoreRoutes} from "@/features/admin/features/the-experience-more/experienceMoreRoutes";
import {
    adminConflictPreventionRoutes
  } from "@/features/admin/features/the-experience-more/features/the-conflict-prevention/the-conflict-prevention.routes";
  import {
    adminDownloadsRoutes
  } from "@/features/admin/features/the-experience-more/features/the-downloads/the-downloads.routes";
  import {
    adminFaqRoutes
  } from "@/features/admin/features/the-experience-more/features/the-faq/the-faq.routes";
  import {
    adminGlossarRoutes
  } from "@/features/admin/features/the-experience-more/features/the-glossar/the-glossar.routes";
  import {
    adminLeadershipCooperationRoutes
  } from "@/features/admin/features/the-experience-more/features/the-leadership-cooperation/the-leadership-cooperation.routes";

Vue.use(Router);

/*
* Preventing "NavigationDuplicated" errors in console in Vue-router >= 3.1.0
* https://github.com/vuejs/vue-router/issues/2881#issuecomment-520554378
* */
/* eslint-disable @typescript-eslint/no-explicit-any */
const routerMethods = ['push', 'replace'];
routerMethods.forEach((method: string) => {
    const originalCall = (Router.prototype as any)[method];
    (Router.prototype as any)[method] = function (location: any, onResolve: any, onReject: any): Promise<any> {
        if (onResolve || onReject) {
            return originalCall.call(this, location, onResolve, onReject);
        }
        return (originalCall.call(this, location) as any).catch((err: any) => err);
    };
});
/* eslint-enable @typescript-eslint/no-explicit-any */


const router = new Router({
    base: process.env.BASE_URL,
    routes: [
        theMainRoutes,
        theUnterstuetzungsfinderRoutes,
        erfahreMehrRoutes,
        conflictPreventionRoutes,
        downloadsRoutes,
        faqRoutes,
        glossarRoutes,
        leadershipCooperationRoutes,
        dvFairRoutes,
        escalationStepsRoutes,
        theAnlaufstellenRoutes,
        theAnlaufstellenDetailsRoutes,
        theAngeboteRoutes,
        adminRoutes,
        adminContactPointsRoutes,
        adminExperienceMoreRoutes,
        adminConflictPreventionRoutes,
        adminDownloadsRoutes,
        adminFaqRoutes,
        adminGlossarRoutes,
        adminLeadershipCooperationRoutes,
    ]
});

router.beforeEach((to, _, next) => {
    if (to.path === '/admin' || to.path.startsWith('/admin/')) {
        vuetify.framework.theme.themes.light = adminTheme.themes.light;
        vuetify.framework.theme.themes.dark = adminTheme.themes.dark;
    } else {
        vuetify.framework.theme.themes.light = kobitTheme.themes.light;
        vuetify.framework.theme.themes.dark = kobitTheme.themes.dark;
    }
    next();
});


export default router;