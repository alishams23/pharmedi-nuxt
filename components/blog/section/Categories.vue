<template>
    <div>
        <div class=" ">
            <!-- Category 1 -->
            <swiper :modules="modules"
            :autoplay="{
          delay: 1000,
          disableOnInteraction: false,
        }"
        :slides-per-view="'auto'" :space-between="5" :loop="false" class="  flex justify-center">

                <swiper-slide v-for="item in categories" class="mb-3 mx-3 w-auto  text-center">
                   
                        <a class="pt-3 px-4  rounded-[20px]" href="#search" @click="$router.push('/t/blog/?category=' + item.id)">
                            <div class="w-16 h-16 rounded-full bg-gray-200 flex items-center justify-center">
                                <!-- Insert discount SVG icon here -->
                                <img class=" w-full h-full rounded-[25px] object-cover" :src="item.image" alt="">
                            </div>
                        </a>
                        <span class="text-xs d-flex justify-center ">{{ item.title }}</span>
                
                </swiper-slide>
           
            </swiper>
        </div>
    </div>
</template>
<script>

import { Navigation, Pagination, Autoplay } from 'swiper/modules';


// Import Swiper Vue.js components
import { Swiper, SwiperSlide } from 'swiper/vue';
export default {
    components: {
        Swiper,
        SwiperSlide,


    },
    setup() {
    return {
      modules: [Autoplay, Pagination, Navigation],
    };
  },
    props: ['src', 'title'],
    data() {
        return {
            loading: false,
            categories: []
        }
    },
    methods: {
        getData() {
            this.loading = true;
            fetch(
                `https://pharmedi.ir/api/blog/list-categories/?is_main_page=true`,
                {
                    headers: {
                        "Content-type": "application/json",
                        Accept: "application/json",
                       
                    },
                }
            )
                .then((response) => response.json())
                .then((data) => {
                    this.loading = false;
                    let index = 0;
                    this.categories = data

                });
        },
    },
    mounted() {
        this.getData()
    }
}
</script>