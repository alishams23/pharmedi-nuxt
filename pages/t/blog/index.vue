<template>
  <div class="px-3">
    <div class="mb-lg-4 pb-3" style="
        position: fixed;
        width: 76px;
        right: 0;
        bottom: 0;
        z-index: 9999;
        margin-bottom: 72px;
      ">
      <nuxt-link :to="checkLogin() ? '/t/textEditor' : '/t/login'"
        class=" text-white  ">
      <div class=" bg-treaget   h-[60px] w-[60px] flex justify-center items-center rounded-full">
          <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" fill="currentcolor" class="bi bi-plus"
            viewBox="0 0 16 16">
            <path
              d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z" />
          </svg>
      </div>
      </nuxt-link>
    </div>
    <div class="px-3 py-2 pb-4">
      <div class="d-flex flex-row justify-content-between">
        <div class="d-flex col justify-content-start">
          <div class="d-flex p-3 text-white bg-treaget rounded-13">
            <i class="fa fa-search" />
          </div>
        </div>
        <div class="row col-10 col-lg-11">
          <input v-model="text" class="col-12 rounded-13 rtl shadow-3" name="name" type="search" placeholder="جستجو"
            @keyup.enter="
        getData();
      data = [];
      page = 1;
      " />
        </div>
      </div>
    </div>
    <div class="d-flex flex-row align-items-stretch flex-wrap">
      <nuxt-link v-for="item in data" :key="item.id + 'blog list'" :to="'/t/blog/' + item.id"
        class="col-12 col-lg-6 col-xl-6 col-md-6 pt-2 pb-3 px-2 d-flex align-items-stretch">
        <Blog-item class="w-full" :data="item" />
      </nuxt-link>
    </div>

    <div class="py-5 pb-3 px-3">
      <alert v-if="data.length == 0 && loading == false" class="mt-5">
        چیزی برای نمایش وجود ندارد
      </alert>
    </div>
    <!-- post 2-->
    <!-- Load more-->
    <div class="d-flex justify-content-center">
      <button v-if="nextPage != null && loading == false" class="border rounded-pill py-2 px-3 mt-2 bg-white" @click="
        page++;
      getData();
      ">
        بیشتر
      </button>
    </div>
    <div v-if="loading" class="d-flex justify-content-center">
      <span class="loader" />
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "Home",
  data() {
    return {
      page: 1,
      data: [],
      text: "",
      page: 1,
      loading: false,
      nextPage: null,
    };
  },
  mounted() {
    this.getData();
  },
  methods: {
    checkLogin() {
      return this.$store.state.isAuthenticated == true;
    },
    async getData() {
      this.loading = true;
      await axios
        .get(
          `http://127.0.0.1:8000/api/blog/Blog_List/?search=${this.text == null ? "" : this.text
          }&page=${this.page}`
        )

        .then((response) => {
          console.log(response.data);
          this.nextPage = response.data.next;
          this.loading = false;
          response.data.results.forEach((element) => this.data.push(element));
        });
    },
  },
};
</script>

<style></style>
