<template>
    <TransitionRoot as="template" :show="openFilter">
        <Dialog as="div" class="relative z-40" @close="openFilter = false">
            <TransitionChild as="template" enter="transition-opacity ease-linear duration-100" enter-from="opacity-0"
                enter-to="opacity-100" leave="transition-opacity ease-linear duration-100" leave-from="opacity-100"
                leave-to="opacity-0">
                <div class="fixed inset-0 bg-gray-700 backdrop-blur-sm bg-opacity-25"></div>
            </TransitionChild>
            <div class="fixed inset-0 z-40 flex">
                <TransitionChild as="template" enter="transition ease-in-out duration-500 "
                    enter-from="translate-x-full" enter-to="translate-x-0" leave="transition ease-in-out duration-500 "
                    leave-from="translate-x-0" leave-to="translate-x-full">
                    <DialogPanel
                        class="relative ml-auto flex h-full w-full max-w-xs flex-col overflow-y-auto bg-white py-4 pb-6 shadow-xl">
                        <div class="flex items-center justify-between px-4">
                            <h2 class="text-lg font-medium w-full text-right mx-4 irsa text-gray-900">فیلترها</h2>
                            <button type="button"
                                class="-mr-2 flex h-10 w-10 items-center justify-center p-2 text-gray-400 hover:text-gray-500"
                                @click="openFilter = false">
                                <span class="sr-only">Close menu</span>
                                <XMarkIcon class="h-6 w-6" aria-hidden="true" />
                            </button>
                        </div>

                        <!-- Filters -->

                        <div class="space-y-10 py-10 divide-y px-10 divide-gray-200">
                            <div class="flex flex-wrap justify-end ">
                                <button v-for="item in product_sort" :key="item"
                                    @click="selected_sort = item.value; getData()"
                                    :class="[selected_sort == item.value ? 'bg-blue-600 text-white' : 'bg-gray-200', 'px-3 text-xs py-2 rounded-xl m-1 border']">
                                    {{ item.label }}
                                </button>
                            </div>
                            <div class=" ltr mb-6x">
                                <label for="labels-range-input" class="sr-only">Labels range</label>
                                <label class="font-bold flex justify-end mt-3" for="">محدوده قیمت</label>

                                <div class="w-full " style="direction: ltr !important;">
                                    <client-only>
                                        <Slider :min="0" :step="500000" :max="20000000" v-model="price_range"
                                            class="mt-12 me-3" />
                                    </client-only>
                                </div>

                                <div class="flex justify-between flex-wrap mt-3">
                                    <span class="text-xs text-gray-500">ارزانترین ({{ formatPrice(price_range[0]) }}
                                        تومان)</span>
                                    <span class="text-xs text-gray-500">گرانترین ({{ formatPrice(price_range[1]) }}
                                        تومان)</span>
                                </div>
                            </div>

                            <div class="pt-3 relative text-right mx-auto text-gray-600">
                                <label class=" flex justify-start font-bold rtl" for="">دسته بندی ها</label>
                                <div class="flex items-center">
                                    <input @input="getCategories()" v-model="text_search_categories"
                                        id="search_category"
                                        class="border-2 border-gray-300 bg-white w-full mt-2 h-10 px-5 pr-16 rounded-full text-sm focus:outline-none"
                                        type="search" name="search" placeholder="جستجو دسته بندی">

                                </div>
                                <div class="flex flex-wrap mt-3 align-center">
                                    <div v-if="categories != null">
                                        <button v-for="item in categories" :key="item"
                                            @click=" selected_categories = [];selected_categories.push(item.id); getData()"
                                            :class="[selected_categories.includes(item.id) ? 'bg-blue-600 text-white' : 'bg-gray-200', 'px-3 text-xs py-2 rounded-xl m-1 border']">
                                            {{ item.name }}
                                        </button>
                                    </div>
                                </div>

                            </div>
                        </div>
                    </DialogPanel>
                </TransitionChild>
            </div>
        </Dialog>
    </TransitionRoot>
    <div @click="openFilter = true"
        class=" grid place-items-center w-11 h-11  bg-gradient-to-tl  from-[#2741e7] to-[#2aa2f2] rounded-full ml-3">
        <IconFilterSearch class=" text-white w-5 h-5" />
    </div>
</template>

<script>
import Slider from '@vueform/slider'
import { IconFilterSearch } from '@tabler/icons-vue'

import {
    Popover,
    TransitionChild,
    TransitionRoot,
    Dialog,
    DialogPanel,
    Disclosure,
    DisclosureButton,
    DisclosurePanel,

} from '@headlessui/vue'
import { XMarkIcon } from '@heroicons/vue/24/outline'
import axios from 'axios'
import { ref, watch } from 'vue'

export default {
    props: ["text","page"],
    emits: ["fetch-data", "loading"],
    components: {
        IconFilterSearch,
        Slider,
        Popover,
        Dialog,
        DialogPanel,
        Disclosure,
        DisclosureButton,
        DisclosurePanel,
        TransitionChild,
        TransitionRoot,
        XMarkIcon,
    },
    data() {
        return {
            loading: true,
            data: {},
            text_search_categories: '',
            categories: null,
            selected_categories: [],
            text_search_shop: '',
            products: null,
            selected_shop: null,
            price_range: [0, 200000000],
            product_sort: [
                { value: '-pk', label: 'جدید ترین' },
                { value: 'pk', label: 'قدیمی ترین' },
                { value: '-price', label: 'گران ترین' },
                { value: 'price', label: 'ارزان ترین' },
            ],
            selected_sort: '',
            openFilter: false
        }
    },
    mounted() {
        if (this.$route.query.category != null) this.selected_categories.push(parseInt(this.$route.query.category))

        this.getData()
        this.getCategories()
    },
    methods: {
        formatPrice(value) {
            // Assuming `value` is a number
            return new Intl.NumberFormat('fa-IR').format(value);
        },
        getData() {

            this.$emit("loading", true)

            axios
                .get(`http://127.0.0.1:8000/api/shop/list-products/?page=${this.page}&search=${this.text}${this.selected_categories.length > 0 ? '&categories=' + this.selected_categories.join('&category=') : ''}&ordering=${this.selected_sort}&min_price=${this.price_range[0]}&max_price=${this.price_range[1]}`, {
                    headers: {
                        "Content-type": "application/json",
                        Accept: "application/json",
                    },
                })
                .then((response) => {

                    this.$emit("fetch-data", response.data)
 
                    this.$emit("loading", false)
                });
        },
        getCategories() {
            this.loading = true
            axios.get(`http://127.0.0.1:8000/api/shop/list-categories/?search=${this.text_search_categories}&is_main_page=${this.text_search_categories == null ? true : ''}`, {
                headers: {
                    "Content-type": "application/json",
                    Accept: "application/json",
                },
            }).then((response) => {
                this.categories = response.data
                this.loading = false
            })
        },
    },
    watch: {

        text: {
            immediate: true,
            handler(val, oldVal) {
                if (oldVal != undefined) {
                    this.getData()
                }
            }
        },
        'price_range': {
            handler: function (val, oldVal) {
                this.getData()
            },
            deep: true
        },
        'page': {
            handler: function (val, oldVal) {
                this.getData()
            },
            deep: true
        },

    }
}
</script>

<style src="@vueform/slider/themes/default.css"></style>