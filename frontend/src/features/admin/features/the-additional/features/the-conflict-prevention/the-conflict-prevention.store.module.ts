import ConflictPrevention from "@/features/the-additional/features/the-conflict-prevention/ConflictPrevention.type";

export const THE_CONFLICT_PREVENTION_MODULE_NAME = 'theConflictPreventionStoreModule';
export const GETTER_GET_CONFLICT_PREVENTION = "GETTER_GET_CONFLICT_PREVENTION";

export interface TheConflictPreventionModuleState {
    conflictPrevention: ConflictPrevention[];
}

export const theConflictPreventionStoreModule = {
    namespaced: true,
    getters: {
        [GETTER_GET_CONFLICT_PREVENTION](state: TheConflictPreventionModuleState): ConflictPrevention[] {
            return state.conflictPrevention;
        }
    }
};

function toNamespace(toAddNamespace: string): string {
    return `${THE_CONFLICT_PREVENTION_MODULE_NAME}/${toAddNamespace}`;
}

export function getConflictPrevention(): string {
    return toNamespace(GETTER_GET_CONFLICT_PREVENTION);
}
