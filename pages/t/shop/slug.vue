<template>
  <div class="flex justify-center mt-6" v-if="loading == true">
    <span class="loader"></span>
  </div>

  <div v-else class="mt-2">
    <div class="px-3 py-2 pb-4">
      <div class="d-flex flex-row justify-content-between">
        <div class="row col-10 me-2">
          <input v-model="searchedValue" class="col-12 rounded-13 rtl shadow-3" name="name" type="search"
            placeholder="جستجو" />
        </div>

        <div class="drop -color-lighter drop--down col-2 justify-content-end">
          <button class="shadow-2 border rounded-13">
            <div class="d-flex p-3 text-white bg-treaget rounded-13">
              <i class="fa fa-sort"></i>
            </div>
          </button>
          <div class="mt-1 drop__content -transition-slide-in" style="z-index: 9999">
            <div class="drop-list -size-large -position-left -border-rounded">
              <button class="drop-list__btn py-2" @click="setSortMode(-1)">
                <div class="d-flex mx-3 justify-content-between align-items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512" width="20px" height="20px">
                    <path
                      d="M3.9 22.9C10.5 8.9 24.5 0 40 0H472c15.5 0 29.5 8.9 36.1 22.9s4.6 30.5-5.2 42.5L396.4 195.6C316.2 212.1 256 283 256 368c0 27.4 6.3 53.4 17.5 76.5c-1.6-.8-3.2-1.8-4.7-2.9l-64-48c-8.1-6-12.8-15.5-12.8-25.6V288.9L9 65.3C-.7 53.4-2.8 36.8 3.9 22.9zM432 224a144 144 0 1 1 0 288 144 144 0 1 1 0-288zm59.3 107.3c6.2-6.2 6.2-16.4 0-22.6s-16.4-6.2-22.6 0L432 345.4l-36.7-36.7c-6.2-6.2-16.4-6.2-22.6 0s-6.2 16.4 0 22.6L409.4 368l-36.7 36.7c-6.2 6.2-6.2 16.4 0 22.6s16.4 6.2 22.6 0L432 390.6l36.7 36.7c6.2 6.2 16.4 6.2 22.6 0s6.2-16.4 0-22.6L454.6 368l36.7-36.7z" />
                  </svg>
                  <div class="text-sm">پیش‌فرض</div>
                </div>
              </button>
              <button class="drop-list__btn py-2" @click="setSortMode(0)">
                <div class="d-flex mx-3 justify-content-between align-items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512" width="20px" height="20px">
                    <path
                      d="M151.6 42.4C145.5 35.8 137 32 128 32s-17.5 3.8-23.6 10.4l-88 96c-11.9 13-11.1 33.3 2 45.2s33.3 11.1 45.2-2L96 146.3V448c0 17.7 14.3 32 32 32s32-14.3 32-32V146.3l32.4 35.4c11.9 13 32.2 13.9 45.2 2s13.9-32.2 2-45.2l-88-96zM320 480h32c17.7 0 32-14.3 32-32s-14.3-32-32-32H320c-17.7 0-32 14.3-32 32s14.3 32 32 32zm0-128h96c17.7 0 32-14.3 32-32s-14.3-32-32-32H320c-17.7 0-32 14.3-32 32s14.3 32 32 32zm0-128H480c17.7 0 32-14.3 32-32s-14.3-32-32-32H320c-17.7 0-32 14.3-32 32s14.3 32 32 32zm0-128H544c17.7 0 32-14.3 32-32s-14.3-32-32-32H320c-17.7 0-32 14.3-32 32s14.3 32 32 32z" />
                  </svg>
                  <div class="text-sm">گران ترین</div>
                </div>
              </button>
              <button class="drop-list__btn py-2" @click="setSortMode(1)">
                <div class="d-flex mx-3 justify-content-between align-items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512" width="20px" height="20px">
                    <path
                      d="M151.6 469.6C145.5 476.2 137 480 128 480s-17.5-3.8-23.6-10.4l-88-96c-11.9-13-11.1-33.3 2-45.2s33.3-11.1 45.2 2L96 365.7V64c0-17.7 14.3-32 32-32s32 14.3 32 32V365.7l32.4-35.4c11.9-13 32.2-13.9 45.2-2s13.9 32.2 2 45.2l-88 96zM320 480c-17.7 0-32-14.3-32-32s14.3-32 32-32h32c17.7 0 32 14.3 32 32s-14.3 32-32 32H320zm0-128c-17.7 0-32-14.3-32-32s14.3-32 32-32h96c17.7 0 32 14.3 32 32s-14.3 32-32 32H320zm0-128c-17.7 0-32-14.3-32-32s14.3-32 32-32H480c17.7 0 32 14.3 32 32s-14.3 32-32 32H320zm0-128c-17.7 0-32-14.3-32-32s14.3-32 32-32H544c17.7 0 32 14.3 32 32s-14.3 32-32 32H320z" />
                  </svg>
                  <div class="text-sm">ارزان ترین</div>
                </div>
              </button>
              <button class="drop-list__btn py-2" @click="setSortMode(2)">
                <div class="d-flex mx-3 justify-content-between align-items-center">
                  <svg width="20px" height="20px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path fill-rule="evenodd" clip-rule="evenodd"
                      d="M17 17C19.7614 17 22 14.7614 22 12C22 9.23858 19.7614 7 17 7C14.2386 7 12 9.23858 12 12C12 14.7614 14.2386 17 17 17ZM17.75 10C17.75 9.58579 17.4142 9.25 17 9.25C16.5858 9.25 16.25 9.58579 16.25 10V11.8462C16.25 12.0266 16.3151 12.201 16.4332 12.3374L17.4332 13.4912C17.7045 13.8042 18.1782 13.838 18.4912 13.5668C18.8042 13.2955 18.838 12.8218 18.5668 12.5088L17.75 11.5664V10Z"
                      fill="#1C274C" />
                    <g opacity="0.5">
                      <path fill-rule="evenodd" clip-rule="evenodd"
                        d="M1.25 7C1.25 6.58579 1.58579 6.25 2 6.25H10C10.4142 6.25 10.75 6.58579 10.75 7C10.75 7.41421 10.4142 7.75 10 7.75H2C1.58579 7.75 1.25 7.41421 1.25 7ZM1.25 12C1.25 11.5858 1.58579 11.25 2 11.25H8C8.41421 11.25 8.75 11.5858 8.75 12C8.75 12.4142 8.41421 12.75 8 12.75H2C1.58579 12.75 1.25 12.4142 1.25 12ZM1.25 17C1.25 16.5858 1.58579 16.25 2 16.25H10C10.4142 16.25 10.75 16.5858 10.75 17C10.75 17.4142 10.4142 17.75 10 17.75H2C1.58579 17.75 1.25 17.4142 1.25 17Z"
                        fill="#1C274C" />
                    </g>
                  </svg>
                  <div class="text-sm">جدید ترین</div>
                </div>
              </button>
              <button class="drop-list__btn py-2" @click="setSortMode(3)">
                <div class="d-flex mx-3 justify-content-between align-items-center">
                  <svg width="20px" height="20px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path opacity="0.5" d="M10 7L2 7" stroke="#1C274C" stroke-width="1.5" stroke-linecap="round" />
                    <path opacity="0.5" d="M8 12H2" stroke="#1C274C" stroke-width="1.5" stroke-linecap="round" />
                    <path opacity="0.5" d="M10 17H2" stroke="#1C274C" stroke-width="1.5" stroke-linecap="round" />
                    <circle cx="17" cy="12" r="5" stroke="#1C274C" stroke-width="1.5" />
                    <path d="M17 10V11.8462L18 13" stroke="#1C274C" stroke-width="1.5" stroke-linecap="round"
                      stroke-linejoin="round" />
                  </svg>
                  <div class="text-sm">قدیمی ترین</div>
                </div>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="d-flex flex-wrap mx-2">
      <nuxt-link :to="'/t/shop/'"
        class="rounded-13 text-center fw-bold py-2 px-4 bg-white shadow-3 mx-1 bd-highlight p-1 p-lg-2 me-1 text-xs">
        <i class="fa fa-home"></i>
        <span class="ms-1">خانه</span>
      </nuxt-link>

      <svg class="mt-2" width="20px" height="20px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <g id="Interface / Line_Xl">
          <path id="Vector" d="M12 21V3" stroke="#000000" stroke-width="2" stroke-linecap="round"
            stroke-linejoin="round" />
        </g>
      </svg>



      <div v-if="category.parent">
        <div class="d-flex">
          <nuxt-link :to="'/t/shop/' + category.parent.slug"
            class="rounded-13 text-center fw-bold py-2 px-4 bg-white shadow-3 mx-1 bd-highlight p-1 p-lg-2 me-1 text-xs">
            {{ category.parent.name }}
          </nuxt-link>
          <svg class="mt-2" width="15px" height="20px" viewBox="-4.5 0 20 20" version="1.1"
            xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">

            <g id="Page-1" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
              <g id="Dribbble-Light-Preview" transform="translate(-305.000000, -6679.000000)" fill="#000000">
                <g id="icons" transform="translate(56.000000, 160.000000)">
                  <path
                    d="M249.365851,6538.70769 L249.365851,6538.70769 C249.770764,6539.09744 250.426289,6539.09744 250.830166,6538.70769 L259.393407,6530.44413 C260.202198,6529.66364 260.202198,6528.39747 259.393407,6527.61699 L250.768031,6519.29246 C250.367261,6518.90671 249.720021,6518.90172 249.314072,6519.28247 L249.314072,6519.28247 C248.899839,6519.67121 248.894661,6520.31179 249.302681,6520.70653 L257.196934,6528.32352 C257.601847,6528.71426 257.601847,6529.34685 257.196934,6529.73759 L249.365851,6537.29462 C248.960938,6537.68437 248.960938,6538.31795 249.365851,6538.70769"
                    id="arrow_right-[#336]">

                  </path>
                </g>
              </g>
            </g>
          </svg>
        </div>
      </div>

      <div class="d-flex flex-wrap">
        <div class="d-flex flex-row justify-content-between">
          <div class="drop -color-lighter drop--down d-flex justify-content-start">
            <nuxt-link :to="'/t/shop/' + category.slug"
              class="rounded-13 text-center fw-bold py-2 px-4 bg-white shadow-3 mx-1 bd-highlight p-1 p-lg-2 me-1 text-xs">
              <span class="ms-1">{{ category.name }}</span>
            </nuxt-link>
            <div v-if="category.children.length > 0" v-for="subCategory in category.children" :key="subCategory.slug"
              class="mt-1 drop__content -transition-slide-in" style="z-index: 9999">
              <div class="drop-list -size-large -position-left -border-rounded">
                <nuxt-link class="drop-list__btn py-2" :to="'/t/shop/' + subCategory.slug">
                  <div class="d-flex mx-3 justify-content-between align-items-center">
                    <i class="fa fa-list"></i>
                    <div class="text-sm">{{ subCategory.name }}</div>
                  </div>
                </nuxt-link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div v-if="filteredProducts.length == 0">
      <alert class="mx-2 my-2">
        چیزی برای نمایش وجود ندارد
      </alert>
    </div>

    <div v-else class="row justify-content-end mt-2 mx-2">
      <nuxt-link class="col-12 col-lg-6 p-1 p-lg-3" v-for=" product in filteredProducts"
        :key="product.id + 'product list'" :to="'/t/shop/products/' + product.id">
        <ProductItem :product="product" />
      </nuxt-link>
    </div>


  </div>
</template>

<script>
import ProductItem from "~/components/ProductItem.vue";

export default {
  data() {
    return {
      loading: false,
      user: {},
      category: {},

      sortMode: -1,
      searchedValue: "",

      categories: [],
      products: [],
    };
  },
  components: {
    ProductItem,
  },
  async mounted() {
    this.userData();
    this.getCategory();
    this.getProducts();
  },
  computed: {
    sortedProducts() {
      var products = Array.from(this.products);

      switch (this.sortMode) {
        case 0:
          return products.sort((a, b) => b.price - a.price);
        case 1:
          return products.sort((a, b) => a.price - b.price);
        case 2:

          return products.sort((a, b) => {
            const timestamp1 = new Date(a.time);
            const timestamp2 = new Date(b.time);

            return timestamp2.getTime() - timestamp1.getTime();
          });
        case 3:
          return products.sort((a, b) => {
            const timestamp1 = new Date(a.time);
            const timestamp2 = new Date(b.time);

            return timestamp1.getTime() - timestamp2.getTime();
          });
        default:
          return products;
      }
    },
    filteredProducts() {
      if (this.searchedValue == "") {
        return this.sortedProducts;
      }
      return this.sortedProducts.filter(product => {
        var c1 = product.name.includes(this.searchedValue);
        var c2 = product.description.includes(this.searchedValue);

        return c1 || c2;
      });
    }
  },
  methods: {
    async userData() {
      this.loading = true;
      await fetch(
        `https://pharmedi.ir/api/account/user_retrieve/${this.$store.state.username}/`
      )
        .then((response) => response.json())
        .then((data) => {
          this.user = data;
        });
      this.loading = false;
      this.$store.commit("getType", this.user.user_type);
      this.$store.commit("getCity", this.user.city);
    },
    async getCategories() {
      this.loading = true;
      await fetch(`https://pharmedi.ir/api/shop/list-categories/`, {
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
          this.categories = data;
        });

      this.loading = false;
    },
    async getCategory() {
      this.loading = true;
      await fetch(`https://pharmedi.ir/api/shop/retrieve-category/${this.$route.params.slug}`, {
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
          this.category = data;
        });

      this.loading = false;
    },
    async getProducts() {
      this.loading = true;
      await fetch(`https://pharmedi.ir/api/shop/${this.$route.params.slug}/list-products/`, {
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
          this.products = data;
        });

      this.loading = false;
    },
    setSortMode(mode) {
      this.sortMode = mode;
    },
  },
};
</script>

<style scoped></style>
