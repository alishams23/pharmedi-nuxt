<template>
  <div class="main-container">
    <h2 class="text-treaget fw-bold px-5 py-3 irsa">ثبت نام</h2>
    <p class="notice px-5">لطفا برای دسترسی به سایت ثبت نام کنید</p>
    <p class="text-danger px-5 text-treaget py-3">{{ errorGeneral }}</p>
    <form @submit.prevent="validateForm()" class="px-5 py-5">
      <label class="text-right" for="username">نام کاربری</label>
      <input type="text" name="username" class="py-4 bg-input bg-input-active fw-light" id="username" minlength="8"
        pattern="[A-Za-z0-9&.]*" style="text-transform: lowercase" required placeholder="username" @input="validateForm"
        v-model="username" />
      <p class="text-danger px-5" v-if="usernameError">{{ usernameError }}</p>
      <label class="text-right mt-3" for="password">رمز عبور</label>
      <input type="password" class="py-4 bg-input fw-light" id="password" v-model="Password" name="password"
        data-toggle="password" placeholder="+8 Characters" pattern="^(?=.*[A-Za-z])(?=.*\d).+$" @input="validateForm"
        required />
      <p class="text-danger px-5" v-if="passwordError">{{ passwordError }}</p>

      <label class="text-right mt-3" for="phoneNumber">شماره تلفن</label>

      <input class="py-4 bg-input bg-input-active fw-light" id="phoneNumber" type="text" name="phone_number"
        pattern="[0-9.]+" maxlength="11" minlength="11" placeholder="*********09" required v-model="phoneNumber" />

      <label class="text-right mt-3" for="email">ایمیل</label>

      <input class="py-4 bg-input bg-input-active fw-light" id="email" type="email" name="email"
        placeholder="email address" required v-model="email" />

      <label class="text-right mt-3">نوع کاربر</label>

      <select v-model="userType" required class="bg-input bg-input-active fw-light">
        <option value="N">کاربر عادی</option>
        <option value="S">دانشجو دارای نامه ی ۱۸۰ واحدی</option>
        <option value="P">داروساز فارغ التحصیل</option>
        <option value="T">تکنسین</option>
        <option value="H">مؤسس داروخانه</option>
      </select>
      <label class="text-right mt-3">استان</label>

      <select v-model="state_selected" class="bg-input bg-input-active fw-light" aria-label="Default select example">
        <option v-for="item in state" :key="item.id + 'state for option add pharmacy'" :value="item.id">
          {{ item.name }}
        </option>
      </select>

      <label class="text-right mt-3" for="firstName">نام</label>
      <input class="py-4 bg-input bg-input-active fw-light" id="firstName" type="text" name="first_name"
        placeholder="first name" required v-model="firstName" />
      <label class="text-right mt-3" for="lastName">نام خانوادگی</label>

      <input class="py-4 bg-input bg-input-active fw-light" id="lastName" type="text" name="last_name"
        placeholder="last Name" required v-model="lastName" />
      <label class="text-right mt-3">معرف (اختیاری)</label>

      <input class="py-4 bg-input bg-input-active fw-light" id="lastName" type="text" name="last_name"
        placeholder="یوزرنیم معرف" v-model="representative_user" />
      <button class="mt-5 bg-treaget btn-material btn-animation d-flex align-items-center justify-content-center"
        style="" type="submit">
        <div class="">ثبت</div>
      </button>
    </form>
  </div>
</template>

<script>
import axios from "axios";
export default {
  head() {
    return {
      title: "ثبت نام",
    };
  },
  setup() {
    definePageMeta({
      layout: "landing",
    });
  },
  data() {
    return {
      errorGeneral: null,
      usernameError: null,
      passwordError: null,
      email: null,
      username: "",
      Password: "",
      lastName: null,
      firstName: null,
      phoneNumber: null,
      loading: false,
      checked: true,
      checked2: false,
      userType: null,
      state: [],
      state_selected: null,
      representative_user: null,
    };
  },
  mounted() {
    this.getState();
    if (this.$store.state.isAuthenticated == true) {
      this.$router.push("/t/Home");
    }
  },
  methods: {
    async validateForm() {
      this.loading = true;

      const usernamePattern = /^[A-Za-z0-9&.]{8,}$/;
      if (this.username && !usernamePattern.test(this.username)) {
        this.usernameError =
          "نام کاربری باید حداقل ۸ کاراکتر و فقط شامل حروف و اعداد انگلیسی باشد.";
        return;
        // Exit early if username is invalid
      } else {
        this.usernameError = null; // Clear username error
      }

      const passwordPattern = /^(?=.*[A-Za-z])(?=.*\d).+$/;
      if (this.username && !passwordPattern.test(this.Password)) {
        this.passwordError = "متشکل از اعداد و حروف انگلیسی باشد";
      } else {
        this.passwordError = null;
      }
      let representative_user_data = null;
      if (this.representative_user != null)
        await fetch(
          `https://pharmedi.ir/api/account/user_retrieve/${this.representative_user}/`,
          {
            headers: {
              "Content-type": "application/json",
              Accept: "application/json",
            },
          }
        )
          .then((response) => response.json())
          .then((data) => {
            this.representative_user_data = data.id;
          });
      await fetch(
        `https://pharmedi.ir/api/account/user_retrieve/${this.username}/`,
        {
          headers: {
            "Content-type": "application/json",
            Accept: "application/json",
          },
        }
      ).then((response) => {
        if (response.status === 200) {
          // Username is taken, set the error message
          this.usernameError = "نام کاربری از قبل انتخاب شده است";
          return;
        } else {
          this.usernameError = null; // Clear username error
        }
      });

      await axios
        .post(`https://pharmedi.ir/api/account/register/`, {
          username: this.username,
          password: this.Password,
          last_name: this.lastName,
          first_name: this.firstName,
          phone_number: this.phoneNumber,
          user_type: this.userType,
          state: this.state_selected,
          representative_user: this.representative_user_data,
          email: this.email,
        })
        .catch(function (error) {
          if (error.response) {
            console.log(error.response.data);
            console.log(error.response.status);
            console.log(error.response.headers);
          }
        })
        .then((response) => {
          this.$store.commit("login", {
            token: response.data.token,
            username: this.username,
          });
        })
        .then(() => {
          this.$router.push("/t/Home");
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
    getState() {
      fetch(`https://pharmedi.ir/api/account/State_list/`, {
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
          this.state = data;
          this.loading = false;
        });
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

.main-container {
  width: 400px;
  /* Set the maximum width */
  margin: 0 auto;
  /* Center the container horizontally */
}
</style>
