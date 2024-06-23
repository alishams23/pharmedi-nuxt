<template>
    <div class=" ">
        <div class="flex mt-[60px] mb-10 items-center justify-end">
            <h2 class=" text-2xl font-black text-right my-3 mr-4  ">محصولات</h2>
            <div class="h-12 w-12 bg-[#8b4513] flex justify-center items-center  mr-10 rounded-2xl">
                <ShoppingBagIcon class=" w-8 h-8 text-white" />
            </div>
        </div>
        <swiper :modules="modules" :slides-per-view="'auto'" :space-between="10" :loop="false"
            class=" flex justify-center">
            <div v-if="loading" class='flex space-x-1 justify-center items-center bg-white h-[378.8px]'>
                <span class='sr-only'>Loading...</span>
                <div class='h-5 w-5 bg-[#8b4513] rounded-full animate-bounce [animation-delay:-0.3s]'></div>
                <div class='h-5 w-5 bg-[#8b4513] rounded-full animate-bounce [animation-delay:-0.15s]'></div>
                <div class='h-5 w-5 bg-[#8b4513] rounded-full animate-bounce'></div>
            </div>
            <swiper-slide v-else v-for="item in products" class="mb-9 ">
                <div class=" rounded-3xl flex justify-center items-center  mx-5">
                    <ShopSharedProductCard :data="item" />
                </div>
            </swiper-slide>
            ...
        </swiper>
    </div>

</template>
<script>

import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import { ShoppingBagIcon } from '@heroicons/vue/20/solid'
import axios from "axios";


// Import Swiper Vue.js components
import { Swiper, SwiperSlide } from 'swiper/vue';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';

export default {

    components: {
        Swiper,
        SwiperSlide,
        ShoppingBagIcon,

    },
    setup() {
        return {
            modules: [Autoplay, Pagination, Navigation],
        };
    },
    data: () => ({
        products: [],
        loading: true,
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
