<template>
  <div>
    <div class="flex justify-center mt-6" v-if="loading == true">
      <span class="loader"></span>
    </div>

    <div v-else class="rtl text-center">
      <div class="mb-3">
        <img :src="selectedImage != null ? selectedImage : firstImage" :alt="product.name"
          class="zoom rounded-10 shadow-2 mb-4" style="width: 200px;height: 200px;">

        <div class="flex justify-content-center">
          <button v-for="image in product.images" :key="image.image" class="rounded-full ms-1"
            @click="selectImage(image.image)" style="width: 6px;height: 6px;float: left;"
            :class="selectedImage == image.image ? 'bg-gradient-red' : 'bg-gradient-blue'">
          </button>
        </div>
      </div>

      <div>
        <h2 class="irsa mt-2">
          {{ product.name }}
        </h2>

        <div>
          <nuxt-link v-for="(category, index) in categories" :key="category.id" class="mt-1 irsa text-sm"
            :to="'/t/shop/' + category.slug">
            {{ category.name }}
            <span v-if="index !== categories.length - 1">
              <svg width="20px" height="20px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M9.71069 18.2929C10.1012 18.6834 10.7344 18.6834 11.1249 18.2929L16.0123 13.4006C16.7927 12.6195 16.7924 11.3537 16.0117 10.5729L11.1213 5.68254C10.7308 5.29202 10.0976 5.29202 9.70708 5.68254C9.31655 6.07307 9.31655 6.70623 9.70708 7.09676L13.8927 11.2824C14.2833 11.6729 14.2833 12.3061 13.8927 12.6966L9.71069 16.8787C9.32016 17.2692 9.32016 17.9023 9.71069 18.2929Z"
                  fill="#0F0F0F" />
              </svg>
            </span>
          </nuxt-link>
        </div>
        <p class="mt-3"
          :style="{ 'text-decoration': hasDiscount ? 'line-through' : '', 'color': hasDiscount ? 'red' : '' }">
          {{ productPrice }} تومان</p>
        <p v-if="hasDiscount">{{ calculatedPrice }} تومان</p>

        <div v-if="!$store.state.isAuthenticated" class="m-2 shadow rounded-10 bg-white">
          <p class="text-xs py-2">برای خرید ابتدا وارد حساب کاربری خود شوید</p>
        </div>

        <div v-if="$store.state.isAuthenticated && loading == false">
          <button v-if="cartItem == null"
            class="py-1 px-3 mt-3 text-xs btn-material btn-animation-shadow irsa bg-treaget rounded-10 text-white"
            @click="addToCart()">

            <svg width="20px" height="20px" viewBox="0 0 24 24" fill="#ffffff" class="ms-1">
              <path opacity="0.5"
                d="M7.5 18C8.32843 18 9 18.6716 9 19.5C9 20.3284 8.32843 21 7.5 21C6.67157 21 6 20.3284 6 19.5C6 18.6716 6.67157 18 7.5 18Z"
                stroke="#ffffff" stroke-width="1.5" />
              <path opacity="0.5"
                d="M16.5 18.0001C17.3284 18.0001 18 18.6716 18 19.5001C18 20.3285 17.3284 21.0001 16.5 21.0001C15.6716 21.0001 15 20.3285 15 19.5001C15 18.6716 15.6716 18.0001 16.5 18.0001Z"
                stroke="#ffffff" stroke-width="1.5" />
              <path
                d="M2.26121 3.09184L2.50997 2.38429H2.50997L2.26121 3.09184ZM2.24876 2.29246C1.85799 2.15507 1.42984 2.36048 1.29246 2.75124C1.15507 3.14201 1.36048 3.57016 1.75124 3.70754L2.24876 2.29246ZM4.58584 4.32298L5.20507 3.89983V3.89983L4.58584 4.32298ZM5.88772 14.5862L5.34345 15.1022H5.34345L5.88772 14.5862ZM20.6578 9.88275L21.3923 10.0342L21.3933 10.0296L20.6578 9.88275ZM20.158 12.3075L20.8926 12.4589L20.158 12.3075ZM20.7345 6.69708L20.1401 7.15439L20.7345 6.69708ZM19.1336 15.0504L18.6598 14.469L19.1336 15.0504ZM5.70808 9.76V7.03836H4.20808V9.76H5.70808ZM2.50997 2.38429L2.24876 2.29246L1.75124 3.70754L2.01245 3.79938L2.50997 2.38429ZM10.9375 16.25H16.2404V14.75H10.9375V16.25ZM5.70808 7.03836C5.70808 6.3312 5.7091 5.7411 5.65719 5.26157C5.60346 4.76519 5.48705 4.31247 5.20507 3.89983L3.96661 4.74613C4.05687 4.87822 4.12657 5.05964 4.1659 5.42299C4.20706 5.8032 4.20808 6.29841 4.20808 7.03836H5.70808ZM2.01245 3.79938C2.68006 4.0341 3.11881 4.18965 3.44166 4.34806C3.74488 4.49684 3.87855 4.61727 3.96661 4.74613L5.20507 3.89983C4.92089 3.48397 4.54304 3.21763 4.10241 3.00143C3.68139 2.79485 3.14395 2.60719 2.50997 2.38429L2.01245 3.79938ZM4.20808 9.76C4.20808 11.2125 4.22171 12.2599 4.35876 13.0601C4.50508 13.9144 4.79722 14.5261 5.34345 15.1022L6.43198 14.0702C6.11182 13.7325 5.93913 13.4018 5.83723 12.8069C5.72607 12.1578 5.70808 11.249 5.70808 9.76H4.20808ZM10.9375 14.75C9.52069 14.75 8.53763 14.7482 7.79696 14.6432C7.08215 14.5418 6.70452 14.3576 6.43198 14.0702L5.34345 15.1022C5.93731 15.7286 6.69012 16.0013 7.58636 16.1283C8.45674 16.2518 9.56535 16.25 10.9375 16.25V14.75ZM4.95808 6.87H17.0888V5.37H4.95808V6.87ZM19.9232 9.73135L19.4235 12.1561L20.8926 12.4589L21.3923 10.0342L19.9232 9.73135ZM17.0888 6.87C17.9452 6.87 18.6989 6.871 19.2937 6.93749C19.5893 6.97053 19.8105 7.01643 19.9659 7.07105C20.1273 7.12776 20.153 7.17127 20.1401 7.15439L21.329 6.23978C21.094 5.93436 20.7636 5.76145 20.4632 5.65587C20.1567 5.54818 19.8101 5.48587 19.4604 5.44678C18.7646 5.369 17.9174 5.37 17.0888 5.37V6.87ZM21.3933 10.0296C21.5625 9.18167 21.7062 8.47024 21.7414 7.90038C21.7775 7.31418 21.7108 6.73617 21.329 6.23978L20.1401 7.15439C20.2021 7.23508 20.2706 7.38037 20.2442 7.80797C20.2168 8.25191 20.1002 8.84478 19.9223 9.73595L21.3933 10.0296ZM16.2404 16.25C17.0021 16.25 17.6413 16.2513 18.1566 16.1882C18.6923 16.1227 19.1809 15.9794 19.6074 15.6318L18.6598 14.469C18.5346 14.571 18.3571 14.6525 17.9744 14.6994C17.5712 14.7487 17.0397 14.75 16.2404 14.75V16.25ZM19.4235 12.1561C19.2621 12.9389 19.1535 13.4593 19.0238 13.8442C18.9007 14.2095 18.785 14.367 18.6598 14.469L19.6074 15.6318C20.0339 15.2842 20.2729 14.8346 20.4453 14.3232C20.6111 13.8312 20.7388 13.2049 20.8926 12.4589L19.4235 12.1561Z"
                fill="#ffffff" />
            </svg>
            افزودن به سبد خرید
          </button>

          <div v-else class="row justify-content-center">
            <CartItemQuantity class="py-1 px-3 mt-3 text-xs irsa rounded-10 col-4 col-lg-2" :cartItem="cartItem"
              :editable="true" />
          </div>
        </div>


        <div class="text-right mt-5 mx-2 bg-white rounded-13 shadow-1 p-3 ltr">
          <p class="fs-6 fw-bold mb-1">توضیحات</p>

          <div style="white-space: pre-line;">
            {{ product.description }}
          </div>
        </div>

        <div class="text-right mx-2 mt-3 bg-white rounded-13 shadow-1 p-3">
          <p class="fs-6 fw-bold mb-1">مشخصات</p>
          <div v-for="(specification, index  ) in product.specifications" :key="specification.id">
            <div class="row mx-2 py-2 hover:bg-gray-100 rounded-3">
              <div class="col-3 fw-bold">
                {{ specification.title }}
              </div>
              <div class="col-9 text-sm">
                {{ specification.value }}
              </div>
            </div>
            <hr v-if="index !== product.specifications.length - 1" class="mx-2">
          </div>
        </div>

        <div class="text-right mx-2 mt-3 rounded-13 shadow-1 p-3">
          <p class="fs-6 fw-bold mb-1">نظرات</p>

          <div class="flex justify-center mt-6" v-if="loadingComments">
            <span class="loader"></span>
          </div>

          <alert v-else-if="comments.length == 0" class="mx-2 my-2">
            چیزی برای نمایش وجود ندارد
          </alert>

          <div v-else>
            <Comment v-for="comment in comments" :key="comment.id" :comment="comment" />
          </div>

          <div v-if="$store.state.isAuthenticated" class="d-flex mt-4">
            <div>
              <button class="py-3 px-3 ms-2 text-xs btn-material btn-animation-shadow irsa bg-black-opacity rounded-3"
                @click="createComment()">

                <svg width="20px" height="20px" viewBox="0 0 24 24" fill="none" class="ms-1">
                  <path d="M16 2H8C4 2 2 4 2 8V21C2 21.55 2.45 22 3 22H16C20 22 22 20 22 16V8C22 4 20 2 16 2Z"
                    stroke="#292D32" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                  <path d="M8.5 12H15.5" stroke="#292D32" stroke-width="1.5" stroke-miterlimit="10"
                    stroke-linecap="round" stroke-linejoin="round" />
                  <path d="M12 15.5V8.5" stroke="#292D32" stroke-width="1.5" stroke-miterlimit="10"
                    stroke-linecap="round" stroke-linejoin="round" />
                </svg>

                ارسال نظر
              </button>
            </div>

            <div class="flex-grow-1">
              <input v-model="comment" class="rounded-13 rtl shadow-5 form-control" type="text"
                placeholder="اینجا ینویسید..." />
            </div>

            <!-- <div class="col-7">
              <input class="form-control" type="text" v-model="comment">
            </div> -->

          </div>

        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import Comment from '~/components/Comment.vue';
import CartItemQuantity from "~/components/CartItemQuantity.vue";

export default {
  components: {
    CartItemQuantity,
  },
  data() {
    return {
      loading: true,

      selectedImage: null,
      editorOptions: {
        theme: "bubble",
      },
      cartItem: null,
      addedToCart: false,
      loadingComments: true,
      comments: [],
      comment: '',
    };
  },
  async asyncData({ store, route }) {
    const product = await axios.get(
      `http://127.0.0.1:8000/api/shop/retrieve-product/${route.params.id}/`,
      {
        headers: {
          "Content-type": "application/json",
          Accept: "application/json",
          Authorization:
            store.state.token != ""
              ? `Token ${store.state.token}`
              : "",
        },
      }
    ).then((response) => { return response.data; });

    return { product, }
  },
  head() {
    return {
      title: 'فارمدی',
      meta: [
        { hid: 'og:title', name: 'og:title', content: this.product.name },
        { hid: 'og:description', name: 'og:description', content: this.product.description },
        { hid: 'og:image', name: 'og:image', content: this.firstImage },
      ],
    };
  },
  mounted() {
    this.getData();
    this.getCartItem();
  },
  computed: {
    firstImage() {
      return this.product.images[0].image;
    },
    categories() {
      var categoryList = [];
      var category = this.product.category;

      while (category.parent != null) {
        categoryList.push(category);
        category = category.parent;
      }

      categoryList.push(category);

      return categoryList;
    },
    hasDiscount() {
      var FormattedCost = this.getFormattedPrice(this.product.price);
      return this.calculatedPrice != this.getPersianNumber(FormattedCost);
    },
    productPrice() {
      return this.getPersianNumber(this.product.price);
    },
    calculatedPrice() {
      var price = this.product.price;

      if (this.product.discount_value != null && this.product.discount_value != 0) {
        if (this.product.discount_type == 'percent') {
          price = this.product.price - (this.product.price * this.product.discount_value / 100);
        } else {
          price = this.product.price - this.product.discount_value;
        }
      }

      var FormattedCost = this.getFormattedPrice(price);
      return this.getPersianNumber(FormattedCost);
    },
  },
  methods: {
    async getData() {
      this.loading = true;
      await this.product;
      this.selectedImage = this.firstImage;
      this.loading = false;

      await this.getComments();
    },
    async getCartItem() {
      // try {
      await axios.get(
        `http://127.0.0.1:8000/api/shop/retrieve-cart-item/${await this.product.id}/`,
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
        .then((response) => { this.cartItem = response.data; });

      // } catch { }
    },
    async getComments() {
      this.loadingComments = true;
      await fetch(`http://127.0.0.1:8000/api/shop/${this.$route.params.id}/list-comments/`, {
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
          this.comments = data;
        });
      this.loadingComments = false;
    },
    async createComment(productID, content) {
      this.fd = new FormData();
      this.fd.append("content", this.comment);

      await axios.post(
        `http://127.0.0.1:8000/api/shop/${this.$route.params.id}/create-comment/`,
        this.fd,
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
      );

      this.comment = '';
      await this.getComments();
    },
    selectImage(image) {
      this.selectedImage = image;
    },
    checkLogin() {
      return this.$store.state.isAuthenticated == true;
    },
    shareLink() {
      this.copyToClipboard(`http://127.0.0.1:8000/t/blog/${this.product.id}/`);
      alert(` کپی شد.`);
    },
    async addToCart() {
      this.fd = new FormData();
      this.fd.append("product_id", this.product.id);

      await axios.post(
        `http://127.0.0.1:8000/api/shop/add-to-cart/`,
        this.fd,
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
      );

      this.addedToCart = true;
      this.getCartItem();
    },
    copyToClipboard(textToCopy) {
      // navigator clipboard api needs a secure context (https)
      if (navigator.clipboard && window.isSecureContext) {
        // navigator clipboard api method'
        return navigator.clipboard.writeText(textToCopy);
      } else {
        // text area method
        const textArea = document.createElement("textarea");
        textArea.value = textToCopy;
        // make the textarea out of viewport
        textArea.style.position = "fixed";
        textArea.style.left = "-999999px";
        textArea.style.top = "-999999px";
        document.body.appendChild(textArea);
        textArea.focus();
        textArea.select();
        // eslint-disable-next-line promise/param-names
        return new Promise((res, rej) => {
          // here the magic happens
          // eslint-disable-next-line prefer-promise-reject-errors
          document.execCommand("copy") ? res() : rej();
          textArea.remove();
        });
      }
    },
    getPersianNumber(number) {
      const persianDigits = ["۰", "۱", "۲", "۳", "۴", "۵", "۶", "۷", "۸", "۹"];

      const arabicDigits = number.toString().split("");
      let persianNumber = "";

      for (let i = 0; i < arabicDigits.length; i++) {
        const digit = parseInt(arabicDigits[i]);

        if (!isNaN(digit)) {
          persianNumber += persianDigits[digit];
        } else {
          persianNumber += arabicDigits[i];
        }
      }

      return persianNumber;
    },
    getFormattedPrice(number) {
      return number.toLocaleString();
    },
  },
};
</script>

<style>
.zoom {
  transition: transform .2s;
  /* Animation */
  margin: 0 auto;
}

.zoom:hover {
  transform: translate(0, 20%) scale(1.5);
  /* (150% zoom - Note: if the zoom is too large, it will go outside of the viewport) */
}
</style>