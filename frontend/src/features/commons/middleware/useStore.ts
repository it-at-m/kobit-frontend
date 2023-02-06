import {inject} from "vue";
import {Store} from "vuex";
import {RootState} from "@/core/core.store";

export function useStore() {
    return inject<Store<RootState>>("store")!;
}