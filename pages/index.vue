<template>
  <div>

  </div>
</template>

<script>
export default {

  data() {
    return {
      clientActive: 1,
      CarouselActive: 1
    }
  },
  beforeCreate() {
    this.$router.push({
      name: 't-Home',
      query: {
        loginQuery: true
      }
    })
  },
  mounted() { },
  methods: {
    alertUpdate() {
      alert('در حال آپدیت')
    }
  }

}
</script>

<style ></style>
