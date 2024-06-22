<template>
  <div>
    <div>
      <div class="row" v-if="!loading">
        <div class="col-md-8 col-sm-12">
          <div id="carouselExampleIndicators" class="carousel slide" data-bs-ride="carousel">
            <div class="carousel-indicators">
              <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="0" class="active" aria-current="true" aria-label="Slide 1"></button>
              <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="1" aria-label="Slide 2"></button>
              <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="2" aria-label="Slide 3"></button>
            </div>
            <div class="carousel-inner rounded-13">
              <img
                v-for="(item, index) in data1"
                v-bind:key="index"
                :src="item.photo"
                class="w-full zoom-in cover h-[469px] rounded-13"
                :class="{ 'active': index === 0 }"
                :alt="'Slide ' + (index + 1)"
              />
            </div>
            <button class="carousel-control-prev" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="prev">
              <span class="carousel-control-prev-icon" aria-hidden="true"></span>
              <span class="visually-hidden">Previous</span>
            </button>
            <button class="carousel-control-next" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="next">
              <span class="carousel-control-next-icon" aria-hidden="true"></span>
              <span class="visually-hidden">Next</span>
            </button>
          </div>
        </div>
        <div class="col-md-4 col-sm-12 d-flex flex-row flex-wrap pt-4 pb-4" v-if="data2.length > 1">
          <div class="col-md-12 col-sm-6 px-1">
            <div>
              <a :href="'https://' + data2[0].link">
                <img
                  v-bind:src="data2[0].photo"
                  style="height: 220px;"
                  class="img-fluid w-100 rounded-13 cover"
                />
              </a>
            </div>
          </div>
          <div class="col-md-12 col-sm-6 px-1 mt-lg-4">
            <div>
              <a :href="'https://' + data2[1].link">
                <img
                  v-bind:src="data2[1].photo"
                  style="height: 220px;"
                  class="img-fluid w-full rounded-13 cover"
                />
              </a>
            </div>
          </div>
        </div>
      </div>
      <div v-if="loading" class="d-flex justify-content-center flex-row py-5">
        <div class="col-12 text-center">
          <div class="flex justify-center mt-6">
            <span class="loader"></span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      data1: [],
      data2: [],
      loading: true,
    };
  },
  mounted() {
    this.getData();
  },
  methods: {
    async getData() {
      try {
        const response1 = await axios.get("http://127.0.0.1:8000/api/shop/header-image-list/");
        this.data1 = response1.data;
        const response2 = await axios.get("http://127.0.0.1:8000/api/shop/header-corner-image-list/");
        this.data2 = response2.data;
      } catch (error) {
        console.error("Error fetching data", error);
      } finally {
        this.loading = false;
      }
    },
  },
};
</script>

<style>
/* Add your custom styles here */
</style>
