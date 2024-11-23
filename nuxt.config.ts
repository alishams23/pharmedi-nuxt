// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({


  devtools: { enabled: true },

  // vite: {
  //   server: {
  //     hmr: {
  //       clientPort: 3000,
        
  //     },
  //   },
  // },
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
    '@nuxtjs/sitemap',
    "@nuxtjs/tailwindcss",
    "nuxt3-vuex-module",
    "nuxt-swiper",
    "nuxt-headlessui",
  ],
  site: { 
    url: 'http://127.0.0.1:8000', 
    name: 'pharmedi - فارمدی' 
  }, 
  devServer: {
    port: 3000,
    host:"0"
  },



  sitemap: {
    sources:[
      // Using the custom Django REST API endpoint for URLs
      'https://pharmedi.ir/api/blog/blog-ids/',
      'https://pharmedi.ir/api/shop/shop-ids/',
      'https://pharmedi.ir/api/shift/shift-ids/',
    ]
  },

});