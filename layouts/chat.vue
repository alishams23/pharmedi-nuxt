<template>
  <div class="main-container p-0 height-full-treaget" style="">
    <div class="h-100 w-100 pt-5 mt-5 css-loading-off">
      <div class="d-flex flex-column align-items-center">
        <span class="loader" />
      </div>
    </div>
    <div v-if="alow == true" id="wrapper" style="
        visibility: hidden;
        min-height: 100%;
        max-height: 100%;
        height: 100%;
        overflow-y: hidden;
      " class="css-loaded p-0">
      <SideNavbar />
      <div class="main_content p-0" style="
          min-height: 100%;
          max-height: 100%;
          height: 100%;
          overflow-y: hidden;
        ">
        <navbar />
        <div class="pt-5 d-none d-sm-block" />
        <div class="p-0" style="
            min-height: 100%;
            max-height: 100%;
            height: 100%;
            overflow-y: hidden;
          ">
          <DownNavbar />

          <nuxt style="
              min-height: 100%;
              max-height: 100%;
              height: 100%;
              overflow-y: hidden;
            " />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  layout: "chat",
  // OR
  layout(context) {
    return "chat";
  },
  data() {
    return {
      alow: false,
      loading: true,
    };
  },
  head() {
    return {
      link: [
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
  computed: {
    isAuthenticated: {
      get() {
        return this.$store.state.isAuthenticated;
      },
    },
  },
  watch: {
    $route(to, from) {
      this.loginPage();
    },
  },
  mounted() {
    this.loginPage();
  },
  beforeMount() {
    this.$store.commit("onStart");
  },
  methods: {
    getInfo() {
      try {
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
        this.loading = false;
      } catch (error) { }
    },
    loginPage() {
      if (this.isAuthenticated == true) {
        this.alow = true;
        if (this.loading == true) {
          this.getInfo();
        }
      } else {
        this.$router.push("/t/login");
      }
    },
    currentRouteName() {
      return this.$route.name;
    },
    currentRouteCheck(data) {
      return this.$route.name.split("-").includes(data);
    },
  },
};
</script>

<style></style>
