<template>
    <div class=" bg-white rounded-3xl w-[250px] h-[378.8px] shadow-3 lg:w-[290px] md:w-[290px]">
      
        <div>
            <img v-if="data.images.length >0 " class=" w-full h-[150px] object-cover rounded-t-3xl bg-cover bg-center contain "
                :src="data.images[0].image" alt="">
        </div>
        <div dir="rtl" class="">
            <div class=" mb-5 px-2">
                <h2 class="irsa text-sm font-semibold my-3 mr-4">{{ data.name }}</h2>
                <!-- <p class=" text-base h-14 text-sm mr-4 font-normal">{{ data.description }}</p> -->
            </div>
            <div class=" border-t">
                <div class="flex justify-around items-center p-4">
                    <div class=" relative top-3 flex flex-col">

                        <p class=" text-xl font-semibold ">

                            {{ data.price - (data.price * data.discount / 100) }}
                            <span class="text-sm font-light text-gray-400">تومان</span>
                        </p>
                        <div class="flex items-center mt-2">
                            <p class=" line-through  text-sm  text-gray-500">

                                {{ data.price }}
                            </p>
                            <span
                                class=" rounded-3xl bg-red-600 text-white  text-xs h-6 w-6 flex justify-center items-center   pt-1  mr-3">{{
                    data.discount
                }}%</span>
                        </div>
                    </div>
                    <nuxt-link tag="button" :to="'/shop/' + data.id"
                        class=" bg-[#8b4513] text-white text-sm py-2 px-6 rounded-2xl inline-flex items-center">
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