<template>
  <div dir="rtl">
    <button @click="toggleModal"
      class="block   border bg-white focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-xl text-sm px-5 py-2.5 text-center "
      type="button">
      تغییر آدرس
    </button>

    <!-- Main modal -->
    <div v-if="isModalOpen" id="authentication-modal" tabindex="-1" aria-hidden="true"
      class="fixed top-0 right-0 left-0 z-50 flex justify-center items-center w-full h-full overflow-y-auto overflow-x-hidden inset-0 bg-black/25 " >
      <div class="relative p-4 w-full max-w-xl max-h-full">
        <div class="relative bg-white rounded-lg shadow ">
          <div class="flex items-center justify-between p-4 md:p-5 border-b-2 rounded-t ">
            <h3 class="irsa text-xl font-semibold text-gray-900 dark:text-white">
              تغییر دادن مشخصات
            </h3>
            <button @click="toggleModal" type="button"
              class="text-gray-400 ml-0 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 me-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white">
              <svg class="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none"
                viewBox="0 0 14 14">
                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                  d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6" />
              </svg>
              <span class="sr-only">close modal</span>
            </button>
          </div>

          <div class="p-4 md:p-5">
            <form @submit.prevent="updateData" class="space-y-4">
              <div>
                <label for="name"
                  class="text-right w-auto mr-3 rtl mt-3 mb-0 text-sm font-medium text-gray-900">نام:</label>

                <input style="border-radius: 16px" v-model="first_name" type="text" name="name" id="name"
                  class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-2xl focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 shadow-none"
                  placeholder="نام" required />
              </div>
              <div class="mt-4">
                <label for="last_name"
                  class="text-right w-auto mr-3 rtl mt-3 mb-0 text-sm font-medium text-gray-900">نام خانوادگی:</label>
                <input style="border-radius: 16px" v-model="last_name" type="text" name="last_name" id="last_name"
                  placeholder="نام خانوادگی"
                  class="redius bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-2xl focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 shadow-none"
                  required />
              </div>
              <div class="mt-4">
                <label for="city"
                  class="text-right w-auto mr-3 rtl mt-3 mb-0 text-sm font-medium text-gray-900">شهر:</label>
                <input style="border-radius: 16px" v-model="city" type="text" name="city" id="city" placeholder="شهر"
                  class="redius bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-2xl focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 shadow-none"
                  required />
              </div>
              <div class="mt-4">
                <label for="state"
                  class="text-right w-auto mr-3 rtl mt-3 mb-0 text-sm font-medium text-gray-900">استان:</label>
                <input style="border-radius: 16px" v-model="state" type="text" name="state" id="state"
                  placeholder="استان"
                  class="redius bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-2xl focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 shadow-none"
                  required />
              </div>
              <div class="mt-4">
                <label for="zip_code" class="text-right w-auto mr-3 rtl mt-3 mb-0 text-sm font-medium text-gray-900">کد
                  پستی:</label>
                <input style="border-radius: 16px" v-model="zip_code" type="text" name="zip_code" id="zip_code"
                  placeholder="کد پستی"
                  class="redius bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-2xl focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 shadow-none"
                  required />
              </div>
              <div class="mt-4">
                <label for="address"
                  class="text-right w-auto mr-3 rtl mt-3 mb-0 text-sm font-medium text-gray-900">آدرس:</label>
                <textarea v-model="address" id="address" type="text"
                  class="redius bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-2xl focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 shadow-none" />
              </div>
              <div class="mt-4">
                <label for="mobile_phone"
                  class="text-right w-auto mr-3 rtl mt-3 mb-0 text-sm font-medium text-gray-900">تلفن همراه:</label>
                <input style="border-radius: 16px" v-model="phone_number" type="text" id="mobile_phone"
                  placeholder="تلفن همراه"
                  class="redius bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-2xl focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 shadow-none"
                  required />
              </div>
              <div class="mt-4">
                <label for="home_phone"
                  class="text-right w-auto mr-3 rtl mt-3 mb-0 text-sm font-medium text-gray-900">تلفن منزل:</label>
                <input style="border-radius: 16px" v-model="phone_number_home" type="text" id="home_phone"
                  placeholder="تلفن منزل"
                  class="redius bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-2xl focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 shadow-none"
                  required />
              </div>
              <button type="submit"
              v-if="loading==false"
              
                class="w-full mt-4 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                تغییر دادن مشخصات
              </button>
              <div v-if="loading== true" class="flex justify-center">
                <div class="loader"></div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  emits: ["updatedData"],
  props: ["first_name_props",
    "last_name_props",
    "city_props",
    "state_props",
    "zip_code_props",
    "address_props",
    "phone_number_props",
    "phone_number_home_props",
  "id"],
  data() {
    return {
      isModalOpen: false,
      first_name: this.first_name_props,
      last_name: this.last_name_props,
      city: this.city_props,
      state: this.state_props,
      zip_code: this.zip_code_props,
      address: this.address_props,
      phone_number: this.phone_number_props,
      phone_number_home: this.phone_number_home_props,
      loading:false
    
    };
  },
  methods: {
    
    toggleModal() {
      this.isModalOpen = !this.isModalOpen;
    },
    updateData() {
      this.loading = true
      axios
        .put(
          `https://pharmedi.ir/api/shop/update-address-order/${this.id}/`,

          {
            "first_name": this.first_name,
            "last_name": this.last_name,
            "city": this.city,
            "state": this.state,
            "zip_code": this.zip_code,
            "address": this.address,
            "phone_number": this.phone_number,
            "phone_number_home": this.phone_number_home
          }
          ,
          {
            headers: {
              "Content-type": "application/json",
              Accept: "application/json",
              Authorization: `Token ${this.$store.state.token}`,
            },
          }
        )
        .then((response) => {
          console.log("status:", response.status);
          if (response.status === 200) {
            console.log("success");
            this.$emit("updatedData");
          } else {
            console.log("failed");
          }
        })
        .catch((error) => {
          console.error( error);
        });
    },
  },

};
</script>
<style>
.redius {
  border-radius: 16px;
}
</style>
