<template>
    <div class="text-right">
        <h3 class="irsa mb-4">تأیید سفارش</h3>

        <div class="mb-2 p-4 rounded-10 shadow-2">

            <h5 class="irsa mb-3">آدرس</h5>
            <hr>
            <div v-for="(address, index) in addresses" :key="index">
                <div class="form-check shadow-2 m-2 rtl rounded-10 p-2">
                    <input class="form-check-input" type="radio" :name="`flexRadioDefault-${index}`"
                        :id="`flexRadioDefault-${index}`" :checked="index === selectedAddress"
                        @change="selectedAddress = index">

                    <label class="form-check-label text-xs" :for="`flexRadioDefault-${index}`">
                        {{ address.address }}, {{ address.city }}, {{ address.state }}
                    </label>

                    <div class="">
                        <button class="ms-2 irsa mt-4 py-1 px-2 bg-gradient-red rounded-10 text-white text-xs"
                            @click="showDeleteAddressPopup(address)">
                            <i class="fa fa-trash m-1"></i>
                            حذف
                        </button>
                        <button class="irsa mt-4 py-1 px-2 bg-white border rounded-10 text-black text-xs"
                            @click="editAddress(address)">
                            <i class="fa fa-edit m-1"></i>
                            ویرایش
                        </button>
                    </div>
                </div>
            </div>

            <button @click="addAddress()" class="irsa mt-4 py-2 px-3 bg-gradient-blue rounded-10 text-white">+ افزودن
                آدرس جدید</button>
        </div>

        <div class="mt-4 p-4 pb-1 rounded-10 shadow-2">
            <h5 class="irsa mb-3">مبلغ</h5>
            <hr class="mb-2">

            <div class="row rtl">
                <div class="col-4 col-md-2">
                    <h5 class="irsa mb-3">مبلغ سفارش</h5>
                </div>
                <div class="col-8 col-md-10">
                    <p class="irsa">{{ getFormattedPrice(totalOrderCost) }} تومان</p>
                </div>
            </div>

            <div class="row rtl">
                <div class="col-4 col-md-2">
                    <h5 class="irsa mb-3">هزینه ارسال</h5>
                </div>
                <div class="col-8 col-md-10">
                    <p class="irsa">{{ getFormattedPrice(postCost) }} تومان</p>
                </div>
            </div>

            <hr class="mb-2">

            <div class="row rtl">
                <div class="col-4 col-md-2">
                    <h5 class="irsa mb-3 fw-bold">جمع کل</h5>
                </div>
                <div class="col-8 col-md-10">
                    <p class="irsa fw-bold">{{ getFormattedPrice(totalCost) }} تومان</p>
                </div>
            </div>

        </div>

        <button class="shadow-2 border mt-4 col-12" @click="confirmOrder()">
            <div class="d-flex justify-content-center  py-2 px-3 text-white bg-gradient-blue rounded-10">
                <i class="fa fa-check mt-1"></i>
                <p v-if="user.cash >= totalCost" class="ml-2">ثبت سفارش</p>
                <p v-else class="ml-2">پرداخت</p>
            </div>
        </button>

        <div class="treaget-modal treaget-modal-product-check rtl" :class="addAddressModal ? 'open' : ''">
            <div class="treaget-modal-overlay" @click="hideModal()" />
            <div class="treaget-modal-card">
                <div class="treaget-modal-body">
                    <div class="treaget-modal-content fs-5">
                        <form @submit.prevent="saveAddress">
                            <div>
                                <label for="city">شهر:</label>
                                <input type="text" id="city" v-model="city" required>
                            </div>
                            <div>
                                <label for="state">استان:</label>
                                <input type="text" id="state" v-model="state" required>
                            </div>
                            <div>
                                <label for="zip_code">کد پستی:</label>
                                <input type="text" id="zip_code" v-model="zip_code" required>
                            </div>
                            <div>
                                <label for="phone_number">شماره تلفن:</label>
                                <input type="tel" id="phone_number" v-model="phone_number" required>
                            </div>
                            <div>
                                <label for="address">آدرس:</label>
                                <textarea v-model="address" id="address" type="text"
                                    class="shadow-none rtl px-2 bg-white border-bottom" />
                            </div>
                        </form>
                    </div>
                    <div class="treaget-modal-footer">
                        <div class="d-flex">
                            <button class="bg-white py-2 border rounded-13 px-4" @click="confirmAddress()">
                                تایید
                            </button>
                            <button class="bg-white me-1 py-2 border rounded-13 px-4" @click="hideModal()">
                                لغو
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <div class="treaget-modal treaget-modal-product-check rtl" :class="editAddressModal ? 'open' : ''">
            <div class="treaget-modal-overlay" @click="hideModal()" />
            <div class="treaget-modal-card">
                <div class="treaget-modal-body">
                    <div class="treaget-modal-content fs-5">
                        <form @submit.prevent="saveAddress">
                            <div>
                                <label for="city">شهر:</label>
                                <input type="text" id="city" v-model="city" required>
                            </div>
                            <div>
                                <label for="state">استان:</label>
                                <input type="text" id="state" v-model="state" required>
                            </div>
                            <div>
                                <label for="zip_code">کد پستی:</label>
                                <input type="text" id="zip_code" v-model="zip_code" required>
                            </div>
                            <div>
                                <label for="phone_number">شماره تلفن:</label>
                                <input type="tel" id="phone_number" v-model="phone_number" required>
                            </div>
                            <div>
                                <label for="address">آدرس:</label>
                                <textarea v-model="address" id="address" type="text"
                                    class="shadow-none rtl px-2 bg-white border-bottom" />
                            </div>
                        </form>
                    </div>
                    <div class="treaget-modal-footer">
                        <div class="d-flex">
                            <button class="bg-white py-2 border rounded-13 px-4" @click="confirmEditAddress()">
                                تایید
                            </button>
                            <button class="bg-white me-1 py-2 border rounded-13 px-4" @click="hideModal()">
                                لغو
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <div class="treaget-modal treaget-modal-product-check rtl" :class="deleteAddressModal ? 'open' : ''">
            <div class="treaget-modal-overlay" @click="hideModal()" />
            <div class="treaget-modal-card">
                <div class="treaget-modal-body">
                    <div class="treaget-modal-content fs-5">
                        <p>
                            آیا مایل به حذف آدرس انتخابی هستید؟
                        </p>
                    </div>
                    <div class="treaget-modal-footer">
                        <div class="d-flex">
                            <button class="bg-white py-2 border rounded-13 px-4" @click="confirmDeleteAddress()">
                                بله
                            </button>
                            <button class="bg-white me-1 py-2 border rounded-13 px-4" @click="hideModal()">
                                خیر
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <div class="treaget-modal treaget-modal-product-check rtl" :class="errorAddressModal ? 'open' : ''">
            <div class="treaget-modal-overlay" @click="hideModal()" />
            <div class="treaget-modal-card">
                <div class="treaget-modal-body">
                    <div class="treaget-modal-content fs-5">
                        <p>
                            آدرسی انتخاب نشده است.
                        </p>
                        <p>
                            برای ادامه، ابتدا اقدام به انتخاب آدرس کنید.
                        </p>
                    </div>
                    <div class="treaget-modal-footer">
                        <div class="d-flex">
                            <button class="bg-white me-1 py-2 border rounded-13 px-4" @click="hideModal()">
                                تایید
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <div class="treaget-modal treaget-modal-product-check rtl" :class="modal ? 'open' : ''">
            <div class="treaget-modal-overlay" @click="hideModal()" />
            <div class="treaget-modal-card">
                <div class="treaget-modal-body">
                    <div class="treaget-modal-content fs-5">
                        <p>مبلغ پرداختی {{ getFormattedPrice(totalCost) }} تومان می‌باشد که در کیف پول موجود نیست.
                        </p>
                        <p>
                            لطفا از طریق دکمه ی "پرداخت" مبلغ را پرداخت کرده و مجددا برای نهایی سازی خرید به این منو
                            مراجعه کنید.
                        </p>
                    </div>
                    <div class="treaget-modal-footer">
                        <div class="d-flex">
                            <button class="bg-white py-2 border rounded-13 px-4" @click="increaseCredit()">
                                پرداخت
                            </button>
                            <button class="bg-white me-1 py-2 border rounded-13 px-4" @click="hideModal()">
                                لغو
                            </button>
                        </div>
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
            user: {},
            addAddressLoading: false,

            selectedAddress: 0,

            modal: false,

            errorAddressModal: false,
            deleteAddressModal: false,
            editAddressModal: false,
            selectedAddressForDelete: null,
            selectedAddressForEdit: null,

            addAddressModal: false,
            address: "",
            city: "",
            state: "",
            zip_code: "",
            phone_number: "",

            cartItems: [],
            addresses: [],
        }
    },
    mounted() {
        this.userData();
        this.getCartItems();
        this.getAddresses();
    },
    computed: {
        postCost() {
            if (this.cartItems.length == 1) {
                return 31000;
            } else if (this.cartItems.length == 2) {
                return 41000;
            }

            return 51000;
        },
        totalOrderCost() {
            var total = 0;
            this.cartItems.forEach(cartItem => {
                total += this.getCalculatedPrice(cartItem.product) * cartItem.quantity;
            });

            return total;
        },
        totalCost() {
            return this.totalOrderCost + this.postCost;
        },
    },
    methods: {
        async userData() {
            this.loading = true;
            await fetch(
                `https://pharmedi.ir/api/account/user_retrieve/${this.$store.state.username}/`
            )
                .then((response) => response.json())
                .then((data) => {
                    this.user = data;
                });
            this.loading = false;
            this.$store.commit("getType", this.user.user_type);
            this.$store.commit("getCity", this.user.city);
        },
        addAddress() {
            this.address = "";
            this.city = "";
            this.state = "";
            this.zip_code = "";
            this.phone_number = "";

            this.addAddressModal = true;
        },
        editAddress(addr) {
            this.address = addr.address;
            this.city = addr.city;
            this.state = addr.state;
            this.zip_code = addr.zip_code;
            this.phone_number = addr.phone_number;

            this.selectedAddressForEdit = addr;

            this.editAddressModal = true;
        },
        async confirmAddress() {
            this.addAddressLoading = true;
            this.fd = new FormData();
            this.fd.append("address", this.address);
            this.fd.append("city", this.city);
            this.fd.append("state", this.state);
            this.fd.append("zip_code", this.zip_code);
            this.fd.append("phone_number", this.phone_number);

            await axios
                .post(
                    `https://pharmedi.ir/api/account/addresses/`,
                    this.fd,
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
                .then((response) => {
                    this.addAddressLoading = false;
                    this.reload();
                })
                .catch(function (error) {
                    if (error.response) {
                        console.log(error.response.data);
                        console.log(error.response.status);
                        console.log(error.response.headers);
                    }
                });
        },
        async confirmEditAddress() {
            this.addAddressLoading = true;
            this.fd = new FormData();
            this.fd.append("address", this.address);
            this.fd.append("city", this.city);
            this.fd.append("state", this.state);
            this.fd.append("zip_code", this.zip_code);
            this.fd.append("phone_number", this.phone_number);

            await axios
                .put(
                    `https://pharmedi.ir/api/account/addresses/${this.selectedAddressForEdit.id}/`,
                    this.fd,
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
                .then((response) => {
                    this.addAddressLoading = false;
                    this.reload();
                })
                .catch(function (error) {
                    if (error.response) {
                        console.log(error.response.data);
                        console.log(error.response.status);
                        console.log(error.response.headers);
                    }
                });
        },
        async increaseCredit() {
            this.loading = true;

            await fetch(`https://pharmedi.ir/api/wallet/increase-money/`, {
                method: "POST",
                headers: {
                    "Content-type": "application/json",
                    Accept: "application/json",
                    Authorization:
                        this.$store.state.token != ""
                            ? `Token ${this.$store.state.token}`
                            : "",
                },
                body: JSON.stringify({
                    amount: this.totalCost * 10,
                }),
            })
                .then((response) => {
                    if (response.status == 200) {
                        return response.json();
                    } else {
                        return '';
                    }
                })
                .then((data) => {
                    if (data != '') {
                        this.hideModal();
                        window.open(data["result"]);
                    }
                });

            this.loading = false;
        },
        async getCartItems() {
            this.loading = true;
            await fetch(`https://pharmedi.ir/api/shop/list-cart-items/`, {
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
                    this.cartItems = data;

                    if (this.cartItems.length == 0) {
                        this.$router.push('/t/shop/cart');
                    }
                });

            this.loading = false;
        },
        confirmOrder() {
            if (this.addresses.length == 0 || this.selectedAddress >= this.addresses.length || this.selectedAddress < 0) {
                this.errorAddressModal = true;
            } else {
                if (this.user.cash >= this.totalCost * 10) {
                    this.submitOrder()
                } else {
                    this.modal = true;
                }
            }
        },
        async submitOrder() {
            this.fd = new FormData();
            this.fd.append("address", this.addresses[this.selectedAddress].id);

            await axios.post(
                `https://pharmedi.ir/api/shop/submit-cart/`,
                this.fd,
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
            );
            this.$router.push('/t/shop');
        },
        async getAddresses() {
            this.loading = true;
            await fetch(`https://pharmedi.ir/api/account/addresses/`, {
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
                    this.addresses = data;
                });

            this.loading = false;
        },
        showDeleteAddressPopup(address) {
            this.selectedAddressForDelete = address;
            this.deleteAddressModal = true;
        },
        async confirmDeleteAddress() {
            this.fd = new FormData();
            this.fd.append("address", this.address);
            this.fd.append("city", this.city);
            this.fd.append("state", this.state);
            this.fd.append("zip_code", this.zip_code);
            this.fd.append("phone_number", this.phone_number);

            await axios
                .delete(
                    `https://pharmedi.ir/api/account/addresses/${this.selectedAddressForDelete.id}/`,
                    this.fd,
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
                .then((response) => {
                    this.reload();
                })
                .catch(function (error) {
                    if (error.response) {
                        console.log(error.response.data);
                        console.log(error.response.status);
                        console.log(error.response.headers);
                    }
                });
        },
        getCalculatedPrice(product) {
            var price = product.price;

            if (product.discount_value != null && product.discount_value != 0) {
                if (product.discount_type == 'percent') {
                    price = product.price - (product.price * product.discount_value / 100);
                } else {
                    price = product.price - product.discount_value;
                }
            }

            return price;
        },
        hideModal() {
            this.addAddressModal = false;
            this.modal = false;
            this.deleteAddressModal = false;
            this.errorAddressModal = false;
            this.editAddressModal = false;
        },
        reload() {
            window.location.reload();
        },
        getPersianNumber(number) {
            const persianDigits = ["۰", "۱", "۲", "۳", "۴", "۵", "۶", "۷", "۸", "۹"];

            const arabicDigits = number.toString().split("");
            let persianNumber = "";

            for (let i = 0; i < arabicDigits.length; i++) {
                const digit = parseInt(arabicDigits[i]);

                if (!isNaN(digit)) {
                    persianNumber += persianDigits[digit];
                } else {
                    persianNumber += arabicDigits[i];
                }
            }

            return persianNumber;
        },
        getFormattedPrice(number) {
            return this.getPersianNumber(number.toLocaleString());
        },
    }
}
</script>