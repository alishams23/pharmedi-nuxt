<template>
  <div class="wrap d-flex align-items-center justify-content-center">
    <div id="login-page" class="content row align-items-center justify-content-center">
      <div class="p-4 col-lg-12 col-md-12 col-sm-12 col-xs-12 col-12 rtl">
        <div class="bg-white shadow-2 rounded-13">
          <div class="d-flex flex-row">
            <nuxt-link to="/t/signUp" class="col-6 py-3 border-b text-center"
              :class="$route.name == 't-signUp' ? 'tab-active' : ''">
              ثبت نام
            </nuxt-link>
            <nuxt-link to="/t/login" class="col-6 py-3 border-b text-center"
              :class="$route.name == 't-login' ? 'tab-active' : ''">
              ورود
            </nuxt-link>
          </div>
          <slot />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  head() {
    return {
      link: [
        {
          rel: "stylesheet",
          type: "text/css",
          href: "/css/uikit.min.css",
        },
        {
          rel: "stylesheet",
          type: "text/css",
          href: "/css/tailwind.css",
        },
        {
          rel: "stylesheet",
          type: "text/css",
          href: "/css/style.css",
        },
      ],
    };
  },
  layout: "landing",
  // OR
  layout(context) {
    return "landing";
  },
  methods: {
    getInfo() {
      fetch(
        `http://127.0.0.1:8000/api/account/user_retrieve/${this.$store.state.username}/`,
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
          this.$store.commit("getUser", data);
        });
    },
  },
  mounted() {
    this.$store.commit("onStart");
    // this.getInfo()
  },
};
</script>

<style scoped>
.login {
  height: 100vh;
  background: #fff;
  overflow-y: scroll;
  overflow-x: hidden;
}

.wrap {
  overflow: hidden;
  position: relative;
  background-image: linear-gradient(147deg, #002bc6 0%, #2575ff 74%);
  min-height: 100%;
}

.wrap:before {
  content: " ";
  display: block;
  position: absolute;
  height: 100%;
  left: 0;
  top: 0;
  width: 100%;
  opacity: 0.6;

  background-repeat: no-repeat;
  background-position: 50% 0;
  background-size: cover;
}

.content {
  position: relative;
}
</style>
