<template>
  <div class="shadow-2 bg-white rounded-10 rtl row">
    <img v-if="product.images.length > 0" :src="product.images[0].image" class="col-5 rounded-10 shadow-3" />

    <div class="col-7 d-flex flex-column">
      <div class="mt-2 text-right mx-2">
        <h4 class="irsa">
          {{ shortName }}
        </h4>
        <p class="text-xs mt-2 my-1 irsa">
          {{ shortDescription }}
        </p>
      </div>

      <div class="mt-auto">
        <div v-if="hasDiscount" class="justify-content-center flex shadow-2 bg-gradient-red">
          <div class="ms-1">
            <p class="text-white text-sm m-0">{{ calculatedDiscount }}</p>
          </div>

          <span class="text-white text-sm" style="text-decoration: line-through;">
            {{ getPersianNumber(getFormattedPrice(product.price)) }}
          </span>
        </div>
        <hr v-if="!hasDiscount">
        <div class="justify-content-center flex py-2">
          <p class="irsa">
            <span>{{ calculatedPrice }}</span>
            <span>تومان</span>
          </p>
        </div>
      </div>
    </div>


  </div>
</template>

<script>
export default {
  props: {
    product: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      loading: false,
    };
  },
  computed: {
    firstImage() {
      return this.product.images[0].image;
    },
    shortName() {
      if (this.product.name.length <= 30) {
        return this.product.name;
      }

      var short_content = this.product.name.substring(0, 30);
      return short_content + "..."
    },
    shortDescription() {
      if (this.product.description.length <= 60) {
        return this.product.description;
      }

      var short_content = this.product.description.substring(0, 60);
      return short_content + "..."
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
    hasDiscount() {
      var FormattedCost = this.getFormattedPrice(this.product.price);
      return this.calculatedPrice != this.getPersianNumber(FormattedCost);
    },
    calculatedDiscount() {
      if (this.product.discount_value != null && this.product.discount_value != 0) {
        if (this.product.discount_type == 'percent') {
          return this.getPersianNumber(this.product.discount_value) + '%';
        } else {
          return this.getPersianNumber(this.product.discount_value) + ' تومان';
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