<template>
  <div dir="rtl" class=" ">
    <div class="mx-auto max-w-2xl px-4 pb-24 sm:px-6 lg:max-w-7xl lg:px-8">
      <div class="flex mx-3 items-center justify-end" style="direction: ltr">
        <h2 class="irsa text-lg font-bold text-right my-3 mr-4">سبد خرید</h2>
        <div
          class="h-12 w-12 bg-treaget flex justify-center items-center mr-5 rounded-2xl"
        >
          <ShoppingBagIcon class="w-8 h-8 text-white" />
        </div>
      </div>
      <div
        v-if="loading"
        class="flex space-x-1 justify-center items-center h-[350px]"
      >
        <div class="loader"></div>
      </div>

      <div v-else>
        <ol
          class="flex items-center w-full text-sm mt-5 font-medium text-center text-gray-500 sm:text-base"
        >
          <li
            @click="page = 0"
            class="flex md:w-full cursor-pointer items-center sm:after:content-[''] after:w-full after:h-1 after:border-b after:border-gray-200 after:border-1 after:hidden sm:after:inline-block after:mx-6 xl:after:mx-10"
            :class="page == 0 ? 'text-blue-600 ' : ''"
          >
            <span
              class="flex items-center after:content-['/'] sm:after:hidden after:mx-2 after:text-gray-200"
            >
              <svg
                v-if="page == 0"
                class="w-3.5 h-3.5 sm:w-4 sm:h-4 me-2.5"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 8.207-4 4a1 1 0 0 1-1.414 0l-2-2a1 1 0 0 1 1.414-1.414L9 10.586l3.293-3.293a1 1 0 0 1 1.414 1.414Z"
                />
              </svg>
              <span
                v-else
                class="me-2 h-4 w-4 text-[9px] bg-gray-400 rounded-full text-white text-center cursor-pointer"
                >1</span
              >
              بررسی <span class="hidden sm:inline-flex sm:ms-2">Info</span>
            </span>
          </li>
          <li
            class="flex md:w-full items-center after:content-[''] after:w-full after:h-1 after:border-b after:border-gray-200 after:border-1 after:hidden sm:after:inline-block after:mx-6 xl:after:mx-10"
            :class="page == 1 ? 'text-blue-600 ' : ''"
          >
            <span
              class="flex items-center after:content-['/'] sm:after:hidden after:mx-2 after:text-gray-200"
            >
              <svg
                v-if="page == 1"
                class="w-3.5 h-3.5 sm:w-4 sm:h-4 me-2.5"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 8.207-4 4a1 1 0 0 1-1.414 0l-2-2a1 1 0 0 1 1.414-1.414L9 10.586l3.293-3.293a1 1 0 0 1 1.414 1.414Z"
                />
              </svg>
              <span
                v-else
                class="me-2 h-4 w-4 text-[9px] bg-gray-400 rounded-full text-white text-center"
                >2</span
              >
              آدرس <span class="hidden sm:inline-flex sm:ms-2">Info</span>
            </span>
          </li>
          <li
            class="flex md:w-full items-center after:content-[''] after:w-full after:h-1 after:border-b after:border-gray-200 after:border-1 after:hidden sm:after:inline-block after:mx-6 xl:after:mx-10"
            :class="page == 2 ? 'text-blue-600 ' : ''"
          >
            <span
              class="flex items-center after:content-['/'] sm:after:hidden after:mx-2 after:text-gray-200"
            >
              <svg
                v-if="page == 2"
                class="w-3.5 h-3.5 sm:w-4 sm:h-4 me-2.5"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 8.207-4 4a1 1 0 0 1-1.414 0l-2-2a1 1 0 0 1 1.414-1.414L9 10.586l3.293-3.293a1 1 0 0 1 1.414 1.414Z"
                />
              </svg>
              <span
                v-else
                class="me-2 h-4 w-4 text-[9px] bg-gray-400 rounded-full text-white text-center"
                >3</span
              >
              پرداخت <span class="hidden sm:inline-flex sm:ms-2">Info</span>
            </span>
          </li>
        </ol>
        <div v-if="page == 0">
          <div
            class="mt-12 lg:grid lg:grid-cols-12 lg:items-start lg:gap-x-12 xl:gap-x-16"
            v-if="productsCart.length > 0 && productsCart[0].items.length > 0"
          >
            <section
              aria-labelledby="cart-heading"
              class="lg:col-span-7 py-3"
              :class="
                productsCart.length > 0 && productsCart[0].items.length > 0
                  ? 'bg-white rounded-xl'
                  : ''
              "
            >
              <h2 id="cart-heading" class="sr-only">
                Items in your shopping cart
              </h2>
              <ul role="list" class="divide-y divide-gray-200">
                <li
                  v-for="item in productsCart[0].items"
                  :key="item.id"
                  class="flex py-6 px-4 sm:py-10"
                >
                  <div class="flex-shrink-0">
                    <img
                      :src="item.product.images[0].image"
                      :alt="item.imageAlt"
                      class="h-24 w-24 rounded-md object-cover object-center sm:h-48 sm:w-48"
                    />
                  </div>
                  <div
                    class="mr-4 flex flex-1 flex-col justify-between sm:mr-6"
                  >
                    <div class="relative grid grid-cols-6 gap-x-6 pl-0">
                      <div class="col-span-4">
                        <h3 class="text-sm">
                          <a
                            :href="item.href"
                            class="font-medium line-clamp-1 text-gray-700 text-clip hover:text-gray-800"
                            >{{ item.product.name }}</a
                          >
                        </h3>
                        <p class="mt-5 text-sm font-medium text-gray-900">
                          {{
                            item.product.price -
                            (item.product.price * item.product.discount) / 100
                          }}
                        </p>
                      </div>
                      <div class="col-span-1 flex items-center">
                        <div>{{ item.quantity }}</div>
                        <div class="mx-3">
                          <ChevronUpIcon
                            @click="sendToCart(item.product.id)"
                            class="h-6"
                          />
                          <ChevronDownIcon
                            @click="RemoveFromCart(item.product.id)"
                            class="h-6"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </li>
              </ul>
            </section>

            <!-- Order summary -->
            <section
              aria-labelledby="summary-heading"
              class="mt-16 rounded-2xl bg-white px-4 py-6 sm:p-6 lg:col-span-5 lg:mt-0 lg:p-8"
            >
              <h2
                id="summary-heading"
                class="irsa text-lg font-medium text-gray-900"
              >
                خلاصه سفارشات
              </h2>

              <dl class="mt-6 space-y-4">
                <div class="flex items-center justify-between">
                  <dt class="text-sm text-gray-600">قیمت محصولات</dt>
                  <dd class="text-sm font-medium text-gray-900">
                    {{ getCalculatedPrice() }}
                    <span class="text-gray-500 text-xs font-light">تومان</span>
                  </dd>
                </div>
                <div
                  class="flex items-center justify-between border-t border-gray-200 pt-4"
                >
                  <dt class="flex items-center text-sm text-gray-600">
                    <span>براورد حمل و نقل</span>
                    <a
                      href="#"
                      class="mr-2 flex-shrink-0 text-gray-400 hover:text-gray-500"
                    >
                      <span class="sr-only"
                        >Learn more about how shipping is calculated</span
                      >
                      <QuestionMarkCircleIcon
                        class="h-5 w-5"
                        aria-hidden="true"
                      />
                    </a>
                  </dt>
                  <dd class="text-sm font-medium text-gray-900">
                    {{ getCalculatedDeliverPrice() }}
                    <span class="text-gray-500 text-xs font-light">تومان</span>
                  </dd>
                </div>

                <div
                  class="flex items-center justify-between border-t border-gray-200 pt-4"
                >
                  <dt class="text-base font-medium text-gray-900">
                    مجموع سفارشها
                  </dt>
                  <dd class="text-base font-medium text-gray-900">
                    {{ getCalculatedPrice() + getCalculatedDeliverPrice() }}
                    <span class="text-gray-500 text-xs font-light">تومان</span>
                  </dd>
                </div>
              </dl>
              <form
                v-if="btn_discount_loading == false"
                @submit.prevent="checkDiscountCode()"
                class="flex items-center pt-3 mt-3 mb-2 border-t"
              >
                <input
                  placeholder="کد تخفیف"
                  class="bg-gray-50 border rtl border-gray-300 text-gray-900 text-sm rounded-2xl focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 shadow-none"
                  type="tel"
                  id="phone_number"
                  v-model="discount_code"
                  required
                />
                <button
                  type="submit"
                  class="flex justify-center mr-2 items-center rounded-full bg-green-100"
                >
                  <CheckIcon class="h-6 w-6 m-[6px] text-green-600" />
                </button>
              </form>
              <div v-else class="flex items-center h-[100px] justify-center">
                <div class="loader"></div>
              </div>
              <alert2
                type="danger"
                v-if="snackbarDiscountError == true"
                text="کد تخفیف معتبر نیست"
              />
              <alert2
                type="success"
                v-if="discount_amount > 0"
                text="کد تخفیف  اعمال شد"
              />

              <div class="mt-6" v-if="getCalculatedPrice() > 0">
                <button
                  @click="
                    page = 1;
                    discount_amount == 0 ? (discount_code = '') : '';
                  "
                  class="w-full rounded-xl border border-transparent bg-treaget px-4 py-3 text-base font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-treaget focus:ring-offset-2 focus:ring-offset-gray-50"
                >
                  مرحله ی بعد
                </button>
              </div>
            </section>
          </div>
          <div v-else>
            <div class="flex justify-center items-center h-[300px]">
              <Alert2
                text="محصولی برای انتقال به سبد خرید انتخاب نشده است"
                class_inside="shadow-3"
              />
            </div>
          </div>
        </div>
        <div v-if="page == 1">
          <div class="flex justify-center mt-10">
            <div
              id="alert-4"
              class="rtl flex items-center justify-start p-4 text-blue-800 rounded-3xl bg-gray-200"
              role="alert"
            >
              <svg
                class="flex-shrink-0 w-4 h-4"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z"
                />
              </svg>
              <span class="sr-only">Warning</span>
              <div class="ms-3 text-sm font-medium">
                لطفا اطلاعات محل دریافت مرسوله را با دقت پر کنید
              </div>
            </div>
          </div>
          <form @submit.prevent="nextStep" class="rtl">
            <div class="row">
              <div class="col-6">
                <label
                  class="text-right w-auto mr-3 rtl mt-3 mb-0 text-sm font-medium text-gray-900"
                  for="city"
                  >نام:</label
                >
                <input
                  class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-2xl focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 shadow-none"
                  id="first_name"
                  v-model="first_name"
                  required
                />
              </div>
              <div class="col-6">
                <label
                  class="text-right w-auto mr-3 rtl mt-3 mb-0 text-sm font-medium text-gray-900"
                  for="city"
                  >نام خانوادگی:</label
                >
                <input
                  class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-2xl focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 shadow-none"
                  id="city"
                  v-model="last_name"
                  required
                />
              </div>
            </div>

            <div class="row">
              <div class="col-6">
                <label
                  class="text-right w-auto mr-3 rtl mt-3 mb-0 text-sm font-medium text-gray-900"
                  for="city"
                  >شهر:</label
                >
                <input
                  class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-2xl focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 shadow-none"
                  id="city"
                  v-model="city"
                  required
                />
              </div>
              <div class="col-6">
                <label
                  class="text-right w-auto mr-3 rtl mt-3 mb-0 mtext-sm font-medium text-gray-900"
                  for="state"
                  >استان:</label
                >
                <input
                  class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-2xl focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 shadow-none"
                  id="state"
                  v-model="state"
                  required
                />
              </div>
            </div>
            <div class="">
              <label
                class="text-right w-auto mr-3 rtl mt-3 mb-0 text-sm font-medium text-gray-900"
                for="zip_code"
                >کد پستی:</label
              >
              <input
                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-2xl focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 shadow-none"
                id="zip_code"
                v-model="zip_code"
                required
              />
            </div>

            <div>
              <label
                class="text-right w-auto mr-3 rtl mt-3 mb-0 text-sm font-medium text-gray-900"
                for="address"
                >آدرس:</label
              >
              <textarea
                v-model="address"
                id="address"
                type="text"
                required
                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-2xl focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 shadow-none"
              />
            </div>
            <div class="">
              <label
                class="text-right w-auto mr-3 rtl mt-3 mb-0 text-sm font-medium text-gray-900"
                for="phone_number"
                >تلفن همراه :</label
              >
              <input
                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-2xl focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 shadow-none"
                type="tel"
                id="phone_number"
                v-model="phone_number"
                required
              />
            </div>
            <div class="">
              <label
                class="text-right w-auto mr-3 rtl mt-3 mb-0 text-sm font-medium text-gray-900"
                for="phone_number"
              >
                تلفن منزل:</label
              >
              <input
                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-2xl focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 shadow-none"
                type="tel"
                id="phone_number"
                v-model="phone_number_home"
                required
              />
            </div>

            <div class="flex mt-5">
              <button
                type="submit"
                class="px-4 py-2 text-white rounded-xl bg-gradient-to-tl from-[#2741e7] to-[#2aa2f2]"
              >
                مرحله بعد
              </button>

              <div>
                <button
                  @click="page = 0"
                  class="px-4 py-2 mx-3 rounded-xl border"
                >
                  بازگشت
                </button>
              </div>
            </div>
          </form>
        </div>
        <div v-if="page == 2">
          <div class="mt-10 mx-3">
            <div class="text-xl pb-5 text-blue-700 font-semibold">
              پیش فاکتور
            </div>

            <div class="grid grid-cols-4 gap-4">
              <div class="col-span-2">
                <span class="text-md font-semibold">کد پستی :</span>
                <p class="pr-1 mt-2 text-sm">{{ zip_code }}</p>
              </div>
              <div class="col-span-1">
                <span class="text-md font-semibold"> استان :</span>
                <p class="pr-1 mt-2 text-sm">{{ state }}</p>
              </div>
              <div class="col-span-1">
                <span class="text-md font-semibold"> شهر :</span>
                <p class="pr-1 mt-2 text-sm">{{ city }}</p>
              </div>
              <div class="col-span-2">
                <span class="text-md font-semibold">نام و نام خانواگی :</span>
                <p class="pr-1 mt-2 text-sm">
                  {{ first_name + " " + last_name }}
                </p>
              </div>
              <div class="col-span-2 md:col-span-1">
                <span class="text-md font-semibold">شماره همراه :</span>
                <p class="pr-1 mt-2 text-sm">
                  {{ phone_number }}
                </p>
              </div>
              <div class="col-span-2 md:col-span-1">
                <span class="text-md font-semibold">شماره خانه :</span>
                <p class="pr-1 mt-2 text-sm">
                  {{ phone_number_home }}
                </p>
              </div>
              <div class="col-span-2 md:col-span-4">
                <span class="text-md font-semibold">آدرس:</span>
                <p class="pr-1 mt-2 text-sm">{{ address }}</p>
              </div>
            </div>
          </div>
          <div class="mx-auto">
            <div class="rounded my-10 pt-10 overflow-scroll">
              <table class="min-w-full text-right">
                <thead class="">
                  <tr class="bg-gray-200">
                    <th class="py-4 px-4 border-gray-200 rounded-s-xl">
                      محصولات
                    </th>
                    <th class="py-4 px-4 border-gray-200">قیمت</th>
                    <th class="py-4 px-4 border-gray-200">تعداد</th>
                    <th class="py-4 px-4 border-gray-200">تخفیف</th>
                    <th class="py-4 px-4 border-gray-200 rounded-e-xl">
                      مجموع
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr
                    v-for="item in productsCart[0].items"
                    :key="item.id"
                    class=""
                  >
                    <td class="py-4 px-4 border-b border-gray-200">
                      {{ item.product.name }}
                    </td>
                    <td class="py-4 px-4 border-b border-gray-200">
                      {{ item.product.price }}
                      <span class="text-gray-500 text-xs font-light"
                        >تومان</span
                      >
                    </td>
                    <td class="py-4 px-4 border-b border-gray-200">۱</td>
                    <td class="py-4 px-4 border-b border-gray-200">
                      {{ item.product.discount }}%
                    </td>
                    <td class="py-4 px-4 border-b border-gray-200">
                      {{
                        item.product.price -
                        (item.product.price * item.product.discount) / 100
                      }}
                      <span class="text-gray-500 text-xs font-light"
                        >تومان</span
                      >
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div class="row flex-row-reverse items-end">
              <div class="col-12 col-md-6">
                <div class="mt-6 space-y-4">
                  <div class="flex items-center justify-between">
                    <dt class="text-sm text-gray-600">قیمت محصولات</dt>
                    <dd class="text-sm font-medium text-gray-900">
                      {{ getCalculatedPrice() }}
                      <span class="text-gray-500 text-xs font-light"
                        >تومان</span
                      >
                    </dd>
                  </div>
                  <div
                    class="flex items-center justify-between border-t border-gray-200 pt-4"
                  >
                    <dt class="flex items-center text-sm text-gray-600">
                      <span>براورد حمل و نقل</span>
                      <a
                        href="#"
                        class="mr-2 flex-shrink-0 text-gray-400 hover:text-gray-500"
                      >
                        <span class="sr-only"
                          >Learn more about how shipping is calculated</span
                        >
                        <QuestionMarkCircleIcon
                          class="h-5 w-5"
                          aria-hidden="true"
                        />
                      </a>
                    </dt>
                    <dd class="text-sm font-medium text-gray-900">
                      {{ getCalculatedDeliverPrice() }}
                      <span class="text-gray-500 text-xs font-light"
                        >تومان</span
                      >
                    </dd>
                  </div>

                  <div
                    class="flex items-center justify-between border-t border-gray-200 pt-4"
                  >
                    <dt class="text-base font-medium text-gray-900">
                      مجموع سفارشها
                    </dt>
                    <dd class="text-base font-medium text-gray-900">
                      {{ getCalculatedPrice() + getCalculatedDeliverPrice() }}
                      <span class="text-gray-500 text-xs font-light"
                        >تومان</span
                      >
                    </dd>
                  </div>
                </div>
              </div>
              <div class="col-12 col-md-6">
                <div class="flex mt-5">
                  <div>
                    <button
                      @click="pay"
                      class="px-4 py-2 mt-5 text-white rounded-xl bg-gradient-to-tl from-[#2741e7] to-[#2aa2f2]"
                    >
                      تکمیل خرید
                    </button>
                  </div>
                  <div>
                    <button
                      @click="page = 1"
                      class="px-4 py-2 mt-5 mx-3 rounded-xl border"
                    >
                      بازگشت
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import {
  QuestionMarkCircleIcon,
  XMarkIcon,
  ChevronUpIcon,
  ChevronDownIcon,
  CheckIcon,
} from "@heroicons/vue/20/solid";
import axios from "axios";
import { ShoppingBagIcon } from "@heroicons/vue/20/solid";

export default {
  components: {
    ChevronUpIcon,
    ChevronDownIcon,
    CheckIcon,
    ShoppingBagIcon,
  },
  data() {
    return {
      loading: true,
      productsCart: null,
      customerData: null,
      page: 0,
      city: "",
      state: "",
      zip_code: "",
      phone_number: "",
      phone_number_home: "",
      first_name: "",
      last_name: "",
      address: "",
      discount_amount: 0,
      discount_code: "",
      snackbarDiscountError: false,
      btn_discount_loading: false,
    };
  },
  methods: {
    checkDiscountCode() {
      this.snackbarDiscountError = false;
      this.btn_discount_loading = true;
      const apiUrl = `https://pharmedi.ir/api/shop/check-valid-product-discount/${this.discount_code}/`;
      axios
        .get(apiUrl, {
          headers: {
            "Content-Type": "multipart/form-data",
            Accept: "application/json",
            Authorization: `Token ${this.$store.state.token}`,
          },
        })
        .then((response) => {
          console.log("discount", response.data);
          if (response.data.valid) {
            this.discount_amount = response.data.amount;
          } else {
            this.discount_amount = 0;
            this.snackbarDiscountError = true;
          }
          this.btn_discount_loading = false;
        })
        .catch((error) => {
          // Handle error response
          this.snackbarDiscountError = true;
          this.discount_amount = 0;
        });
    },
    getData() {
      this.loading = true;
      axios
        .get(`https://pharmedi.ir/api/shop/list-orders/?status=processing`, {
          headers: {
            "Content-type": "application/json",
            Accept: "application/json",
            Authorization: `Token ${this.$store.state.token}`,
          },
        })
        .then((response) => {
          this.productsCart = response.data;
          this.loading = false;
          // console.log(this.productsCart);
        });
    },
    sendToCart(product_id) {
      this.loading = false;

      axios
        .post(
          `https://pharmedi.ir/api/shop/add-product-to-cart/`,
          { product_id: product_id },
          {
            headers: {
              "Content-type": "application/json",
              Accept: "application/json",
              Authorization: `Token ${this.$store.state.token}`,
            },
          }
        )
        .then((response) => {
          this.getData();
        })
        .catch((error) => {
          console.error(
            "Error:",
            error.response ? error.response.data : error.message
          );
          console.error("Config:", error.config);
          if (error.response) {
            console.error("Response data:", error.response.data);
            console.error("Response status:", error.response.status);
            console.error("Response headers:", error.response.headers);
          }
        });
    },
    RemoveFromCart(product_id) {
      this.loading = true;
      axios
        .post(
          `https://pharmedi.ir/api/shop/remove-product-from-cart/`,
          { product_id: product_id },
          {
            headers: {
              "Content-type": "application/json",
              Accept: "application/json",
              Authorization: `Token ${this.$store.state.token}`,
            },
          }
        )
        .then((response) => {
          this.getData();
        })
        .catch((error) => {
          console.error(
            "Error:",
            error.response ? error.response.data : error.message
          );
          console.error("Config:", error.config);
          if (error.response) {
            console.error("Response data:", error.response.data);
            console.error("Response status:", error.response.status);
            console.error("Response headers:", error.response.headers);
          }
        });
    },
    getCalculatedPrice(productsCart) {
      let price = 0;
      if (
        this.loading == false &&
        this.productsCart.length > 0 &&
        this.productsCart[0].items.length > 0
      ) {
        for (
          let index = 0;
          index < this.productsCart[0].items.length;
          index++
        ) {
          const element = this.productsCart[0].items[index];
          price +=
            (element.product.price -
              (element.product.price * element.product.discount) / 100) *
            element.quantity;
        }
      }
      return price - (price * this.discount_amount) / 100;
    },
    getCalculatedDeliverPrice() {
      let price = 0;
      if (
        this.loading == false &&
        this.productsCart.length > 0 &&
        this.productsCart[0].items.length > 0
      ) {
        price = 20000;
        for (
          let index = 0;
          index < this.productsCart[0].items.length;
          index++
        ) {
          price += 15000 * this.productsCart[0].items[index].quantity;
        }
      }
      return price;
    },
    getCustomerData() {
      axios
        .get("https://pharmedi.ir/api/account/addresses/", {
          headers: {
            "Content-type": "application/json",
            Accept: "application/json",
            Authorization: `Token ${this.$store.state.token}`,
          },
        })
        .then((response) => {
          this.customerData = response.data;
          console.log("moshakhasat ine:", this.customerData);
          if (this.customerData.length > 0) {
            this.first_name = this.customerData[0].first_name;
            this.last_name = this.customerData[0].last_name;
            this.city = this.customerData[0].city;
            this.state = this.customerData[0].state;
            this.zip_code = this.customerData[0].zip_code;
            this.address = this.customerData[0].address;
            this.phone_number = this.customerData[0].phone_number;
            this.phone_number_home = this.customerData[0].phone_number_home;
          } else {
            this.first_name = "";
            this.last_name = "";
            this.city = "";
            this.state = "";
            this.zip_code = "";
            this.address = "";
            this.phone_number = "";
            this.phone_number_home = "";
          }
        });
    },
    nextStep() {
      this.page = 2;
      console.log(this.page);
    },

    async pay() {
      this.loading = true;
      try {
        const response = await axios.post(
          "https://pharmedi.ir/api/shop/payment/",
          {
            address: this.address,
            city: this.city,
            state: this.state,
            zip_code: this.zip_code,
            phone_number: this.phone_number,
            discount_code: this.discount_code,
            phone_number_home: this.phone_number_home,
            first_name: this.first_name,
            last_name: this.last_name,
          },
          {
            headers: {
              "Content-type": "application/json",
              Accept: "application/json",
              Authorization: `Token ${this.$store.state.token}`,
            },
          }
        );

        if (response.status === 200) {
          const data = response.data;
          window.location.href = data["result"];
        } else {
          // Handle non-200 status codes if needed
        }
      } catch (error) {
        // Handle errors here
      } finally {
        this.loading = false;
      }
    },
  },
  mounted() {
    this.getData();
    this.getCustomerData();
  },
};
</script>
