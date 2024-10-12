<template>
  <div>
    <div class="row">
      <user class="col-lg-6 col-sm-12 col-6" v-for="item in data" :key="item.id + 'shift in search shift'" :data="item"
        v-show="loading == false" />
    </div>
    <div class="flex justify-center mt-6" v-if="loading == true">
      <span class="loader"></span>
    </div>
    <alert class="mt-5" v-if="data.length == 0">چیزی برای نمایش وجود ندارد</alert>
  </div>
</template>

<script>
export default {
  props: ["text"],
  data() {
    return {
      data: [],
      page: 1,
      error: "",
      loading: false,
    };
  },
  methods: {
    getData() {
      this.loading = true;
      fetch(
        `http://127.0.0.1:8000/api/account/search_user/?search=${this.text}`,
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
          this.data = data;
          this.loading = false;
        });
    },
  },
  watch: {
    text() {
      this.getData();
    },
  },
};
</script>

<style></style>
