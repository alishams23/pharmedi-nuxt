
<template>
  
  <NuxtLoadingIndicator />
  <div>
    <Head>
        <!-- <Title>فارمدی - pharmedi</Title> -->
        <Title>۴۱۲۵۰۳۶</Title>
     </Head>
</div>
  
    <NuxtLayout v-if="loading == false" >
      
      <NuxtPage/>
    </NuxtLayout>





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