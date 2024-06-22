<template>
  <div class="" >
    <div class="">
      <div class="row" v-if="loading ==false">
        <div class="col-md-8 col-sm-12 ">
          <div
            id="carouselExampleIndicators"
            class="carousel slide"
            data-bs-ride="carousel"
          >
            <div class="carousel-indicators">
              <button
                type="button"
                data-bs-target="#carouselExampleIndicators"
                data-bs-slide-to="0"
                class="active"
                aria-current="true"
                aria-label="Slide 1"
              ></button>
              <button
                type="button"
                data-bs-target="#carouselExampleIndicators"
                data-bs-slide-to="1"
                aria-label="Slide 2"
              ></button>
              <button
                type="button"
                data-bs-target="#carouselExampleIndicators"
                data-bs-slide-to="2"
                aria-label="Slide 3"
              ></button>
            </div>

            <div class="carousel-inner rounded-13" >
              <img
                :href="'https://' + item.link"
              class="  w-full zoom-in cover h-[469px] rounded-13"
                 :src="item.photo"
                v-bind:class="index == 0 ? '' : ''"
                v-for="(item, index) in data1"
                v-bind:key="item"
              >
               
              </img>
            </div>
            <button
              class="carousel-control-prev"
              type="button"
              data-bs-target="#carouselExampleIndicators"
              data-bs-slide="prev"
            >
              <span
                class="carousel-control-prev-icon"
                aria-hidden="true"
              ></span>
              <span class="visually-hidden">قبلی</span>
            </button>
            <button
              class="carousel-control-next"
              type="button"
              data-bs-target="#carouselExampleIndicators"
              data-bs-slide="next"
            >
              <span
                class="carousel-control-next-icon"
                aria-hidden="true"
              ></span>
              <span class="visually-hidden">بعدی</span>
            </button>
          </div>
        </div>
        <div
          class="col-md-4 col-sm-12 d-flex flex-row flex-wrap  pt-4 pb-4 "
          v-if="data2.length > 1"
        >
          <div class="col-md-12 col-md-12 px-1 col-sm-6 col-xs-6">
            <div class="">
              <a v-bind:href="'https://' + data2[0].link">
                <img
                style="height: 220px ;"
                  v-bind:src="data2[0].photo"
                  class="img-fluid  w-100 rounded-13  cover"
                />
              </a>
            </div>
          </div>
          <div class="col-md-12 col-md-12 px-1 col-sm-6 col-xs-6">
            <div class="mt-lg-4 ">
              <a v-bind:href="'https://' + data2[1].link">
                <img
                style="height: 220px ;"
                  v-bind:src="data2[1].photo"
                  class="img-fluid  w-full rounded-13  cover"
                />
              </a>
            </div>
          </div>
        </div>
      </div>
      <div
      v-if="loading == true"
      class="d-flex justify-content-canter flex-row py-5"
    >
      <div class="col-12 text-center">
        <div class="flex justify-center mt-6" v-if="loading == true">
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
      loading:true
    };
  },
  mounted() {
    this.getData();
  },
  methods: {
    async getData() {
      let mydata = await axios
        .get("http://127.0.0.1:8000/api/shop/header-image-list/")
        .then((response) => (this.data1 = response.data));
        this.getDataLeft();
    },
    async getDataLeft() {
      let mydata = await axios
        .get("http://127.0.0.1:8000/api/shop/header-corner-image-list/")
        .then((response) => (this.data2 = response.data));
        this.loading=false
    },
  },
};
</script>

<style>
</style>