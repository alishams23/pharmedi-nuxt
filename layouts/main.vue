<template>
  <div v-show="hide == false">
    <slot />
  </div>
</template>

<script>

export default {
  data() {
    return {
      hide: true
    }
  },

 
   methods: {

  }, computed: {
    isAuthenticated: {
      get() {
        return this.$store.state.isAuthenticated;
      }
    }
  },
  beforeMount() {
    this.$store.commit("onStart");

  }, mounted() {
    if (this.isAuthenticated == true) {
      this.$router.push("/t/Home");
    } else {
      this.hide = false

    }
  }
}
</script>

<style ></style>