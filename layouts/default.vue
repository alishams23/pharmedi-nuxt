<template>
  <div class="" :class="currentRouteName() == 't-Chat' ? 'height-full-treaget p-0' : ''" style="min-height: 100%">
    <div class="h-100 w-100 pt-5 mt-5 css-loading-off">
      <div class="d-flex flex-column align-items-center">
        <span class="loader"></span>
      </div>
    </div>
    <div id="wrapper" style="visibility: hidden" :class="currentRouteName() == 't-Chat' ? 'height-full-treaget' : ''"
      class="css-loaded" v-if="alow == true">
      <SideNavbar />
      <div class="main_content" :class="currentRouteName() == 't-Chat' ? 'height-full-treaget p-0' : ''">
        <navbar />
        <!-- <div class="pt-5 d-none d-sm-block"></div> -->
        <div :class="currentRouteName() != 't-Chat' ? 'container' : 'height-full-treaget'
    ">
          <DownNavbar />

          <slot style="height: 100%" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      alow: false,
      loading: true,
    };
  },
  
  computed: {
    isAuthenticated: {
      get() {
        return this.$store.state.isAuthenticated;
      },
    },
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
      this.alow = true;
      if (this.loading == true) this.getInfo();
    },
    currentRouteName() {
      return this.$route.name;
    },
    currentRouteCheck(data) {
      return this.$route.name.split("-").includes(data);
    },
  },
  mounted() {
    this.loginPage();
  },
  // beforeMount() {
  //   this.$store.commit("onStart");
  //   console.log(this.$store.state.isAuthenticated)
  //   console.log("{{{{{{{{this.$store.state.isAuthenticated}}}}}}}}")

  // },
  watch: {
    $route(to, from) {
      this.loginPage();
    },
  },
};
</script>

<style>
.height-full-treaget {
  min-height: 100%;
  max-height: 100%;
  height: 100%;
  overflow-y: hidden;
}
</style>
