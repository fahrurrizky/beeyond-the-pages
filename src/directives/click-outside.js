export default {
  beforeMount(el, binding) {
    const ctx = el;
    ctx.clickOutsideEvent = function click(event) {
      if (!(el === event.target || el.contains(event.target))) {
        binding.value(event, el);
      }
    };
    document.body.addEventListener('click', ctx.clickOutsideEvent);
  },
  unmounted(el) {
    const ctx = el;
    document.body.removeEventListener('click', ctx.clickOutsideEvent);
  },
};
