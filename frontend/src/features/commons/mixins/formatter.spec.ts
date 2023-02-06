import {createLocalVue, mount} from '@vue/test-utils';
import formatter from "@/features/commons/mixins/formatter.mixin";

describe('formatter.vue', () => {
    const localVue = createLocalVue();
    // eslint-disable-next-line
    let wrapper: any;
    const component = {
        mixins: [formatter],
        template: '<div />'
    };


    beforeEach(() => {
        wrapper = mount(component, {
            localVue,
        });
    });

    afterEach(() => {
        wrapper.destroy();
    });

    it('should formate dates', function () {
        const thisDate = new Date("2021-12-31");
        expect(wrapper.vm.formatDate(thisDate)).toBe("12/31/2021");
    });

    it('should uppercase the first char', function () {
        const thisAwesomeString = "locco lhm";
        expect(wrapper.vm.startingCharUpperCase(thisAwesomeString)).toBe("Locco lhm");
    });
});