import {LinkModel} from "@/features/commons/types/link-model.type";
export const THE_ANGEBOTE_MODULE_NAME = "theAngeboteStoreModule";


export interface TheAngeboteModuleState {
    angeboteLinkModel: LinkModel;
}

export const theAngeboteStoreModule = {
    namespaced: true,
    state: {
    } as TheAngeboteModuleState,
    getters: {
    }
};

function namespaced(toAddNamespace: string): string {
    return THE_ANGEBOTE_MODULE_NAME + '/' + toAddNamespace;
}
