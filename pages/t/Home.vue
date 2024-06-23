<template>
  <div id="home" class="lg:flex justify-center lg:space-x-10 lg:space-y-0">
    <!-- left sidebar-->
    <div class="flex-shrink-0 lg:w-8/12">
      <div style="margin-top: -23px">
        <div class="pb-5" style="cursor: grab; overflow-x: hidden">
          <div class="">
          <client-only>
            <!-- <VueSlickCarousel v-if="HeaderData.length > 0" v-bind="settings">
              <a v-for="item in HeaderData" :key="item.id + '-header'" :href="$store.state.isAuthenticated == true ? item.link : '/t/login'
              " style="overflow: hidden">
                <img :src="item.image" class="cover rounded-13-lg" />
              </a>
            </VueSlickCarousel> -->
          </client-only>
          </div>
        </div>
      </div>
      <!-- <div class="relative mx-lg-3">
        <div class="d-lg-none bg-white rounded-13 mx-3 mb-3 py-3">
          <p class="fs-6 fw-bold rtl px-4 pb-3">جدید ترین کاربران</p>
          <ul class="d-flex scrollBarHidden mb-3 mouseDrag" style="overflow-x: scroll; cursor: grab">
            <li v-for="data in userSuggestion" :key="data.username + '_1-home'"
              class="d-flex w-20 flex-column justify-content-center align-items-center">
              <nuxt-link :to="'/' + data.username">
                <div class="bg-gray-300 transform m-1 w-16 h-16 transition rounded-pill hover:bg-gradient-blue"
                  style="padding: 1px 1px 1px 1px">
                  <div class="p-1 w-full h-full bg-white rounded-pill">
                    <img v-if="data.image_profile" :src="data.image_profile" class="w-full h-full cover rounded-pill" />
                    <img v-else src="@/assets/inside/avatar.jpg" class="w-full rounded-pill h-full cover" />
                  </div>
                </div>
              </nuxt-link>
              <a class="block text-center text-xs truncate w-24">
                {{ data.username }}
              </a>
            </li>
          </ul>
        </div>
      </div> -->


      <div class="bg-white rounded-13 ms-3 mb-3 py-3">
        <p class="fs-6 fw-bold rtl px-4 pb-3">آگهی های کارجویی</p>
        <ul class="d-flex scrollBarHidden mb-3 mouseDrag" style="overflow-x: scroll; cursor: grab">
          <li v-for="data in jobSeekers" :key="data.username"
            class="d-flex w-20 flex-column justify-content-center align-items-center">
            <nuxt-link :to="'/' + data.username">
              <div class="bg-gray-300 transform m-1 w-16 h-16 transition rounded-pill hover:bg-gradient-blue"
                style="padding: 1px 1px 1px 1px">
                <div class="p-1 w-full h-full bg-white rounded-pill">
                  <img v-if="data.image_profile" :src="data.image_profile" class="w-full h-full cover rounded-pill" />
                  <img v-else src="@/assets/inside/avatar.jpg" class="w-full rounded-pill h-full cover" />
                </div>
              </div>
            </nuxt-link>
            <a class="block text-center text-xs truncate w-24">
              {{ data.username }}
            </a>
          </li>
          <li v-for="data in jobs " :key="data.id"
            class=" d-flex w-20 flex-column justify-content-center align-items-center">

            <nuxt-link :to="'/t/Job?job=' + data.id">
              <div class="bg-gray-300 transform m-1 w-16 h-16 transition rounded-pill hover:bg-gradient-blue"
                type="button" style="padding: 1px 1px 1px 1px">
                <div class="p-1 w-full h-full bg-white rounded-pill">
                  <img v-if="data.image_profile" :src="data.image_profile" class="w-full h-full cover rounded-pill" />
                  <img v-else src="@/assets/inside/newspaper.jpg" class="w-full rounded-pill h-full cover " />
                </div>
              </div>
            </nuxt-link>

            <a class="block text-center text-xs truncate w-24">
              {{ data.title }}
            </a>
          </li>
        </ul>

        <alert v-if="jobSeekers.length == 0 && jobs.length == 0" class="ms-2 me-2">
          چیزی برای نمایش وجود ندارد
        </alert>
      </div>

      <div class="px-3 py-2 pb-4">
        <div class="d-flex flex-row justify-content-between">
          <div class="d-flex col justify-content-start">
            <div class="d-flex p-3 text-white bg-treaget rounded-13" @click="modal = true">
              <i class="fa fa-filter" />
              <p class="text-xs fw-bold ml-2">فیلتر</p>
            </div>
          </div>
          <div class="row col-9 col-lg-10">
            <input v-model="text" class="col-12 rounded-13 rtl shadow-3" name="name" type="search" placeholder="جستجو"
              @keyup.enter="getDataHome(postPage)" />
          </div>
        </div>
      </div>
      <div class="d-flex flex-wrap mx-2">
        <button class="rounded-13 text-center fw-bold py-2 px-4 bg-white shadow-3 mx-1 bd-highlight" @click="
              category_choices == 'S,T,H'
                ? (category_choices = '')
                : (category_choices = 'S,T,H')
              " :class="category_choices == 'S,T,H' ? 'bg-treaget text-white' : ''">
          تکنسین
        </button>

        <button class="rounded-13 text-center fw-bold py-2 px-4 bg-white shadow-3 mx-1 bd-highlight" @click="
              category_choices == 'P,V'
                ? (category_choices = '')
                : (category_choices = 'P,V')
              " :class="category_choices == 'P,V' ? 'bg-treaget text-white' : ''">
          داروساز
        </button>
      </div>

      <div class="d-flex justify-content-between rtl align-items-center my-3 px-3">
        <p class="fs-6 fw-bold">شیفت های داروخانه</p>
      </div>


      <div>
        <div id="posts" class="space-y-5 pb-3 px-3">
          <shift v-for=" result  in  results " :key="result.id + 'post'" :data="result" />
          <alert v-if="results.length == 0 && loading == false" class="mt-5">
            چیزی برای نمایش وجود ندارد
          </alert>
        </div>
        <!-- post 2-->
        <!-- Load more-->
        <div class="d-flex justify-content-center">
          <button v-if="nextPage != null" class="border rounded-pill py-2 px-3 mt-2 bg-white" @click="postPage++">
            بیشتر
          </button>
        </div>
        <div v-if="loading" class="d-flex justify-content-center">
          <span class="loader" />
        </div>
      </div>

    </div>
    <!-- right sidebar-->
    <div class="lg:w-4/12 d-sm-block d-none mt-3">
      <div class="rounded-2xl pb-4 bg-white">
        <div class="text-right p-3 px-4 fs-5 fw-bold">افراد پیشنهادی</div>
        <div class="d-flex flex-column rtl">
          <div v-for=" n  in  6 " :key="n + '_3-home'" class="d-flex justify-content-center">
            <div v-show="userSuggestion.length == 0" class="UserSuggestionLoader" />
          </div>
          <nuxt-link v-for=" data  in  userSuggestion " :key="data.username + '_4-home'" :to="'/' + data.username">
            <div class="d-flex justify-content-between mx-3 mb-1 hover:bg-gray-100 p-2 rounded-10">
              <div class="border-2 d-flex justify-content-center align-items-center p-1 w-14 h-14 rounded-pill">
                <img v-if="data.image_profile" :src="data.image_profile" class="w-full h-full cover rounded-pill" />
                <img v-else src="@/assets/inside/avatar.jpg" class="w-full h-full cover rounded-pill" />
              </div>
              <div class="d-flex flex-column align-items-end my-1">
                <div class="fw-bold">
                  {{ data.get_full_name }}
                </div>
                <div class="fw-light">
                  {{ data.username }}
                </div>
              </div>
            </div>
          </nuxt-link>
        </div>
      </div>
    </div>
    <div class="treaget-modal treaget-modal-product-check rtl" :class="modal ? 'open' : ''">
      <div class="treaget-modal-overlay" @click="modal = false" />
      <div class="treaget-modal-card">
        <div class="treaget-modal-body">
          <div class="treaget-modal-content fs-5">
            <p class="text-treaget p-3 fw-bold">فیلتر نتایج</p>
            <input id="" v-model="city_text" type="text" style="height: 30px !important" placeholder="شهر"
              class="px-4 my-3 text-xs text-black placeholder rounded-pill irsa fs-7 bg-gray-100 shadow-1 border-bottom px-2"
              name="" />

            <div
              class="col-12 custom-input text-xs px-4 h-8 py-0 d-flex align-items-center rounded-pill fw-bold bg-gray-100 shadow-1 border-bottom px-2 mb-3">
              {{ day == null ? "روز" : day }}
            </div>
            <date-picker v-model="day" custom-input=".custom-input" />
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
              <option class="text-black" value="c">ترکیبی یا چند روزه</option>
            </select>
            <div class="d-flex bg-white rounded-13 px-3 justify-content-between align-items-center d-flex-row">
              <label for="immediate" class="mt-3 text-black fs-6 col-11">
                <div class="rtl col-12 fw-normal text-right">فقط فوری</div>
              </label>
              <input v-model="immediate" type="checkbox" class="col-1" id="immediate" />
            </div>
            <div class="d-flex bg-white rounded-13 px-3 justify-content-between align-items-center d-flex-row">
              <label for="with_card" class="mt-3 text-black fs-6 col-11">
                <div class="rtl col-12 fw-normal text-right">
                  فقط داروساز دارای کارت نظام
                </div>
              </label>
              <input v-model="with_card" type="checkbox" class="col-1" id="with_card" />
            </div>

            <div class="d-flex">
              <div v-if="day != null ||
              shift_selected != '' ||
              city_text != '' ||
              time_status != '' ||
              immediate != '' ||
              with_card != ''
              " class="text-xs px-5 h-8 py-0 d-flex align-items-center rounded-pill text-white fw-bold bg-danger shadow-2"
                @click="
              day = null;
            shift_selected = '';
            city_text = '';
            dayApi = null;
            time_status = '';
            immediate = '';
            with_card = '';
            ">
                حذف
              </div>
            </div>
          </div>
          <div class="treaget-modal-footer">
            <button class="bg-treaget rounded-pill px-3 py-1" @click="
              getDataHome(postPage);
            modal = false;
            ">
              اعمال
            </button>
            <button class="border rounded-pill px-3 py-1" @click="modal = false">
              مخفی کردن
            </button>
          </div>
        </div>
      </div>
    </div>
    <div class="treaget-modal treaget-modal-product-check rtl" :class="modalLogin ? 'open' : ''">
      <div class="treaget-modal-overlay" @click="modalLogin = false" />
      <div class="treaget-modal-card">
        <div class="treaget-modal-body">
          <div class="treaget-modal-content fs-5">
            <button class="rtl col-12 hide-close-icon text-right" @click="modalLogin = false">
              <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="currentColor" class="bi bi-x"
                viewBox="0 0 16 16">
                <path
                  d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z" />
              </svg>
            </button>
            <div class="d-flex flex-column align-items-center mx-3">
              <nuxt-link to="/t/login" class="bg-treaget text-center rounded-13 col-12 py-1 m-1 fs-6">
                ورود
              </nuxt-link>
              <nuxt-link to="/t/signUp" class="bg-treaget text-center rounded-13 col-12 py-1 m-1 fs-6">
                ثبت نام
              </nuxt-link>
              <button class="border rounded-13 col-12 py-1 m-1 fs-6" @click="modalLogin = false">
                ورود به عنوان مهمان
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>

  </div>
</template>

<script>
// import VueSlickCarousel from "vue-slick-carousel";
// import "vue-slick-carousel/dist/vue-slick-carousel.css";
// optional style for arrows & dots
// import "vue-slick-carousel/dist/vue-slick-carousel-theme.css";
export default {
  name: "Home",
  components: {
    // VueSlickCarousel,
  },
  data() {
    return {
      page: 0,
      text: null,
      search: null,
      city: [],
      city_text: "",
      postPage: 1,
      results: [],
      selfUser: "",
      loading: true,
      modal: false,
      immediate: "",
      with_card: "",
      category_choices: "",
      jobSeekers: [],
      jobs: [],
      modalLogin: false,
      userSuggestion: [],
      userFollowing: [],
      loadingFollowing: true,
      day: null,
      dayApi: null,
      HeaderData: [],
      city_selected: "",
      shift_selected: "",
      time_status: "",
      nextPage: null,
      settings: {
        lazyLoad: "ondemand",
        dots: true,
        fade: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
      },
    };
  },
  watch: {
    postPage() {
      if (this.loading == false) {
        this.getDataHome(this.postPage);
      }
    },
    category_choices() {
      this.postPage = 1;
      this.getDataHome(this.postPage);
    },
    day() {
      if (this.day != null) {
        const daySplitted = this.day.split("/");
        const jalaali = require("jalaali-js");
        const d = jalaali.toGregorian(
          parseInt(daySplitted[0]),
          parseInt(daySplitted[1]),
          parseInt(daySplitted[2])
        );
        this.dayApi = `${d.gy}-${d.gm}-${d.gd}`;
      }
    },
  },
  mounted() {
    if (this.$route.query.loginQuery == true) {
      this.modalLogin = true;
    }
    this.getJobSeekers();
    this.getJobs();

    if (this.$store.state.isAuthenticated == true) {
      this.userData();

    } else {
      this.getDataHome(this.postPage);
    }
    // this.getDataCity()
    this.getUserSuggestion();
    this.selfUser = this.$store.state.username;
    this.getUserPro();
    this.getHeader();
    const slider = document.querySelector(".mouseDrag");
    let mouseDown = false;
    let startX, scrollLeft;
    const startDragging = function (e) {
      mouseDown = true;
      startX = e.pageX - slider.offsetLeft;
      scrollLeft = slider.scrollLeft;
    };
    const stopDragging = function (event) {
      mouseDown = false;
    };
    slider.addEventListener("mousemove", (e) => {
      e.preventDefault();
      if (!mouseDown) {
        return;
      }
      const x = e.pageX - slider.offsetLeft;
      const scroll = x - startX;
      slider.scrollLeft = scrollLeft - scroll;
    });
    // Add the event listeners
    slider.addEventListener("mousedown", startDragging, false);
    slider.addEventListener("mouseup", stopDragging, false);
    slider.addEventListener("mouseleave", stopDragging, false);
  },
  methods: {
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
    async userData() {
      this.loading = true;
      await fetch(
        `https://pharmedi.ir/api/account/user_retrieve/${this.$store.state.username}/`
      )
        .then((response) => response.json())
        .then((data) => {
          // this.city_text = data.city.city_name
        });
      this.getDataHome(this.postPage);
    },
    async getDataHome(page) {
      this.loading = true;
      if (page == 1) {
        this.results = [];
      }

      await fetch(
        `https://pharmedi.ir/api/shift/post/?search=${this.text == null ? "" : this.text
        } ${this.city_text == null ? "" : this.city_text
        }&min_price=&max_price=&pharmacy__city=${this.city_selected == null ? "" : this.city_selected
        }&shift_type=${this.shift_selected}&day=${this.dayApi == null ? "" : this.dayApi
        }&time_status=${this.time_status}&page=${page}&immediate=${this.immediate == null ? "" : this.immediate
        }&with_card=${this.with_card == null ? "" : this.with_card
        }&category_choices=${this.category_choices}`,
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
        .catch()
        .then((response) => response.json())
        .then((data) => {
          this.nextPage = data.next;
          data.results.forEach((element) => this.results.push(element));
        });
      this.loading = false;
    },
    async getJobSeekers() {
      this.loading = true;

      await fetch("https://pharmedi.ir/api/account/job_seeker_list/", {
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
          this.jobSeekers = data;
        });

      this.loading = false;
    },
    async getJobs() {
      this.loading = true;

      await fetch("https://pharmedi.ir/api/job/list-jobs/", {
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
          this.jobs = data;
        });

      this.loading = false;
    },
    getUserSuggestion() {
      fetch("https://pharmedi.ir/api/account/User_suggestion/", {
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
          this.userSuggestion = data;
        });
    },
    getHeader() {
      fetch("https://pharmedi.ir/api/shift/Header_list/", {
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
          this.HeaderData = data;
        });
    },
    getUserPro() {
      this.loadingFollowing = true;
      fetch("https://pharmedi.ir/api/account/User_pro_list/", {
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
          this.userFollowing = data;
          this.loadingFollowing = false;
        });
    },

    wait(ms) {
      const start = new Date().getTime();
      let end = start;
      while (end < start + ms) {
        end = new Date().getTime();
      }
    },
    getDataCity() {
      fetch("https://pharmedi.ir/api/account/City_list/", {
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
    searchModel() {
      this.search = this.text;
    },
  },
};
</script>

<style>
.h-150 {
  height: 19rem;
}

.slick-prev:before,
.slick-next:before {
  color: rgb(179, 179, 179) !important;
}

.placeholder::placeholder {
  /* Chrome, Firefox, Opera, Safari 10.1+ */
  color: black;
  opacity: 1;
  /* Firefox */
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

.badge-danger {
  color: #fff;
  background-color: #dc3545;
}
</style>
