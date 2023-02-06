import LeadershipCooperation from "@/features/the-erfahre-mehr/features/the-leadership-cooperation/LeadershipCooperation.type";

export const THE_LEADERSHIP_COOPERATION_MODULE_NAME = 'theLeadershipCooperationStoreModule';
export const GETTER_GET_LEADERSHIP_COOPERATION = "GETTER_GET_LEADERSHIP_COOPERATION";

export interface TheLeadershipCooperationStoreModuleState {
    leadershipCooperation: LeadershipCooperation[];
}

export const theLeadershipCooperationStoreModule = {
    namespaced: true,
    getters: {
        [GETTER_GET_LEADERSHIP_COOPERATION](state: TheLeadershipCooperationStoreModuleState): LeadershipCooperation[] {
            return state.leadershipCooperation;
        }
    }
};

function toNamespace(toAddNamespace: string): string {
    return `${THE_LEADERSHIP_COOPERATION_MODULE_NAME}/${toAddNamespace}`;
}

export function getLeadershipCooperation(): string {
    return toNamespace(GETTER_GET_LEADERSHIP_COOPERATION);
}
