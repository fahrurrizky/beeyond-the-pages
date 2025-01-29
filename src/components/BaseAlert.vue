<template>
  <div class="alert text-white font-weight-bold" role="alert" :class="getClasses(color, dismissible)">
    <span class="alert-icon">
      <i :class="getIcon(icon)" />
    </span>
    <span class="alert-text font-weight-normal">
      &nbsp;
      <template v-if="$props.text">
        {{ text }}
      </template>
      <slot v-else />
    </span>
    <button v-if="dismissible" type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
  </div>
</template>

<script>
export default {
  name: 'BaseAlert',
  props: {
    color: {
      type: String,
      default: 'success',
    },
    icon: {
      type: String,
      default: '',
    },
    dismissible: {
      type: Boolean,
      default: false,
    },
    text: {
      type: String,
      default: '',
    },
  },
  methods: {
    getClasses: (color, dismissible) => {
      const colorValue = color ? `alert-${color}` : null;
      const dismissibleValue = dismissible ? 'alert-dismissible fade show' : null;

      return `${colorValue} ${dismissibleValue}`;
    },
    getIcon: (icon) => icon || null,
  },
};
</script>
