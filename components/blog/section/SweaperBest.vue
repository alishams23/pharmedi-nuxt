<template>
    <div class=" ">
        <div class="flex md:mb-4 items-center justify-end">
            <h2 class=" irsa  text-lg font-bold text-right my-3 mr-4  ">برترین ها </h2>
           <div class="hidden d-md-block">
             <div class="  h-12 w-12 bg-gradient-to-tl  from-[#2741e7] to-[#2aa2f2]  flex justify-center items-center  mr-5 rounded-2xl">
                 <StarIcon class=" w-8 h-8 text-white" />
             </div>
           </div>
        </div>
        <swiper :modules="modules" :slides-per-view="'auto'" :space-between="5" :loop="false"
            class=" flex justify-center">
            <div v-if="loading" class='flex space-x-1 justify-center items-center  h-[378.8px]'>
                <div class="loader"></div>
            </div>
            <swiper-slide  v-else v-for="item in products" class="mb-[60px] w-auto">
                <div class=" rounded-3xl flex justify-center items-center  mx-2">
                    <BlogSharedBlogCard :data="item" />
                </div>
            </swiper-slide>
            ...
        </swiper>
    </div>

</template>
<script>

import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import { StarIcon, } from '@heroicons/vue/24/solid'
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
    
        StarIcon
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
                .get(`https://pharmedi.ir/api/blog/search-list-view/?is_in_main_page=true`, {
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
