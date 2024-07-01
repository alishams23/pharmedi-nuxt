<template>
  <div>
    <div v-if="loading == false">
      <div>
        <ProfileHeader :data="user" />
        <!-- edith1 open -->
        <div class="tab-wrap mb-5 border-bottom d-flex justify-content-center"
          style="background-color: rgb(248, 248, 248)" v-if="user.is_superuser == false">
          <input type="radio" name="tabs-2" id="tab1" checked />
          <div class="tab-label-content" id="tab1-content">
            <label for="tab1" v-on:click="page = 0">
              <div class="mx-2">آگهی های فعال</div>
              <i class="fad fa-newspaper" style="font-size: 20px"></i>
            </label>
          </div>
          <input type="radio" name="tabs-2" id="tab2" />
          <div class="tab-label-content" id="tab2-content">
            <label for="tab2" v-on:click="page = 1">
              <div class="mx-2">تاریخچه قبول شیفت</div>
              <i class="fad fa-hospital" style="font-size: 20px"></i>
            </label>
          </div>
          <div class="d-flex slide-2 justify-content-center">
            <div class="slide-inside"></div>
          </div>
        </div>
      </div>
      <div>
        <ProfileShift :username="user.username" v-show="page == 0 && user.is_superuser == false" />
        <ProfilePharmacy :username="user.username" v-show="page == 1 && user.is_superuser == false" />
      </div>
    </div>
    <div v-else class="d-flex justify-content-center align-items-center">
      <span class="loader"></span>
    </div>
  </div>
</template>

<script>
import ProfileShift from "~/components/profileShift.vue";
import ProfilePharmacy from "~/components/profilePharmacy.vue";
export default {
  data() {
    return { user: {}, loading: true, page: 0 };
  },
  methods: {
    getUserApi() {
      let headers =
        this.$store.state.token != ""
          ? {
            "Content-type": "application/json",
            Accept: "application/json",
            Authorization:
              this.$store.state.token != ""
                ? `Token ${this.$store.state.token}`
                : "",
          }
          : {
            "Content-type": "application/json",
            Accept: "application/json",
          };
      fetch(
        `https://pharmedi.ir/api/account/user_retrieve/${this.$route.params.user}/`,
        { headers: headers }
      )
        .then((response) => response.json())
        .then((data) => {
          this.user = data;
          this.loading = false;
        });
    },
  },
  mounted() {
    this.getUserApi();
  },
  components: { ProfileShift, ProfilePharmacy },
};
</script>

<style lang="scss">
@mixin tabs {
  @for $i from 1 through 3 {
    &:nth-of-type(#{$i}) {
      &:checked {
        ~.slide {
          left: calc((100% / #{3}) * #{$i - 1});
        }
      }
    }
  }
}

@mixin tabs-2 {
  @for $i from 1 through 2 {
    &:nth-of-type(#{$i}) {
      &:checked {
        ~.slide-2 {
          left: calc((100% / #{2}) * #{$i - 1});
        }
      }
    }
  }
}

.tab-wrap {
  position: relative;
  display: flex;
}

input[type="radio"][name="tabs"] {
  position: absolute;
  z-index: -1;

  &:checked {
    +.tab-label-content {
      label {
        color: rgb(0, 0, 0);
      }
    }
  }

  @include tabs;

  &:first-of-type {
    &:checked {
      ~.slide {
        left: 0;
      }
    }
  }
}

input[type="radio"][name="tabs-2"] {
  position: absolute;
  z-index: -1;

  &:checked {
    +.tab-label-content {
      label {
        color: rgb(0, 0, 0);
      }
    }
  }

  @include tabs-2;

  &:first-of-type {
    &:checked {
      ~.slide-2 {
        left: 0;
      }
    }
  }
}

label {
  cursor: pointer;
  color: rgba(83, 83, 83, 0.8);
  box-sizing: border-box;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  height: 40px;
  width: 100%;
}

.slide {
  width: calc(100% / #{3});
  height: 5px;
  position: absolute;
  top: calc(100% - 3px);
  transition: left 0.3s ease-out;
}

.slide-2 {
  width: calc(100% / #{2});
  height: 5px;
  position: absolute;
  top: calc(100% - 3px);
  transition: left 0.3s ease-out;
}

.slide-inside {
  background: #0575e6;
  /* fallback for old browsers */
  background: -webkit-linear-gradient(to right, #0575e6, #0575e6);
  /* Chrome 10-25, Safari 5.1-6 */
  background: linear-gradient(to right, #0575e6, #0575e6);
  /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */
  width: 80%;
  height: 3px;
  border-radius: 50px 50px 0px 0px;
}

.tab-label-content {
  width: 100%;
}
</style>
