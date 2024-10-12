<template>
  <div>
    <Pharmacy v-for="item in data" :key="item.id + 'item shift profile'" :data="item" />
    <Empty v-if="data.length == 0" />
  </div>
</template>

<script>
import Pharmacy from "./Pharmacy.vue";
export default {
  props: ["username"],
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
        `https://pharmedi.ir/api/account/Pharmacy_list_user/${this.username}`,
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
  components: { Pharmacy },
};
</script>

<style></style>
