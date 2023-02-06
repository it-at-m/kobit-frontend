import {LinkModel} from "@/features/commons/types/link-model.type";

export const THE_ERFAHRE_MEHR_MODULE_NAME = 'theErfahreMehrStoreModule';

export interface TheErfahreMehrModuleState {
    erfahreMehr: LinkModel;
}

export const theErfahreMehrStoreModule = {
    namespaced: true,
    state: {
    } as TheErfahreMehrModuleState,
    getters: {
    }
};

function namespaced(toAddNamespace: string): string {
    return THE_ERFAHRE_MEHR_MODULE_NAME + '/' + toAddNamespace;
}
