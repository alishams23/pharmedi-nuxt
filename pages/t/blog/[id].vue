<template>
  <div>

    <div class="px-3" v-if="data">
      <div class="bg-white rounded-13 shadow-1">
        <div v-if="data.imageBlog" class="col-12 p-4">
          <img :src="data.imageBlog.photo" class="rounded-13 cover w-full h-full" alt="" />
          <div class="d-flex" style="margin-top: -70px">
            <div class="drop -color-lighter drop--down">
              <button>
                <a href="#"
                  class="ms-3 h-10 w-10 rounded-18 shadow-2 bg-white d-flex justify-content-center align-items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="currentColor"
                    class="bi bi-three-dots-vertical" viewBox="0 0 16 16">
                    <path
                      d="M9.5 13a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0zm0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0zm0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0z" />
                  </svg>
                </a>
              </button>
              <div class="drop__content -transition-slide-in" style="z-index: 9999">
                <div class="drop-list -size-large -position-right -border-rounded">
                  <button class="drop-list__btn py-2">
                    <div @click="shareLink()" class="d-flex mx-3 justify-content-between align-items-center">
                      <i class="fa fa-share"></i>
                      <div class="text-sm">اشتراک گذاری</div>
                    </div>
                  </button>
                  <button v-if="data.author.username == $store.state.username" class="drop-list__btn py-2">
                    <nuxt-link :to="'/t/textEditor/' + data.id"
                      class="d-flex mx-3 justify-content-between align-items-center">
                      <i class="fa fa-pen"></i>
                      <div class="text-sm">ادیت</div>
                    </nuxt-link>
                  </button>
                  <button class="drop-list__btn py-2" @click="deletePicture(data.id)"
                    v-if="data.author.username == $store.state.username">
                    <div class="d-flex mx-3 justify-content-between align-items-center text-danger">
                      <i class="fad fa-trash"></i>
                      <div class="text-sm">حذف</div>
                    </div>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="col-12">
          <div class="px-4">
            <h2 class="v2 irsa rtl pb-4 px-2 pt-5">
              {{ data.title }}
            </h2>
            <!-- <div v-html="data.body">

            </div> -->
            <ShowTextEditor :content="data.body"></ShowTextEditor>
           
          </div>
        </div>
        <div class="py-4">
          <div class="d-flex justify-content-around align-items-center px-1 bg-white shadow-1 mx-3 rounded-13 py-3">
            <div class="d-flex">
              <nuxt-link :to="checkLogin() ? '' : '/t/login'" class="d-flex items-center">
                <div class="irsa py-1 px-3 border rounded-full text-xs">
                  تعداد لایک : {{ data.like_count }}
                </div>
                <div class="p-2 rounded-full text-black hapus_krs" @click="like(data.id)" :value="data.id">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" v-if="data.likeAuthor" fill="green"
                    class="bi bi-heart-fill" viewBox="0 0 16 16">
                    <path fill-rule="evenodd"
                      d="M8 1.314C12.438-3.248 23.534 4.735 8 15-7.534 4.736 3.562-3.248 8 1.314z" />
                  </svg>
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" v-else
                    class="bi bi-heart" viewBox="0 0 16 16">
                    <path
                      d="m8 2.748-.717-.737C5.6.281 2.514.878 1.4 3.053c-.523 1.023-.641 2.5.314 4.385.92 1.815 2.834 3.989 6.286 6.357 3.452-2.368 5.365-4.542 6.286-6.357.955-1.886.838-3.362.314-4.385C13.486.878 10.4.28 8.717 2.01L8 2.748zM8 15C-7.333 4.868 3.279-3.04 7.824 1.143c.06.055.119.112.176.171a3.12 3.12 0 0 1 .176-.17C12.72-3.042 23.333 4.867 8 15z" />
                  </svg>
                </div>
              </nuxt-link>
            </div>
            <nuxt-link :to="'/' + data.author.username" class="d-flex">
              <div class="d-flex flex-column justify-content-between py-2">
                <div class="rtl fw-bold">
                  {{ data.author.get_full_name }}
                </div>
                <div class="text-xs text-muted rtl">
                  {{ data.author.username }}
                </div>
              </div>
              <div class="rounded-pill bg-white h-14 w-14 p-half shadow-lg ms-3" v-if="data.author">
                <img class="rounded-pill w-full h-full cover" v-if="data.author.image_profile"
                  :src="data.author.image_profile" alt="img" />
                <img class="rounded-pill w-full h-full cover" v-else src="@/assets/inside/avatar.jpg" alt="img" />
              </div>
            </nuxt-link>
          </div>
        </div>
      </div>
    </div>
    <div class="flex justify-center mt-6" v-if="loading">
      <span class="loader"></span>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import "quill/dist/quill.core.css";
import "quill/dist/quill.snow.css";
import "quill/dist/quill.bubble.css";

export default {

  data() {
    return {
      loading: true,
      data: null,
   
    };
  },
  
  head() {
  return {
    title: this.data ? this.data.title : 'فارمدی',
    meta: [
      { hid: 'og:locale', name: 'og:locale', content: "fa_IR" },
      { hid: 'author', name: 'author', content: this.data.author.username },
      { hid: 'og:site_name', name: 'og:site_name', content: "فارمدی" },
      { hid: 'description', name: 'description', content: this.data.body.substring(0, 150) },
      { hid: 'og:title', property: 'og:title', content: this.data.title },
      { hid: 'og:type', property: 'og:type', content: "article" },
      { hid: 'og:description', property: 'og:description', content: this.data.body.substring(0, 150) },
      { hid: 'og:image', property: 'og:image', content: this.data.imageBlog ? this.data.imageBlog.photo : 'default-image-url' },
      { hid: 'og:url', property: 'og:url', content: `http://127.0.0.1:8000/t/blog/${this.data.id}` },
    ],
  };
},
  mounted() {
    this.asyncData();
 
  },
  methods: {
    async asyncData() {
    try {
      const response = await axios.get(
        `http://127.0.0.1:8000/api/blog/blog_retrieve/${this.$route.params.id}/`,
        {
          headers: {
            "Content-type": "application/json",
            Accept: "application/json",
            Authorization: this.$store.state.token ? `Token ${this.$store.state.token}` : "",
          },
        }
      ).then((response) => { this.data =  response.data;this.loading = false });
      
    } catch (error) {
      console.error("Failed to fetch blog data:", error);

    }
  },
   
    async like(id) {
      try {
        await axios.post(
          `http://127.0.0.1:8000/api/blog/AddLikeView/?id=${id}`,
          {},
          {
            headers: {
              "Content-type": "application/json",
              Accept: "application/json",
              Authorization: this.$store.state.token ? `Token ${this.$store.state.token}` : "",
            },
          }
        );
        this.data.likeAuthor = !this.data.likeAuthor;
        this.data.like_count += this.data.likeAuthor ? 1 : -1;
      } catch (error) {
        console.error("Failed to like the post:", error);
      }
    },
    async deletePicture(id) {
      try {
        await axios.delete(`http://127.0.0.1:8000/api/blog/BlogRemove/${id}/`, {
          headers: {
            "Content-type": "application/json",
            Accept: "application/json",
            Authorization: `Token ${this.$store.state.token}`,
          },
        });
        this.$router.push(`/t/blog/`);
      } catch (error) {
        console.error("Failed to delete the picture:", error);
      }
    },
    checkLogin() {
      return this.$store.state.isAuthenticated;
    },
    shareLink() {
      const link = `http://127.0.0.1:8000/t/blog/${this.data.id}/`;
      this.copyToClipboard(link);
      alert(`کپی شد.`);
    },
    copyToClipboard(textToCopy) {
      if (navigator.clipboard && window.isSecureContext) {
        return navigator.clipboard.writeText(textToCopy);
      } else {
        const textArea = document.createElement("textarea");
        textArea.value = textToCopy;
        textArea.style.position = "fixed";
        textArea.style.left = "-999999px";
        textArea.style.top = "-999999px";
        document.body.appendChild(textArea);
        textArea.focus();
        textArea.select();
        return new Promise((res, rej) => {
          document.execCommand("copy") ? res() : rej();
          textArea.remove();
        });
      }
    },
  },
};
</script>
