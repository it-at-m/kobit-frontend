import TheEscalationSteps from '@/features/the-experience-more/features/the-escalation-steps/the-escalation-steps.vue';

export const ESCALATION_STEP_ROUTE_NAME = 'Eskalationsstufen nach Glasl';
export const ESCALATION_STEP_ROUTE_LINK = '/erfahre-mehr/eskalationsstufen';
export const ESCALATION_STEP_ROUTE_META_ICON = 'mdi-stairs';
export const ESCALATION_STEP_ROUTE_META_INFO_TEXT = 'Das Phasenmodell der Eskalation nach Friedrich Glasl ermöglicht, eine Konfliktsituation zu analysieren.';

export const escalationStepsRoutes = {
    name: ESCALATION_STEP_ROUTE_NAME,
    path: ESCALATION_STEP_ROUTE_LINK,
    component: TheEscalationSteps,
    meta: {
        icon: ESCALATION_STEP_ROUTE_META_ICON,
        infoText: ESCALATION_STEP_ROUTE_META_INFO_TEXT,
    },
    color:'#7FDBFF'
};