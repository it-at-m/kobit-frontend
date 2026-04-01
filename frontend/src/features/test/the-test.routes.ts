import test from "./TestPage.vue";
export const MAIN_ROUTE_PATH = "/test";
export const MAIN_ROUTE_NAME = "TestPage";

export const theTestRoutes = {
    name: MAIN_ROUTE_NAME,
    path: MAIN_ROUTE_PATH,
    component: test,
    meta: {
        icon: "mdi-test-tube"
    }
};