<template>
    <!-- {{ product }} -->

<div class="mb-lg-4 pb-3" style="
        position: fixed;
        width: 76px;
        right: 0;
        bottom: 0;
        z-index: 9999;
        margin-bottom: 72px;
      ">
      <nuxt-link to="/t/Chat/?usernameParams=admin24"
        class=" text-white  ">
      <div class=" bg-treaget   h-[55px] w-[55px] flex justify-center items-center rounded-full">
         <IconMessage class="h-6 w-6" />
      </div>
      </nuxt-link>
    </div>

  
    <div class="mx-auto ">
        <div v-if="loading" class='flex justify-center items-center   h-[639.74px] rounded-3xl'>
            <span class='sr-only'>Loading...</span>
            <div class="loader"></div>
        </div>
        <div v-else>
            <div v-if="product !== null">
                <div class="lg:grid lg:grid-cols-2 lg:items-start lg:gap-x-8">
                    <!-- Image gallery -->
                    <TabGroup as="div" class="flex flex-col-reverse">
                        <!-- Image selector -->
                        <div class="mx-auto mt-6 hidden w-full max-w-2xl sm:block lg:max-w-none">
                            <TabList class="grid grid-cols-4 gap-6">
                                <Tab v-for="image in product.images" :key="image.id"
                                    class="relative flex h-24 cursor-pointer items-center justify-center rounded-md bg-white text-sm font-medium uppercase text-gray-900 hover:bg-gray-50 focus:outline-none focus:ring focus:ring-opacity-50 focus:ring-offset-4"
                                    v-slot="{ selected }">
                                    <span class="sr-only">{{ image.name }}</span>
                                    <span class="absolute inset-0 overflow-hidden rounded-md">
                                        <img :src="image.image" alt=""
                                            class="h-full w-full object-cover object-center" />
                                    </span>
                                    <!-- <span
                                        :class="[selected ? 'ring-gray-500' : 'ring-transparent', 'pointer-events-none absolute inset-0 rounded-md ring-2 ring-offset-2']"
                                        aria-hidden="true" /> -->
                                </Tab>
                            </TabList>
                        </div>

                        <TabPanels class="aspect-h-1 aspect-w-1 w-full -mt-6 md:mt-0 md:rounded-xl  ">
                            <TabPanel v-for="image in product.images" :key="image.id">
                                <img :src="image.image" :alt="image.alt"
                                    class="max-h-[400px] md:max-h-[600px] w-full object-cover  md:rounded-xl " />
                            </TabPanel>
                        </TabPanels>
                    </TabGroup>

                    <!-- Product info -->
                    <div class="mt-10 px-4 sm:mt-16 sm:px-0 lg:mt-0">

                        <h1 class=" irsa text-2xl font-bold  text-black leading-10 text-right">{{ product.name }}
                        </h1>

                        <div class="mt-5">
                            <h2 class="sr-only text-[#CCA47C]">Product information</h2>
                            <p class="text-3xl tracking-tight  text-right flex align-items-end justify-end">
                            <div class="text-base  text-gray-500 text-right">تومان</div>
                            <div>
                                {{ product.price -
                                    (product.price *
                                product.discount / 100) }}
                            </div>
                            </p>
                            <p dir="rtl" class="text-xs text-gray-500">
                                قیمت با اعمال <span class="text-red-800  text-sm font-black">{{ product.discount }}
                                    %</span>
                                تخفیف
                            </p>
                            <p class="rtl line-through">
                                {{ product.price }}
                            </p>
                        </div>
                        <div class="mt-2">
                            <button v-for="item in product.categories" :key="item"
                                class="bg-blue-100  text-blue-500 px-4 text-xs py-2 rounded-xl m-1 ">
                                {{ item.name }}
                            </button>
                        </div>

                        <div class=" mt-1  rounded-2xl p-3 px-4">
                            <h3 class="sr-only">Description</h3>

                            <div class="space-y-6 text-xs text-gray-600  leading-7  text-right"
                                v-html="product.description" />
                        </div>

                        <form @submit.prevent="console.log('afarin')" class="mt-6">
                            <div class=" mt-10 flex justify-center">
                                <button v-if="product.warehouse_stock == 0" type="submit"
                                    class="  rounded-2xl border border-transparent bg-yellow-400 cursor-not-allowed px-2 py-[10px] text-base font-medium text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-gray-50 w-full md:w-sm">محصول
                                    موجود نمیباشد</button>
                                <button v-else type="submit"
                                    @click="product_id = product.id; sendToCart(); isSuccessOpen = true"
                                    class="  rounded-2xl border border-transparent cursor-pointer bg-gradient-to-tl  from-[#2741e7] to-[#2aa2f2] px-2 py-[10px] text-base font-medium text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-gray-50 w-full md:w-sm">افزودن
                                    به سبد خرید</button>
                            </div>
                           
                            <TransitionRoot appear :show="isSuccessOpen" as="template" class=" ">
                                <Dialog as="div" @close="isSuccessOpen = false" class="relative z-10">
                                    <TransitionChild as="template" enter="duration-300 ease-out" enter-from="opacity-0"
                                        enter-to="opacity-100" leave="duration-200 ease-in" leave-from="opacity-100"
                                        leave-to="opacity-0">
                                        <div class="fixed inset-0 bg-black/25" />
                                    </TransitionChild>

                                    <div class="fixed inset-0 overflow-y-auto">
                                        <div class="flex h-full items-center justify-center p-4 text-center">
                                            <TransitionChild as="template" enter="duration-300 ease-out"
                                                enter-from="opacity-0 scale-95" enter-to="opacity-100 scale-100"
                                                leave="duration-200 ease-in" leave-from="opacity-100 scale-100"
                                                leave-to="opacity-0 scale-95">
                                                <DialogPanel
                                                    class="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                                                    <DialogTitle as="h3"
                                                        class="text-lg font-medium irsa leading-6 text-gray-900 mb-4 text-center">
                                                        محصول به سبد خرید اضافه شد
                                                    </DialogTitle>
                                                    <div class="mt-2 grid place-items-center">
                                                        <div class="circle-container">
                                                            <svg class="circle-svg">
                                                                <circle cx="50" cy="50" r="47" />
                                                                <path class="checkmark" d="M34 50 L45 61 L66 40" />
                                                            </svg>
                                                        </div>
                                                    </div>

                                                    <div class=" grid place-items-center">
                                                        <div class="d-flex justify-center">
                                                            <button type="button"
                                                                class="inline-flex justify-center rounded-full bg-white border mx-2 px-4 py-2 mt-4 text-sm font-medium text-black hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                                                                @click="isSuccessOpen = false">
                                                                بستن
                                                            </button>
                                                            <nuxt-link to="/t/shop/cart"
                                                                class="inline-flex justify-center rounded-full bg-blue-100 px-4 py-2 mt-4 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2">
                                                                رفتن به سبد خرید
                                                            </nuxt-link>
                                                        </div>
                                                    </div>
                                                </DialogPanel>
                                            </TransitionChild>
                                        </div>
                                    </div>
                                </Dialog>
                            </TransitionRoot>
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
                                                <IconPlus v-if="open == false"
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


                                            <div v-if="open == true" class=" w-full grow">
                                                <div v-for="item in product.specifications" class="w-full flex">
                                                    <p
                                                        class="w-[59.49px] ml-[70px] mr-[27px] text-sm text-neutral-500 py-2 shrink-0 whitespace-nowrap">
                                                        {{ item.title }}</p>
                                                    <div class=" border-b py-2 grow">
                                                        <p class="flex items-center w-full text-sm text-neutral-900">
                                                            {{ item.value }}</p>
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
        <section class="px-6 bg-white rounded-3xl py-5 mt-20 mx-3 " v-if="loadingComments == false">
            <div class=" font-bold text-right text-2xl pb-10">
                نظرات
            </div>

            <div class="flex justify-center">
                <div id="alert-4" v-if="comments.length == 0"
                    class="rtl  flex items-center justify-start p-4 mb-4 text-yellow-800 rounded-3xl  bg-yellow-50 "
                    role="alert">
                    <svg class="flex-shrink-0 w-4 h-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg"
                        fill="currentColor" viewBox="0 0 20 20">
                        <path
                            d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z" />
                    </svg>
                    <span class="sr-only">Warning</span>
                    <div class="ms-3 text-sm font-medium">
                        نظری ثبت نشده است
                    </div>

                </div>
            </div>

            <figure class="mx-auto rtl  border-t pb-10" v-for="comment in comments">
                <p class="sr-only">پنچ ستاره</p>
                <div class="flex gap-x-1 text-indigo-600">

                </div>
                <figcaption class="mt-10 flex items-center gap-x-6">
                    <div class="flex items-center">
                        <div class="h-10 w-10 flex justify-center items-center p-[2px] me-2 rounded-full bg-blue-600">
                            <img v-if="comment.user.image_profile" v-bind:src="comment.user.image_profile"
                                class="shadow-2 bg-gray-200 cover rounded-full" />
                            <img v-else src="@/assets/inside/avatar.jpg"
                                class="shadow-2 bg-gray-200 cover rounded-full" />
                        </div>
                        <div class="text-sm leading-6">
                            <div class="font-semibold text-gray-600">
                                {{ comment.user.first_name }}
                                {{ comment.user.last_name }}</div>

                        </div>
                    </div>
                </figcaption>

                <blockquote class="mt-4 text-lg leading-8 tracking-tight text-gray-700 text-sm  sm:leading-9">
                    <p><span class="text-2xl">”</span>{{ comment.content }}<span class="text-2xl">“</span></p>
                  <div class="flex items-center ">
                  
                    <ShopSharedReplyComment :data="comment"></ShopSharedReplyComment>
                      <p class="text-xs mt-2 text-gray-400 irsa">{{ comment.jalali_time }}</p>
                  </div>
                </blockquote>
                 <div v-for="item in comment.replies">
                   
                    <ShopSharedShowComment :comment="item"></ShopSharedShowComment>
                 </div>
            </figure>
            <div class="flex items-start space-x-4 mt-10">
                <div class="min-w-0 flex-1">
                    <form @submit.prevent="createComment" class="relative">
                        <div
                            class="overflow-hidden rounded-lg shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-gray-400">
                            <label for="comment" class="sr-only ">نظر خود را بنویسید</label>
                            <textarea rows="3" required v-model="comment" name="comment" id="comment"
                                class="block w-full p-3 text-right irsa  resize-none bg-transparent py-1.5 text-gray-900 placeholder:text-gray-400 sm:text-sm sm:leading-6 outline-none"
                                placeholder="... نظر خود را بنویسید "></textarea>

                            <!-- Spacer element to match the height of the toolbar -->
                            <div class="py-2" aria-hidden="true">
                                <!-- Matches height of button in toolbar (1px border + 36px content height) -->
                                <div class="py-px">
                                    <div class="h-9" />
                                </div>
                            </div>
                        </div>

                        <div class="absolute inset-x-0 bottom-0 flex justify-between py-2 pl-3 pr-2">
                            <div class="flex items-center space-x-5">

                            </div>
                            <div class="flex-shrink-0">
                                <button type="submit"
                                    class="inline-flex rounded-full items-center rounded-md bg-blue-600 px-5 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">ارسال</button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </section>
        <div v-else class="flex justify-center">
            <div class="loader"></div>
        </div>
    </div>
</template>

<script>
import axios from 'axios'
import {
    TransitionRoot,
    TransitionChild,
    Dialog,
    DialogPanel,
    DialogTitle,
    Tab,
    TabGroup,
    TabList,
    TabPanel,
    TabPanels,
} from '@headlessui/vue'

import { IconPlus, IconMinus,IconMessage } from '@tabler/icons-vue'

export default {
    components: {
        TransitionRoot,
        TransitionChild,
        Dialog,
        DialogPanel,
        DialogTitle,
        Tab,
        TabGroup,
        TabList,
        IconMessage,
        TabPanel,
        TabPanels,
        IconPlus,
        IconMinus
    },
    data: () => ({
        product: null,
        loading: true,
        open: true,
        loadingComments: true,
        comments: [],
        comment: null,
        product_id: null,
        isSuccessOpen: false
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

        sendToCart() {
            axios.post(`https://pharmedi.ir/api/shop/add-product-to-cart/`, { product_id: this.product_id }, {
                headers: {
                    "Content-type": "application/json",
                    Accept: "application/json",
                    Authorization:
                        `Token ${this.$store.state.token}`
                },
            }
            ).then((response) => {
                console.log('condition:', response.data)
            }).catch((error) => {
                console.error('Error:', error.response ? error.response.data : error.message);
                console.error('Config:', error.config);
                if (error.response) {
                    console.error('Response data:', error.response.data);
                    console.error('Response status:', error.response.status);
                    console.error('Response headers:', error.response.headers);
                }
            })
        },

        async getComments() {
            this.loadingComments = true;
            await fetch(`https://pharmedi.ir/api/shop/${this.$route.params.id}/list-comments/`, {
                headers: {
                    "Content-type": "application/json",
                    Accept: "application/json",
                    Authorization:
                        this.$store.state.token != ""
                            ? `Token ${this.$store.state.token}`
                            : "",
                },
            })
                .then((response) => response.json())
                .then((data) => {
                    this.comments = data;
                });
            this.loadingComments = false;
        },
        async createComment(productID, content) {
            this.fd = new FormData();
            this.fd.append("content", this.comment);

            await axios.post(
                `https://pharmedi.ir/api/shop/${this.$route.params.id}/create-comment/`,
                this.fd,
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
            );

            this.comment = '';
            await this.getComments();
        },
    },
    mounted() {
        this.getData()
        this.getComments()
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

.circle-container {
    width: 100px;
    height: 100px;
    position: relative;
}

.circle-svg {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
}

.circle-svg circle {
    stroke: #06d006;
    stroke-width: 5;
    fill: none;
    stroke-dasharray: 314;
    stroke-dashoffset: 314;
    animation: circle-animation .5s ease-out forwards;
}

.checkmark {
    stroke: #06d006;
    stroke-width: 5;
    stroke-linecap: round;
    fill: none;
    stroke-dasharray: 50;
    stroke-dashoffset: 50;
    animation: checkmark-animation 0.25s ease-out .5s forwards;
}

@keyframes circle-animation {
    to {
        stroke-dashoffset: 0;
    }
}

@keyframes checkmark-animation {
    to {
        stroke-dashoffset: 0;
    }
}
</style>