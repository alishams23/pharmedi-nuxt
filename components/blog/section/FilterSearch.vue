<template>


    <transition name="fade">
        <div v-if="isOpen" class="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50 z-[999999999]">
            <div class="bg-white  rounded-lg p-6 max-w-[300px] md:max-w-md max-h-[500px] md:max-h-[700px] overflow-y-scroll scrollBarHidden w-full shadow-lg">
                <div class="flex justify-between items-center mb-4">
                    <h3 class="text-md font-semibold text-gray-800">فیلتر </h3>
                    <button @click="closePopup" class="text-gray-500 text-3xl hover:text-gray-700 focus:outline-none">
                        ×
                    </button>
                </div>
                <div class="space-y-10 py-5 pt-4 divide-y  divide-gray-200">
                    <div class=" relative text-right mx-auto text-gray-600">
                        <label class=" flex justify-start font-bold rtl" for="">دسته بندی ها</label>
                        <div class="flex items-center">
                            <input @input="getCategories()" v-model="text_search_categories" id="search_category"
                                class="border border-gray-300 shadow-none bg-white w-full mt-2 h-10 px-5 pr-16 rounded-full text-sm focus:outline-none"
                                type="search" name="search" placeholder="جستجو دسته بندی">

                        </div>
                        <div class="flex flex-wrap mt-3 align-center">
                            <div v-if="categories != null">
                                <button v-for="item in categories" :key="item"
                                    @click=" toggleCategory(item.id)"
                                    :class="[selected_categories.includes(item.id) ? 'bg-blue-600 text-white' : 'bg-gray-200', 'px-3 text-xs py-2 rounded-xl m-1 border']">
                                    {{ item.title }}
                                </button>
                            </div>
                        </div>

                    </div>
                    <!-- <div class="flex pt-3 flex-wrap justify-end ">
                                <button v-for="item in product_sort" :key="item"
                                    @click="selected_sort = item.value; getData()"
                                    :class="[selected_sort == item.value ? 'bg-blue-600 text-white' : 'bg-gray-200', 'px-3 text-xs py-2 rounded-xl m-1 border']">
                                    {{ item.label }}
                                </button>
                            </div> -->
                    <!-- <div class=" ltr mb-6x">
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
                            </div> -->


                </div>
                <div class="mt-6 flex justify-end">
                    <button @click="closePopup"
                        class="bg-blue-600 text-white px-4 py-1 rounded-xl hover:bg-blue-600 focus:outline-none">
                        بستن
                    </button>
                </div>
            </div>
        </div>
    </transition>


    <div @click="isOpen = true">
        <slot />
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
    emits: ["change"],
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
            isOpen: false,

            openFilter: false
        }
    },
    async mounted() {
        await this.getCategories()
        if (this.$route.query.category != null) this.selected_categories.push(parseInt(this.$route.query.category))
    },
    methods: {
        openPopup() {
            this.isOpen = true;
        },
        toggleCategory(id) {
        const index = this.selected_categories.indexOf(id);
        if (index > -1) {
            this.selected_categories.splice(index, 1); // Remove if it exists
        } else {
            this.selected_categories = []
            this.selected_categories.push(id); // Add if it doesn't exist
        }
        this.$emit('change', this.selected_categories);
    },
        closePopup() {
            this.isOpen = false;
        },


        async getCategories() {
            this.loading = true
            await axios.get(`https://pharmedi.ir/api/blog/list-category/?search=${this.text_search_categories}`, {
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
    '$route.query.category'(newValue) {
        if (newValue) {
            console.log("llll");
            
            const categoryId = parseInt(newValue);
            if (!this.selected_categories.includes(categoryId)) {
                this.selected_categories = []
                this.selected_categories.push(categoryId);
                this.$emit('change', this.selected_categories);
            }
        }
    },
},

}
</script>






<style scoped>
.fade-enter-active,
.fade-leave-active {
    transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
    opacity: 0;
}
</style>
