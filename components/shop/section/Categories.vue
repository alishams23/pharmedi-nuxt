<template>
    <div>
        <div class="flex justify-center  flex-wrap ">
            <!-- Category 1 -->
            <div>
              
            </div>
            <div v-for="category in categories" class="flex flex-col text-center mx-2  items-center cursor-pointer">
              
            </div>

            <swiper :modules="modules" :pagination="{
        clickable: true,

    }" :slides-per-view="'auto'" :space-between="5" :loop="false"
            class=" flex justify-center">
           
            <swiper-slide  v-for="category in categories" class="mb-9 w-auto text-center">
                <nuxt-link :to="'/t/search/?category='+item.id" v-for="item in category">
                <div class="pt-3 px-4  rounded-[20px]">
                    <div class="w-16 h-16 rounded-full bg-gray-200 flex items-center justify-center">
                        <!-- Insert discount SVG icon here -->
                        <img class=" w-full h-full rounded-[25px] object-cover" :src="item.image" alt="">
                    </div>
                </div>
                <span class="text-xs  mt-2">{{ item.name }}</span>
               </nuxt-link>
            </swiper-slide>
            ...
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
    props: ['src', 'title'],
    data() {
        return {
            loading:false,
            categories: []
        }
    },
    methods:{
        getData(){
            this.loading = true;
      fetch(
        `https://pharmedi.ir/api/shop/list-categories/?is_main_page=true`,
        {
          headers: {
            "Content-type": "application/json",
            Accept: "application/json",
            Authorization:
              this.$store.state.token != ""
                ? `Token ${this.$store.state.token}`
                : "",
          },
        }
      )
        .then((response) => response.json())
        .then((data) => {
          this.loading = false;
          let index = 0;
          
          while (data.length > index) {
            console.log("1111");
            
            this.categories.push(data.slice(index, index + 3)) ;
            index +=3
          }
   
            
     

            
          
        });
    },},
    mounted(){
        this.getData()
    }
}
</script>