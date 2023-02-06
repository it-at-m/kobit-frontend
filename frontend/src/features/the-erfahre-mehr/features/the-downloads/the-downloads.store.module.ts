import {Download} from "@/features/the-erfahre-mehr/features/the-downloads/download.type";
import {allDownloads, downloadsPath} from "@/core/services/downloads/downloads";

export const THE_DOWNLOADS_MODULE_NAME = 'theDownloads';
export const GET_DOWNLOADS_FILES = "DOWNLOADS_FILES";
export const GET_DOWNLOADS_FILEPATH = "DOWNLOADS_FILEPATH";
export const GET_DOWNLOADS_MODEL  = "DOWNLOADS_ITEM";

export interface TheDownloadsModuleState {
    downloads: Download[];
    filepath: string;
}

export const theDownloadsStoreModule = {
    namespaced : true,
    state: {
        filepath : downloadsPath,
        downloads: allDownloads,
    } as TheDownloadsModuleState,
    getters: {
        [GET_DOWNLOADS_FILES](state: TheDownloadsModuleState): Download[] {
            const sortedDownloads = JSON.parse(JSON.stringify(state.downloads));
            return sortedDownloads.sort((a: { name: string }, b: { name: string }) => a.name.localeCompare(b.name));
        },
        [GET_DOWNLOADS_FILEPATH](state: TheDownloadsModuleState): string {
            return state.filepath;
        },
    }
};

function namespaced(toAddNamespace: string): string {
    return THE_DOWNLOADS_MODULE_NAME + '/' + toAddNamespace;
}

export function getDownloads(): string {
    return namespaced(GET_DOWNLOADS_FILES);
}

export function getDownloadsFilepath(): string {
    return namespaced(GET_DOWNLOADS_FILEPATH);
}

