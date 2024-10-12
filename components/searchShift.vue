<template>
  <div>
    <div class="d-flex justify-content-end rtl align-items-center my-3 mx-3">
      <div class="d-flex">
        <button @click="modal = true"
          class="text-xs px-4 h-8 py-0 d-flex align-items-center rounded-pill fw-bold bg-treaget text-white shadow-2">
          <div class="px-3">فیلتر</div>
          <i class="fa fa-filter"></i>
        </button>
      </div>
    </div>
    <shift v-for="item in data" :key="item.id + 'shift in search shift'" :data="item" v-show="loading == false" />
    <div class="flex justify-center mt-6" v-if="loading == true">
      <span class="loader"></span>
    </div>
    <alert class="mt-5" v-if="data.length == 0">چیزی برای نمایش وجود ندارد</alert>
    <div class="treaget-modal treaget-modal-product-check rtl" :class="modal ? 'open' : ''">
      <div class="treaget-modal-overlay" @click="modal = false"></div>
      <div class="treaget-modal-card">
        <div class="treaget-modal-body">
          <div class="treaget-modal-content fs-5">
            <select v-model="city_selected"
              class="px-4 h-8 py-0 text-xs rounded-full bg-gray-100 shadow-1 border-bottom px-2"
              aria-label="Default select example">
              <option class="text-black" value="">شهر</option>
              <option class="text-black" v-for="item in city" :key="item.id + 'city for option add pharmacy'"
                :value="item.id">
                {{ item.city_name }}
              </option>
            </select>

            <div
              class="col-12 custom-input text-xs px-4 h-8 py-0 d-flex align-items-center rounded-pill fw-bold bg-gray-100 shadow-1 border-bottom px-2 mb-3 text-muted">
              {{ day == null ? "روز" : day }}
            </div>
            <date-picker v-model="day" custom-input=".custom-input"></date-picker>
            <select v-model="shift_selected"
              class="px-4 h-8 py-0 text-xs rounded-full bg-gray-100 shadow-1 border-bottom px-2"
              aria-label="Default select example">
              <option class="text-black" value="">شیفت</option>
              <option class="text-black" value="صبح">صبح</option>
              <option class="text-black" value="ظهر">ظهر</option>
              <option class="text-black" value="عصر">عصر</option>
              <option class="text-black" value="شب">شب</option>
            </select>
            <select v-model="time_status"
              class="px-4 h-8 py-0 text-xs rounded-full bg-gray-100 shadow-1 border-bottom px-2"
              aria-label="Default select example">
              <option class="text-black" value="">نوع</option>
              <option class="text-black" value="s">ثابت</option>
              <option class="text-black" value="u">فوریتی</option>
            </select>
            <div v-if="day != null ||
          shift_selected != '' ||
          city_selected != '' ||
          time_status != ''
          " @click="
          day = null;
        shift_selected = '';
        city_selected = '';
        dayApi = null;
        time_status = '';
        " class="text-xs px-5 h-8 py-0 d-flex align-items-center rounded-pill text-white fw-bold bg-danger shadow-2">
              حذف
            </div>
          </div>
          <div class="treaget-modal-footer">
            <button class="bg-treaget rounded-pill px-3 py-1" @click="modal = false">
              مخفی کردن
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ["text"],
  data() {
    return {
      data: [],
      modal: false,
      page: 1,
      error: "",
      loading: false,
      time_status: "",
      city_selected: "",
      shift_selected: "",
      day: null,
      dayApi: null,
      city: [],
    };
  },
  methods: {
    getData() {
      this.loading = true;
      fetch(
        `https://pharmedi.ir/api/shift/Search_shift/?search=${this.text
        }&pharmacy__city=${this.city_selected == null ? "" : this.city_selected
        }&shift_type=${this.shift_selected}&time_status=${this.time_status
        }&day=${this.dayApi == null ? "" : this.dayApi}`,
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
          this.data = data;
          this.loading = false;
        });
    },
    getDataCity() {
      fetch(`https://pharmedi.ir/api/account/City_list/`, {
        headers: {
          "Content-type": "application/json",
          Accept: "application/json",
        },
      })
        .then((response) => response.json())
        .then((data) => {
          this.city = data;
        });
    },
  },
  watch: {
    text() {
      this.getData();
    },
    city_selected() {
      if (this.loading == false) this.getData();
    },
    shift_selected() {
      if (this.loading == false) this.getData();
    },
    time_status() {
      if (this.loading == false) this.getData();
    },
    day() {
      if (this.day != null) {
        let daySplitted = this.day.split("/");
        var jalaali = require("jalaali-js");
        let d = jalaali.toGregorian(
          parseInt(daySplitted[0]),
          parseInt(daySplitted[1]),
          parseInt(daySplitted[2])
        );
        this.dayApi = `${d.gy}-${d.gm}-${d.gd}`;
      }
      if (this.loading == false) this.getData(1);
    },
  },
  mounted() {
    this.getData();
    this.getDataCity();
  },
};
</script>

<style></style>
