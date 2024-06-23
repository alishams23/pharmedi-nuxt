<template>
  <div>
    <div class="rtl">
      <div class="row bg-treaget rounded-2xl shadow-lg p-3 ms-3 me-1">
        <div class="col-11">
          <h2 class="irsa text-white mb-2">کیف پول</h2>
          <p class="text-xs">نام: {{ user.get_full_name }}</p>
          <p>اعتبار: {{ getCashValue(user.cash) }} ریال</p>
        </div>
      </div>
      <div class="row ps-3 pe-2 mt-3">
        <div class="col-12">
          <h3 class="irsa mb-2">افزایش اعتبار</h3>
          <input v-model="amount" type="number" />
          <p class="text-danger text-xs mt-2" v-if="amountError">
            خطا! مبلغ وارد شده کمتر از ۱,۰۰۰ تومان است.
          </p>
          <button @click="increaseCredit()" class="mt-2 rounded-full bg-treaget pt-1 pb-1 ps-2 pe-2 text-center irsa">
            پرداخت
          </button>
        </div>
      </div>

      <hr class="hr m-3" />

      <div class="row ms-1">
        <div class="col-12">
          <h3 class="irsa mb-3">سفارشات</h3>

          <OrderItem class="col-12" v-for="order in this.orders" :key="order.id" :orderItem="order" />
          <!-- <WorkStationItem v-for="workstation in this.purchased" :key="workstation.id" :workstation="workstation" /> -->
        </div>

        <div class="col-12">
          <h3 class="irsa mt-3">سوابق تراکنش</h3>

          <TransactionItem v-for="transaction in this.transactions" :key="transaction.id" :transaction="transaction" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// import WorkStationItem from "~/components/WorkstationItem.vue";
import OrderItem from "~/components/OrderItem.vue";
import TransactionItem from "~/components/TransactionItem.vue";

export default {
  data() {
    return {
      amount: 0,
      amountError: false,
      loading: false,
      user: {},
      orders: [],
      transactions: [],
    };
  },
  components: {
    // WorkStationItem,
    OrderItem,
    TransactionItem,
  },
  mounted() {
    this.userData();
    this.getTransactions();
    this.getOrders();
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
    async increaseCredit() {
      if (this.amount < 1000) {
        this.amountError = true;
        return;
      } else {
        if (this.amountError != false) {
          this.amountError = false;
        }
      }

      this.loading = true;
      await fetch(`https://pharmedi.ir/api/wallet/increase-money/`, {
        method: "POST",
        headers: {
          "Content-type": "application/json",
          Accept: "application/json",
          Authorization:
            this.$store.state.token != ""
              ? `Token ${this.$store.state.token}`
              : "",
        },
        body: JSON.stringify({
          amount: this.amount * 10,
        }),
      })
        .then((response) => {
          if (response.status == 200) {
            return response.json();
          } else {
            return '';
          }
        })
        .then((data) => {
          if (data != '') {
            window.open(data["result"]);
          }
        });
      this.loading = false;
    },
    async getTransactions() {
      this.loading = true;
      await fetch(`https://pharmedi.ir/api/wallet/list-transactions/`, {
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
          this.transactions = data;
        });

      this.loading = false;
    },
    async getOrders() {
      this.loading = true;
      await fetch(`https://pharmedi.ir/api/shop/list-orders/`, {
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
          this.orders = data;
        });

      this.loading = false;
    },
    getCashValue(cash) {
      var value = 0;
      if (cash) {
        value = cash;
      }

      return this.convertToPersianNumber(value);
    },
    convertToPersianNumber(number) {
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
.box {
  padding: 20px;
  margin-top: 20px;
  /* width: 90%; */
  width: 300px;
}

.invalid-feedback {
  color: rgb(187, 0, 0);
  margin-top: 5;
  margin-right: 10px;
}

.card-hover {
  transition: transform 0.3s ease;
}

.card-hover:hover {
  transform: scale(1.05);
}

.card-hover:active {
  transform: scale(0.9);
}

.badge {
  display: inline-block;
  padding: 0.25em 0.4em;
  font-size: 75%;
  font-weight: 700;
  line-height: 1;
  text-align: center;
  white-space: nowrap;
  vertical-align: baseline;
  border-radius: 0.25rem;
}

.btn .badge {
  position: relative;
  top: -1px;
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

.badge-danger {
  color: #fff;
  background-color: #dc3545;
}

.badge-danger[href]:focus,
.badge-danger[href]:hover {
  color: #fff;
  text-decoration: none;
  background-color: #bd2130;
}

.badge-secondary {
  color: #fff;
  background-color: #6c757d;
}

.badge-secondary[href]:focus,
.badge-secondary[href]:hover {
  color: #fff;
  text-decoration: none;
  background-color: #545b62;
}
</style>
