import {createLocalVue, mount} from '@vue/test-utils';
import SaveLeave from "@/features/commons/mixins/save-leave.mixin";

describe('saveLeave.vue', () => {
    const localVue = createLocalVue();
    const formId = "form";
    const inputId = "input";
    const submitId = "submit";
    let wrapper: any;
    const component = {
        mixins: [SaveLeave],
        template: `<div>
        <form id="´${formId}´" ref="formref">
          <input id="´${inputId}´" type="text" />
            <input id="´${submitId}´" type="submit" value="go!" to="/">
        </form>
        
        </div>`
    };

    beforeEach(() => {
        wrapper = mount(component, {
            localVue,
        });
    });

    afterEach(() => {
        wrapper.destroy();
    });

    it('should be called', function () {
       const input = wrapper.find("#"+inputId);
       input.value = "baloo";
       expect(input.value).toBe("baloo");
    });
});