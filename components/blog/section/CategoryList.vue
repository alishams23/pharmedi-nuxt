<template>
  <div class="">
    <div class="d-flex ">
        <div v-for="item in selectedCategory" class="bg-gray-200 px-3 rounded-pill py-2 mx-2 text-xs">
            {{ item.title }}
        </div>
    </div>
    <Combobox :disabled="loading" v-model="selectedCategory" multiple>
      <div class="relative mt-1">
        <div
          class="relative  w-full cursor-default overflow-hidden rounded-lg bg-white text-left border focus:outline-none focus-visible:ring-2 focus-visible:ring-white/75 focus-visible:ring-offset-2 focus-visible:ring-offset-teal-300 sm:text-sm"
        >
          <ComboboxInput
          placeholder="دسته بندی مورد نظر را انتخاب کنید" 
            class="w-full border-none py-2 irsa  pl-3 pr-10 text-sm leading-5 text-gray-900 focus:ring-0"
            :displayValue="(person) => person.name"
            @change="onInputChange"
          />
          <ComboboxButton class="absolute inset-y-0 right-0 flex items-center pr-2">
            <ChevronUpDownIcon class="h-5 w-5 text-gray-400" aria-hidden="true" />
          </ComboboxButton>
        </div>
        <TransitionRoot
          leave="transition ease-in duration-100"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
          @after-leave="clearQuery"
        >
          <ComboboxOptions
            class="absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base ring-1 ring-black/5 focus:outline-none sm:text-sm z-[99999]"
          >
            <div
              v-if="filteredCategory.length === 0 && query !== ''"
              class="relative cursor-default select-none px-4 py-2 text-gray-700"
            >
              Nothing found.
            </div>

            <ComboboxOption
              v-for="category in filteredCategory"
              as="template"
              :key="category.id"
              :value="category"
              v-slot="{ selected, active }"
            >
              <li
                class="relative cursor-default select-none py-2 pl-10 pr-4"
                :class="{
                  'bg-teal-600 text-white': active,
                  'text-gray-900': !active,
                }"
              >
                <span
                  class="block truncate"
                  :class="{ 'font-medium': selected, 'font-normal': !selected }"
                >
                  {{ category.title }}
                </span>
                <span
                  v-if="selected"
                  class="absolute inset-y-0 left-0 flex items-center pl-3"
                  :class="{ 'text-white': active, 'text-teal-600': !active }"
                >
                  <CheckIcon class="h-5 w-5" aria-hidden="true" />
                </span>
              </li>
            </ComboboxOption>
          </ComboboxOptions>
        </TransitionRoot>
      </div>
    </Combobox>
  </div>
</template>

<script>

import axios from 'axios';
import {
  Combobox,
  ComboboxInput,
  ComboboxButton,
  ComboboxOptions,
  ComboboxOption,
  TransitionRoot,
} from '@headlessui/vue';
import { CheckIcon, ChevronUpDownIcon } from '@heroicons/vue/20/solid';

export default {
  emits:["change"],
  props:["data"],
  components: {
    Combobox,
    ComboboxInput,
    ComboboxButton,
    ComboboxOptions,
    ComboboxOption,
    TransitionRoot,
    CheckIcon,
    ChevronUpDownIcon,
  },
  data() {
    return {
      categories: [],
      selectedCategory: [],
      query: '',
      loading :false
    };
  },
  watch: {
    selectedCategory(newVal) {
      this.$emit('change', newVal);
    },
  },
  computed: {
    filteredCategory() {
      return this.query === ''
        ? this.categories
        : this.categories.filter(category =>
            category.title
              .toLowerCase()
              .replace(/\s+/g, '')
              .includes(this.query.toLowerCase().replace(/\s+/g, ''))
          );
    },
  },
  methods: {
    async fetchCategories() {
      this.loading = true;
      try {
        const response = await axios.get('https://pharmedi.ir/api/blog/list-category');
        this.categories = Array.isArray(response.data) ? response.data : [];
      } catch (error) {
        console.error('Error fetching categories:', error);
      }
      this.loading = false;
    },
    onInputChange(event) {
      this.query = event.target.value;
    },
    clearQuery() {
      this.query = '';
    },
  },
  async mounted() {
    await this.fetchCategories();
    this.selectedCategory = this.data
  },
};
</script>
