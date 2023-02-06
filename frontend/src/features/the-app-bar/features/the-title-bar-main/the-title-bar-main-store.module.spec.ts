import {theTitleBarMain} from "@/features/the-app-bar/features/the-title-bar-main/the-title-bar-main-store.module";

describe('the-title-bar-the-main-store.module', () => {
    const mutations = theTitleBarMain.mutations;
    const state = {
        drawer: false
    };



    it('mutation should work', () => {
        expect(state.drawer).toBe(false);
        mutations.SET_DRAWER(state, true);
        expect(state.drawer).toBeTruthy();
    });
});