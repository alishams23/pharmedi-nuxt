<template>
    <div class="flex justify-center ">
        <div id="alert-4"
        :class="[class_inside , type == 'success' ? 'text-green-800 bg-green-100' : type == 'danger' ?  'text-red-800 bg-red-50' : 'text-yellow-800 bg-yellow-50']"
            class="rtl  flex items-center  justify-start p-4 my-2 rounded-3xl   "
            role="alert">
            <svg class="flex-shrink-0 w-4 h-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor"
                viewBox="0 0 20 20">
                <path
                    d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z" />
            </svg>
            <span class="sr-only">Warning</span>
            <div class="ms-3 text-sm font-medium">
               {{ text }}
            </div>
        </div>
    </div>
</template>

<script>
export default {
    props: ["class_inside","text","type"]
}
</script>