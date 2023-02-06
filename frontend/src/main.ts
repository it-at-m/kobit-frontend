import Vue, {provide, VNode} from 'vue';
import 'babel-polyfill';
import Vuetify from "./core/plugins/vuetify";
import store from './core/core.store';
import App from './core/App.vue';
import router from "./core/core.router";
import moment from "moment";
import Toast from "vue-toastification";
import i18n from "@/core/plugins/i18n";
import {VueQueryPlugin} from "@tanstack/vue-query";

Vue.config.productionTip = false;

Vue.use(Toast, {
    position: "bottom-left",
    transition: "Vue-Toastification__fade",
    closeOnClick: false,
});

Vue.use(VueQueryPlugin);

moment.locale(window.navigator.language);

new Vue({
    i18n,
    router,
    store: store,
    vuetify: Vuetify,
    render: (h): VNode => h(App),
    setup() {
        provide("store", store);
    }
}).$mount('#app');
