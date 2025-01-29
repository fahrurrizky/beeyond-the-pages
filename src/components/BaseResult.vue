<script>
export default {
  name: 'BaseResult',
  props: {
    // Text
    text: {
      type: String,
      default: 'This',
    },
    // Status
    status: {
      type: [Boolean],
      default: null,
    },
    paddingY: {
      type: String,
      default: 'py-8',
    },
  },
  computed: {
    loadState() {
      return this.status;
    },
  },
};
</script>

<template>
  <template v-if="!loadState">
    <div class="empty-result mx-auto px-0" :class="[paddingY]">
      <div class="d-flex justify-content-center">
        <div v-if="loadState === null"  class="spinner-border" role="status">
          <span class="visually-hidden">Loading...</span>
        </div>
        <div v-else-if="loadState === false" class="text-danger">
          <strong>{{ text }} Data</strong> is Empty!
        </div>
      </div>
    </div>
  </template>
  <template v-else>
    <slot />
  </template>
</template>

<style lang="scss" scoped>
:root {
  --color: #1a1a1a;
  --background: white;
}
.dark {
  --color: white;
  --background: #1a1a1a;
}
.empty-result {
  background-color: var(--background);
  color: var(--color);
  .text-danger {
    color: #f5365c !important;
  }
}
</style>
