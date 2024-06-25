<template>
  <nuxt-link :to="link ? link : ''"
    class="rounded-10  m-0 my-2  shadow-1 bg-white   d-flex justify-content-between "
    style="overflow: hidden">
    <div class="d-flex align-items-center pl-3">
      <div class=" d-flex align-items-center">
        <div class="d-none d-lg-block">
          <button class="d-flex justify-content-center align-items-center w-8 h-8 rounded-pill bg-gray-100"
            style="z-index: 9999" v-if="link != null">
            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" fill="currentColor"
              class="bi bi-box-arrow-in-up-right" viewBox="0 0 16 16">
              <path fill-rule="evenodd"
                d="M6.364 13.5a.5.5 0 0 0 .5.5H13.5a1.5 1.5 0 0 0 1.5-1.5v-10A1.5 1.5 0 0 0 13.5 1h-10A1.5 1.5 0 0 0 2 2.5v6.636a.5.5 0 1 0 1 0V2.5a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 .5.5v10a.5.5 0 0 1-.5.5H6.864a.5.5 0 0 0-.5.5z" />
              <path fill-rule="evenodd"
                d="M11 5.5a.5.5 0 0 0-.5-.5h-5a.5.5 0 0 0 0 1h3.793l-8.147 8.146a.5.5 0 0 0 .708.708L10 6.707V10.5a.5.5 0 0 0 1 0v-5z" />
            </svg>
          </button>
        </div>
      </div>


    </div>
    <div class="d-flex align-items-center ">
      <div class="rtl py-3 pr-2">
        <slot> </slot>
      </div>
      <div v-if="alert != false">
        <div class="rounded-pill mx-2 me-4 w-9 h-9 d-flex justify-content-center align-items-center"
          :class="type == 'warning' ? 'bg-warning' : type == 'danger' ? 'bg-danger' : 'bg-blue-500'">
          <BellIcon class="h-5 w-5 text-white" />
        </div>
      </div>
      <div class="" :class="type == 'warning' ? 'bg-warning' : type == 'danger' ? 'bg-danger' : 'bg-blue-500'"
        style="width: 10px !important;height:100%"></div>
    </div>
  </nuxt-link>
</template>

<script>
import {  BellIcon} from '@heroicons/vue/24/outline'

export default {
  components:{BellIcon},
  props: ["type", "link", "alert"],
};
</script>

<style>
</style>