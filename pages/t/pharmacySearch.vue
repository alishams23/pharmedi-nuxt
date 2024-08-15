<template>
  <div class="container">
    <form class="rtl mx-3" @submit.prevent="searchPharmacy">
      <label for="id_body" class="rtl fs-4 text-treaget irsa">انتخاب داروخانه</label>
      <p class="text-right mt-3 fs-6">منطقه</p>
      <!-- <select class="form-select shadow-none border-bottom rtl py-2" aria-label="Default select example" v-model="city"
        required>
        <option class="text-black" v-for="item in cityList" :key="item.id + 'cityList for option add pharmacy'"
          :value="item.id">{{ item.city_name }}</option>
      </select> -->
      <input v-model="city_name" type="text" class="form-select shadow-none border-bottom rtl py-2" />

      <p class="text-right mt-3 fs-6">نام داروخانه</p>
      <input v-model="name" type="text" class="form-select shadow-none border-bottom rtl py-2" />
      <div v-if="loading == true" class="d-flex flex-column align-items-center">
        <div class="loader-light" />
      </div>
      <button class="px-4 mt-3 py-2 rounded-full py-2 text-white bg-treaget">
        <div v-if="loadingSearch == false">جستجو</div>
        <div v-if="loadingSearch == true" class="d-flex flex-column align-items-center">
          <div class="loader-light" />
        </div>
      </button>
      <nuxt-link v-for="result in pharmacyList" :key="result.id" :to="'/t/addShift/' + result.id"
        class="rounded-13 d-flex justify-content-between bg-white mt-3 px-4 py-3">
        <div class="rtl col-6 px-2">
          نام: داروخانه ی
          {{ result.name }}
        </div>
        <div class="rtl col-6 px-2">
          آدرس:
          {{ result.location }}
        </div>
      </nuxt-link>

      <Empty v-if="showEmpty == true &&
      loadingSearch == false &&
      pharmacyList.length == 0
      " />
    </form>
    <alert class="mt-5 mx-3" link="/t/addPharmacy">
      در صورتی که داروخانه ی مورد نظر خود را نیافتید میتوانید آن را از این بخش
      اضافه کنید.
    </alert>

    <h3 v-if="data.length > 0" class="rtl irsa mt-3 px-3">پیشنهاد ها</h3>
    <nuxt-link v-for="result in data" :key="result.id" :to="'/t/addShift/' + result.id"
      class="rounded-13 d-flex justify-content-between bg-white mt-3 px-4 py-3">
      <div class="rtl col-6 px-2">
        آدرس:
        {{ result.location }}
      </div>
      <div class="rtl col-6 px-2">
        نام: داروخانه ی
        {{ result.name }}
      </div>
    </nuxt-link>
  </div>
</template>

<script>
export default {
  data() {
    return {
      city: null,
      name: null,
      city_name: null,
      loading: false,
      cityList: [],
      pharmacyList: [],
      loadingSearch: false,
      pharmacy: null,
      showEmpty: false,
      data: [],
    };
  },
  watch: {
    date() {
      if (this.date != null) {
        const daySplitted = this.date.split("/");
        const jalaali = require("jalaali-js");
        const d = jalaali.toGregorian(
          parseInt(daySplitted[0]),
          parseInt(daySplitted[1]),
          parseInt(daySplitted[2])
        );
        this.day = `${d.gy}-${d.gm}-${d.gd}`;
      }
    },
    shift_type() {
      if (this.shift_type != null || this.shift_type != "") {
        this.showTime = true;
      } else {
        this.showTime = false;
      }
      if (this.shift_type == "عصر") {
        this.time_start = "14:00";
        this.time_end = "18:00";
      }
      if (this.shift_type == "صبح") {
        this.time_start = "09:00";
        this.time_end = "13:00";
      }
      if (this.shift_type == "ظهر") {
        this.time_start = "14:00";
        this.time_end = "18:00";
      }
      if (this.shift_type == "شب") {
        this.time_start = "18:00";
        this.time_end = "00:00";
      }
    },
  },
  mounted() {
    // this.getDataCity()
    this.getData();
  },
  methods: {
    async searchPharmacy() {
      this.showEmpty = true;
      this.loadingSearch = true;
      await fetch(
        `https://pharmedi.ir/api/account/Search_Pharmacy/?search=${this.name == null ? "" : this.name
        } ${this.city_name == null ? "" : this.city_name}`,
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
        .then((response) => response.json())
        .then((data) => {
          this.loadingSearch = false;
          this.pharmacyList = data;
        });
    },
    getDataCity() {
      this.loading = true;
      fetch("https://pharmedi.ir/api/account/City_list/", {
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
          this.cityList = data;
          this.loading = false;
        });
    },
    getData() {
      fetch("https://pharmedi.ir/api/shift/History_pharmacy/", {
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
          this.data = data;
        });
    },
  },
};
</script>

<style></style>
