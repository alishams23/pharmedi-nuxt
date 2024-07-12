<template>
    <div dir="rtl" class="bg-white ">
        <div class="mx-auto max-w-2xl px-4 pb-24 pt-16 sm:px-6 lg:max-w-7xl lg:px-8">
            <h1 class=" irsa text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">سبد خرید</h1>
            <div v-if="loading" class="flex space-x-1 justify-center items-center h-[350px]">
                <div class=" loader"></div>
            </div>
            <form v-else class="mt-12 lg:grid lg:grid-cols-12 lg:items-start lg:gap-x-12 xl:gap-x-16">
                <section aria-labelledby="cart-heading" class="lg:col-span-7">
                    <h2 id="cart-heading" class="sr-only">Items in your shopping cart</h2>
                    <ul role="list" class="divide-y divide-gray-200 border-b border-t border-gray-200">
                        <li v-for="item in productsCart" :key="item.id" class="flex py-6 sm:py-10">
                            <div class="flex-shrink-0">
                                <img :src="item.items[0].product.images[0].image" :alt="item.imageAlt"
                                    class="h-24 w-24 rounded-md object-cover object-center sm:h-48 sm:w-48" />
                            </div>
                            <div class="mr-4 flex flex-1 flex-col justify-between sm:mr-6">
                                <div class="relative pl-9 sm:grid sm:grid-cols-2 sm:gap-x-6 sm:pl-0">
                                    <div>
                                        <div class="flex justify-between">
                                            <h3 class="text-sm">
                                                <a :href="item.href"
                                                    class="font-medium text-gray-700 hover:text-gray-800">{{
                item.items[0].product.name
            }}</a>
                                            </h3>
                                        </div>
                                        <div class="mt-1 flex text-sm">
                                            <!-- <p class="text-gray-500">{{ item.color }}</p> -->
                                            <!-- <p v-if="item.size"
                                                class="mr-4 border-l border-gray-200 pr-4 text-gray-500">{{ item.size
                                                }}</p> -->
                                        </div>
                                        <p class="mt-4 text-sm font-medium text-gray-900">{{ item.items[0].product.price
                                            }}</p>
                                    </div>

                                    <div class="mt-4 sm:mt-0 sm:pl-9">
                                        <label :for="`quantity-${itemIdx}`" class="sr-only">Quantity, {{
                item.items[0].product.name
            }}</label>
                                        <select :id="`quantity-${itemIdx}`" :name="`quantity-${itemIdx}`"
                                            class="max-w-[45%] rounded-md border border-gray-300 py-1.5 text-left text-base font-medium leading-5 text-gray-700 shadow-sm focus:border-treaget focus:outline-none focus:ring-1 focus:ring-treaget sm:text-sm">
                                            <option value="1">1</option>
                                            <option value="2">2</option>
                                            <option value="3">3</option>
                                            <option value="4">4</option>
                                            <option value="5">5</option>
                                            <option value="6">6</option>
                                            <option value="7">7</option>
                                            <option value="8">8</option>
                                        </select>

                                        <div class="absolute left-0 top-0">
                                            <button type="button"
                                                class="-m-2 inline-flex p-2 text-gray-400 hover:text-gray-500">
                                                <span class="sr-only">Remove</span>
                                                <XMarkIcon class="h-5 w-5" aria-hidden="true" />
                                            </button>
                                        </div>
                                    </div>
                                </div>

                                <p class="mt-4 flex space-x-2 text-sm text-gray-700">
                                    <CheckIcon v-if="item.inStock" class="h-5 w-5 flex-shrink-0 text-green-500"
                                        aria-hidden="true" />
                                    <ClockIcon v-else class="h-5 w-5 flex-shrink-0 text-gray-300" aria-hidden="true" />
                                    <span>{{ item.inStock ? 'In stock' : `Ships in ${item.leadTime}` }}</span>
                                </p>
                            </div>
                        </li>
                    </ul>
                </section>

                <!-- Order summary -->
                <section aria-labelledby="summary-heading"
                    class="mt-16 rounded-lg bg-gray-50 px-4 py-6 sm:p-6 lg:col-span-5 lg:mt-0 lg:p-8">
                    <h2 id="summary-heading" class=" irsa text-lg font-medium text-gray-900">خلاصه سفارشات</h2>

                    <dl class="mt-6 space-y-4">
                        <div class="flex items-center justify-between">
                            <dt class="text-sm text-gray-600">زیر مجموعه</dt>
                            <dd class="text-sm font-medium text-gray-900">$99.00</dd>
                        </div>
                        <div class="flex items-center justify-between border-t border-gray-200 pt-4">
                            <dt class="flex items-center text-sm text-gray-600">
                                <span>براورد حمل و نقل</span>
                                <a href="#" class="mr-2 flex-shrink-0 text-gray-400 hover:text-gray-500">
                                    <span class="sr-only">Learn more about how shipping is calculated</span>
                                    <QuestionMarkCircleIcon class="h-5 w-5" aria-hidden="true" />
                                </a>
                            </dt>
                            <dd class="text-sm font-medium text-gray-900">$5.00</dd>
                        </div>
                        <div class="flex items-center justify-between border-t border-gray-200 pt-4">
                            <dt class="flex text-sm text-gray-600">
                                <span>براورد مالیات</span>
                                <a href="#" class="mr-2 flex-shrink-0 text-gray-400 hover:text-gray-500">
                                    <span class="sr-only">Learn more about how tax is calculated</span>
                                    <QuestionMarkCircleIcon class="h-5 w-5" aria-hidden="true" />
                                </a>
                            </dt>
                            <dd class="text-sm font-medium text-gray-900">$8.32</dd>
                        </div>
                        <div class="flex items-center justify-between border-t border-gray-200 pt-4">
                            <dt class="text-base font-medium text-gray-900">مجموع سفارشها</dt>
                            <dd class="text-base font-medium text-gray-900">$112.32</dd>
                        </div>
                    </dl>

                    <div class="mt-6">
                        <button type="submit"
                            class="w-full rounded-md border border-transparent bg-treaget px-4 py-3 text-base font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-treaget focus:ring-offset-2 focus:ring-offset-gray-50">پرداخت</button>
                    </div>
                </section>
            </form>
        </div>
    </div>
</template>
<script>
import { CheckIcon, ClockIcon, QuestionMarkCircleIcon, XMarkIcon } from '@heroicons/vue/20/solid'
import axios from 'axios'

export default {
    data() {
        return {
            loading: true,
            productsCart: null
        }
    },
    methods: {
        getData() {
            this.loading = true
            axios.get(`https://pharmedi.ir/api/shop/list-orders/`, {
                headers: {
                    "Content-type": "application/json",
                    Accept: "application/json",
                    Authorization:
                        `Token ${this.$store.state.token}`
                },
            }).then((response) => {
                this.productsCart = response.data
                this.loading = false
                console.log(this.productsCart)
            })
        }
    },
    mounted() {
        this.getData()
    }
}

</script>