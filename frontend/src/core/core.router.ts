import Vue, { VueConstructor } from 'vue';
import Router, { RouteConfig } from 'vue-router';
import vuetify, { adminTheme, kobitTheme } from '@/core/plugins/vuetify';

import { theMainRoutes } from '@/features/the-main/the-main.routes';
import { erfahreMehrRoutes } from '@/features/the-additional/the-additional.routes';
import { conflictPreventionRoutes } from '@/features/the-additional/features/the-conflict-prevention/the-conflict-prevention.routes';
import { downloadsRoutes } from '@/features/the-additional/features/the-downloads/the-downloads.routes';
import { faqRoutes } from '@/features/the-additional/features/the-faq/the-faq.routes';
import { glossarRoutes } from '@/features/the-additional/features/the-glossar/the-glossar.routes';
import { leadershipCooperationRoutes } from '@/features/the-additional/features/the-leadership-cooperation/the-leadership-cooperation.routes';
import { dvFairRoutes } from '@/features/the-additional/features/the-dv-fair/the-dv-fair.routes';
import { escalationStepsRoutes } from '@/features/the-additional/features/the-escalation-steps/the-escalation-steps.routes';
import { theAnlaufstellenRoutes } from '@/features/the-unterstuetzungsfinder/features/the-contact-points/the-contact-points.routes';
import { theAngeboteRoutes } from '@/features/the-angebote/the-angebote.routes';
import { theUnterstuetzungsfinderRoutes } from '@/features/the-unterstuetzungsfinder/the-unterstuetzungsfinder.routes';
import { theAnlaufstellenDetailsRoutes } from '@/features/the-unterstuetzungsfinder/features/the-contact-points/the-contact-points-details.routes';

import { adminRoutes } from '@/features/admin/the-admin-routes';
import { adminContactPointsRoutes } from '@/features/admin/features/the-contact-points/the-contact-points-routes';
import { adminExperienceMoreRoutes } from '@/features/admin/features/the-additional/the-additional-overview-routes';
import { adminConflictPreventionRoutes } from '@/features/admin/features/the-additional/features/the-conflict-prevention/the-conflict-prevention.routes';
import { adminDownloadsRoutes } from '@/features/admin/features/the-additional/features/the-downloads/the-downloads.routes';
import { adminFaqRoutes } from '@/features/admin/features/the-additional/features/the-faq/the-faq.routes';
import { adminGlossarRoutes } from '@/features/admin/features/the-additional/features/the-glossar/the-glossar.routes';
import { adminLeadershipCooperationRoutes } from '@/features/admin/features/the-additional/features/the-leadership-cooperation/the-leadership-cooperation.routes';
import { adminUFinderRoutes } from '@/features/admin/components/u-finder/u-finder.routes';

import { getAdminUserInfo } from '@/features/admin/components/userinformation/api/AdminInfoClient';

Vue.use(Router);

const baseRoutes = [
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
  theAngeboteRoutes
];

const router = new Router({
  base: process.env.BASE_URL,
  routes: baseRoutes
});

let adminRoutesAdded = false;

router.beforeEach(async (to, from, next) => {
  if (to.path.startsWith('/admin')) {
    try {
      const adminUserInfo = await getAdminUserInfo();

      if (adminUserInfo.isCentralAdmin || adminUserInfo.isDepartmentAdmin) {
        if (!adminRoutesAdded) {
          let adminRoutesToAdd: RouteConfig[] | { name: string; path: string; component: VueConstructor<Vue<Record<string, any>, Record<string, any>, never, never, (event: string, ...args: any[]) => Vue<Record<string, any>, Record<string, any>, never, never, any>>>; meta: { icon: string; infoText: string; }; }[] = [];
          if (adminUserInfo.isCentralAdmin) {
            adminRoutesToAdd = [
              adminRoutes,
              adminContactPointsRoutes,
              adminExperienceMoreRoutes,
              adminConflictPreventionRoutes,
              adminDownloadsRoutes,
              adminFaqRoutes,
              adminGlossarRoutes,
              adminLeadershipCooperationRoutes,
              adminUFinderRoutes
            ];
          } else if (adminUserInfo.isDepartmentAdmin) {
            adminRoutesToAdd = [
              adminRoutes,
              adminContactPointsRoutes
            ];
          }
          router.addRoutes(adminRoutesToAdd);
          adminRoutesAdded = true;
        }
        vuetify.framework.theme.themes.light = adminTheme.themes.light;
        vuetify.framework.theme.themes.dark = adminTheme.themes.dark;
        next();
      } else {
        next({ path: '/' });
      }
    } catch (error) {
      next({ path: '/' });
    }
  } else {
    if (!to.path.startsWith('/admin')) {
      vuetify.framework.theme.themes.light = kobitTheme.themes.light;
      vuetify.framework.theme.themes.dark = kobitTheme.themes.dark;
    }
    next();
  }
});

export default router;
