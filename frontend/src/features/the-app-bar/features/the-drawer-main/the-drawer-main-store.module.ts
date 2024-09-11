import { ListItem } from "@/features/the-app-bar/features/the-title-bar-main/list-item.type";
import { theMainRoutes } from "@/features/the-main/the-main.routes";
import { theAnlaufstellenRoutes } from "@/features/the-unterstuetzungsfinder/features/the-contact-points/the-contact-points.routes";
import { theUnterstuetzungsfinderRoutes } from "@/features/the-unterstuetzungsfinder/the-unterstuetzungsfinder.routes";
import { erfahreMehrRoutes } from "@/features/the-additional/the-additional.routes";

import { adminContactPointsRoutes } from "@/features/admin/features/the-contact-points/the-contact-points-routes";
import { adminUnterstuetzungsfinderRoutes } from "@/features/admin/components/u-finder/u-finder.routes";
import { adminAdditionalRoutes } from "@/features/admin/features/the-additional/the-additional-overview-routes";
import { adminRoutes } from "@/features/admin/the-admin-routes";

import { getAdminUserInfo } from "@/features/admin/components/userinformation/api/AdminInfoClient";
import router from "@/core/core.router";
import { Commit } from "vuex/types/index";

export const THE_DRAWER_MAIN_MODULE = 'theDrawerMainStoreModule';
export const GET_LIST_ITEMS = 'listItems';

export interface TheMainDrawerModuleState {
    isAdminPage: boolean;
    listItems: ListItem[];
    listAdminItems: ListItem[];
    isCentralAdmin: boolean;
}

export const theDrawerMainModule = {
    namespaced: true,
    actions: {
        async updateListItems(
            { commit }: { commit: Commit }
        ) {
            const adminUserInfo = await getAdminUserInfo();
            const isAdminPage = /^\/admin($|\/)/.test(router.currentRoute.path);
            commit('setIsAdminPage', isAdminPage);
            commit('setAdminInfo', adminUserInfo.isCentralAdmin);
        },
    }, 
    mutations: {
        setIsAdminPage(state: TheMainDrawerModuleState, isAdminPage: boolean) {
            state.isAdminPage = isAdminPage;
        },
        setAdminInfo(state: TheMainDrawerModuleState, isCentralAdmin: boolean) {
            state.isCentralAdmin = isCentralAdmin;
        }
    },
    state: {
        listItems: [
            theMainRoutes,
            {
                ...theAnlaufstellenRoutes,
                path: '/anlaufstellen/',
            },
            theUnterstuetzungsfinderRoutes,
            erfahreMehrRoutes,
            adminRoutes
        ],
        listAdminItems: [
            adminRoutes,
            {
                ...adminContactPointsRoutes,
                path: '/admin/anlaufstellen/',
            },
        ],
        isAdminPage: false,
        isCentralAdmin: false,
    },
    getters: {
        [GET_LIST_ITEMS](state: TheMainDrawerModuleState): ListItem[] {
            if (state.isAdminPage) {
                adminRoutes.name = "Admin Dashboard";
                adminRoutes.meta.icon = "mdi-home";
                theMainRoutes.name = "Adminbereich Verlassen";
                theMainRoutes.meta.icon = "mdi-logout";

                let dynamicAdminItems = [];

                if (state.isCentralAdmin) {
                    dynamicAdminItems = [
                        adminRoutes,
                        {
                            ...adminContactPointsRoutes,
                            path: '/admin/anlaufstellen/',
                        },
                        adminUnterstuetzungsfinderRoutes,
                        adminAdditionalRoutes,
                        theMainRoutes
                    ];

                } else {
                    dynamicAdminItems = [
                        adminRoutes,
                        {
                            ...adminContactPointsRoutes,
                            path: '/admin/anlaufstellen/',
                        },
                        adminUnterstuetzungsfinderRoutes,
                        theMainRoutes
                    ];

                }
                return dynamicAdminItems;
            } else {
                adminRoutes.name = "Admin";
                adminRoutes.meta.icon = "mdi-wrench";
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
