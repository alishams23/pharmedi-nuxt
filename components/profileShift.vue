<template>
  <div>
    <shift v-for="item in data" :key="item.id + 'item shift profile'" :data="item" />


       <div v-if=" loading == false" class="flex justify-center">
           <div v-if="previous != null" @click="page -= 1;getData()" class="cursor-pointer relative inline-flex items-center rounded-xl bg-white px-3 py-2 text-sm text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus-visible:outline-offset-0">صفحه قبل</div>
           <div v-if="next != null" @click="page += 1;getData()" class="cursor-pointer relative ml-3 inline-flex items-center rounded-xl bg-white px-3 py-2 text-sm text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus-visible:outline-offset-0">صفحه بعد</div>
       </div>
    <Empty v-if="data.length == 0" />
  </div>
</template>

<script>
export default {
  props: ["username"],
  data() {
    return {
      loading: true,
      previous: null,
      next: null,
      page :1,
      data: [],
    };
  },
  methods: {
    getData() {
      this.loading = true;
      fetch(
        `https://pharmedi.ir/api/shift/Shift_request_user/${this.username}/?page=${this.page}`,
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
          this.next = data.next;
          this.previous = data.previous;
          
          this.data = data.results;
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
