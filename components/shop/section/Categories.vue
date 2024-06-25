<template>
    <div>
        <div class="flex justify-center  flex-wrap ">
            <!-- Category 1 -->
            <div v-for="item in categories" class="flex flex-col mx-2  items-center cursor-pointer">
                <div class="border-blue-700 border-2 rounded-full">
                    <div class="w-16 h-16 rounded-full bg-gray-200 flex items-center justify-center border-white border-4">
                        <!-- Insert discount SVG icon here -->
                        <img class=" w-full h-full rounded-full object-cover" :src="item.src" alt="">
                    </div>
                </div>
                <span class="text-xs mt-2">{{ item.title }}</span>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    props: ['src', 'title'],
    data() {
        return {
            categories: [
                { src: 'https://th.bing.com/th/id/OIP.8_Fut1FR4yTMR1jjAUf2_wHaE4?rs=1&pid=ImgDetMain', title: 'Food' },
                { src: 'https://th.bing.com/th/id/OIP.EI1FBf4Hu0Yl0f5EtJVDRQHaHa?rs=1&pid=ImgDetMain', title: 'Medecine' },
                { src: 'https://th.bing.com/th/id/R.6ccab37a6570e23a0acdf451d514fdba?rik=M358431SbHnNiA&pid=ImgRaw&r=0', title: 'Bandage' },
                { src: 'https://th.bing.com/th/id/R.3f4c7465dd00d40329b4bb0b9c2179fd?rik=2sTRidghDZAIAg&pid=ImgRaw&r=0', title: 'Pills' },
                { src: 'https://th.bing.com/th/id/R.3f4c7465dd00d40329b4bb0b9c2179fd?rik=2sTRidghDZAIAg&pid=ImgRaw&r=0', title: 'Pills' },
                { src: 'https://th.bing.com/th/id/OIP.8_Fut1FR4yTMR1jjAUf2_wHaE4?rs=1&pid=ImgDetMain', title: 'Nansense' },
            ]
        }
    }
}
</script>