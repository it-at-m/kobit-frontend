import { ListItem } from "@/features/the-app-bar/features/the-title-bar-main/list-item.type";
import { theMainRoutes } from "@/features/the-main/the-main.routes";
import {
    theAnlaufstellenRoutes
} from "@/features/the-unterstuetzungsfinder/features/the-anlaufstellen/the-anlaufstellen.routes";
import { theUnterstuetzungsfinderRoutes } from "@/features/the-unterstuetzungsfinder/the-unterstuetzungsfinder.routes";
import { erfahreMehrRoutes } from "@/features/the-experience-more/the-experience-more.routes";

import {adminContactPointsRoutes} from "@/features/admin/components/the-contact-points-overview/contactPointsRoutes";
import {adminExperienceMoreRoutes} from "@/features/admin/components/the-experience-more-overview/experienceMoreRoutes";
import { adminRoutes } from "@/features/admin/adminRoutes";
import { Route } from 'vue-router';
import router from "@/core/core.router";
import { Commit } from "vuex/types/index";

export const THE_DRAWER_MAIN_MODULE = 'theDrawerMainStoreModule';
export const GET_LIST_ITEMS = 'listItems';

export interface TheMainDrawerModuleState {
    isAdminPage: boolean;
    listItems: ListItem[];
    listAdminItems: ListItem[];
}



export const theDrawerMainModule = {
    namespaced: true,
    actions: {
        async updateListItems({ commit }: { commit: Commit }) {
            const currentRoute: Route = router.currentRoute;
            const isAdminPage = /^\/admin($|\/)/.test(currentRoute.path);
            await new Promise(resolve => setTimeout(resolve, 0)); // add a small delay
            commit('setIsAdminPage', isAdminPage);
        },
    },
    mutations: {
        setIsAdminPage(state: TheMainDrawerModuleState, isAdminPage: boolean) {
            state.isAdminPage = isAdminPage;
        },
    },
    state: {
        listItems: [
            theMainRoutes,
            theAnlaufstellenRoutes,
            theUnterstuetzungsfinderRoutes,
            erfahreMehrRoutes,
            adminRoutes
        ],
        listAdminItems: [
            adminRoutes,
            adminContactPointsRoutes,
            adminExperienceMoreRoutes,
            theMainRoutes,

        ],
        isAdminPage: false,
    },
    getters: {
        [GET_LIST_ITEMS](state: TheMainDrawerModuleState): ListItem[] {

            if (state.isAdminPage) {
                adminRoutes.name = "Admin Dashboard";
                adminRoutes.meta.icon = "mdi-home";
                theMainRoutes.name = "Adminbereich Verlassen";
                theMainRoutes.meta.icon = "mdi-logout";

                return state.listAdminItems;
            } else {
                adminRoutes.name = "Admin";
                adminRoutes.meta.icon = "mdi-wrench"
                theMainRoutes.name = "Home";
                theMainRoutes.meta.icon = "mdi-home";
                return state.listItems;
            }

        }
    }
};

function namespaced(toAddNamespace: string): string {
    return THE_DRAWER_MAIN_MODULE + '/' + toAddNamespace;
}

export function listItemsGetter(): string {
    return namespaced(GET_LIST_ITEMS);
}