<template>
    <div
      v-if="modelValue"
      class="fixed bottom-5 left-1/2 transform -translate-x-1/2 px-6 py-3 bg-gray-800 text-white rounded-md shadow-lg transition-opacity duration-500"
      :class="modelValue ? 'opacity-100' : 'opacity-0'"
    style="z-index: 99999;"
      >
      <p>{{ message }}</p>
    </div>
  </template>
  
  <script setup>
  import { ref, watch } from 'vue';
  
  const props = defineProps({
    modelValue: {
      type: Boolean,
      required: true,
    },
    message: {
      type: String,
      required: true,
    },
    duration: {
      type: Number,
      default: 5000,
    },
  });
  
  const emit = defineEmits(['update:modelValue']);
  
  // Watch for changes in `modelValue` and start the timeout to hide it after `duration`
  watch(
    () => props.modelValue,
    (newValue) => {
      if (newValue) {
        setTimeout(() => {
          emit('update:modelValue', false);
        }, props.duration);
      }
    }
  );
  </script>
  