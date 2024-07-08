<template>
    <div class="flex justify-center mt-6" v-if="loading == true">
        <span class="loader"></span>
    </div>

    <div v-else class="mt-2">
        <div v-if="order != null" class="p-2 m-2">
            <div class="px-3 py-2 pb-4">
                <div class="d-flex flex-row justify-content-end">

                    <div class="col-10">
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

            <div v-else class="rtl">
                <div class="mb-4">
                    <h4 class="irsa">آدرس:</h4>
                    <p class="text-xs irsa">
                        {{ order.address.address }}
                    </p>
                </div>

                <div class="row justify-content-start">
                    <CartItem class="col-12 col-lg-4 mx-2" v-for="cartItem in filteredCartItems"
                        :key="cartItem.id + 'cartItem list'" :cartItem="cartItem" :editable="false">
                    </CartItem>
                </div>
            </div>
        </div>

        <div v-else>
            <alert class="mx-4 my-2">
                چیزی برای نمایش وجود ندارد
            </alert>
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
            order: null,
        };
    },
    components: {
        CartItem,
    },
    async mounted() {
        this.userData();
        this.getOrder();
    },
    computed: {
        filteredCartItems() {
            if (this.searchedValue == "") {
                return this.order.items;
            }
            return this.order.items.filter(cartItem => {
                var c1 = cartItem.product.name.includes(this.searchedValue);
                var c2 = cartItem.product.description.includes(this.searchedValue);

                return c1 || c2;
            });
        },
        totalCost() {
            var total = 0;
            this.order.items.forEach(cartItem => {
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
        async getOrder() {
            this.loading = true;
            await fetch(`https://pharmedi.ir/api/shop/retrieve-order/${this.$route.params.id}/`, {
                headers: {
                    "Content-type": "application/json",
                    Accept: "application/json",
                    Authorization:
                        this.$store.state.token != ""
                            ? `Token ${this.$store.state.token}`
                            : "",
                },
            })
                .then((response) => response.status == 200 ? response.json() : '')
                .then((data) => {
                    if (data != '') {
                        this.order = data;
                    }
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