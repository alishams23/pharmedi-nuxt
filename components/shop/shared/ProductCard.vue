<template>
    <div class=" bg-white rounded-3xl w-[200px]  lg:w-[230px] md:w-[230px]">

        <div class=" w-full">
            <img v-if="data.images.length > 0"
                class=" w-full h-[150px] object-cover rounded-t-3xl bg-cover bg-center contain "
                :src="data.images[0].image" alt="">
        </div>
        <div dir="rtl" class="">
            <div class=" mb-5 px-2 h-10">
                <h2 class="irsa text-xs font-semibold my-3 mr-1 line-clamp-2 leading-6">{{ data.name }}</h2>
                <!-- <p class=" text-base h-14 text-sm mr-4 font-normal">{{ data.description }}</p> -->
            </div>
            <div class=" border-t py-2">
                <div class="flex justify-around items-center ">
                    <div class="  flex flex-col">

                        <p class=" text-sm font-semibold ">

                            {{ data.price - (data.price * data.discount_value / 100) }}
                            <span class="text-xs font-light text-gray-400">تومان</span>
                        </p>
                        <div class="flex items-center mt-1">
                            <p class=" line-through  text-xs  text-gray-500">

                                {{ data.price }}
                            </p>
                            <span class=" rounded-3xl text-red-600  text-sm font-black     mr-3">{{
                data.discount_value
            }}%</span>
                        </div>
                    </div>
                    <nuxt-link tag="button" :to="'/shop/' + data.id"
                        class="   bg-gradient-to-l from-[#4d91da] to-[#032ecb] text-white hover:text-white text-xs py-2 px-6 rounded-2xl inline-flex items-center">
                        <span>مشاهده </span>
                    </nuxt-link>
                </div>
            </div>
        </div>
    </div>
</template>
<style>
.line {
    position: absolute;
    top: 39%;
    width: 50%;
    height: 2px;
    z-index: 1;
}
</style>
<script>
export default {
    props: ['data']
    , data() {
        return {

        }
    }
}
</script>