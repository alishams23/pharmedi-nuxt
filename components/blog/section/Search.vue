<template>

  <div class="relative rtl mb-2" id="search">
    <div class="absolute inset-y-0 start-0 flex items-center pe-3 pointer-events-none">
      <svg class="w-4 h-4 text-gray-300 " aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none"
        viewBox="0 0 20 20">
        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
          d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z" />
      </svg>
    </div>
    <input @keyup.enter="onSearch" v-model="text"
      class="block w-full p-4 pe-5 text-sm text-gray-900   rounded-full bg-white shadow-none  focus:ring-blue-500 focus:border-blue-500 "
      placeholder="جستجو بین وبلاگ ها ..." required />
    <BlogSectionFilterSearch @change="(newVal) => onCategory(newVal)">
      <div
        class="flex items-center text-blue-600 absolute end-2 bottom-2 shadow-2 bg-gradient-to-tl  from-[#d2d7f2] to-[#daeefb] focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-full text-sm px-4 py-[7px] ">
        <AdjustmentsHorizontalIcon class=" w-4 h-4 ml-3 " />
        فیلتر
      </div>
    </BlogSectionFilterSearch>

  </div>
  <button class="rounded-full text-center py-2 px-3 shadow-3 mx-1 bd-highlight text-xs" @click="onOrder('-pk')"
    :class="order == '-pk' ? 'bg-gradient-to-tl  from-[#2741e7] to-[#2aa2f2] text-white' : ' bg-gray-200 text-gray-700'">
    اخرین
  </button>

  <button class="rounded-full text-center py-2 px-3 shadow-3 mx-1 bd-highlight text-xs"
    @click="onOrder('-viewed_ips_count')"
    :class="order == '-viewed_ips_count' ? 'bg-gradient-to-tl  from-[#2741e7] to-[#2aa2f2] text-white' : 'bg-gray-200 text-gray-700'">
    محبوب ترین
  </button>
  <div class="d-flex flex-row align-items-stretch flex-wrap">
    <nuxt-link v-for="item in data || []" :key="item.id + 'blog list'" :to="'/t/blog/' + item.id"
      class="col-12 col-lg-6 col-xl-6 col-md-6 pt-2 pb-3 px-2 d-flex align-items-stretch">
      <BlogSharedBlogCardWide class="w-full" :data="item" />
    </nuxt-link>
  </div>

  <div class="py-5 pb-3 px-3">
    <alert v-if="(data && data.length === 0) && !loading" class="mt-5">
      چیزی برای نمایش وجود ندارد
    </alert>
  </div>
  <div class="d-flex justify-content-center">
    <button v-if="nextPage != null && !loading" class="border rounded-pill py-2 px-3 mt-2 bg-white" @click="loadMore">
      بیشتر
    </button>
  </div>
  <div v-if="loading" class="d-flex justify-content-center">
    <span class="loader" />
  </div>
</template>

<script setup>

import axios from 'axios';
import { AdjustmentsHorizontalIcon, } from '@heroicons/vue/20/solid'

const page = ref(1);
const text = ref('');
const order = ref('-pk');
const loading = ref(false);
const nextPage = ref(null);
const categories = ref([]);

const { data, refresh } = useAsyncData('blogData', async () => {
  loading.value = true;
  try {
    console.log(categories.value);
    
    const response = await axios.get(
      `https://pharmedi.ir/api/blog/search-list-view/?search=${text.value || ''}&page=${page.value}&ordering=${order.value}${categories.value.length >0 ? '&category=' + categories.value[0] : ''}`
    );
    nextPage.value = response.data.next;
    return response.data.results;
  } catch (error) {
    console.error(error);
    return [];
  } finally {
    loading.value = false;
  }
});

const onSearch = () => {
  page.value = 1;
  refresh();
};

const onOrder = (newOrder) => {
  order.value = newOrder;
  page.value = 1

  refresh();

};
const onCategory = (newVal) => {
  categories.value = newVal;
  page.value = 1
  refresh();

};

const loadMore = async () => {
  page.value++;
  loading.value = true;
  try {
    const response = await axios.get(
      `https://pharmedi.ir/api/blog/search-list-view/?search=${text.value || ''}&page=${page.value}${categories.value.join('&category=')}`
    );
    nextPage.value = response.data.next;
    if (data.value) {
      data.value.push(...response.data.results);
    }
  } catch (error) {
    console.error(error);
  } finally {
    loading.value = false;
  }
};
</script>

<style scoped>
/* Add your styles here */
</style>