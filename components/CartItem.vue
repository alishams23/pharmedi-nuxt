<template>
  <div class="shadow-2 bg-white rounded-10 rtl row">
    <div class="col-5">
      <nuxt-link :to="'/t/shop/products/' + cartItem.product.id" class="p-0 m-0">
        <img :src="cartItem.product.images[0].image" class="rounded-10 shadow-3" />
      </nuxt-link>
    </div>

    <div class="col-7 d-flex flex-column">
      <div class="my-2 text-right">
        <h4 class="irsa">
          {{ shortName }}
        </h4>
      </div>

      <div class="mt-auto">
        <!-- <div data-mdb-input-init class="form-outline row mb-1">
          <label class="form-label text-xs col" for="typeNumber">تعداد</label>
          <input type="number" min="1" id="typeNumber" class="form-control col" :value="cartItem.quantity" />
        </div> -->

        <CartItemQuantity class="mx-3 my-1 mb-2" :cartItem="cartItem" :editable="editable" />

        <hr>
        <div class="justify-content-center flex py-2">
          <p class="irsa">
            <span v-if="hasDiscount" class="text-sm ms-2" style="text-decoration: line-through;">
              {{ getPersianNumber(getFormattedPrice(cartItem.product.price)) }}
            </span>
            <span>{{ calculatedPrice }}</span>
            <span>تومان</span>
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import CartItemQuantity from "./CartItemQuantity.vue";

export default {
  props: {
    cartItem: {
      type: Object,
      required: true,
    },
    editable: {
      type: Boolean,
      required: true,
    },
  },
  components: {
    CartItemQuantity,
  },
  data() {
    return {
      loading: false,
    };
  },
  computed: {
    firstImage() {
      return this.cartItem.product.images[0].image;
    },
    shortName() {
      if (this.cartItem.product.name.length <= 30) {
        return this.cartItem.product.name;
      }

      var short_content = this.cartItem.product.name.substring(0, 30);
      return short_content + "..."
    },
    calculatedPrice() {
      var price = this.cartItem.product.price;

      if (this.cartItem.product.discount_value != null && this.cartItem.product.discount_value != 0) {
        if (this.cartItem.product.discount_type == 'percent') {
          price = this.cartItem.product.price - (this.cartItem.product.price * this.cartItem.product.discount_value / 100);
        } else {
          price = this.cartItem.product.price - this.cartItem.product.discount_value;
        }
      }

      var FormattedCost = this.getFormattedPrice(price);
      return this.getPersianNumber(FormattedCost);
    },
    hasDiscount() {
      var FormattedCost = this.getFormattedPrice(this.cartItem.product.price);
      return this.calculatedPrice != this.getPersianNumber(FormattedCost);
    },
    calculatedDiscount() {
      if (this.cartItem.product.discount_value != null && this.cartItem.product.discount_value != 0) {
        if (this.cartItem.product.discount_type == 'percent') {
          return this.getPersianNumber(this.cartItem.product.discount_value) + '%';
        } else {
          return this.getPersianNumber(this.cartItem.product.discount_value) + ' تومان';
        }
      }

      return null;
    },
  },
  methods: {
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