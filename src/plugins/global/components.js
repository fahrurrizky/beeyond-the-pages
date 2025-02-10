// base components
import BaseAlert from '@comp/BaseAlert.vue';
import BaseButton from '@comp/BaseButton.vue';
import BaseModal from '@comp/BaseModal.vue';
import ContaintLoader from '@comp/ContaintLoader.vue';
import BaseTextarea from '@comp/BaseTextarea.vue';
import BaseMultiselect from '@comp/BaseMultiselect.vue';
import BasePopper from '@comp/BasePopper.vue';
import VueMultiselect from 'vue-multiselect';

// forms
import BaseInput from '@comp/BaseInput.vue';
import { Form as BaseForm, FieldArray as BaseFormArray } from 'vee-validate';

/**
 * Register global components here,
 * so it can be used directly without importing it again in `.vue` file.
 * Register with format;
 * - `ComponentName`
 * - `<component-name />`
 */
const globalComponents = {
  install(app) {
    // Base Components
    app.component(BaseAlert.name, BaseAlert);
    app.component(BaseButton.name, BaseButton);
    app.component(BaseModal.name, BaseModal);
    app.component(ContaintLoader.name, ContaintLoader);
    app.component(BaseTextarea.name, BaseTextarea);
    app.component(BaseMultiselect.name, BaseMultiselect);
    app.component(BasePopper.name, BasePopper);
    // Advanced Components
    app.component('VueMultiselect', VueMultiselect);
    // form components
    app.component(BaseInput.name, BaseInput);
    app.component('BaseForm', BaseForm);
    app.component('BaseFormArray', BaseFormArray);
  },
};

export default globalComponents;
