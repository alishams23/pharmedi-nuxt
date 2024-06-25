<template>
    <div v-if="loading == false" class=" mb-20">
        <div
            class=" grid grid-cols-2 grid-rows-2 gap-4 h-[416px] md:grid-cols-3 lg:grid-rows-2 md:h-[616px] lg:h-[616px]">
            <div class=" col-span-2 row-span-1 md:row-span-2 lg:row-span-2">
                <swiper :modules="modules" :slides-per-view="1" :space-between="6" :loop="false"
                    class=" h-[300px] mx-1 md:h-[488px] lg:h-[488px]">
                    <swiper-slide v-for="item in data1" class="">
                        <img :src="item.photo"
                            class=" w-[405px] h-full object-cover rounded-3xl md:w-[645.33px] lg:w-[645.33px]">
                    </swiper-slide>
                </swiper>
                <!-- <img :src="data1[0].photo" class=" w-full h-full object-cover rounded-3xl"> -->
            </div>
            <div
                class="h-[150px] ml-1 col-span-1 row-span-1 md:row-span-1 lg:row-span-1 md:h-[300px] lg:h-[300px] md:ml-0 lg:ml-0">
                <img :src="data2[0].photo" class=" w-full h-full object-cover rounded-3xl">
            </div>
            <div
                class="h-[150px] mr-1 col-span-1 row-span-1 md:row-span-1 lg:row-span-1 md:h-[300px] lg:h-[300px] md:mr-0 lg:mr-0">
                <img :src="data2[1].photo" class=" w-full h-full object-cover rounded-3xl">
            </div>

        </div>
    </div>
</template>

<script>
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
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
        SwiperSlide
    },
    setup() {
        return {
            modules: [Autoplay, Pagination, Navigation],
        };
    },
    data() {
        return {
            data1: [],
            data2: [],
            loading: true,
        };
    },
    methods: {
        async getData() {
            try {
                const response1 = await axios.get("https://pharmedi.ir/api/shop/header-image-list/");
                this.data1 = response1.data;
                const response2 = await axios.get("https://pharmedi.ir/api/shop/header-corner-image-list/");
                this.data2 = response2.data;
                console.log(this.data1)
            } catch (error) {
                console.error("Error fetching data", error);
            } finally {
                this.loading = false;
            }
        },
    },
    mounted() {
        this.getData();
    }
}
</script>
