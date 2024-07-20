<template>
    <div class="flex justify-center mt-6" v-if="loading == true">
        <span class="loader"></span>
    </div>

    <div v-else class="mt-2">
        <div class="p-2 m-2">


            <div class="px-3 py-2 pb-4">
                <div class="d-flex flex-row"
                    :class="cartItems.length > 0 ? 'justify-content-between' : 'justify-content-end'">

                    <!-- <button v-if="cartItems.length > 0" class="shadow-2 border rounded-13 me-2" @click="buy()">
                        <div class="d-flex p-3 text-white bg-gradient-blue rounded-13">
                            <i class="fa fa-check"></i>
                            <p class="text-xs fw-bold ml-2">نهایی سازی</p>
                        </div>
                    </button> -->

                    <nuxt-link :to="'/t/shop/confirm'" v-if="cartItems.length > 0"
                        class="shadow-2 border rounded-13 me-2">
                        <div class="d-flex p-3 text-white bg-gradient-blue rounded-13">
                            <i class="fa fa-check"></i>
                            <p class="text-xs fw-bold ml-2">نهایی سازی</p>
                        </div>
                    </nuxt-link>

                    <div class="col-8 col-md-10">
                        <input v-model="searchedValue" class="col-12 rounded-13 rtl shadow-3" name="name" type="search"
                            placeholder="جستجو" />
                    </div>
                </div>
            </div>


            <div v-if="filteredCartItems.length == 0">
                <alert class="mx-4 my-2">
                    سبد خرید خالی است
                </alert>
            </div>

            <div v-else class="row justify-content-end">
                <CartItem class="col-12 col-lg-4 mx-2" v-for="cartItem in filteredCartItems"
                    :key="cartItem.id + 'cartItem list'" :cartItem="cartItem" :editable="true">
                </CartItem>
            </div>
        </div>

    </div>
</template>

<script>
import CartItem from "~/components/CartItem.vue";

export default {
    data() {
        return {
            loading: false,
            user: {},
            searchedValue: "",
            cartItems: [],
        };
    },
    components: {
        CartItem,
    },
    async mounted() {
        this.userData();
        this.getCartItems();
    },
    computed: {
        filteredCartItems() {
            if (this.searchedValue == "") {
                return this.cartItems;
            }
            return this.cartItems.filter(cartItem => {
                var c1 = cartItem.product.name.includes(this.searchedValue);
                var c2 = cartItem.product.description.includes(this.searchedValue);

                return c1 || c2;
            });
        },
        totalCost() {
            var total = 0;
            this.cartItems.forEach(cartItem => {
                total += this.getCalculatedPrice(cartItem.product) * cartItem.quantity;
            });

            return total;
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
                });

            this.loading = false;
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
        reload() {
            window.location.reload();
        },
    },
};
</script>

<style scoped></style>