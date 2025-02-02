
// * click outside directive
const clickOutside = {
  beforeMount(el, binding) {
    const clickOutsideEvent = (event) => {
      // Check if click was outside the el and its children
      if (!(el === event.target || el.contains(event.target))) {
        // Call the method provided in v-click-outside
        binding.value(event);
      }
    };
    // eslint-disable-next-line no-underscore-dangle, no-param-reassign
    el.__vueClickOutside__ = clickOutsideEvent;
    document.body.addEventListener('click', clickOutsideEvent);
  },
  unmounted(el) {
    // eslint-disable-next-line no-underscore-dangle, no-param-reassign
    document.body.removeEventListener('click', el.__vueClickOutside__);
    // eslint-disable-next-line no-underscore-dangle, no-param-reassign
    el.__vueClickOutside__ = null;
  },
};

export {
  clickOutside,
};
