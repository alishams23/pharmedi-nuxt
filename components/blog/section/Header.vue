<template>
  <div>
    <div>
    
      <div class="mb-10" v-if="!loading">
        <transition>
          <div v-if="data1.length > 0">
            <swiper class="mt-[-22px] md:mt-5  " :modules="modules" :slides-per-view="1" :space-between="1" :loop="true" :autoplay="{
          delay: 2000,
          disableOnInteraction: false,
        }" :pagination="{
          clickable: true,
        }" >
              <swiper-slide v-for="item in data1" class="">
            
               <a :href="item.link">
                 <img :src="item.photo" class="  rounded-3xl h-[280px]  w-full object-cover " />
               </a>
                <!-- <img :src="item.photo"
                                   class=" w-[405px] h-full object-cover rounded-3xl md:w-[645.33px] lg:w-[645.33px]"> -->
              </swiper-slide>
            </swiper>
          </div>
        </transition>
       
       
      </div>
      <div v-if="loading" class="d-flex justify-content-center flex-row py-5">
        <div class="col-12 text-center">
          <div class="flex justify-center mt-6">
            <span class="loader"></span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";

import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/vue';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';

export default {
  components: {
    // VueSlickCarousel,
    Swiper, SwiperSlide
  },
  data() {
    
    return {
      data1: [],
      loading: true,
    };
  },
  setup() {
    return {
      modules: [Autoplay, Pagination, Navigation],
    };
  },
  mounted() {
    this.getData();
  },
  methods: {
    async getData() {
      try {
        const response1 = await axios.get("https://pharmedi.ir/api/blog/header-image-list/");
        this.data1 = response1.data;
      } catch (error) {
        console.error("Error fetching data", error);
      } finally {
        this.loading = false;
      }
    },
  },
};
</script>

<style>
/* Add your custom styles here */
</style>
