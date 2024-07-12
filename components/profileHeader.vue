<template>
  <div>
    <div class="flex lg:flex-row flex-col justify-content-between lg:py-8 lg:space-x-8 px-3">
      <div class="d-flex justify-content-center">
        <nuxt-link :to="data.username == this.$store.state.username ? '/t/setting' : ''"
          class="from-yellow-600 to-pink-600 rounded-pill shadow-1 relative overflow-hidden"
          style="width: 130px; height: 130px">
          <img :src="data.image_profile" v-if="data.image_profile != null" class="cover rounded-pill"
            style="width: 130px; height: 130px" />
          <img src="@/assets/inside/avatar.jpg" v-else alt />
        </nuxt-link>
      </div>
      <div class="lg:w/8/12 flex-column d-flex align-items-end">
        <h2 class="font-semibold mt-3 lg:text-2xl text-lg mb-2 irsa d-flex">
          <!-- TODO:add special user -->
          <span class>{{ data.get_full_name }}</span>
        </h2>
        <p v-if="data.is_superuser == false" class="text-right mb-2 text-sm dark:text-gray-100 irsa">
          {{
          data.user_type == "N"
            ? "کاربر عادی"
            : data.user_type == "S"
              ? "دانشجو"
              : data.user_type == "P"
                ? "دکتر داروساز"
                : data.user_type == "T"
                  ? "تکنسین داروخانه"
                  : data.user_type == "H"
                    ? "مدیر داروخانه"
                    : ""
        }}
        </p>
        <div v-if="data.city" class="py-2 d-flex justify-content-between align-items-center text-sm" href>
          <div class="text-sm mx-1">{{ data.city.city_name }}</div>

          <svg width="22px" height="22px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path opacity="0.5"
              d="M19.7165 20.3624C21.143 19.5846 22 18.5873 22 17.5C22 16.3475 21.0372 15.2961 19.4537 14.5C17.6226 13.5794 14.9617 13 12 13C9.03833 13 6.37738 13.5794 4.54631 14.5C2.96285 15.2961 2 16.3475 2 17.5C2 18.6525 2.96285 19.7039 4.54631 20.5C6.37738 21.4206 9.03833 22 12 22C15.1066 22 17.8823 21.3625 19.7165 20.3624Z"
              fill="#1C274C" />
            <path fill-rule="evenodd" clip-rule="evenodd"
              d="M5 8.51464C5 4.9167 8.13401 2 12 2C15.866 2 19 4.9167 19 8.51464C19 12.0844 16.7658 16.2499 13.2801 17.7396C12.4675 18.0868 11.5325 18.0868 10.7199 17.7396C7.23416 16.2499 5 12.0844 5 8.51464ZM12 11C13.1046 11 14 10.1046 14 9C14 7.89543 13.1046 7 12 7C10.8954 7 10 7.89543 10 9C10 10.1046 10.8954 11 12 11Z"
              fill="#1C274C" />
          </svg>
        </div>

        <div class="bg-treaget shadow-2 px-3 fs-7 py-1 m-2 rounded-10 d-flex align-items-center border"
          v-if="data.looking_for_job == true">
          <div>جویای کار هستم</div>
          <i class="fa ml-2 fa-check"></i>
        </div>
        <p v-if="data.looking_for_job == true" class="text-right px-3 m-2 text-sm dark:text-gray-100 irsa">
          {{ data.looking_for_job_description }}
        </p>
        <p v-if="data.is_superuser == true" class="text-right mb-2 text-sm text-muted dark:text-gray-100 irsa">
          مدیریت سایت
        </p>
        <p class="text-right fs-6 irsa" v-if="data.bio && data.bio != 'null'">
          توضیحات عمومی:
          {{ data.bio }}
        </p>
        <p class="text-right fs-6 irsa" v-if="data.history_work && data.history_work != 'null'">
          سابقه کار:
          {{ data.history_work }}
        </p>
        <p class="text-right fs-6 irsa" v-if="data.software_scale && data.software_scale != 'null'">
          آشنایی با نرم افزار های مدیریت داروخانه:
          {{ data.software_scale }}
        </p>
        <div class="d-flex flex-wrap justify-content-end">
          <div class="bg-white shadow-2 px-3 fs-7 py-1 m-2 rounded-10 d-flex align-items-center"
            v-if="data.night_shift">
            <div>تجربه کار در داروخانه های شبانه روزی</div>
            <i class="fa ml-2 fa-check"></i>
          </div>
          <div class="bg-white shadow-2 px-3 fs-7 py-1 m-2 rounded-10 d-flex align-items-center"
            v-if="data.electronic_prescription">
            <div>آشنایی با نسخ الکترونیک</div>
            <i class="fa ml-2 fa-check"></i>
          </div>
          <div class="bg-white shadow-2 px-3 fs-7 py-1 m-2 rounded-10 d-flex align-items-center"
            v-if="data.attire_advice">
            <div>تسلط به مشاوره فرآورده های آرایشی</div>
            <i class="fa ml-2 fa-check"></i>
          </div>
        </div>
        <div
          class="d-flex justify-content-end align-items-center flex-wrap font-semibold space-x-3 text-center text-sm my-2">
          <div class="drop -color-lighter drop--down">
            <button>
              <a href="#"
                class="my-1 btn-shadow-black btn-animation bg-white flex items-center justify-center rounded-pill text-xl p-2">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                  class="bi bi-chevron-down" viewBox="0 0 16 16">
                  <path fill-rule="evenodd"
                    d="M1.646 4.646a.5.5 0 0 1 .708 0L8 10.293l5.646-5.647a.5.5 0 0 1 .708.708l-6 6a.5.5 0 0 1-.708 0l-6-6a.5.5 0 0 1 0-.708z" />
                </svg>
              </a>
            </button>

            <div class="drop__content -transition-slide-in" style="z-index: 9999">
              <div class="drop-list -size-large -position-left -border-rounded">
                <button class="drop-list__btn py-2" v-if="data.username != this.$store.state.username">
                  <a :href="'https://wa.me/098' + data.phone_number"
                    class=" d-flex mx-3 justify-content-between align-items-center text-green-500">
                    <svg width="15px" height="15px" viewBox="0 0 48 48" version="1.1" xmlns="http://www.w3.org/2000/svg"
                      xmlns:xlink="http://www.w3.org/1999/xlink">
                      <g id="Icons" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
                        <g id="Color-" transform="translate(-700.000000, -360.000000)" fill="#67C15E">
                          <path
                            d="M723.993033,360 C710.762252,360 700,370.765287 700,383.999801 C700,389.248451 701.692661,394.116025 704.570026,398.066947 L701.579605,406.983798 L710.804449,404.035539 C714.598605,406.546975 719.126434,408 724.006967,408 C737.237748,408 748,397.234315 748,384.000199 C748,370.765685 737.237748,360.000398 724.006967,360.000398 L723.993033,360.000398 L723.993033,360 Z M717.29285,372.190836 C716.827488,371.07628 716.474784,371.034071 715.769774,371.005401 C715.529728,370.991464 715.262214,370.977527 714.96564,370.977527 C714.04845,370.977527 713.089462,371.245514 712.511043,371.838033 C711.806033,372.557577 710.056843,374.23638 710.056843,377.679202 C710.056843,381.122023 712.567571,384.451756 712.905944,384.917648 C713.258648,385.382743 717.800808,392.55031 724.853297,395.471492 C730.368379,397.757149 732.00491,397.545307 733.260074,397.27732 C735.093658,396.882308 737.393002,395.527239 737.971421,393.891043 C738.54984,392.25405 738.54984,390.857171 738.380255,390.560912 C738.211068,390.264652 737.745308,390.095816 737.040298,389.742615 C736.335288,389.389811 732.90737,387.696673 732.25849,387.470894 C731.623543,387.231179 731.017259,387.315995 730.537963,387.99333 C729.860819,388.938653 729.198006,389.89831 728.661785,390.476494 C728.238619,390.928051 727.547144,390.984595 726.969123,390.744481 C726.193254,390.420348 724.021298,389.657798 721.340985,387.273388 C719.267356,385.42535 717.856938,383.125756 717.448104,382.434484 C717.038871,381.729275 717.405907,381.319529 717.729948,380.938852 C718.082653,380.501232 718.421026,380.191036 718.77373,379.781688 C719.126434,379.372738 719.323884,379.160897 719.549599,378.681068 C719.789645,378.215575 719.62006,377.735746 719.450874,377.382942 C719.281687,377.030139 717.871269,373.587317 717.29285,372.190836 Z"
                            id="Whatsapp">
                          </path>
                        </g>
                      </g>
                    </svg>

                    <div class="text-sm">واتساپ</div>
                  </a>
                </button>

                <button class="drop-list__btn py-2">
                  <div @click="shareLink()" class="d-flex mx-3 justify-content-between align-items-center text-blue-500"
                    href>
                    <i class="fa fa-share"></i>

                    <div class="text-sm">اشتراک گذاری</div>
                  </div>
                </button>
                <button class="drop-list__btn py-2" v-if="data.username != this.$store.state.username">
                  <div @click="modal = true" class="d-flex mx-3 justify-content-between align-items-center text-danger"
                    href>
                    <i class="fa fa-ban"></i>

                    <div class="text-sm">گزارش تخلف</div>
                  </div>
                </button>
              </div>
            </div>
          </div>
          <nuxt-link tag="button" to="/t/setting"
            class="text-xs my-1 btn-material btn-animation bg-treaget rounded-pill btn-animation-shadow flex items-center"
            v-if="data.username == this.$store.state.username">تنظیمات</nuxt-link>
          <nuxt-link v-if="data.username != this.$store.state.username" :to="{
          name: 't-Chat',
          params: { usernameParams: data.username },
        }" class=" text-xs d-flex align-items-center my-1 btn-material btn-animation bg-treaget rounded-pill
              btn-animation-shadow d-flex mx-3 justify-content-between align-items-center" href>
            <i class="fa fa-paper-plane"></i>

            <div class="text-sm ms-2">ارسال پیام</div>
          </nuxt-link>
          <div></div>
        </div>
      </div>
    </div>
    <div
      class="divide-gray-300 divide-transparent divide-x grid grid-cols-2 lg:text-left lg:text-lg mt-3 text-center w-full dark:text-gray-100">
    </div>

    <div class="treaget-modal treaget-modal-product-check rtl" :class="modal ? 'open' : ''">
      <div class="treaget-modal-overlay" @click="modal = false"></div>
      <div class="treaget-modal-card">
        <form class="treaget-modal-body" @submit.prevent="sendSpam">
          <div class="treaget-modal-content fs-5">
            <input required v-model="text" type="text" placeholder="علت"
              class="shadow-none rtl px-2 bg-white border-bottom" />
          </div>
          <div class="treaget-modal-footer">
            <div class="d-flex" v-if="loading == false">
              <button class="bg-white py-2 border rounded-pill px-4" @click="modal = true">
                گزارش
              </button>
            </div>
            <div class="flex justify-center mt-6" v-if="loading == true">
              <span class="loader"></span>
            </div>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  props: ["data"],
  data() {
    return { loadingFollow: false, modal: false, text: null, loading: false };
  },
  methods: {
    copyToClipboard(textToCopy) {
      // navigator clipboard api needs a secure context (https)
      if (navigator.clipboard && window.isSecureContext) {
        // navigator clipboard api method'
        return navigator.clipboard.writeText(textToCopy);
      } else {
        // text area method
        let textArea = document.createElement("textarea");
        textArea.value = textToCopy;
        // make the textarea out of viewport
        textArea.style.position = "fixed";
        textArea.style.left = "-999999px";
        textArea.style.top = "-999999px";
        document.body.appendChild(textArea);
        textArea.focus();
        textArea.select();
        return new Promise((res, rej) => {
          // here the magic happens
          document.execCommand("copy") ? res() : rej();
          textArea.remove();
        });
      }
    },
    shareLink() {
      this.copyToClipboard(`http://127.0.0.1:8000/${this.data.username}/`);
      alert(` کپی شد.`);
    },
    async sendSpam() {
      this.loading = true;
      await axios
        .post(
          `http://127.0.0.1:8000/api/account/Spam_create/`,
          {
            text: this.text,
            user: this.data.id,
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
        .then((response) => {
          this.modal = false;
        })
        .catch(function (error) {
          if (error.response) {
            console.log(error.response.data);
            console.log(error.response.status);
            console.log(error.response.headers);
          }
        });
      this.loading = false;
    },
  },
};
</script>

<style></style>
