<template>
  <div class="text-right bg-white rounded-10 my-3 p-3 m-2">
    <div class="rtl">
      <div class="flex justify-between items-center mb-4">
        <div class="d-flex flex-1 align-items-center space-x-4">
          <div>
            <h4 class="irsa">{{ persianNumber(transaction.amount) }} تومان</h4>
            <p class="text-muted text-xs">
              {{ transaction.jalaliTime }}
            </p>
          </div>
        </div>
      </div>
    </div>

    <div class="bg-gray-50 rounded-13 p-3 mx-1">
      <p class="text-muted text-xs">شماره کارت:</p>

      <p class="text-muted text-xs" style="direction: ltr">
        {{ cardNumber }}
      </p>

      <p class="text-muted text-xs">
        شماره تراکنش:
        {{ persianNumber(transaction.refID) }}
      </p>
      <p class="text-muted text-xs">
        کد تراکنش:
        {{ persianNumber(transaction.code) }}
      </p>
      <p class="text-muted text-xs">
        کارمزد:
        {{ persianNumber(transaction.fee) }} تومان
      </p>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    transaction: {
      type: Object,
      required: true,
    },
  },
  computed: {
    cardNumber() {
      var value = this.transaction.cardPan;
      var chunks = value.match(/.{1,4}/g);
      chunks = chunks ? chunks.join("-") : "";

      return this.persianNumber(chunks);
    },
  },
  methods: {
    persianNumber(number) {
      if (number == null) {
        number = "";
      }

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
  },
};
</script>

<style scoped>
.badge {
  display: block;
  padding: 0.25em 0.4em;
  font-size: 75%;
  font-weight: 700;
  line-height: 1;
  text-align: center;
  white-space: nowrap;
  border-radius: 0.25rem;
}

.badge-success {
  color: #fff;
  background-color: #28a745;
}

.badge-success[href]:focus,
.badge-success[href]:hover {
  color: #fff;
  text-decoration: none;
  background-color: #1e7e34;
}

.expired {
  color: red !important;
}
</style>
