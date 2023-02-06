import '@mdi/font/css/materialdesignicons.css';
import Vue from 'vue';
import Vuetify from 'vuetify/lib';
import { colors } from "vuetify/lib";

Vue.use(Vuetify);

const kobitTheme = {
    themes: {
        light: {
            primary: "#f2f2f2",
            text: "#404040",
            secondary: "#00a5bd",
            accent: "#5cd7f0",
            error: colors.red.accent3,
            info: "#2196F3",
            success: "#0000ff",
            warning: "#ff7043"
        },
        dark: {
            primary: colors.blue.lighten3,
            secondary: colors.green,
            accent: colors.cyan,
            text: "#ffffff"
        }
    }
};

const lhmTheme = {
    themes: {
        light: {
            primary: "#FFE400",
            text: "#404040",
            secondary: "#1B98D5",
            accent: "#004376",
            error: "#984447",
            info: "#2196F3",
            success: "#3A7F53",
            warning: "#FCAA67"
        },
        dark: {
            primary: colors.blue.lighten3,
            secondary: colors.green,
            accent: colors.cyan,
            text: "#ffffff"
        }
    }
};

export default new Vuetify({
    icons: {
        iconfont: "mdi"
    },
    theme: lhmTheme,
});