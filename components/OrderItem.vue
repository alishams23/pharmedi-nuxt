<template>
  <div class="shadow-2 bg-white rounded-10 rtl m-2 py-2">
    <nuxt-link :to="'/t/shop/cart/' + orderItem.id">
      <h4 class="irsa text-center my-2">
        {{ status }}
      </h4>
      <hr>
      <div class="justify-content-center flex my-2">
        <p class="irsa">
          <span>{{ calculatedPrice }}</span>
          <span>تومان</span>
        </p>
      </div>
    </nuxt-link>
  </div>
</template>

<script>
export default {
  props: {
    orderItem: {
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
    status() {
      return {
        'processing': 'در حال پردازش',
        'shipped': 'ارسال شده',
        'delivered': 'تحویل داده شده',
        'cancelled': 'لغو شده'
      }[this.orderItem.status]
    },
    calculatedPrice() {
      var price = this.orderItem.cost;

      var FormattedCost = this.getFormattedPrice(price);
      return this.getPersianNumber(FormattedCost);
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