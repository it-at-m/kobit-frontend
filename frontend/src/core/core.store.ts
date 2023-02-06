import Vue from 'vue';
import Vuex from 'vuex';
import {
    THE_TITLE_BAR_MAIN,
    theTitleBarMain,
    TitleBarMainState
} from "@/features/the-app-bar/features/the-title-bar-main/the-title-bar-main-store.module";
import {
    THE_DRAWER_MAIN_MODULE,
    theDrawerMainModule,
    TheMainDrawerModuleState
} from "@/features/the-app-bar/features/the-drawer-main/the-drawer-main-store.module";
import {
    THE_CONFLICT_PREVENTION_MODULE_NAME,
    theConflictPreventionStoreModule,
    TheConflictPreventionModuleState
} from "@/features/the-erfahre-mehr/features/the-conflict-prevention/the-conflict-prevention.store.module";
import {
    THE_DOWNLOADS_MODULE_NAME,
    theDownloadsStoreModule,
    TheDownloadsModuleState
} from "@/features/the-erfahre-mehr/features/the-downloads/the-downloads.store.module";
import {
    THE_FAQ_MODULE_NAME,
    theFaqStoreModule,
    TheFaqStoreModuleState
} from "@/features/the-erfahre-mehr/features/the-faq/the-faq-store.module";
import {
    THE_GLOSSAR_MODULE_NAME,
    theGlossarStoreModule,
    TheGlossarStoreModuleState
} from "@/features/the-erfahre-mehr/features/the-glossar/the-glossar-store.module";
import {
    THE_LEADERSHIP_COOPERATION_MODULE_NAME,
    theLeadershipCooperationStoreModule,
    TheLeadershipCooperationStoreModuleState
} from "@/features/the-erfahre-mehr/features/the-leadership-cooperation/the-leadership-cooperation.store.module";
import {
    THE_DV_FAIR_MODULE_NAME,
    theDvFairStoreModule,
    TheDvFairStoreModuleState
} from "@/features/the-erfahre-mehr/features/the-dv-fair/the-dv-fair-store.module";
import {
    THE_ESCALATION_STEPS_MODULE_NAME,
    theEscalationStepsStoreModule,
    TheEscalationStepsStoreModuleState
} from "@/features/the-erfahre-mehr/features/the-escalation-steps/the-escalation-steps-store.module";
import {
    THE_ANLAUFSTELLEN_MODULE_NAME,
    theAnlaufstellenStoreModule,
    TheAnlaufstellenStoreState
} from "@/features/the-unterstuetzungsfinder/features/the-anlaufstellen/the-anlaufstellen-store.module";
import {
    THE_ERFAHRE_MEHR_MODULE_NAME,
    theErfahreMehrStoreModule,
    TheErfahreMehrModuleState
} from "@/features/the-erfahre-mehr/the-erfahre-mehr-store.module";
import {
    THE_ANGEBOTE_MODULE_NAME,
    theAngeboteStoreModule,
    TheAngeboteModuleState
} from "@/features/the-angebote/the-angebote-store.module";
import {
    THE_UNTERSTUEZUNGSFINDER_MODULE_NAME,
    theUnterstuezungsfinderStoreModule,
    TheUnterstuezungsfinderStoreState
} from "@/features/the-unterstuetzungsfinder/the-unterstuezungsfinder-store.module";
import {
    THE_DISCLAIMER_MODULE_NAME, theDisclaimerStoreModule,
    TheDisclaimerStoreState
} from "@/features/the-disclaimer/the-disclaimer-store.module";

import {
    THE_MAIL_MODULE_NAME, theMailStoreModule,
    TheMailStoreState
} from "@/features/the-unterstuetzungsfinder/features/the-mail/the-mail-store.module";


import {
    THE_MAIL_USER_MODULE_NAME, theMailUserStoreModule,
    TheMailUserStoreState
} from "@/features/the-unterstuetzungsfinder/features/the-mail/the-mail-user-store.module";

Vue.use(Vuex);
const notOnProduction = process.env.NODE_ENV !== 'production';

export interface RootState {
    titleBarMainState: TitleBarMainState;
    theMainDrawerModuleState: TheMainDrawerModuleState;
    theErfahreMehrModuleState: TheErfahreMehrModuleState;
    theConflictPreventionStoreModule: TheConflictPreventionModuleState;
    theDownloadsModuleState: TheDownloadsModuleState;
    theFaqStoreModuleState: TheFaqStoreModuleState;
    theGlossarStoreModuleState: TheGlossarStoreModuleState;
    theLeadershipCooperationStoreModule: TheLeadershipCooperationStoreModuleState;
    theDvFairStoreModuleState: TheDvFairStoreModuleState;
    theEscalationStepsStoreModuleState: TheEscalationStepsStoreModuleState;
    theAnlaufstellenStoreState: TheAnlaufstellenStoreState;
    theAngeboteModuleState: TheAngeboteModuleState;
    theUnterstuezungsfinderStoreState: TheUnterstuezungsfinderStoreState;
    theDisclaimerStoreState: TheDisclaimerStoreState;
    theMailStoreState: TheMailStoreState;
    theMailUserStoreState: TheMailUserStoreState;
 }

export default new Vuex.Store<RootState>({
    modules: {
        [THE_TITLE_BAR_MAIN]: theTitleBarMain,
        [THE_DRAWER_MAIN_MODULE]: theDrawerMainModule,
        [THE_ERFAHRE_MEHR_MODULE_NAME]: theErfahreMehrStoreModule,
        [THE_FAQ_MODULE_NAME]: theFaqStoreModule,
        [THE_GLOSSAR_MODULE_NAME]: theGlossarStoreModule,
        [THE_LEADERSHIP_COOPERATION_MODULE_NAME]: theLeadershipCooperationStoreModule,
        [THE_DV_FAIR_MODULE_NAME]: theDvFairStoreModule,
        [THE_ESCALATION_STEPS_MODULE_NAME]: theEscalationStepsStoreModule,
        [THE_CONFLICT_PREVENTION_MODULE_NAME] : theConflictPreventionStoreModule,
        [THE_DOWNLOADS_MODULE_NAME] : theDownloadsStoreModule,
        [THE_ANLAUFSTELLEN_MODULE_NAME]: theAnlaufstellenStoreModule,
        [THE_ANGEBOTE_MODULE_NAME]: theAngeboteStoreModule,
        [THE_UNTERSTUEZUNGSFINDER_MODULE_NAME]:theUnterstuezungsfinderStoreModule,
        [THE_DISCLAIMER_MODULE_NAME]: theDisclaimerStoreModule,
        [THE_MAIL_MODULE_NAME]: theMailStoreModule,
        [THE_MAIL_USER_MODULE_NAME]: theMailUserStoreModule
    },
    strict: notOnProduction
});