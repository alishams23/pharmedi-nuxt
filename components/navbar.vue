<template>
  <header class="d-flex align-items-center main-container bg-glass">
    <div class="header_inner d-flex align-items-center navbar-left">
      <div class="left-side d-flex align-items-center">
        <!-- Logo -->

        <div @click="slideBarActivator" class="d-lg-none px-3">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="28"
            height="28"
            fill="currentColor"
            class="bi bi-list"
            viewBox="0 0 16 16"
          >
            <path
              fill-rule="evenodd"
              d="M2.5 12a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5z"
            />
          </svg>
        </div>
      </div>

      <div class="right-side lg:pr-4 d-flex align-items-center">
        <!-- upload -->

        <nuxt-link :to="{
      name: 't-Chat-usernameParams',
      params: { usernameParams: 'null' }
    }" class="p-1 ms-3 rounded-full  bg-gradient-to-tl  from-[#2741e7] to-[#2aa2f2] ">
          <i class="fa fa-paper-plane text-white p-2"></i>
        </nuxt-link>
        <!-- <nuxt-link
          to="/t/desk/notification"
          class="ms-3 p-2 rounded-pill d-none d-sm-block d-sm-block shadow-2 btn-animation"
          style="background-color: rgba(255, 255, 255, 0.4);"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="17"
            height="17"
            fill="black"
            class="bi m-1 bi-bell"
            viewBox="0 0 16 16"
          >
            <path
              d="M8 16a2 2 0 0 0 2-2H6a2 2 0 0 0 2 2zM8 1.918l-.797.161A4.002 4.002 0 0 0 4 6c0 .628-.134 2.197-.459 3.742-.16.767-.376 1.566-.663 2.258h10.244c-.287-.692-.502-1.49-.663-2.258C12.134 8.197 12 6.628 12 6a4.002 4.002 0 0 0-3.203-3.92L8 1.917zM14.22 12c.223.447.481.801.78 1H1c.299-.199.557-.553.78-1C2.68 10.2 3 6.88 3 6c0-2.42 1.72-4.44 4.005-4.901a1 1 0 1 1 1.99 0A5.002 5.002 0 0 1 13 6c0 .88.32 4.2 1.22 6z"
            />
          </svg>
        </nuxt-link> -->

        <a
          class="ms-3 p-2 me-lg-5 me-2 rounded-pill d-sm-block btn-animation"
          @click="$router.go(-1)"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="28"
            height="28"
            fill="currentColor"
            class="bi bi-arrow-left-short"
            viewBox="0 0 16 16"
          >
            <path
              fill-rule="evenodd"
              d="M12 8a.5.5 0 0 1-.5.5H5.707l2.147 2.146a.5.5 0 0 1-.708.708l-3-3a.5.5 0 0 1 0-.708l3-3a.5.5 0 1 1 .708.708L5.707 7.5H11.5a.5.5 0 0 1 .5.5z"
            />
          </svg>
        </a>
      </div>
    </div>
  </header>
</template>

<script>
export default {
  methods: {
    slideBarActivator() {
      document.getElementById("wrapper").classList.add("sidebar-active");
    }
  }
};
</script>

