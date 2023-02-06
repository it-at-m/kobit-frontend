import {createLocalVue, mount, Wrapper} from '@vue/test-utils';
import Vuetify from 'vuetify';
import Vue from 'vue';
import BaseLinkCard from "@/features/commons/base-link-card/base-link-card.vue";

describe('BaseLinkCard.vue', () => {
    const localVue = createLocalVue();
    let vuetify: Vuetify;
    let wrapper: Wrapper<Vue>;
    const component = BaseLinkCard;

    const thisObject = {
        meta: {
            icon: "mdi-foobar",
            infoText: "Der der kann klickts",
        },
        name: "FAQ",
        path: "/"
    };


    beforeAll(() => {
        Vue.use(Vuetify);
    });

    beforeEach(() => {
        vuetify = new Vuetify();
        wrapper = mount(component, {
            localVue,
            vuetify,
            propsData: {
                item: thisObject
            },
            stubs: ["router-link"]
        });
    });

    afterEach(() => {
        wrapper.destroy();
    });

    it('needs props to work properly but they are still optional', function () {
        const alert = wrapper.find(`#id_alert_${thisObject.name}`);
        expect(alert.text()).toContain(thisObject.name);
        expect(alert.text()).toContain(thisObject.meta.infoText);
        expect(alert.html()).toContain(thisObject.path);
        expect(alert.html()).toContain(thisObject.meta.icon);
    });
});