<template>



  <div>

    <ShopSectionSweaperHeader></ShopSectionSweaperHeader>
    <div class="mb-3">
      <ShopSectionSearch>
      </ShopSectionSearch>
    </div>
    <div>
      <ShopSectionCategories />
    </div>
    <ShopSectionSweaperProducts></ShopSectionSweaperProducts>
    <ShopSectionSweaperDiscountedCard />
    <ShopSectionSweaperBestSellingProductsCard />

  </div>
</template>

<script>
import ProductItem from "~/components/ProductItem.vue";

export default {
  data() {
    return {
      loading: false,
      user: {},

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
    this.getProducts();
    this.getCategories();
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
    },
    isPhysicalSelected() {

    },
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
    async getProducts() {
      this.loading = true;
      await fetch(`https://pharmedi.ir/api/shop/list-products/`, {
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

<style>
.w-auto.swiper-slide {
  width: auto !important;
}
</style>
