<template>
  <div class="bg-white rounded-10 my-3 p-3">
    <div class="rtl">
      <div class="flex justify-between items-center mb-4">
        <div class="d-flex flex-1 align-items-center space-x-4">
          <nuxt-link :to="'/' + data.author.username">
            <div class="mx-2 w-12 h-12 overflow-hidden shadow-2 rounded-pill">
              <img v-if="data.author.image_profile" :src="data.author.image_profile" />
              <img v-else src="@/assets/inside/avatar.jpg" />
            </div>
          </nuxt-link>
          <div>
            <nuxt-link :to="'/' + data.author.username" class="capitalize font-semibold text-sm">
              {{ data.author.username }}
            </nuxt-link>
            <p class="text-muted text-xs">
              {{ data.author.get_full_name }}
            </p>
          </div>
        </div>

        <nuxt-link v-if="data.is_pharmacy_name == true && data.pharmacy != null" :to="'/t/pharmacy/' + data.pharmacy.id"
          class="d-flex justify-content-end">
          <div class="text-sm rounded-13 px-4 mb-3 text-treaget fw-bold">
            <span class="ml-1">داروخانه </span>
            <span>
              {{ data.pharmacy.name }}
            </span>
          </div>
        </nuxt-link>
      </div>
      <div class="d-flex">
        <div v-if="data.is_expire" class="text-sm px-5 border fs-7 px-2 rounded-13 text-danger mb-2 py-1 text-center">
          زمان درخواست به پایان رسیده
        </div>
      </div>
      <div class="d-flex flex-row align-items-stretch flex-wrap bg-gray-50 rounded-13 pt-3 pb-2 mx-1">
        <div class="col-6 d-flex align-items-center justify-content-center">
          <div
            class="text-sm col-11 d-flex align-self-stretch align-items-center justify-content-center flex-wrap border fs-7 px-2 rounded-13 hover:bg-gray-100 mb-2 py-1 text-center">
            <span class="px-2 fw-bold">نوع مسئولیت:</span>
            {{
            data.category_choices == "H"
              ? "مؤسس داروخانه"
              : data.user_type == "N"
                ? "کاربر عادی"
                : data.category_choices == "S"
                  ? "کارآموز"
                  : data.category_choices == "P"
                    ? "مسئول فنی داروساز"
                    : data.category_choices == "V"
                      ? "قائم مقام داروساز"
                      : data.category_choices == "T"
                        ? "تکنسین"
                        : ""
          }}
          </div>
        </div>
        <div v-if="data.jalali_time" class="col-6 d-flex align-items-center justify-content-center">
          <div
            class="text-sm col-11 d-flex align-self-stretch align-items-center justify-content-center flex-wrap border fs-7 px-2 rounded-13 hover:bg-gray-100 mb-2 py-1 text-center">
            <span class="px-2 fw-bold">روز :</span>
            {{ data.jalali_time }}
          </div>
        </div>
        <div v-if="data.shift_type" class="col-6 d-flex align-items-center justify-content-center">
          <div
            class="text-sm col-11 d-flex align-self-stretch align-items-center justify-content-center flex-wrap border fs-7 px-2 rounded-13 hover:bg-gray-100 mb-2 py-1 text-center">
            <span class="px-2 fw-bold"> زمان شیفت :</span>
            {{ data.shift_type }}
          </div>
        </div>
        <div v-if="data.time_status" class="col-6 d-flex align-items-center justify-content-center">
          <div
            class="text-sm col-11 d-flex align-self-stretch align-items-center justify-content-center flex-wrap border fs-7 px-2 rounded-13 hover:bg-gray-100 mb-2 py-1 text-center">
            <span class="px-2 fw-bold">نوع شیفت :</span>
            {{ data.time_status == "u" ? "فوریتی" : "ثابت" }}
          </div>
        </div>
        <div v-if="data.price_choices" class="col-6 d-flex align-items-center justify-content-center">
          <div
            class="text-sm col-11 d-flex align-self-stretch align-items-center justify-content-center flex-wrap border fs-7 px-2 rounded-13 hover:bg-gray-100 mb-2 py-1 text-center">
            <span class="px-2 fw-bold"> پرداختی :</span>
            {{
            data.price_choices == "n"
              ? price(data.payment)
              : data.price_choices == "a"
                ? "توافقی"
                : data.price_choices == "s"
                  ? "طبق تعرفه"
                  : ""
          }}
          </div>
        </div>

        <div class="col-6 d-flex align-items-center justify-content-center">
          <div v-if="data.pharmacy"
            class="text-sm col-11 d-flex align-self-stretch align-items-center justify-content-center flex-wrap border fs-7 px-2 rounded-13 hover:bg-gray-100 mb-2 py-1 text-center">
            <span class="px-2 fw-bold">مکان :</span>
            {{ data.pharmacy.location }}
          </div>
        </div>
        <div v-if="data.time_start || data.time_end" class="col-6 d-flex align-items-center justify-content-center">
          <div
            class="text-sm col-11 d-flex align-self-stretch align-items-center justify-content-center flex-wrap border fs-7 px-2 rounded-13 hover:bg-gray-100 mb-2 py-1 text-center">
            <span class="px-2 fw-bold">زمان شروع و پایان :</span>
            {{ data.time_start }} - {{ data.time_end }}
          </div>
        </div>
      </div>
    </div>
    <div class="d-flex  align-items-center flex-wrap flex-row-reverse mt-2">
      <div v-if="data.with_card" class=" px-3 bg-green-50 text-green-800 text-xs  rounded-full mb-2 py-2 text-center flex items-center"
       >
        فقط داروساز دارای کارت نظام
        <ExclamationTriangleIcon class=" w-5 h-5 ml-3 text-green-800" />
      </div>
      <div v-if="data.immediate" class=" px-3 mr-3 bg-red-50 text-danger text-xs  rounded-full text-danger mb-2 py-2 text-center flex items-center">
        فوری
        <ExclamationTriangleIcon class=" w-5 h-5  ml-3 text-danger" />
      </div>
    </div>
    <div v-if="showDetail" class="col-12 rtl px-4 py-3 text-sm leading-7 font-light">
      {{ data.detail }}
    </div>
    <div class="flex   flex-row-reverse col-12 mt-3">
      <div v-if="data.author.username != $store.state.username" class="drop -color-lighter drop--down">
        <button class="bg-gray-100  mt-3 rounded-full">
          <div class="py-2 px-2 d-flex align-items-center">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-signal"
              viewBox="0 0 16 16">
              <path
                d="m6.08.234.179.727a7.264 7.264 0 0 0-2.01.832l-.383-.643A7.9 7.9 0 0 1 6.079.234zm3.84 0L9.742.96a7.265 7.265 0 0 1 2.01.832l.388-.643A7.957 7.957 0 0 0 9.92.234zm-8.77 3.63a7.944 7.944 0 0 0-.916 2.215l.727.18a7.264 7.264 0 0 1 .832-2.01l-.643-.386zM.75 8a7.3 7.3 0 0 1 .081-1.086L.091 6.8a8 8 0 0 0 0 2.398l.74-.112A7.262 7.262 0 0 1 .75 8zm11.384 6.848-.384-.64a7.23 7.23 0 0 1-2.007.831l.18.728a7.965 7.965 0 0 0 2.211-.919zM15.251 8c0 .364-.028.727-.082 1.086l.74.112a7.966 7.966 0 0 0 0-2.398l-.74.114c.054.36.082.722.082 1.086zm.516 1.918-.728-.18a7.252 7.252 0 0 1-.832 2.012l.643.387a7.933 7.933 0 0 0 .917-2.219zm-6.68 5.25c-.72.11-1.453.11-2.173 0l-.112.742a7.99 7.99 0 0 0 2.396 0l-.112-.741zm4.75-2.868a7.229 7.229 0 0 1-1.537 1.534l.446.605a8.07 8.07 0 0 0 1.695-1.689l-.604-.45zM12.3 2.163c.587.432 1.105.95 1.537 1.537l.604-.45a8.06 8.06 0 0 0-1.69-1.691l-.45.604zM2.163 3.7A7.242 7.242 0 0 1 3.7 2.163l-.45-.604a8.06 8.06 0 0 0-1.691 1.69l.604.45zm12.688.163-.644.387c.377.623.658 1.3.832 2.007l.728-.18a7.931 7.931 0 0 0-.916-2.214zM6.913.831a7.254 7.254 0 0 1 2.172 0l.112-.74a7.985 7.985 0 0 0-2.396 0l.112.74zM2.547 14.64 1 15l.36-1.549-.729-.17-.361 1.548a.75.75 0 0 0 .9.902l1.548-.357-.17-.734zM.786 12.612l.732.168.25-1.073A7.187 7.187 0 0 1 .96 9.74l-.727.18a8 8 0 0 0 .736 1.902l-.184.79zm3.5 1.623-1.073.25.17.731.79-.184c.6.327 1.239.574 1.902.737l.18-.728a7.197 7.197 0 0 1-1.962-.811l-.007.005zM8 1.5a6.502 6.502 0 0 0-6.498 6.502 6.516 6.516 0 0 0 .998 3.455l-.625 2.668L4.54 13.5a6.502 6.502 0 0 0 6.93-11A6.516 6.516 0 0 0 8 1.5" />
            </svg>
            <p class="text-xs px-2">راه های ارتباطی</p>
          </div>
        </button>
        <div class="drop__content -transition-slide-in" style="z-index: 9999">
          <div class="drop-list -size-large -position-left -border-rounded">
            <button class="drop-list__btn py-2">
              <a :href="`sms:+98${data.number != null ? data.number : data.author.phone_number
            }`" class="d-flex mx-3 justify-content-between align-items-center">
                <i class="fa fa-sms" />
                <div class="text-sm">ارسال پیامک</div>
              </a>
            </button>
            <button class="drop-list__btn py-2">
              <nuxt-link 
              :to="'/t/Chat/?usernameParams=' + data.author.username"
                class="d-flex mx-3 justify-content-between align-items-center">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                  class="bi bi-whatsapp" viewBox="0 0 24 24">
                  <path
                    d="M21.4274 2.5783C20.9274 2.0673 20.1874 1.8783 19.4974 2.0783L3.40742 6.7273C2.67942 6.9293 2.16342 7.5063 2.02442 8.2383C1.88242 8.9843 2.37842 9.9323 3.02642 10.3283L8.05742 13.4003C8.57342 13.7163 9.23942 13.6373 9.66642 13.2093L15.4274 7.4483C15.7174 7.1473 16.1974 7.1473 16.4874 7.4483C16.7774 7.7373 16.7774 8.2083 16.4874 8.5083L10.7164 14.2693C10.2884 14.6973 10.2084 15.3613 10.5234 15.8783L13.5974 20.9283C13.9574 21.5273 14.5774 21.8683 15.2574 21.8683C15.3374 21.8683 15.4274 21.8683 15.5074 21.8573C16.2874 21.7583 16.9074 21.2273 17.1374 20.4773L21.9074 4.5083C22.1174 3.8283 21.9274 3.0883 21.4274 2.5783Z" />
                </svg>
                <p class="text-xs px-2">گپ</p>
              </nuxt-link>
            </button>
            <button class="drop-list__btn py-2">
              <a :href="`https://wa.me/098${data.number != null ? data.number : data.author.phone_number
            }`" class="d-flex mx-3 justify-content-between align-items-center">
                <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" fill="currentColor"
                  class="bi bi-whatsapp" viewBox="0 0 16 16">
                  <path
                    d="M13.601 2.326A7.854 7.854 0 0 0 7.994 0C3.627 0 .068 3.558.064 7.926c0 1.399.366 2.76 1.057 3.965L0 16l4.204-1.102a7.933 7.933 0 0 0 3.79.965h.004c4.368 0 7.926-3.558 7.93-7.93A7.898 7.898 0 0 0 13.6 2.326zM7.994 14.521a6.573 6.573 0 0 1-3.356-.92l-.24-.144-2.494.654.666-2.433-.156-.251a6.56 6.56 0 0 1-1.007-3.505c0-3.626 2.957-6.584 6.591-6.584a6.56 6.56 0 0 1 4.66 1.931 6.557 6.557 0 0 1 1.928 4.66c-.004 3.639-2.961 6.592-6.592 6.592zm3.615-4.934c-.197-.099-1.17-.578-1.353-.646-.182-.065-.315-.099-.445.099-.133.197-.513.646-.627.775-.114.133-.232.148-.43.05-.197-.1-.836-.308-1.592-.985-.59-.525-.985-1.175-1.103-1.372-.114-.198-.011-.304.088-.403.087-.088.197-.232.296-.346.1-.114.133-.198.198-.33.065-.134.034-.248-.015-.347-.05-.099-.445-1.076-.612-1.47-.16-.389-.323-.335-.445-.34-.114-.007-.247-.007-.38-.007a.729.729 0 0 0-.529.247c-.182.198-.691.677-.691 1.654 0 .977.71 1.916.81 2.049.098.133 1.394 2.132 3.383 2.992.47.205.84.326 1.129.418.475.152.904.129 1.246.08.38-.058 1.171-.48 1.338-.943.164-.464.164-.86.114-.943-.049-.084-.182-.133-.38-.232z" />
                </svg>
                <div class="text-sm">واتساپ</div>
              </a>
            </button>
            <button v-if="data.telegram_id" class="drop-list__btn py-2">
              <a type="telegram" :imagine="data.telegram_id" target="_blank" :href="`tg://resolve?domain=${data.telegram_id}`"
                class="d-flex mx-3 justify-content-between align-items-center">
                <i class="fad fa-paper-plane" />
                <div class="text-sm">تلگرام</div>
              </a>
            </button>
          </div>
        </div>
      </div>
      <button v-if="data.detail" class="bg-gray-100  mt-3 mr-2 rounded-full" @click="showDetail = !showDetail">
        <div class="py-2 px-2 d-flex align-items-center">
          <i class="fad fa-newspaper pr-2" />
          <p class="text-xs px-2">توضیحات</p>
        </div>
      </button>
    </div>
    <div class="d-flex flex-wrap justify-content-between col-12 mt-1 rtl">
      <button v-if="data.accepts.length != 0"
        class="d-flex align-items-center mt-3 mx-2 py-2 bg-green-600 text-white shadow-lg rounded-full px-2 mt-1"
        @click="suggestion = !suggestion">
        <p class="px-2 text-xs">پیشنهاد ها</p>
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-chevron-down"
          viewBox="0 0 16 16">
          <path fill-rule="evenodd"
            d="M1.646 4.646a.5.5 0 0 1 .708 0L8 10.293l5.646-5.647a.5.5 0 0 1 .708.708l-6 6a.5.5 0 0 1-.708 0l-6-6a.5.5 0 0 1 0-.708z" />
        </svg>
      </button>
      <button v-if="acceptAllow == true &&
            loading == false &&
            data.author.username != $store.state.username
            " class="py-1 px-3 mt-3 text-xs btn-material btn-animation-shadow irsa bg-gradient-to-tl  from-[#13a847] to-[#02c6b9] rounded-full text-white"
        @click="acceptRequest()">
        قبول درخواست
      </button>
      <button v-if="loading == true"
        class="py-1 px-3 mt-3 mx-3 mt-1 text-sm btn-material btn-animation-shadow irsa bg-gradient-to-tl  from-[#13a847] to-[#02c6b9]  text-white">
        <div class="d-flex justify-content-center">
          <span class="loader-light" />
        </div>
      </button>

      <!-- <a v-if="data.author.username != $store.state.username"
        :href="`sms:+98${data.number != null ? data.number : data.author.phone_number}`"
        class="rounded-13 py-2 shadow-2  px-2   d-flex align-items-center">
        <i class="fad fa-paper-plane pr-2"></i>
        <p class="text-xs px-2">راه های ارتباطی</p>
      </a> -->
    </div>
    <div v-for="result in data.accepts" v-show="suggestion == true" :key="result.id + '_subcategoriesRequest'">
      <div
        class="rtl hover:bg-gray-100 px-4 py-2 mt-2 shadow-1 d-flex align-items-center justify-content-between rounded-10">
        <nuxt-link :to="`/${result.author.username}`" class="d-flex justify-content-end">
          <div class="d-flex">
            <div class="border-2 d-flex justify-content-center align-items-center p-1 w-14 h-14"
              style="border-radius: 35px">
              <img v-if="result.author.image_profile" :src="result.author.image_profile"
                class="w-full h-full cover rounded-full" />
              <img v-else src="@/assets/inside/avatar.jpg" class="w-full h-full cover rounded-full" />
            </div>
            <div class="d-flex me-3 flex-column my-1">
              <div class="fw-bold">
                {{ result.author.username }}
              </div>
              <div class="text-muted text-xs">
                {{ result.author.get_full_name }}
              </div>
              <div class="text-xs text-muted">
                {{ result.jalali_time }}
              </div>
            </div>
          </div>
        </nuxt-link>
        <div class="d-flex">
          <button v-if="data.author.username == $store.state.username"
            class="rounded-10 d-flex mx-1 px-2 py-1 bg-treaget align-items-center"
            @click="finishRequest(result.author.id)">
            <p class="text-xs px-1 py-1">قبول</p>
          </button>
          <a v-if="data.author.username == $store.state.username &&
            checkPhoneDevice()
            " :href="'sms:+98' + data.author.phone_number"
            class="rounded-10 d-flex px-2 py-1 bg-treaget align-items-center">
            <p class="text-xs px-1 py-1">پیامک</p>
          </a>
        </div>
      </div>
    </div>
    <div class="treaget-modal treaget-modal-product-check rtl" :class="modal ? 'open' : ''">
      <div class="treaget-modal-overlay" @click="reload()" />
      <div class="treaget-modal-card">
        <div class="treaget-modal-body">
          <div class="treaget-modal-content fs-5">
            درخواست شما به ثبت کننده ی شیفت ارسال شد
          </div>
          <div class="treaget-modal-footer">
            <div class="d-flex">
              <button class="bg-white py-2 border rounded-13 px-4" @click="reload()">
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

import {  ExclamationTriangleIcon} from '@heroicons/vue/24/outline'

export default {
  props: ["data"],
  components:{ExclamationTriangleIcon},
  data() {
    return {
      loading: false,
      acceptAllow: true,
      modal: false,
      suggestion: false,
      showDetail: false,
    };
  },
  mounted() {
    this.data.accepts.forEach((element) => {
      if (element.author.username == this.$store.state.username) {
        this.acceptAllow = false;
      }
    });
  },
  methods: {
    acceptRequest() {
      this.checkLogin();

      this.loading = true;
      fetch(`https://pharmedi.ir/api/shift/Accept_shift/${this.data.id}/`, {
        headers: {
          "Content-type": "application/json",
          Accept: "application/json",
          Authorization:
            this.$store.state.token != ""
              ? `Token ${this.$store.state.token}`
              : "",
        },
      }).then((response) => {
        if (!response.ok) {
          throw response;
        }
        this.loading = false; // we only get here if there is no error
        this.modal = true;
      });
    },
    finishRequest(id) {
      this.checkLogin();
      fetch(
        `https://pharmedi.ir/api/shift/Finish_request_shift/${this.data.id}/${id}/`,
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
      ).then((response) => {
        if (!response.ok) {
          throw response;
        }
        location.reload();
      });
    },
    reload() {
      window.location.reload();
    },
    checkLogin() {
      if (this.$store.state.isAuthenticated != true) {
        this.$router.push("/t/login");
      }
    },
    checkPhoneDevice() {
      if (
        /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
          navigator.userAgent
        )
      ) {
        // true for mobile device
        return true;
      } else {
        // false for not mobile device
        return false;
      }
    },
    price(value) {
      const chars = Array.from(`${value}`);
      for (let index = 1; index <= chars.length; index++) {
        if (index % 3 == 0) {
          if (chars.length != index) {
            chars[chars.length - index] = `,${chars[chars.length - index]}`;
          }
        }
      }
      return chars.join("");
    },
  },
};
</script>

<style></style>
