<template>
    <div class=" mb-10">
        <div class=" flex items-center w-full mx-auto px-2 rtl">
            <div @click="openFilter = true"
                class=" grid place-items-center w-11 h-11  bg-gradient-to-tl  from-[#2741e7] to-[#2aa2f2] rounded-full ml-3">
                <IconFilterSearch class=" text-white w-5 h-5" />
            </div>
            <ShopSectionTransitionRoot v-model:openFilter="openFilter" />
            <label for="default-search"
                class="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white">Search</label>
            <div class=" flex-grow relative     ">
                <div class="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                    <svg class="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                            d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z" />
                    </svg>
                </div>
                <input v-model="name" @keyup.enter="$router.push('/t/search/?text=' + name)" type="search"
                    id="default-search"
                    class="block w-full p-4 pe-5 text-sm text-gray-900 border border-gray-300 rounded-full bg-gray-50 focus:ring-blue-500 focus:border-blue-500 shadow-none"
                    placeholder="جستجو میان محصولات ما..." required />
                <NuxtLink type="submit"
                    class="text-white absolute end-2 bottom-2 bg-treaget hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300  rounded-full text-sm font-light px-4 py-2 ">
                    جستجو</NuxtLink>
            </div>

        </div>
    </div>
    <div class=" grid grid-cols-2 mx-3 gap-x-7 gap-y-8 md:grid-cols-4 md:mx-0 lg:grid-cols-4 lg:mx-0">
        <div class=" col-span-1 bg-white rounded-3xl" v-for="item in products">
            <ShopSharedProductCard class="" :data="item" />
        </div>
    </div>
</template>
<script>
import axios from "axios";
import { IconFilterSearch } from '@tabler/icons-vue'

export default {
    components: {
        IconFilterSearch
    },
    data: () => ({
        products: [],
        loading: true,
        name: '',
        openFilter: false
    }),

    methods: {
        getData() {
            this.loading = true;
            axios
                .get(`https://pharmedi.ir/api/shop/best-product-list-main-page/`, {
                    headers: {
                        "Content-type": "application/json",
                        Accept: "application/json",
                    },
                })
                .then((response) => {
                    this.products = response.data.results;
                    this.loading = false;
                    console.log(this.products)
                });
        },
    },
    mounted() {
        this.getData()
    }
}

</script>