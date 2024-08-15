<template>
  <div>
    <p class="rtl fs-4 text-treaget fw-bold mt-5 irsa">شیفت ها</p>
    <shift v-for="item in data" :key="item.id + 'item shift profile'" :data="item" />
  </div>
</template>

<script>
export default {
  props: ["idUser"],
  data() {
    return {
      loading: true,
      data: [],
    };
  },
  methods: {
    getData() {
      this.loading = true;
      fetch(
        `https://pharmedi.ir/api/shift/Shift_request_Pharmacy/${this.idUser}/`,
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
        .then((response) => response.json())
        .then((data) => {
          this.data = data;
          this.loading = false;
        });
    },
  },
  mounted() {
    this.getData();
  },
};
</script>

<style></style>
