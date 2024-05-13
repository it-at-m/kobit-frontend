import Vue, { provide, VNode } from "vue";
import "babel-polyfill";
import Vuetify from "./core/plugins/vuetify";
import store from "./core/core.store";
import App from "./core/App.vue";
import router from "./core/core.router";
import moment from "moment";
import Toast from "vue-toastification";
import i18n from "@/core/plugins/i18n";
import { VueQueryPlugin } from "@tanstack/vue-query";
import vuetify, { adminTheme, kobitTheme } from "@/core/plugins/vuetify";

Vue.config.productionTip = false;

Vue.use(Toast, {
  position: "bottom-left",
  transition: "Vue-Toastification__fade",
  closeOnClick: false,
});

Vue.use(VueQueryPlugin);

moment.locale(window.navigator.language);

// Set up the navigation guard before creating the Vue instance
router.beforeEach((to, _, next) => {
  if (to.path === "/admin" || to.path.startsWith("/admin/")) {
    vuetify.framework.theme.themes.light = adminTheme.themes.light;
    vuetify.framework.theme.themes.dark = adminTheme.themes.dark;
  } else {
    vuetify.framework.theme.themes.light = kobitTheme.themes.light;
    vuetify.framework.theme.themes.dark = kobitTheme.themes.dark;
  }
  next();
});

new Vue({
  i18n,
  router,
  store: store,
  vuetify: Vuetify,
  render: (h): VNode => h(App),
  setup() {
    provide("store", store);
  },
}).$mount("#app");

// Use Vue.nextTick to wait for the theme to be applied before rendering the page
Vue.nextTick(() => {
  new Vue({
    router,
    store,
    vuetify: Vuetify,
    render: (h): VNode => h(App),
    setup() {
      provide("store", store);
    },
  }).$mount("#app");
});
