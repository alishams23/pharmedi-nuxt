<template>
    <nuxt-link :to="'/t/shop/' + data.id" class=" bg-white rounded-3xl w-[180px]   md:w-[220px]">

        <div class=" w-full">
            <img v-if="data.images.length > 0"
                class=" w-full h-[130px] md:h-[150px] object-cover rounded-t-3xl bg-cover bg-center contain "
                :src="data.images[0].image" alt="">
        </div>
        <div dir="rtl" class="">
            <div class=" mb-4 md:mb-5 px-2 h-10">
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
                        <div class="flex items-center ">
                            <p class=" line-through  text-xs  text-gray-500">

                                {{ data.price }}
                            </p>

                        </div>
                    </div>
                    <span
                        class=" flex justify-center items-center rounded-lg bg-red-100 text-red-600 h-8 w-8  text-sm font-black     mr-3">{{
        data.discount_value
                        }}%</span>
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