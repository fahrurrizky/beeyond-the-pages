<template>
  <div ref="dropdownContainer" class="custom-multiple-select">
    <div class="selected-options form-control" @click="toggleDropdown">
      <span v-if="selectedOptions.length === 0">{{ text }}</span>
      <div v-else>
        <span v-for="selectedOption in selectedOptions" :key="selectedOption.id" class="selectedOption text-truncate">
          <span @click="unselectOption(selectedOption)">{{ selectedOption.name }}</span>
        </span>
      </div>
    </div>
    <div v-if="isOpen" ref="dropdown" class="dropdown">
      <div v-for="option in options" :key="option.id" class="form-check d-flex align-items-center">
        <input :id="option.id" class="form-check-input" type="checkbox" :checked="isOptionSelected(option)" :disabled="isOptionSelected(option)" @change="selectOption(option)" />
        <label class="form-check-label w-75" :for="option.id">{{ option.name }}</label>
      </div>
    </div>
  </div>
</template>

<script>
import { createPopper } from '@popperjs/core';

export default {
  name: 'BaseMultiselect',
  props: {
    modelValue: {
      type: Array,
      default: () => [],
    },
    options: {
      type: Array,
      default: () => [],
    },
    text: {
      type: String,
      default: 'Select Working Team',
    },
  },
  emits: ['update:modelValue'],
  data() {
    return {
      isOpen: false,
      popperInstance: null,
      selectedOptions: this.getSelectedOptions(),
    };
  },
  watch: {
    isOpen(newValue) {
      if (newValue) {
        this.$nextTick(() => {
          this.createPopperInstance();
        });
        this.addClickOutsideListener();
      } else {
        this.destroyPopperInstance();
        this.removeClickOutsideListener();
      }
    },
    modelValue: {
      handler() {
        this.selectedOptions = this.getSelectedOptions();
      },
      immediate: true,
    },
  },
  mounted() {
    this.addClickOutsideListener();
  },
  beforeUnmount() {
    this.destroyPopperInstance();
    this.removeClickOutsideListener();
  },
  methods: {
    toggleDropdown() {
      this.isOpen = !this.isOpen;
    },
    selectOption(option) {
      const selectedOption = {
        id: option.id,
        name: option.name,
      };

      if (!this.isOptionSelected(option)) {
        this.$emit('update:modelValue', [...this.modelValue, selectedOption.id]);
      } else {
        this.$emit(
          'update:modelValue',
          this.modelValue.filter((item) => item !== option.id),
        );
      }
    },
    unselectOption(option) {
      this.$emit(
        'update:modelValue',
        this.modelValue.filter((item) => item !== option.id),
      );
    },
    isOptionSelected(option) {
      return this.modelValue.includes(option.id);
    },
    getSelectedOptions() {
      return this.modelValue.map((id) => {
        const option = this.options.find((opt) => opt.id === id);
        return option ? { id: option.id, name: option.name } : null;
      }).filter(Boolean);
    },
    createPopperInstance() {
      const reference = this.$refs.dropdownContainer;
      const popper = this.$refs.dropdown;
      this.popperInstance = createPopper(reference, popper, {
        placement: 'bottom-start',
        modifiers: [
          {
            name: 'offset',
            options: {
              offset: [0, 8],
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
    addClickOutsideListener() {
      document.addEventListener('click', this.handleOutsideClick);
    },
    removeClickOutsideListener() {
      document.removeEventListener('click', this.handleOutsideClick);
    },
    handleOutsideClick(event) {
      const { dropdownContainer } = this.$refs;
      if (!dropdownContainer.contains(event.target)) {
        this.isOpen = false;
      }
    },
  },
};
</script>

<style scoped>
.custom-multiple-select {
  position: relative;
  width: 100%;
}

.selected-options {
  cursor: pointer;
  display: flex;
  align-items: center;
  overflow: scroll;
}

.selected-options::-webkit-scrollbar {
  display: none;
}
.selected-options {
  -ms-overflow-style: none; /* IE and Edge */
  scrollbar-width: none; /* Firefox */
}

.selected-options .selectedOption {
  margin-right: 8px;
  padding: 4px 6px;
  border-radius: 6px;
  background-color: green;
  color: white;
  position: relative;
  font-size: 8px;
}

.selected-options .close-icon {
  background-color: red;
  border-radius: 100%;
  color: black;
  width: 10px;
  height: 10px;
  margin: 0;
  cursor: pointer;
  position: absolute;
  top: -20%;
  right: -1%;
  padding: 4px;
}

.dropdown {
  position: absolute;
  width: 100%;
  top: 100%;
  left: 0;
  z-index: 10;
  background-color: #fff;
  border: 1px solid #ccc;
  max-height: 150px;
  overflow-y: auto;
  box-shadow: 0 0.5rem 1rem rgba(0, 0, 0, 0.15);
}

.form-check {
  padding: 8px;
  border-bottom: 1px solid #e0e0e0;
}

.form-check-input {
  margin-right: 10px;
}
</style>
