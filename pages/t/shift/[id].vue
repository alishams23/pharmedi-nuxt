<template>

    <div v-if="loading == false">
        
        <div v-if="data">
            <Shift  :data="data" />
        </div>
        <alert v-else class="mt-5">
            چیزی برای نمایش وجود ندارد
          </alert>
    </div>
    <div v-else class="d-flex justify-content-center">
        <span class="loader" />
    </div>

 
</template>

<script>
export default{
    data(){
        return {
            data:null,
            loading:null,
        }
    },
    methods:{
        async getData(){
            this.loading = true;
            await fetch(`http://127.0.0.1:8000/api/shift/shift-retrieve/${this.$route.params.id}/`, {
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
                    this.data = data;
                });
            this.loading = false;
        }
    },mounted(){
        this.getData()
    }

}

</script>