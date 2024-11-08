<template>
  <div class="px-3">
    <div class="mb-lg-4 pb-3" style="
        position: fixed;
        width: 76px;
        right: 0;
        bottom: 0;
        z-index: 9;
        margin-bottom: 72px;
      ">
      <nuxt-link :to="checkLogin() ? '/t/textEditor' : '/t/login'"
        class=" text-white  ">
      <div class=" bg-gradient-to-tl  from-[#2741e7] to-[#2aa2f2]   h-[55px] w-[55px] flex justify-center items-center rounded-full">
          <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" fill="currentcolor" class="bi bi-plus"
            viewBox="0 0 16 16">
            <path
              d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z" />
          </svg>
      </div>
      </nuxt-link>
    </div>
    <BlogSectionHeader/>
    <BlogSectionCategories />
    <BlogSectionSweaperBest />
    <BlogSectionSearch />
  </div>
</template>

<script>


export default {
  name: "Home",
  data() {
    return {
    
    };
  },

  methods: {
    checkLogin() {
      return this.$store.state.isAuthenticated == true;
    },
   
  },
};
</script>


