<template>
    <div>
      <!-- Trigger button to open dialog -->
      <button @click="isOpen = true" class="border bg-white p-2 rounded-pill px-4 my-3">چت بات</button>
  
      <!-- Headless UI Dialog -->
      <TransitionRoot appear :show="isOpen" as="template" style="z-index: 99999999;">
        <Dialog @close="isOpen = false" :open="isOpen" class="fixed inset-0 z-10 overflow-y-auto">
          <div class="min-h-screen px-4 text-center">
            <TransitionChild
              as="template"
              enter="ease-out duration-300"
              enter-from="opacity-0"
              enter-to="opacity-100"
              leave="ease-in duration-200"
              leave-from="opacity-100"
              leave-to="opacity-0"
            >
              <DialogOverlay class="fixed inset-0 bg-black bg-opacity-30" />
            </TransitionChild>
  
            <!-- Centering -->
            <span class="inline-block h-screen align-middle" aria-hidden="true">&#8203;</span>
  
            <!-- Dialog content -->
            <TransitionChild
              as="template"
              enter="ease-out duration-300"
              enter-from="opacity-0 scale-95"
              enter-to="opacity-100 scale-100"
              leave="ease-in duration-200"
              leave-from="opacity-100 scale-100"
              leave-to="opacity-0 scale-95"
            >
              <div
                class="inline-block w-full max-w-2xl p-6 my-8 overflow-hidden text-left align-middle transition-all transform bg-white shadow-xl rounded-lg"
              >
                <DialogTitle class="text-lg font-medium leading-6 text-gray-900">Chat with LMSys</DialogTitle>
                <button @click="isOpen = false" class="absolute top-4 right-4 text-gray-500 hover:text-gray-700">
                  Close
                </button>
  
                <!-- iframe for chat.lmsys.org -->
                <iframe
                  src="https://poe.com/"
                  width="100%"
                  height="600px"
                  class="mt-4 border rounded-lg"
                  frameborder="0"
                ></iframe>
              </div>
            </TransitionChild>
          </div>
        </Dialog>
      </TransitionRoot>
    </div>
  </template>
  
  <script setup>
 
  import { Dialog, DialogOverlay, DialogTitle, TransitionChild,TransitionRoot } from '@headlessui/vue';
  
  const isOpen = ref(false);
  </script>
  