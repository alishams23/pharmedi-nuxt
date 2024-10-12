<template>
  <div>
    <div v-if="loading == true" class="d-flex justify-content-center">
      <span class="loader" />
    </div>
    <form v-if="loading == false" @submit.prevent="sendData">
      <div class="grid grid-cols-2 gap-3 lg:p-6 p-4">
        <div class="col-span-2">
          <label for="id_body" class="rtl fs-4 text-treaget mt-5 irsa">
            تنظیمات
          </label>
          <div>
            <label class="d-flex justify-content-center my-4" for="photo">
              <img v-if="data.image_profile" :src="data.image_profile" class="w-20 h-20 rounded-pill cover" alt="" />
              <img v-else src="@/assets/inside/avatar.jpg" class="w-20 h-20 rounded-pill" alt="" />
            </label>
          </div>
          <div class="mt-2">
            <div class="d-flex justify-content-center align-items-center d-none">
              <div>تغییر عکس پروفایل</div>
              <div>
                <input id="photo" type="file" accept="image/*" class="form-control shadow-none border-none mt-3 rtl"
                  name="photo" @change="changePhoto($event)" />
              </div>
            </div>
          </div>

          <div class="row">
            <div class="col-md-6 col-sm-12 col-6">
              <p class="text-right mt-3 fs-6">نام خانوادگی</p>
              <input v-model="data.last_name" required type="text"
                class="shadow-none rtl px-2 bg-white border-bottom" />
            </div>
            <div class="col-md-6 col-sm-12 col-6">
              <p class="text-right mt-3 fs-6">نام</p>
              <input v-model="data.first_name" required type="text"
                class="shadow-none rtl px-2 bg-white border-bottom" />
            </div>
            <div class="col-12">
              <p class="text-right mt-3 fs-6">نوع کاربری</p>
              <select v-model="data.user_type" class="form-select rtl shadow-none border-bottom py-2"
                aria-label="Default select example">
                <option value="N">کاربر عادی</option>
                <option value="S">دانشجو دارای نامه ی ۱۸۰ واحدی</option>
                <option value="P">داروساز فارغ التحصیل</option>
                <option value="T">تکنسین</option>
                <option value="H">مؤسس داروخانه</option>
              </select>
              <p class="text-right mt-3 fs-6">منطقه</p>
              <select v-model="data.city" class="form-select shadow-none border-bottom rtl py-2"
                aria-label="Default select example" required>
                <option v-for="item in city" :key="item.id + 'city for option add pharmacy'" class="text-black"
                  :value="item.id">
                  {{ item.city_name }}
                </option>
              </select>

              <p class="text-right mt-3 fs-6">توضیحات عمومی</p>
              <textarea v-model="data.bio" type="text" class="shadow-none rtl px-2 bg-white border-bottom" />
              <p v-if="data.user_type != 'P'" class="text-right mt-3 fs-6">
                سابقه کار
              </p>
              <textarea v-if="data.user_type != 'P'" v-model="data.history_work" type="text"
                class="shadow-none rtl px-2 bg-white border-bottom" />
              <p v-if="data.user_type != 'P'" class="text-right mt-3 fs-6">
                با کدام یک از نرم افزار های مدیریت داروخانه آشنایی دارید؟
              </p>
              <textarea v-if="data.user_type != 'P'" v-model="data.software_scale" type="text"
                class="shadow-none rtl px-2 bg-white border-bottom" />

              <div class="row justify-content-start rtl">
                <div class="col-10">

                  <div v-if="data.user_type != 'P'" class="col-md-6 col-12  rtl">
                    <div class="d-flex col-12 d-flex-row">
                      <div class="text-right mt-3 fs-6 col-12">
                        تسلط به مشاوره فرآورده های آرایشی
                      </div>
                      <input v-model="data.attire_advice" type="checkbox"  />
                    </div>
                  </div>
                  <div v-if="data.user_type == 'P'" class="col-md-6 col-12  rtl">
                    <div class="d-flex col-12 d-flex-row">
                      <div class="text-right mt-3 fs-6 col-12">
                        تجربه کار در داروخانه های شبانه روزی
                      </div>
                      <input v-model="data.night_shift" type="checkbox"  />
                    </div>
                  </div>
                  <div v-if="data.user_type != 'P'" class="col-md-6 col-12  rtl">
                    <div class="d-flex col-12 d-flex-row">
                      <div class="text-right mt-3 fs-6 col-12">
                        آشنایی با نسخ الکترونیک
                      </div>
                      <input v-model="data.electronic_prescription" type="checkbox"  />
                    </div>
                  </div>


                  <div class="col-md-6 col-12  rtl">
                    <div class="d-flex col-12 d-flex-row">
                      <div class="text-right mt-3 fs-6 col-12">
                        جویای کار هستم
                      </div>
                      <input v-model="data.looking_for_job" type="checkbox" />
                    </div>
                  </div>

                </div>
              </div>





            </div>
          </div>

          <div v-if="lookingForJob">
            <p class="text-right mt-3 fs-6">توضیحات کارجویی</p>
            <textarea v-model="data.looking_for_job_description" type="text"
              class="shadow-none rtl px-2 bg-white border-bottom" />
          </div>


          <div class="rtl px-4 py-3">
            <button
              class="px-4 py-2 rounded-full py-2 text-white bg-treaget irsa btn-material btn-animation btn-animation-shadow">
              <div v-if="sendLoading == false">ارسال</div>
              <div v-if="sendLoading == true" class="d-flex flex-column align-items-center">
                <div class="loader-light" />
              </div>
            </button>
          </div>
        </div>
      </div>

      <div class="treaget-modal treaget-modal-product-check rtl" :class="modal ? 'open' : ''">
        <div class="treaget-modal-overlay" />
        <div class="treaget-modal-card">
          <div class="treaget-modal-body">
            <div class="treaget-modal-content fs-5">
              <div class="d-flex justify-content-center">
                <span class="loader" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </form>
  </div>
</template>

<script>
import axios from "axios";
export default {
  data() {
    return {
      data: {},
      loading: true,
      sendLoading: false,
      image: null,
      fd: null,
      city: null,
      modal: false,
    };
  },
  mounted() {
    this.getCity();
    this.getData();
  },
  computed: {
    lookingForJob() {
      return this.data.looking_for_job;
    },
  },
  methods: {
    getCity() {
      fetch("http://127.0.0.1:8000/api/account/City_list/", {
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
          this.city = data;
          this.loading = false;
        });
    },
    async getData() {
      this.loading = true;
      await fetch(
        `http://127.0.0.1:8000/api/account/User_settings/${this.$store.state.username}/`,
        {
          method: "put",
          credentials: "same-origin",
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
    async sendData() {
      this.sendLoading = true;
      this.fd = new FormData();
      this.fd.append("first_name", this.data.first_name);
      this.fd.append("last_name", this.data.last_name);
      this.fd.append("user_type", this.data.user_type);
      this.fd.append("city", this.data.city);
      this.fd.append("bio", this.data.bio);
      this.fd.append("history_work", this.data.history_work);
      this.fd.append("software_scale", this.data.software_scale);
      this.fd.append("looking_for_job", this.data.looking_for_job);
      this.fd.append("looking_for_job_description", this.data.looking_for_job_description);
      this.fd.append("night_shift", this.data.night_shift);
      this.fd.append(
        "electronic_prescription",
        this.data.electronic_prescription
      );
      this.fd.append("attire_advice", this.data.attire_advice);
      if (this.image != null) {
        this.fd.append("image_profile", this.image);
      }

      await axios
        .put(
          `http://127.0.0.1:8000/api/account/User_settings/${this.$store.state.username}/`,
          this.fd,
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
        .then((response) => {
          this.sendLoading = false;
          window.location.reload();
        })
        .catch(function (error) {
          if (error.response) {
            console.log(error.response.data);
            console.log(error.response.status);
            console.log(error.response.headers);
          }
        });
    },
    changePhoto(event) {
      this.image = event.target.files[0];
      this.modal = true;
      this.sendData();
    },
  },
};
</script>

<style></style>
