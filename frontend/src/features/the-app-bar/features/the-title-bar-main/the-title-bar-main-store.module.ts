export const THE_TITLE_BAR_MAIN = 'theTitleBarMain';
export const SET_DRAWER = "SET_DRAWER";
export const GET_DRAWER = 'drawer';

export interface TitleBarMainState {
    drawer: boolean;
}

export const theTitleBarMain = {
    namespaced: true,
    state: {
        drawer: false
    } as TitleBarMainState,
    mutations: {
        [SET_DRAWER](state: TitleBarMainState, payload: boolean): void {
            state.drawer = payload;
        }
    },
    getters: {
        [GET_DRAWER](state: TitleBarMainState): boolean {
            return state.drawer;
        }
    }
};

function namespaced(toAddNamespace: string): string {
    return THE_TITLE_BAR_MAIN + '/' + toAddNamespace;
}
export function drawerGetter(): string {
    return namespaced(GET_DRAWER);
}

export function drawerMutator(): string {
    return namespaced(SET_DRAWER);
}


