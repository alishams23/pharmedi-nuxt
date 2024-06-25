<template></template>

<script>
export default {
    name: 'Logout',
    mounted() {

        this.$store.commit("logout")
        this.$router.push("/t/login")

    }
}
</script>

<style></style>