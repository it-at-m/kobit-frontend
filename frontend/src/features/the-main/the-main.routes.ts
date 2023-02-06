import main from "./the-main.vue";
export const MAIN_ROUTE_PATH = "/";
export const MAIN_ROUTE_NAME = "Home";

export const theMainRoutes = {
    name: MAIN_ROUTE_NAME,
    path: MAIN_ROUTE_PATH,
    component: main,
    meta: {
        icon: "mdi-home"
    }
};