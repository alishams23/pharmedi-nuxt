// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  css: [
    "~/node_modules/bootstrap/dist/css/bootstrap-grid.min.css",
    "~/assets/inside/WebFonts/css/fontiran.css",
    "~/assets/inside/css/inside.css",
    "~/assets/inside/css/all.min.css",
    "~/public/css/tailwind.css",
    "~/public/css/style.css",
    "~/public/css/main.scss",
  ],
  modules: [
    "@nuxtjs/tailwindcss",
    "nuxt3-vuex-module",
    "nuxt-swiper",
    "nuxt-headlessui",
  ],
});
