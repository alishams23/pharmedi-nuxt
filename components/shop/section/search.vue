<template>


    <div class="max-w-sm md:max-w-md mx-auto px-2 rtl">
        <label for="default-search"
            class="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white">Search</label>
        <div class="relative">
            <div class="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                <svg class="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                        d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z" />
                </svg>
            </div>
            <input v-model="name" @keyup.enter="$router.push('/t/search/?text=' + name)" type="search"
                id="default-search"
                class="block w-full p-4 pe-5 text-sm text-gray-900 border border-gray-300 rounded-full bg-gray-50 focus:ring-blue-500 focus:border-blue-500 shadow-none"
                placeholder="جستجو میان محصولات ما..." required />
            <NuxtLink type="submit"
                class="text-white absolute end-2 bottom-2 bg-treaget hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300  rounded-full text-sm font-light px-4 py-2 "
                :to="'/t/search/?text=' + name">جستجو</NuxtLink>
        </div>
    </div>

</template>
<script>
export default {
    data() {
        return {
            name: ''
        }
    }
}
</script>