import {LinkModel} from "@/features/commons/types/link-model.type";
export const THE_OFFERS_MODULE_NAME = "theOffersStoreModule";


export interface TheOffersModuleState {
    angeboteLinkModel: LinkModel;
}

export const theOffersStoreModule = {
    namespaced: true,
    state: {
    } as TheOffersModuleState,
    getters: {
    }
};

function namespaced(toAddNamespace: string): string {
    return THE_OFFERS_MODULE_NAME + '/' + toAddNamespace;
}
