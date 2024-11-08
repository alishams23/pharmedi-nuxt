<template>
  <form class="px-3" @submit.prevent="sendData" enctype="multipart/form-data" v-if="loading==false">
    <div class="mt-3 mb-5">
      <p class="text-right fw-bold my-3 fs-6">تغییر تیتر مقاله</p>
      <input v-model="title" required type="text" class="shadow-none rtl px-3 bg-white border" />
    </div>
    <section-text-editor-chat-bot />

    <!-- <vue-editor class="bg-white" v-model="body" :editorOptions="editorOptions"></vue-editor> -->
    <text-editor :content="body" @update="(newText) => { body = newText}">
    </text-editor>
    <BlogSectionCategoryList :data="categories" @change="(data) => categories = data" class="my-5" />


    <p class="text-danger rtl pt-3">
      {{ error }}
    </p>
    <div class="d-flex rtl m-3 mt-5">
      <button type="submit" class="px-3 btn bg-treaget py-2 px-5 fw-bold rounded-pill">
        افزودن
      </button>
    </div>
  </form>

  <div class="h-[200px] flex justify-center items-center" v-else>

    <div>
      <div class="loader"></div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import "quill/dist/quill.core.css";
import "quill/dist/quill.snow.css";
import "quill/dist/quill.bubble.css";
import VuePictureInput from "vue-picture-input";

export default {
  data() {
    return {
      loading: true,
      title: this.title,
      body: this.body,
      sendLoading: false,
      categories:[],
      fd: null,
      loadingCategory: true,
      
    };
  },
  mounted() {
    this.getData();
  },
  methods: {
    async getData() {
      this.loading = true;
      await axios
        .get(
          `https://pharmedi.ir/api/blog/blog_retrieve/${this.$route.params.id}/`,
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
        .then((response) => {
          this.title = response.data.title;
          this.body = response.data.body;
          this.categories = response.data.category
        });
      this.loading = false;
    },
    async sendData() {
      this.loading = true;
      // this.fd = new FormData();
      // this.fd.append("title", this.title);
      // this.fd.append("body", this.body);
      // this.fd.append("category",this.categories.map(item => item.id));

      await axios
        .put(
          `https://pharmedi.ir/api/blog/BlogUpdate/${this.$route.params.id}/`,
          {
            title: this.title,
            body: this.body,
            category: this.categories.map(item => item.id),

          },
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
        .then((response) => {
          this.sendLoading = false;
          window.location.reload();
        })
        .catch(function (error) {
          if (error.response) {
            console.log(error.response.data);
            console.log(error.response.status);
            console.log(error.response.headers);
          }
        });
    },
  },
};
</script>
