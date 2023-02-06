import Vue from "vue";
import Toast from "vue-toastification";

Vue.use(Toast, {
    position: "bottom-left",
    transition: "Vue-Toastification__fade",
    closeOnClick: false,
});


export default class Toaster {
    static toast(message: string, type: "success" | "info" | "error" | "warning" = "info"): void {
        Vue.$toast[type](message);
    }
}