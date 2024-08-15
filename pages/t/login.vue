<template>
  <div>
    <h2 class="text-treaget fw-bold px-5 py-3 irsa">ورود</h2>
    <p class="notice px-5">لطفا برای دسترسی به سایت وارد شوید</p>
    <a class="text-center text-danger" v-if="this.generalError == true">
      <div class="mt-3">رمز عبور یا نام کاربری اشتباه است</div>
    </a>
    <form @submit.prevent="doLogin" class="px-5 py-5">
      <label class="text-right" for="UserNameInput">نام کاربری</label>

      <input type="text" class="py-4 bg-input bg-input-active fw-light" id="UserNameInput" placeholder="username"
        v-model="UserName" oninput="this.value = this.value.toLowerCase()" :class="{
      'is-invalid': UserNameE === true,
      'is-valid': UserNameE === false,
    }" />
      <div class="invalid-feedback">
        {{ UserNameEM }}
      </div>

      <div class="col-12">
        <label class="text-right mt-3" for="passwordinput">رمز عبور</label>
        <input type="password" class="py-4 bg-input fw-light" id="passwordinput" placeholder="*********"
          v-model="Password" :class="{
      'is-invalid': PasswordE === true,
      'is-valid': PasswordE === false,
    }" pattern="^(?=.*[A-Za-z])(?=.*\d).+$" />
        <div class="invalid-feedback">
          {{ PasswordEM }}
        </div>
      </div>
      <button class="mt-5 bg-treaget btn-material btn-animation d-flex align-items-center justify-content-center"
        style="" type="submit">
        <div v-if="loading == false" class="">ورود</div>
        <div class="d-flex flex-column align-items-center" v-if="loading == true">
          <div class="loader-light"></div>
        </div>
      </button>

      <nuxt-link to="/t/home" class="text-center text-treaget">
        <div class="mt-3">ورود به عنوان مهمان</div>
      </nuxt-link>
      <a href="https://pharmedi.ir/api/password_reset/" class="text-center">
        <div class="mt-3">رمز عبور خود را فراموش کرده اید؟</div>
      </a>
    </form>
  </div>
</template>

<script>
import axios from "axios";
export default {
  head() {
    return {
      title: "ورود",
    };
  },
  name: "Login",
  setup() {
    definePageMeta({
      layout: "landing",
    });
  },

  data() {
    return {
      generalError: false,
      UserName: "",
      Password: "",
      UserNameE: null,
      PasswordE: null,
      UserNameEM: "",
      PasswordEM: "",
      loading: false,
    };
  },
  mounted() {
    if (this.$store.state.isAuthenticated == true) {
      this.$router.push("/t/Home");
    }
  },
  beforeMount() {
    this.$store.commit("onStart");
  },
  methods: {
    async doLogin() {
      let access = true;

      if (this.UserName.length == 0) {
        access = false;
        this.UserNameE = true;
        this.UserNameEM = "لطفا یوزرنیم را وارد کنید";
      } else {
        this.UserNameE = false;
        this.UserNameEM = "";
      }

      if (this.Password.length == 0) {
        access = false;
        this.PasswordE = true;
        this.PasswordEM = "لطفا پسورد را وارد کنید";
      } else {
        this.PasswordE = false;
        this.PasswordEM = "";
      }
      if (access) {
        try {
          this.loading = true;
          let mydata = await axios
            .post("https://pharmedi.ir/api/account/login/", {
              username: this.UserName,
              password: this.Password,
            })
            .then((response) =>
              this.$store.commit("login", {
                token: response.data.token,
                username: this.UserName,
              })
            );
          this.loading = false;
          this.$router.push("/t/Home");
        } catch (error) {
          this.loading = false;

          this.generalError = true;
        }
      }
    },
  },
};
</script>

<style scoped>
button[type="submit"] {
  width: 100%;
  border: 0;
  border-radius: 25px;
  padding: 14px;
  background: #0575e6;
  /* fallback for old browsers */
  background: -webkit-linear-gradient(to right, #0027b6, #0575e6);
  /* Chrome 10-25, Safari 5.1-6 */
  background: linear-gradient(to right, #0027b6, #0575e6);
  /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */
  color: #fff;
  display: inline-block;
  cursor: pointer;
  font-size: 16px;
  font-weight: bold;
  margin-top: 10px;
  transition: ease all 0.3s;
}

.bg-input {
  height: 49px;
  padding-left: 1.25rem;
  color: #0b2238 !important;
  font-size: 16px;
  border-radius: 8px;
  font-weight: 500;
  transition: 0.3s !important;
  display: block;
  width: 100%;
  padding: 0.375rem 0.75rem;
  line-height: 1.5;

  background-clip: padding-box;
  border: 1px solid #e7e7e7;
  box-shadow: none;
}

.bg-input:focus {
  box-shadow: none !important;
  border: 1px solid #0575e6;

  color: #0b2238 !important;
  font-size: 16px;
  border-radius: 8px;
  font-weight: 500;
  transition: 0.3s !important;
}
</style>
