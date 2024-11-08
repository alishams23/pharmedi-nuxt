<template>
    <nuxt-link :to="'/t/blog/' + data.id" class=" bg-white  shadow-1 rounded-3xl w-[180px]   md:w-[220px]">

        <div class=" w-full">
      
            <img 
                class=" w-full h-[120px] md:h-[150px] object-cover rounded-t-3xl bg-cover bg-center contain "
                :src="data.imageBlog.photo" alt="">
        </div>
        <div class=" rtl">
                <div class="d-flex w-40 bg-gray-200/70 mt-[-30px] mb-[10px] backdrop-blur-md  rounded-e-full px-1 py-1 ">
                <!-- <div class=" rounded-pill bg-white h-[20px] w-[20px] p-half shadow-md " v-if="data.author">
                    <img class="rounded-pill w-full h-full cover" v-if="data.author.image_profile != null"
                        :src="data.author.image_profile" alt="img">
                    <img class="rounded-pill w-full h-full cover" v-else src="@/assets/inside/avatar.jpg" alt="img">
                </div> -->
                <div class="pe-4  ps-3 ">
                    <div class=" fw-bold text-xs text-nowrap  ">
                        {{ data.author.get_full_name }}
                    </div>
                    <div class="fs-7 text-muted ">
                        {{ data.author.username }}
                    </div>
                </div>
            </div>
            </div>
        <div dir="rtl" class="">
           
            <div class="   px-2 h-10">
                <h2 class="irsa text-xs font-semibold my-2  md:my-3 mr-1 line-clamp-2 leading-5 md:leading-6">{{ data.title }}</h2>
                <!-- <p class=" text-base h-14 text-sm mr-4 font-normal">{{ data.description }}</p> -->
            </div>
            <div class="d-flex flex-row-reverse  m-2 p-1 mt-0">
        <div class="  bg-gray-100 text-gray-500 text-[10px]  px-2 p-1 rounded-xl">
          تعداد بازدید :  {{ data.visit_count }}
        </div>
       </div>
        </div>
    </nuxt-link>
</template>

<script>
export default {
    props: ['data']
    , data() {
        return {

        }
    }
}
</script>