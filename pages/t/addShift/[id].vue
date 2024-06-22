<template>
  <div class="container">
    <form @submit.prevent="sendData">
      <div class="p-4">
        <div>
          <label for="id_body" class="rtl fs-4 text-treaget irsa">افزودن درخواست شیفت</label>
          <p class="text-right mt-3 fs-6">:نیازمند</p>
          <select v-model="category_choices" required class="form-select shadow-none border-bottom rtl py-2">
            <option value="P">مسئول فنی داروساز</option>
            <option value="V">قائم مقام داروساز</option>
            <!-- <option value="H">مؤسس داروخانه</option> -->
            <option value="C">مؤسس و مسئول فنی</option>
            <option value="T">تکنسین</option>
            <option value="S">کارآموز</option>
          </select>
          <p v-if="category_choices != 'T' &&
      category_choices != 'S' &&
      category_choices != 'c' &&
      category_choices != 'H'
      " class="text-right mt-3 fs-6">
            نوع شیفت
          </p>
          <select v-if="category_choices != 'T' &&
      category_choices != 'S' &&
      category_choices != 'H' &&
      category_choices != 'C'
      " v-model="time_status" required class="form-select shadow-none border-bottom rtl py-2"
            aria-label="Default select example">
            <option value="s">ثابت</option>
            <option value="u">فوریتی</option>
            <option value="c">ترکیبی یا چند روزه</option>
          </select>
          <p v-if="time_status != 'c' && category_choices != 'H'" class="text-right mt-3 fs-6">
            زمان شیفت
          </p>
          <select v-if="time_status != 'c' && category_choices != 'H'" v-model="shift_type" required
            class="form-select shadow-none border-bottom rtl py-2" aria-label="Default select example">
            <option value="صبح">صبح</option>
            <option value="ظهر">ظهر</option>
            <option value="عصر">عصر</option>
            <option value="شب">شب</option>
          </select>

          <div v-if="showTime == true" class="d-flex flex-row">
            <div class="col-6 px-1">
              <p class="text-right mt-3 fs-6">انتخاب ساعت پایان</p>
              <input v-model="time_end" type="text"
                class="form-select shadow-none border-bottom rtl custom-input-time-end py-2" />
              <div class="d-flex align-items-center justify-content-center">
                <date-picker v-model="time_end" type="time" custom-input=".custom-input-time-end" />
              </div>
            </div>
            <div class="col-6 px-1">
              <p class="text-right mt-3 fs-6">انتخاب ساعت شروع</p>
              <input v-model="time_start" type="text"
                class="form-select shadow-none border-bottom rtl custom-input-time-start py-2" />
              <div class="d-flex align-items-center justify-content-center">
                <date-picker v-model="time_start" type="time" custom-input=".custom-input-time-start" />
              </div>
            </div>
          </div>

          <p v-if="time_status == 'u' && category_choices != 'H'" class="text-right mt-3 fs-6">
            انتخاب روز
          </p>
          <input v-if="time_status == 'u'" type="text"
            class="form-select shadow-none border-bottom rtl custom-input py-2" />
          <div class="d-flex align-items-center justify-content-center">
            <date-picker v-model="date" custom-input=".custom-input" />
          </div>

          <p class="text-right mt-3 fs-6">مبلغ</p>
          <select v-model="price_choices" required class="form-select shadow-none border-bottom rtl py-2"
            aria-label="Default select example">
            <option value="a">توافقی</option>
            <option v-if="category_choices != 'S' && category_choices != 'T'" value="s">
              طبق تعرفه
            </option>
            <option value="n">عدد</option>
          </select>
          <p v-if="price_choices == 'n'" class="text-right mt-3 fs-6">
            (تومان) مبلغ ساعتی
          </p>
          <input v-if="price_choices == 'n'" v-model="payment" type="number"
            class="form-select shadow-none border-bottom rtl py-2" />
          <div class="d-flex bg-white rounded-13 px-3 justify-content-between align-items-center d-flex-row my-2"
            v-if="category_choices == 'V'">
            <input v-model="immediate" type="checkbox" class="col-1" id="immediate" />
            <label for="immediate" class="mt-3 text-black fs-6 col-11">
              <div class="rtl col-12 text-right">فوری</div>
            </label>
          </div>
          <div class="d-flex bg-white rounded-13 px-3 justify-content-between align-items-center d-flex-row my-2"
            v-if="category_choices == 'V'">
            <input v-model="with_card" type="checkbox" class="col-1" id="with_card" />
            <label for="with_card" class="mt-3 text-black fs-6 col-11">
              <div class="rtl col-12 text-right">
                فقط داروساز دارای کارت نظام
              </div>
            </label>
          </div>
          <div class="d-flex bg-white rounded-13 px-3 justify-content-between align-items-center d-flex-row my-2">
            <input v-model="is_pharmacy_name" type="checkbox" class="col-1" id="is_pharmacy_name" :true-value="false"
              :false-value="true" />
            <label for="is_pharmacy_name" class="mt-3 text-black fs-6 col-11">
              <div class="rtl col-12 text-right">
                ثبت شیفت بدون ذکر نام داروخانه
              </div>
            </label>
          </div>

          <p class="text-right mt-3 fs-6">توضیحات</p>

          <textarea id="" v-model="detail" class="form-select shadow-none border-bottom rtl py-2" name="" cols="30"
            rows="10" />
          <div class="rtl m-4">
            <button type="submit" class="px-4 py-2 rounded-full py-2 text-white bg-treaget irsa">
              <div v-if="loading == false">ارسال</div>
              <div v-if="loading == true" class="d-flex flex-column align-items-center">
                <div class="loader-light" />
              </div>
            </button>
          </div>
        </div>
      </div>
    </form>
    <div class="treaget-modal treaget-modal-product-check rtl">
      <div class="treaget-modal-overlay" @click="closeModal()" />
      <div class="treaget-modal-card">
        <div class="treaget-modal-body">
          <div class="treaget-modal-content fs-5">موفقیت آمیز بود</div>
          <div class="treaget-modal-footer">
            <div class="d-flex">
              <button class="bg-white py-2 border rounded-pill px-4" @click="closeModal()">
                بستن
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      loading: false,
      immediate: false,
      with_card: false,
      is_pharmacy_name: true,
      loadingStart: true,
      error: null,
      shift_type: null,
      category_choices: "S",
      day: null,
      payment: null,
      date: null,
      time_status: null,
      detail: null,
      showTime: false,
      time_start: null,
      time_end: null,
      price_choices: null,
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
        this.time_start = "18:00";
        this.time_end = "00:00";
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
        this.time_start = "00:00";
        this.time_end = "08:00";
      }
    },
    category_choices() {
      if (this.category_choices == "T" || this.category_choices == "S") {
        this.time_status = null;
      }
      if (this.category_choices == "H") {
        // TODO:fill it
      }
    },
    time_status() {
      if (this.time_status == "c") {
        this.shift_type = null;
      }
    },
  },
  methods: {
    async sendData() {
      this.loading = true;
      await axios
        .post(
          "http://127.0.0.1:8000/api/shift/create_request_shift/",
          {
            day: this.day,
            category_choices: this.category_choices,
            shift_type: this.shift_type,
            payment: this.payment,
            time_status: this.time_status,
            detail: this.detail,
            time_start: this.time_start,
            time_end: this.time_end,
            pharmacy: this.$route.params.id,
            price_choices: this.price_choices,
            immediate: this.immediate,
            with_card: this.with_card,
            is_pharmacy_name: this.is_pharmacy_name,
          },
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
        .catch(function (error) {
          if (error.response) {
            console.log(error.response.data);
            console.log(error.response.status);
            console.log(error.response.headers);
          }
        })
        .then((response) => {
          this.$router.push("/t/login");
        });

      this.loading = false;
    },
  },
};
</script>

<style></style>
