<template>
    <div class=" ">
        <div class="flex mt-[30px] mb-10 items-center justify-end">
            <h2 class=" irsa  text-lg font-bold text-right my-3 mr-4  "> پرفروش ترین</h2>
            <div class="h-12 w-12 bg-treaget flex justify-center items-center  mr-5 rounded-2xl">
                <ShoppingBagIcon class=" w-8 h-8 text-white" />
            </div>
        </div>
        <swiper :pagination="{
        clickable: true,

    }" :modules="modules" :slides-per-view="'auto'" :space-between="5" :loop="false"
            class=" flex justify-center">
            <div v-if="loading" class='flex space-x-1 justify-center items-center  h-[378.8px]'>
                <div class="loader"></div>
            </div>
            <swiper-slide  v-else v-for="item in products" class="mb-9 w-auto">
                <div class=" rounded-3xl flex justify-center items-center  mx-2">
                    <ShopSharedProductCard :data="item" />
                </div>
            </swiper-slide>
            ...
        </swiper>
    </div>

</template>
<script>

import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import { ShoppingBagIcon, } from '@heroicons/vue/20/solid'
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
                    this.products = response.data.results.slice(0,6);
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
