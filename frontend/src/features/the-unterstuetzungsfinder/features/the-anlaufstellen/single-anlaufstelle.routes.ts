import {
    THE_ANLAUFSTELLEN_ROUTE_PATH
} from "@/features/the-unterstuetzungsfinder/features/the-anlaufstellen/the-anlaufstellen.routes";
import BaseCardAnlaufstelle from "@/features/the-unterstuetzungsfinder/features/the-anlaufstellen/base-card-anlaufstelle.vue";

export const THE_ANLAUFSTELLEN_CHILDREN_ROUTE_PATH = `${THE_ANLAUFSTELLEN_ROUTE_PATH}/:id`;

export const singleAnlaufstelleRoutes =
    {
        path: THE_ANLAUFSTELLEN_CHILDREN_ROUTE_PATH,
        component: BaseCardAnlaufstelle,
        props: true,
    };
