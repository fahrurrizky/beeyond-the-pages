<script>
export default {
  name: 'BaseButton',
  props: {
    color: {
      type: String,
      default: 'success',
    },
    size: {
      type: String,
      default: 'md',
    },
    variant: {
      type: String,
      default: 'fill',
    },
    fullWidth: {
      type: Boolean,
      default: false,
    },
    active: {
      type: Boolean,
      default: false,
    },
    loading: {
      type: Boolean,
      default: false,
    },
  },
  methods: {
    getClasses: (variant, color, size, fullWidth, active) => {
      let colorValue;
      const sizeValue = size ? `btn-${size}` : '';
      const fullWidthValue = fullWidth ? 'w-100' : '';
      const activeValue = active ? 'active' : '';

      // Setting the button variant and color
      if (variant === 'gradient') {
        colorValue = `bg-gradient-${color}`;
      } else if (variant === 'outline') {
        colorValue = `btn-outline-${color}`;
      } else {
        colorValue = `btn-${color}`;
      }

      return `${colorValue} ${sizeValue} ${fullWidthValue} ${activeValue}`;
    },
  },
};
</script>

<template>
  <button class="btn mb-0" :class="getClasses(variant, color, size, fullWidth, active)" :disabled="loading">
    <span v-if="loading" class="spinner-border spinner-border-sm" aria-hidden="true"></span>
    <slot v-else />
  </button>
</template>
