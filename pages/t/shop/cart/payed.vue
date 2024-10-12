<template>
  <div v-if="loading == true" class="flex justify-center items-center h-[300px]">

    <div class="loader"></div>
  </div>
  <div v-else class="mx-2">
    <div class="flex mx-3 items-center justify-end">
      <h2 class="irsa text-lg font-bold text-right my-3 mr-4">
        تاریخچه ی خرید
      </h2>
      <div class="h-12 w-12 bg-treaget flex justify-center items-center mr-5 rounded-2xl">
        <ShoppingBagIcon class="w-8 h-8 text-white" />
      </div>
    </div>

    <div v-for="(order, index) in data" class="bg-white px-3 my-5 rounded-2xl">
      <div class="px-4 flex justify-between flex-wrap items-center rtl pt-4">
        <p class="rtl text-lg pb-3 font-bold">
          سبد خرید {{ data.length - index }}
        </p>
        <ol class="flex items-center w-full pb-3 max-w-sm">
          <li
            class="flex w-full items-center text-blue-600 after:content-[''] after:w-full after:h-1 after:border-b after:border-blue-100 after:border-4 after:inline-block">
            <span class="flex items-center justify-center w-10 h-10 bg-blue-100 rounded-full lg:h-12 lg:w-12 shrink-0">
              <IconPackage class="h-6 w-6" />
            </span>
          </li>
          <li
            class="flex w-full items-center after:content-[''] after:w-full after:h-1 after:border-b after:border-4 after:inline-block"
            :class="order.status == 'shipped' || order.status == 'delivered'
                ? 'text-blue-600  after:border-blue-100'
                : 'after:border-grey-100'
              ">
            <span class="flex items-center justify-center w-10 h-10 bg-gray-100 rounded-full lg:h-12 lg:w-12 shrink-0"
              :class="order.status == 'shipped' || order.status == 'delivered'
                  ? 'bg-blue-100'
                  : 'text-gray-500'
                ">
              <IconPackageExport class="h-6 w-6" />
            </span>
          </li>
          <li class="flex items-center" :class="order.status == 'delivered' ? 'text-blue-600  ' : ''">
            <span :class="order.status == 'delivered' ? 'bg-blue-100' : 'text-gray-500'
              " class="flex items-center justify-center w-10 h-10 bg-gray-100 rounded-full lg:h-12 lg:w-12 shrink-0">
              <IconCheckbox class="h-6 w-6" />
            </span>
          </li>
        </ol>
      </div>

      <section aria-labelledby="cart-heading" class="pb-3">
        <h2 id="cart-heading" class="sr-only">Items in your shopping cart</h2>
        <ul role="list" class="py-2 rtl">
          <li v-for="item in order.items" :key="item.id"
            class="flex py-3 bg-gray-50 border my-3 rounded-xl px-4 sm:py-10 items-center">
            <div class="flex-shrink-0">
              <img :src="item.product.images[0].image" :alt="item.imageAlt"
                class="h-16 w-16 rounded-md object-cover object-center sm:h-48 sm:w-48" />
            </div>
            <div class="mr-4 flex flex-1 flex-col justify-between sm:mr-6">
              <div class="relative pl-9 sm:grid sm:grid-cols-2 sm:gap-x-6 sm:pl-0">
                <div>
                  <div class="flex justify-between">
                    <h3 class="text-sm">
                      <a :href="item.href" class="font-medium text-gray-700 hover:text-gray-800">{{ item.product.name
                        }}</a>
                    </h3>
                  </div>
                </div>

                <div class="sm:mt-0 sm:pl-9">
                  <label class="sr-only">Quantity, {{ item.product.name }}</label>

                  <div class="flex items-center">
                    <div>{{ item.quantity }}</div>
                    <p class="text-gray-500 text-xs mx-2 font-light">عدد</p>
                  </div>

                  <div class="absolute left-0 top-0">
                    <button type="button" class="-m-2 inline-flex p-2 text-gray-400 hover:text-gray-500">
                      <span class="sr-only">Remove</span>
                      <XMarkIcon class="h-5 w-5" aria-hidden="true" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </li>
        </ul>

        <div class="flex items-center flex-wrap rtl">
          <div class="rtl font-bold text-xs my-2 mx-3">
            کد پیگیری :
            <span class="text-gray-500 font-light">{{
              order.tracking_code
              }}</span>
          </div>
          <div class="rtl font-bold text-xs my-2 mx-3">
            کد رهگیری اداره ی پست :
            <span class="text-gray-500 font-light">{{
              order.post_code == null ? "صادر نشده" : order.post_code
              }}</span>
          </div>
          <div class="rtl font-bold text-xs my-2 mx-3">
            تاریخ ایجاد :
            <span class="text-gray-500 font-light">{{
              order.jalali_time
              }}</span>
          </div>
        </div>
      </section>

      <div class="flex px-3 pb-4 flex-wrap">
        <div class="px-2 py-2 my-2 text-xs rounded-full mx-2 bg-yellow-50 shadow-lg text-yellow-700 font-bold">
          قیمت : {{ order.cost }}
        </div>
        <div class="px-2 py-2 my-2 text-xs rounded-full mx-2 bg-yellow-50 shadow-lg text-yellow-700 font-bold">
          وضعیت:
          {{
            order.status == "sending"
              ? "در حال ارسال"
              : order.status == "shipped"
                ? "ارسال شده"
                : order.status == "delivered"
                  ? "دریافت شده"
                  : ""
          }}
        </div>
        <div class="px-2 py-2 my-2 text-xs rounded-full mx-2 bg-yellow-50 shadow-lg text-yellow-700 font-bold">
          هزینه ی ارسال : {{ order.post_cost }}
        </div>

      </div>
      <div class="pb-4">

        <ShopSectionChangeAddress :first_name_props="order.first_name" :last_name_props="order.last_name"
          :city_props="order.city" :state_props="order.state" :zip_code_props="order.zip_code"
          :address_props="order.address" :phone_number_props="order.phone_number"
          :phone_number_home_props="order.phone_number_home" :id="order.id" v-if="order.status !== 'delivered'"
          @updated-data="getData" />
      </div>
    </div>
    <div v-if="data.length == 0" class="mt-20">
      <Alert2 type="info" text="محصولی خریداری نشده است" class_inside="shadow-3" />
    </div>
  </div>
</template>

<script>
import {
  IconPackage,
  IconPackageExport,
  IconCheckbox,
} from "@tabler/icons-vue";

import { ShoppingBagIcon } from "@heroicons/vue/20/solid";

import axios from "axios";

export default {
  components: {
    IconPackage,
    IconPackageExport,
    IconCheckbox,
    ShoppingBagIcon,
  },
  data() {
    return {
      data: [],
      loading: false,
     

    };
  },
  mounted() {
    this.getData();
  },
  methods: {
    getData() {
      this.loading = true;
      axios
        .get(`http://127.0.0.1:8000/api/shop/list-orders-payed/`, {
          headers: {
            "Content-type": "application/json",
            Accept: "application/json",
            Authorization: `Token ${this.$store.state.token}`,
          },
        })
        .then((response) => {
          this.data = response.data;
          this.loading = false;
      

          console.log(this.productsCart);
        });
    },
  },
};
</script>
