<template>
  <div>
    <form class="p-4" v-if="loading == false" @submit.prevent="sendData">
      <div class>
        <label for="id_body" class="rtl fs-4 text-treaget irsa">افزودن داروخانه</label>
        <p class="text-right mt-3 fs-6 text-muted">منطقه</p>
        <select class="form-select shadow-none border-bottom rtl py-2" aria-label="Default select example"
          v-model="city" required>
          <option class="text-black" v-for="item in cityList" :key="item.id + 'cityList for option add pharmacy'"
            :value="item.id">
            {{ item.city_name }}
          </option>
        </select>
        <p class="text-right mt-3 fs-6 text-muted">نام داروخانه</p>
        <input v-model="name" type="text" class="form-select shadow-none border-bottom rtl py-2" />
        <p class="text-right mt-3 fs-6 text-muted">آدرس داروخانه</p>
        <input v-model="location" type="text" class="form-select shadow-none border-bottom rtl py-2" />

        <div class="rtl m-4">
          <button class="px-4 py-2 rounded-full py-2 text-white bg-treaget irsa" @click="sendData()">
            <div v-if="loading == false">ارسال</div>
            <div class="d-flex flex-column align-items-center" v-if="loading == true">
              <div class="loader-light"></div>
            </div>
          </button>
        </div>
      </div>
    </form>
    <div class="flex justify-center mt-6" v-if="loading == true">
      <span class="loader"></span>
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  data() {
    return {
      loading: true,
      location: null,
      name: null,
      cityList: [],
      city: null,
    };
  },
  methods: {
    getData() {
      this.loading = true;
      fetch(`http://127.0.0.1:8000/api/account/City_list/`, {
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
          this.cityList = data;
          this.loading = false;
        });
    },
    async sendData() {
      this.loading = true;
      await axios
        .post(
          `http://127.0.0.1:8000/api/account/Pharmacy_create/`,
          {
            name: this.name,
            location: this.location,
            city: this.city,
          },
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
        .catch(function (error) {
          if (error.response) {
            console.log(error.response.data);
            console.log(error.response.status);
            console.log(error.response.headers);
          }
        })
        .then((response) => {
          this.$router.push(`/t/addShift/${response.data.id}/`);
        });

      this.loading = false;
    },
  },
  mounted() {
    this.getData();
  },
};
</script>

<style></style>
