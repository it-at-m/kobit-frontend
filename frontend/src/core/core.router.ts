import Vue from "vue";
import Router from "vue-router";
import {theMainRoutes} from "@/features/the-main/the-main.routes";
import {erfahreMehrRoutes} from "@/features/the-erfahre-mehr/the-erfahre-mehr.routes";
import {conflictPreventionRoutes} from "@/features/the-erfahre-mehr/features/the-conflict-prevention/the-conflict-prevention.routes";
import {downloadsRoutes} from "@/features/the-erfahre-mehr/features/the-downloads/the-downloads.routes";
import {faqRoutes} from "@/features/the-erfahre-mehr/features/the-faq/the-faq.routes";
import {glossarRoutes} from "@/features/the-erfahre-mehr/features/the-glossar/the-glossar.routes";
import {leadershipCooperationRoutes} from "@/features/the-erfahre-mehr/features/the-leadership-cooperation/the-leadership-cooperation.routes";
import {dvFairRoutes} from "@/features/the-erfahre-mehr/features/the-dv-fair/the-dv-fair.routes";
import {escalationStepsRoutes} from "@/features/the-erfahre-mehr/features/the-escalation-steps/the-escalation-steps.routes";
import {theAnlaufstellenRoutes} from "@/features/the-unterstuetzungsfinder/features/the-anlaufstellen/the-anlaufstellen.routes";
import {singleAnlaufstelleRoutes} from "@/features/the-unterstuetzungsfinder/features/the-anlaufstellen/single-anlaufstelle.routes";
import {theAngeboteRoutes} from "@/features/the-angebote/the-angebote.routes";
import {theUnterstuetzungsfinderRoutes} from "@/features/the-unterstuetzungsfinder/the-unterstuetzungsfinder.routes";

Vue.use(Router);

/*
* Preventing "NavigationDuplicated" errors in console in Vue-router >= 3.1.0
* https://github.com/vuejs/vue-router/issues/2881#issuecomment-520554378
* */
/* eslint-disable @typescript-eslint/no-explicit-any */
const routerMethods = ['push', 'replace'];
routerMethods.forEach((method: string) => {
    const originalCall = (Router.prototype as any)[method];
    (Router.prototype as any)[method] = function(location: any, onResolve: any, onReject: any): Promise<any> {
        if (onResolve || onReject) {
            return originalCall.call(this, location, onResolve, onReject);
        }
        return (originalCall.call(this, location) as any).catch((err: any) => err);
    };
});
/* eslint-enable @typescript-eslint/no-explicit-any */

export default new Router({
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
        singleAnlaufstelleRoutes,
        theAngeboteRoutes
    ]
});