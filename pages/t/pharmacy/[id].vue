<template>
  <div>
    <div v-if="loading == false">
      <div class="px-3">
        <PharmacyHeader :data="user" />
        <PharmacyShift :idUser="user.id" />
      </div>
      <!-- edith1 open -->
    </div>
    <div v-else class="d-flex justify-content-center align-items-center">
      <span class="loader"></span>
    </div>
  </div>
</template>

<script>
import ProfileShift from "~/components/profileShift.vue";
import ProfilePharmacy from "~/components/profilePharmacy.vue";
import PharmacyHeader from "~/components/pharmacyHeader.vue";
import PharmacyShift from "../../../components/PharmacyShift.vue";
export default {
  data() {
    return { user: {}, loading: true, page: 0 };
  },
  methods: {
    getUserApi() {
      let headers =
        this.$store.state.token != ""
          ? {
            "Content-type": "application/json",
            Accept: "application/json",
            Authorization:
              this.$store.state.token != ""
                ? `Token ${this.$store.state.token}`
                : "",
          }
          : {
            "Content-type": "application/json",
            Accept: "application/json",
          };
      fetch(
        `http://127.0.0.1:8000/api/account/Pharmacy_retrieve/${this.$route.params.id}/`,
        { headers: headers }
      )
        .then((response) => response.json())
        .then((data) => {
          this.user = data;
          this.loading = false;
        });
    },
  },
  mounted() {
    this.getUserApi();
  },
  components: { ProfileShift, ProfilePharmacy, PharmacyHeader, PharmacyShift },
};
</script>
