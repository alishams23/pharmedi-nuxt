<template>
    <div v-if="loading == false" class=" mb-20">
        <div
            class=" grid grid-cols-6  gap-5  ">
            <div class=" col-span-6 md:col-span-4 -mt-6 md:mt-0">
                <swiper :modules="modules" :slides-per-view="1" :space-between="6" :loop="false" :autoplay="{
          delay: 2000,
          disableOnInteraction: false,
        }" :pagination="{
          clickable: true,
        }" 
                    class=" h-[270px] md:mx-1 px-0 md:h-[380px] m-2 md:m-0">
                    <swiper-slide v-for="item in data1" class="" >
                       <a :href="item.link">
                         <img :src="item.photo"
                             class="   h-full object-cover  rounded-3xl w-full">
                       </a>
                    </swiper-slide>
                </swiper>
                <!-- <img :src="data1[0].photo" class=" w-full h-full object-cover rounded-3xl"> -->
            </div>
           <div class="col-span-6 md:col-span-2 grid grid-cols-2 gap-2">
             <a
             :href="data2[0].link"
                 class="h-[110px]  md:h-[180px] ml-1 col-span-1 md:col-span-2  md:ml-0 lg:ml-0">
                 <img :src="data2[0].photo" class=" w-full h-full object-cover rounded-3xl">
           </a>
             <a
             :href="data2[1].link"
                 class="h-[110px] md:h-[180px] md:mt-3 mr-1 col-span-1 md:col-span-2  md:mr-0 lg:mr-0">
                 <img :src="data2[1].photo" class=" w-full h-full object-cover rounded-3xl">
            </a>
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
