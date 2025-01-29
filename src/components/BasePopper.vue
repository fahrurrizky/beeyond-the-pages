<template>
  <div ref="dropdownContainer" v-click-outside="handleClickOutside" class="custom-multiple-select">
    <div @click="toggleDropdown">
      <template v-if="hasHeaderSlot">
        <slot name="header"></slot>
      </template>
      <template v-else>
        <div v-if="isButton">
          <base-button :color="btnColor" :size="size" class="d-flex align-items-center gap-3">
            <span v-if="useIcon">
              <i :class="`fa-solid fa-${iconType}`"></i>
            </span>
            {{ text }}
          </base-button>
        </div>
        <div v-else>
          <i class="fa-solid fa-ellipsis-vertical text-primary"></i>
        </div>
      </template>
    </div>
    <div v-if="isOpen" ref="dropdown" :class="['dropdown', bodyClass]">
      <slot name="body"></slot>
    </div>
  </div>
</template>

<script>
import { createPopper } from '@popperjs/core';
import { clickOutside } from '@/utils/helpers';

export default {
  name: 'BasePopper',
  directives: {
    clickOutside,
  },
  props: {
    isOpen: {
      type: Boolean,
      default: false,
    },
    text: {
      type: String,
      default: 'Filter',
    },
    btnColor: {
      type: String,
      default: 'purple',
    },
    isButton: {
      type: Boolean,
      default: true,
    },
    useIcon: {
      type: Boolean,
      default: false,
    },
    iconType: {
      type: String,
      default: 'circle-plus',
    },
    placement: {
      type: String,
      description: 'Popper placement',
      validator(value) {
        const acceptedValues = ['', 'end', 'start'];
        return acceptedValues.indexOf(value) !== -1;
      },
      default: 'end',
    },
    vertical: {
      type: String,
      description: 'Popper vertical',
      validator(value) {
        const acceptedValues = ['', 'top', 'bottom'];
        return acceptedValues.indexOf(value) !== -1;
      },
      default: 'bottom',
    },
    bodyClass: {
      type: String,
      default: '',
    },
    size: {
      type: String,
      default: '',
    },
    offset: {
      type: Array,
      default: () => [0, 8],
    },
  },
  emits: ['toggleDropdown'],
  data() {
    return {
      popperInstance: null,
    };
  },
  computed: {
    hasHeaderSlot() {
      return !!this.$slots.header;
    },
  },
  watch: {
    isOpen(newValue) {
      if (newValue) {
        this.$nextTick(() => {
          this.createPopperInstance();
        });
      } else {
        this.destroyPopperInstance();
      }
    },
  },
  beforeUnmount() {
    this.destroyPopperInstance();
  },
  methods: {
    toggleDropdown() {
      this.$emit('toggleDropdown');
    },
    createPopperInstance() {
      const reference = this.$refs.dropdownContainer;
      const popper = this.$refs.dropdown;
      this.popperInstance = createPopper(reference, popper, {
        placement: `${this.vertical}-${this.placement}`,
        modifiers: [
          {
            name: 'offset',
            options: {
              offset: this.offset,
            },
          },
        ],
      });
    },
    destroyPopperInstance() {
      if (this.popperInstance) {
        this.popperInstance.destroy();
        this.popperInstance = null;
      }
    },
    handleClickOutside() {
      if (this.isOpen) {
        this.toggleDropdown();
      }
    },
  },
};
</script>

<style scoped>
.custom-multiple-select {
  width: fit-content;
}
.btn-purple {
  background-color: #dbdbf8;
  color: #4c4ddc;
}

.dropdown {
  background-color: #f5f5f5;
  opacity: 1;
  z-index: 10;
  border-radius: 8px;
  padding: 12px 14px;
}
</style>
