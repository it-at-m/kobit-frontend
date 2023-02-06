export const THE_DISCLAIMER_MODULE_NAME = "theDisclaimerStoreModule";

const THE_DISCLAIMER_MUTATION_SET_IS_ACTIVE = "SET_IS_ACTIVE";
const THE_DISCLAIMER_GETTER_GET_IS_ACTIVE = "getIsActive";
const THE_DISCLAIMER_GETTER_GET_ICON = "getIcon";
const THE_DISCLAIMER_GETTER_GET_DISCLAIMER_MESSAGE = "getDisclaimerMessage";

export interface TheDisclaimerStoreState {
    isActive: boolean;
    icon: string;
    disclaimerMessage: string;
}
export const theDisclaimerStoreModule = {
    namespaced: true,
    state: {
        isActive:true,
        icon: "mdi-gesture-tap-button",
        disclaimerMessage: "Auf diesen Seiten werden keine Informationen gespeichert. Alle getätigten Eingaben werden rein zu Darstellungszwecken verarbeitet."
    } as TheDisclaimerStoreState,
    mutations: {
        [THE_DISCLAIMER_MUTATION_SET_IS_ACTIVE](state: TheDisclaimerStoreState, payload: boolean): void {
            state.isActive = payload;
        }
    },
    getters: {
        [THE_DISCLAIMER_GETTER_GET_IS_ACTIVE](state: TheDisclaimerStoreState): boolean {
            return state.isActive;
        },
        [THE_DISCLAIMER_GETTER_GET_ICON](state: TheDisclaimerStoreState): string {
            return state.icon;
        },
        [THE_DISCLAIMER_GETTER_GET_DISCLAIMER_MESSAGE](state: TheDisclaimerStoreState): string {
            return state.disclaimerMessage;
        }
    }

};

function namespaced(toAddNamespace: string): string {
    return THE_DISCLAIMER_MODULE_NAME + '/' + toAddNamespace;
}
export function setIsActive(): string {
    return namespaced(THE_DISCLAIMER_MUTATION_SET_IS_ACTIVE);
}

export function getIsActive(): string {
    return namespaced(THE_DISCLAIMER_GETTER_GET_IS_ACTIVE);
}

export function getIcon(): string {
    return namespaced(THE_DISCLAIMER_GETTER_GET_ICON);
}

export function getDisclaimerMessage(): string {
    return namespaced(THE_DISCLAIMER_GETTER_GET_DISCLAIMER_MESSAGE);
}