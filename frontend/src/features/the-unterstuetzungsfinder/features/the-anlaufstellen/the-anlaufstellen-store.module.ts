import Anlaufstelle, {
    AnlaufstelleMinified,
    AnlaufstelleResponse
} from "@/features/the-unterstuetzungsfinder/features/the-anlaufstellen/types/anlaufstelle.type";
import AnlaufstelleService
    from "@/features/the-unterstuetzungsfinder/features/the-anlaufstellen/the-anlaufstellen-service.api";
import {ActionContext} from "vuex";
import {Loading} from "@/core/services/api/types/Loading.type";
import {
    ContactResponse
} from "@/features/the-unterstuetzungsfinder/features/the-anlaufstellen/types/contact.type";
import {LinkResponse} from "@/features/the-unterstuetzungsfinder/features/the-anlaufstellen/types/link.type";


export const THE_ANLAUFSTELLEN_MODULE_NAME = 'theAnlaufstellenStoreModule';
const THE_ANLAUFSTELLEN_GETTER_GET_ANLAUFSTELLEN_MINIFIED = "THE_ANLAUFSTELLEN_GETTER_GET_ANLAUFSTELLEN_SHORT";
const THE_ANLAUFSTELLEN_GETTER_GET_ANLAUFSTELLEN = "THE_ANLAUFSTELLEN_GETTER_GET_ANLAUFSTELLEN";
const THE_ANLAUFSTELLEN_MUTATION_INIT_ANLAUFSTELLEN = "THE_ANLAUFSTELLEN_MUTATION_INIT_ANLAUFSTELLEN";
const THE_ANLAUFSTELLEN_MUTATION_SET_ANLAUFSTELLEN = "THE_ANLAUFSTELLEN_MUTATION_SET_ANLAUFSTELLEN";
const THE_ANLAUFSTELLEN_ACTION_SET_ANLAUFSTELLEN = "THE_ANLAUFSTELLEN_ACTION_SET_ANLAUFSTELLEN";
const THE_ANLAUFSTELLEN_MUTATION_SET_CONTACTS = "THE_ANLAUFSTELLEN_MUTATION_SET_CONTACTS";
const THE_ANLAUFSTELLEN_MUTATION_SET_LINKS = "THE_ANLAUFSTELLEN_MUTATION_SET_LINKS";
const THE_ANLAUFSTELLEN_ACTION_INIT_STATE = "THE_ANLAUFSTELLEN_ACTION_INIT_STATE";
const THE_ANLAUFSTELLEN_MUTATION_SET_API_STATE = "THE_ANLAUFSTELLEN_MUTATION_SET_API_STATE";
const THE_ANLAUFSTELLEN_GETTER_GET_API_STATE = "THE_ANLAUFSTELLEN_GETTER_GET_API_STATE";



export interface TheAnlaufstellenStoreState {
    anlaufstellen: AnlaufstelleResponse[];
    contacts: ContactResponse[];
    links: LinkResponse[];
    apiState: Loading;
}

export const theAnlaufstellenStoreModule = {
    namespaced: true,
    state: {
        anlaufstellen: [],
        contacts: [],
        links: [],
        apiState: Loading.INIT,
    } as TheAnlaufstellenStoreState,
    mutations: {
        [THE_ANLAUFSTELLEN_MUTATION_INIT_ANLAUFSTELLEN](state: TheAnlaufstellenStoreState, anlaufstellen: AnlaufstelleResponse[]): void {
            state.anlaufstellen = anlaufstellen;
            state.apiState = Loading.LOADED;
        },
        [THE_ANLAUFSTELLEN_MUTATION_SET_ANLAUFSTELLEN](state: TheAnlaufstellenStoreState, anlaufstellen: AnlaufstelleResponse[]): void {
            state.anlaufstellen = anlaufstellen;
            state.apiState = Loading.LOADED;
        },
        [THE_ANLAUFSTELLEN_MUTATION_SET_CONTACTS](state: TheAnlaufstellenStoreState, contacts: ContactResponse[]): void {
            state.contacts = contacts;
            state.apiState = Loading.LOADED;
        },
        [THE_ANLAUFSTELLEN_MUTATION_SET_LINKS](state: TheAnlaufstellenStoreState, links: LinkResponse[]): void {
            state.links = links;
            state.apiState = Loading.LOADED;
        },
        [THE_ANLAUFSTELLEN_MUTATION_SET_API_STATE](state: TheAnlaufstellenStoreState, payload: Loading): void {
            state.apiState = payload;
        },

    },
    actions: {
        async [THE_ANLAUFSTELLEN_ACTION_INIT_STATE]({commit, dispatch}: ActionContext<unknown, unknown>): Promise<void> {
            commit(THE_ANLAUFSTELLEN_MUTATION_SET_API_STATE, Loading.INIT);
            commit(THE_ANLAUFSTELLEN_MUTATION_SET_API_STATE, Loading.LOADING);
            await dispatch(THE_ANLAUFSTELLEN_ACTION_SET_ANLAUFSTELLEN);
        },
        [THE_ANLAUFSTELLEN_ACTION_SET_ANLAUFSTELLEN]({commit}: ActionContext<unknown, unknown>): void {
            commit(THE_ANLAUFSTELLEN_MUTATION_SET_API_STATE, Loading.INIT);
            commit(THE_ANLAUFSTELLEN_MUTATION_SET_API_STATE, Loading.LOADING);
            AnlaufstelleService.getAnlaufstellen()
                .then(anlaufstellen => {
                    commit(THE_ANLAUFSTELLEN_MUTATION_SET_ANLAUFSTELLEN,anlaufstellen);
                }).catch(error => {
                new Error(error);
                commit(THE_ANLAUFSTELLEN_MUTATION_SET_API_STATE, Loading.ERROR);
            });
            commit(THE_ANLAUFSTELLEN_MUTATION_SET_API_STATE, Loading.LOADED);
        }
    },
    getters: {
        [THE_ANLAUFSTELLEN_GETTER_GET_ANLAUFSTELLEN](state: TheAnlaufstellenStoreState): Anlaufstelle[] {



            const sortedAnlaufstellen = JSON.parse(JSON.stringify(state.anlaufstellen));
            return sortedAnlaufstellen.sort((a: { name: string }, b: { name: string }) => a.name.localeCompare(b.name)); 
        },
        [THE_ANLAUFSTELLEN_GETTER_GET_ANLAUFSTELLEN_MINIFIED](state: TheAnlaufstellenStoreState): AnlaufstelleMinified[] {
            const mappedMinifiedAnlaufstellen: AnlaufstelleMinified[] = [];
            state.anlaufstellen.forEach(anlaufstelle => {
                const minifiedAnlaufstelle = {
                    id:"",
                    name: "",
                    shortCut: "",
                    department: "",
                } as AnlaufstelleMinified;

                minifiedAnlaufstelle.id = anlaufstelle.id ? anlaufstelle.id : "";
                minifiedAnlaufstelle.name = anlaufstelle?.name ? anlaufstelle.name : "";
                minifiedAnlaufstelle.shortCut = anlaufstelle?.shortCut ? anlaufstelle.shortCut : "";
                minifiedAnlaufstelle.department = anlaufstelle?.department ? anlaufstelle.department : "";

                mappedMinifiedAnlaufstellen.push(minifiedAnlaufstelle);
            });
            return mappedMinifiedAnlaufstellen;
        },
        [THE_ANLAUFSTELLEN_GETTER_GET_API_STATE](state: TheAnlaufstellenStoreState): Loading {
            return state.apiState;
        },
    },
};

function namespaced(toAddNamespace: string): string {
    return THE_ANLAUFSTELLEN_MODULE_NAME + '/' + toAddNamespace;
}

export function getAnlaufstellen(): string {
    return namespaced(THE_ANLAUFSTELLEN_GETTER_GET_ANLAUFSTELLEN);
}

export function getMinifiedAnlaufstellen(): string {
    return namespaced(THE_ANLAUFSTELLEN_GETTER_GET_ANLAUFSTELLEN_MINIFIED);
}

export function getApiState(): string {
    return namespaced(THE_ANLAUFSTELLEN_GETTER_GET_API_STATE);
}

export function initAnlaufstellen(): string {
    return namespaced(THE_ANLAUFSTELLEN_ACTION_INIT_STATE);
}
