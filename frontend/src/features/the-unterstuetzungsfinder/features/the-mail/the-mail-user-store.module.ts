import MailUser from "@/features/the-unterstuetzungsfinder/features/the-mail/types/mail-user.type";
import MailUserService from "@/features/the-unterstuetzungsfinder/features/the-mail/api/the-mail-user-service.api";


import {ActionContext} from "vuex";
import {Loading} from "@/core/services/api/types/Loading.type";
import {RootState} from "@/core/core.store";

export const THE_MAIL_USER_MODULE_NAME = 'theMailUserStoreModule';
const GETTER_GET_USER_MAIL_SSO = "GETTER_GET_USER_MAIL_SSO";
const GETTER_GET_API_STATE = "GETTER_GET_API_STATE";

const ACTION_INIT_USER_MAIL_SSO = "ACTION_INIT_USER_MAIL_SSO";
const MUTATION_FETCH_USER_MAIL_SSO = "MUTATION_FETCH_USER_MAIL_SSO";
const MUTATION_SET_API_STATE = "MUTATION_SET_API_STATE";


type Action = ActionContext<TheMailUserStoreState, RootState>

export interface TheMailUserStoreState {
    user: MailUser;
    apiState: Loading;
}
export const theMailUserStoreModule = {
    namespaced: true,
    state: {
        user: MailUser.createEmptyMailUser(),
        apiState: Loading.INIT,
    } as TheMailUserStoreState,

    mutations: {
        [MUTATION_FETCH_USER_MAIL_SSO](state: TheMailUserStoreState, user: MailUser): void {
            state.user = user;
        },
        [MUTATION_SET_API_STATE](state: TheMailUserStoreState, payload: Loading): void {
            state.apiState = payload;
        },  
    },
    actions: {
        async [ACTION_INIT_USER_MAIL_SSO]({ commit }: Action): Promise<void> {

            await MailUserService.getMailUser()
                .then(user => {
                    commit(MUTATION_FETCH_USER_MAIL_SSO, user);
                })
                .catch(() => {
                    const fallbackUser = {
                        emailAddress: "sso failed to authorize",
                    } as MailUser;
                    commit(MUTATION_FETCH_USER_MAIL_SSO, fallbackUser);
                });
        },

    },

    getters: {

        [GETTER_GET_USER_MAIL_SSO](state: TheMailUserStoreState): MailUser | undefined {
            return state.user;

        },
        [GETTER_GET_API_STATE](state: TheMailUserStoreState): Loading {
            return state.apiState;
        },

    }
};

function namespaced(toAddNamespace: string): string {
    return THE_MAIL_USER_MODULE_NAME + '/' + toAddNamespace;
}

export function initUserMail(): string {
    return namespaced(ACTION_INIT_USER_MAIL_SSO);
}
export function getMailUser(): string {
    return namespaced(GETTER_GET_USER_MAIL_SSO);
}
export function getApiState(): string {
    return namespaced(GETTER_GET_API_STATE);
}