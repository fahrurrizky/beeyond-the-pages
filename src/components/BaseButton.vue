<script setup>
import { computed } from "vue";

const props = defineProps({
  size: {
    type: String,
    default: "md",
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
});

// Kelas tombol berdasarkan properti
const buttonClasses = computed(() => {
  const sizeClass = {
    sm: "px-3 py-1 text-sm",
    md: "px-4 py-2 text-base",
    lg: "px-5 py-3 text-lg",
  }[props.size];

  const fullWidthClass = props.fullWidth ? "w-full" : "";
  const activeClass = props.active ? "ring-2 ring-gray-500" : "";
  const disabledClass = props.loading ? "opacity-50 cursor-not-allowed" : "hover:ring-2";

  return `border border-gray-400 text-gray-700 rounded-md transition-all duration-200 ${sizeClass} ${fullWidthClass} ${activeClass} ${disabledClass}`;
});
</script>

<template>
  <button :class="buttonClasses" :disabled="loading" type="button">
    <span v-if="loading" class="animate-spin border-2 border-gray-400 border-t-transparent rounded-full w-4 h-4 inline-block"></span>
    <slot v-else />
  </button>
</template>
