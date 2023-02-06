import {ListItem} from "@/features/the-app-bar/features/the-title-bar-main/list-item.type";
import {theMainRoutes} from "@/features/the-main/the-main.routes";
import {theAnlaufstellenRoutes} from "@/features/the-unterstuetzungsfinder/features/the-anlaufstellen/the-anlaufstellen.routes";
import {erfahreMehrRoutes} from "@/features/the-erfahre-mehr/the-erfahre-mehr.routes";
import {theUnterstuetzungsfinderRoutes} from "@/features/the-unterstuetzungsfinder/the-unterstuetzungsfinder.routes";

export const THE_DRAWER_MAIN_MODULE = 'theDrawerMainStoreModule';
export const GET_LIST_ITEMS = 'listItems';

export interface TheMainDrawerModuleState {
    listItems: ListItem[];
}

export const theDrawerMainModule = {
    namespaced: true,
    state: {
        listItems: [
            theMainRoutes,
            theAnlaufstellenRoutes,
            theUnterstuetzungsfinderRoutes,
            erfahreMehrRoutes,
        ]
    },
    getters: {
        [GET_LIST_ITEMS](state: TheMainDrawerModuleState): ListItem[] {
            return state.listItems;
        }
    }
};

function namespaced(toAddNamespace: string): string {
    return THE_DRAWER_MAIN_MODULE + '/' + toAddNamespace;
}
export function listItemsGetter(): string {
    return namespaced(GET_LIST_ITEMS);
}