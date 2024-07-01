<template>
  
    <div
        class="mx-auto max-w-2xl h-auto  rounded-3xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8   mb-24">
        <div v-if="loading"
            class='flex space-x-1 justify-center items-center bg-white w-[1216px] h-[487px] rounded-3xl'>
            <span class='sr-only'>Loading...</span>
            <div class='h-5 w-5 bg-[#8b4513] rounded-full animate-bounce [animation-delay:-0.3s]'></div>
            <div class='h-5 w-5 bg-[#8b4513] rounded-full animate-bounce [animation-delay:-0.15s]'></div>
            <div class='h-5 w-5 bg-[#8b4513] rounded-full animate-bounce'></div>
        </div>
        <div v-else>
            <div v-if="product !== null">
                <div class="lg:grid lg:grid-cols-2 lg:items-start lg:gap-x-8">
                    <!-- Image gallery -->
                    <TabGroup as="div" class="flex flex-col-reverse">
                        <!-- Image selector -->
                        <div class="mx-auto mt-6 hidden w-full max-w-2xl sm:block lg:max-w-none">
                            <TabList class="grid grid-cols-4 gap-6">
                                <Tab v-for="image in product.image" :key="image.id"
                                    class="relative flex h-24 cursor-pointer items-center justify-center rounded-md bg-white text-sm font-medium uppercase text-gray-900 hover:bg-gray-50 focus:outline-none focus:ring focus:ring-opacity-50 focus:ring-offset-4"
                                    v-slot="{ selected }">
                                    <span class="sr-only">{{ image.name }}</span>
                                    <span class="absolute inset-0 overflow-hidden rounded-md">
                                        <img :src="image.photo" alt=""
                                            class="h-full w-full object-cover object-center" />
                                    </span>
                                    <span
                                        :class="[selected ? 'ring-gray-500' : 'ring-transparent', 'pointer-events-none absolute inset-0 rounded-md ring-2 ring-offset-2']"
                                        aria-hidden="true" />
                                </Tab>
                            </TabList>
                        </div>

                        <TabPanels class="aspect-h-1 aspect-w-1 w-full h-full rounded-xl  ">
                            <TabPanel v-for="image in product.image" :key="image.id">
                                <img :src="image.photo" :alt="image.alt"
                                    class="h-full w-full object-cover  rounded-xl " />
                            </TabPanel>
                        </TabPanels>
                    </TabGroup>

                    <!-- Product info -->
                    <div class="mt-10 px-4 sm:mt-16 sm:px-0 lg:mt-0">

                        <h1 class="text-3xl font-bold tracking-tight text-black text-right">{{ product.title }}</h1>

                        <div class="mt-3">
                            <h2 class="sr-only text-[#CCA47C]">Product information</h2>
                            <p class="text-3xl tracking-tight text-gray-600 text-right">{{ product.price -
            (product.price *
                product.discount / 100) }} <span
                                    class="text-base  text-gray-500 text-right">تومان</span></p>
                            <p dir="rtl" class="text-xs text-gray-500">
                                قیمت با اعمال <span class="text-red-800  text-sm font-black">{{ product.discount }}
                                    %</span>
                                تخفیف
                            </p>
                        </div>

                        <!-- Reviews -->
                        <!-- <div class="mt-3">
                                <h3 class="sr-only">Reviews</h3>
                                <div class="flex items-center">
                                    <div class="flex items-center">
                                        <StarIcon v-for="rating in [0, 1, 2, 3, 4]" :key="rating"
                                            :class="[product.rating > rating ? 'text-indigo-500' : 'text-gray-300', 'h-5 w-5 flex-shrink-0']"
                                            aria-hidden="true" />
                                    </div>
                                    <p class="sr-only">{{ product.rating }} out of 5 stars</p>
                                </div>
                            </div> -->

                        <div class="mt-6">
                            <h3 class="sr-only">Description</h3>

                            <div class="space-y-6 text-base text-gray-600 text-right" v-html="product.description" />
                        </div>

                        <form class="mt-6">
                            <!-- Colors -->
                            <div class="sm:flex-col1 mt-10 flex">
                                <button type="submit"
                                    class="flex max-w-xs flex-1 items-center justify-center rounded-3xl border border-transparent bg-[#8b4513] px-8 py-3 text-base font-medium text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-gray-50 sm:w-full">افزودن
                                    به سبد خرید</button>
                            </div>
                        </form>

                        <section aria-labelledby="details-heading" class="mt-12">
                            <h2 id="details-heading" class="sr-only">Additional details</h2>

                            <div dir="rtl" class="divide-y divide-gray-200 border-t">
                                <Disclosure as="div">
                                    <h3>
                                        <DisclosureButton @click="open = !open"
                                            class="group relative flex w-full items-center justify-between py-6 ">
                                            <span class=" text-gray-900">مشخصات</span>
                                            <span class="ml-6 flex items-center">
                                                <IconPlus v-if="open"
                                                    class="block h-6 w-6 text-gray-400 group-hover:text-gray-500"
                                                    aria-hidden="true" />
                                                <IconMinus v-else
                                                    class="block h-6 w-6 text-gray-400 group-hover:text-gray-500"
                                                    aria-hidden="true" />
                                            </span>
                                        </DisclosureButton>
                                    </h3>
                                    <DisclosurePanel as="div" class="prose prose-sm pb-6">

                                        <Transition>


                                            <div v-if="!open" class=" w-full grow">
                                                <div v-for="item in product.Specification" class="w-full flex">
                                                    <p
                                                        class="w-[59.49px] ml-[70px] mr-[27px] text-base text-neutral-500 py-2 shrink-0">
                                                        {{ item.title }}</p>
                                                    <div class=" border-b py-2 grow">
                                                        <p class="flex items-center w-full text-base text-neutral-900">
                                                            {{ item.body }}</p>
                                                    </div>
                                                </div>
                                            </div>
                                        </Transition>
                                    </DisclosurePanel>
                                </Disclosure>
                            </div>
                        </section>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import axios from 'axios'
import {

    Tab,
    TabGroup,
    TabList,
    TabPanel,
    TabPanels,
} from '@headlessui/vue'

import { IconPlus, IconMinus } from '@tabler/icons-vue'

export default {
    components: {
        Tab,
        TabGroup,
        TabList,
        TabPanel,
        TabPanels,
        IconPlus,
        IconMinus
    },
    data: () => ({
        product: null,
        loading: true,
        open: false
    }),
    methods: {
        getData() {
            this.loading = true
            axios.get(`https://pharmedi.ir/api/shop/retrieve-product/${this.$route.params.id}/`, {
                headers: {
                    "Content-type": "application/json",
                    Accept: "application/json",
                },
            }).then((response) => {
                this.loading = false
                this.product = response.data
            })
        },

    },
    mounted() {
        this.getData()
    }
}
</script>

<style>
.v-enter-active,
.v-leave-active {
    transition: opacity 0.5s ease;
}

.v-enter-from,
.v-leave-to {
    opacity: 0;
}
</style>