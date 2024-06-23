<template>
    <div class="d-flex flex-row align-items-center">

        <button v-if="editable == true && cartItem.quantity != 0"
            class="fixed-size rounded-full bg-white shadow-2 border" @click="decrease"
            :class="cartItem.quantity == 1 ? 'bg-gradient-red' : ''">
            <p :class="cartItem.quantity == 1 ? 'text-white' : ''">-</p>
        </button>

        <div class="col">
            <p class="irs a text-xs text-center">{{ getPersianNumber(cartItem.quantity) }}</p>
        </div>

        <button v-if="editable == true" class="fixed-size rounded-full bg-white shadow-2 border"
            @click="increase">+</button>
    </div>
</template>

<script>
import axios from "axios";

export default {
    props: {
        cartItem: {
            type: Object,
            required: true,
        },
        editable: {
            type: Boolean,
            required: true,
        },
    },
    methods: {
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
        increase() {
            this.addToCart();
        },
        decrease() {
            if (this.cartItem.quantity == 0) {
                return;
            }

            this.removeFromCart();
        },
        async addToCart() {
            try {
                this.fd = new FormData();
                this.fd.append("product_id", this.cartItem.product.id);

                await axios.post(
                    `https://pharmedi.ir/api/shop/add-to-cart/`,
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
                ).then((response) => {
                    if (response.status == 201) {
                        this.cartItem.quantity++;
                        window.location.reload();
                    }
                });
            } catch { }
        },
        async removeFromCart() {
            try {
                this.fd = new FormData();

                await axios.post(
                    "https://pharmedi.ir/api/shop/remove-from-cart/" + this.cartItem.id + "/",
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
                ).then(
                    (response) => {
                        if (response.status == 204) {
                            this.cartItem.quantity--;
                            window.location.reload();
                        }
                    }
                );
            } catch { }
        },
    },
};
</script>

<style>
.fixed-size {
    width: 30px;
    height: 30px;
    padding: 0;
}
</style>