<template>
    <div class=" mb-10">
        <div class=" flex items-center w-full mx-auto px-2 rtl"> 
            <ShopSectionFilterSearch :page="page" @fetch-data="(data)=>{products = data.results;next=data.next;previous = data.previous}" @loading="(data)=>{loading=data}" :text="text" />
            <label for="default-search"
                class="mb-2 text-sm font-medium text-gray-900 sr-only e">Search</label>
            <div class=" flex-grow relative     ">
                <div class="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                    <svg class="w-4 h-4 text-gray-500 " aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                            d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z" />
                    </svg>
                </div>
                <input v-model="text"  type="search"
                    id="default-search"
                    class="block w-full p-4 pe-5 text-sm text-gray-900 border border-gray-300 rounded-full bg-gray-50 focus:ring-blue-500 focus:border-blue-500 shadow-none"
                    placeholder="جستجو میان محصولات ما..." required />
                <NuxtLink type="submit"
                    class="text-white absolute end-2 bottom-[7px] bg-treaget hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300  rounded-full text-sm font-light px-4 py-2 ">
                    جستجو</NuxtLink>
            </div>
        </div>
    </div>
    <div v-if="loading"  class="flex justify-center pt-20"> 
        <div class="loader"></div>
    </div>
    <div v-else>
        <div class=" grid grid-cols-2 mx-3 gap-x-7 gap-y-8 md:grid-cols-4 md:mx-0 lg:grid-cols-4 lg:mx-0">
            <div class=" col-span-1 bg-white rounded-3xl" v-for="item in products">
                <ShopSharedProductCard class="" :data="item" />
            </div>
            
        </div>
        <div class="flex justify-center items-center mt-10"  v-if="products.length  > 0" >
      
            <div v-if="previous != null" @click="page -= 1" class="cursor-pointer relative inline-flex items-center rounded-xl bg-white px-3 py-2 text-sm text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus-visible:outline-offset-0">صفحه قبل</div>
            <div v-if="next != null" @click="page += 1" class="cursor-pointer relative ml-3 inline-flex items-center rounded-xl bg-white px-3 py-2 text-sm text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus-visible:outline-offset-0">صفحه بعد</div>
        </div>
        <div class="flex justify-center">
            <div id="alert-4" v-if="products.length == 0" class="rtl  flex items-center justify-start p-4 mb-4 text-yellow-800 rounded-3xl shadow-3 bg-yellow-50 " role="alert">
                <svg class="flex-shrink-0 w-4 h-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z"/>
                </svg>
                <span class="sr-only">Warning</span>
                <div class="ms-3 text-sm font-medium">
                   محصولی وجود ندارد
                </div>
            
            </div>
        </div>
    </div>
   
</template>
<script>

export default {
    data: () => ({
        products: [],
        loading: true,
        text: '',
        page :1,
        next:null,
previous:null,
    }),
    methods: {

    },
    beforeMount() {
        if (this.$route.query.text != null) this.text = this.$route.query.text
    }
}

</script>