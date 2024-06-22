
<template>
  
  <NuxtLoadingIndicator />
  <div>
    <Head>
        <Title>تدلاین</Title>
     </Head>
</div>
  <div v-if="loading == false">
    <NuxtLayout >
      
      <NuxtPage/>
    </NuxtLayout>
  </div>




</template>

<script>
export default {
  data(){
    return{
      loading : true,
    }
  },
  beforeMount() {

this.start()
  },
  methods:{
    start(){
      this.$store.commit("onStart");
    this.loading = false

    }
  }
  
  }
</script>