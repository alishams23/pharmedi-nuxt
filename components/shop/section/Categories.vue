<template>
    <div>
        <div class="flex justify-center  flex-wrap ">
            <!-- Category 1 -->
     
            <nuxt-link :to="'/t/search/?category='+item.id" v-for="item in categories" class="flex flex-col mx-2  items-center cursor-pointer">
                <div class="border-blue-700 border-2 rounded-full">
                    <div class="w-16 h-16 rounded-full bg-gray-200 flex items-center justify-center border-white border-4">
                        <!-- Insert discount SVG icon here -->
                        <img class=" w-full h-full rounded-full object-cover" :src="item.image" alt="">
                    </div>
                </div>
                <span class="text-xs mt-2">{{ item.name }}</span>
            </nuxt-link>
        </div>
    </div>
</template>
<script>
export default {
    props: ['src', 'title'],
    data() {
        return {
            loading:false,
            categories: []
        }
    },
    methods:{
        getData(){
            this.loading = true;
      fetch(
        `http://127.0.0.1:8000/api/shop/list-categories/?is_main_page=true`,
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
      )
        .then((response) => response.json())
        .then((data) => {
          this.categories = data;
          this.loading = false;
        });
    },},
    mounted(){
        this.getData()
    }
}
</script>