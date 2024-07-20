<template>
  <div class=" ">
    <div
      v-if="currentRouteName() == 't-Home' || currentRouteName() == 't-Explore'"
      class="mb-5 mb-lg-1 pb-3"
      style="position: fixed; width: 100px; right: 0; bottom: 0;z-index:9999"
    >
      <div class="drop drop--up m-3">
        <div class="m-1 p-1 ">
          <a class="  text-white    ">
           <div class="bg-gradient-to-tr  from-[#2741e7] to-[#2aa2f2]  h-[55px] w-[55px] rounded-full flex justify-center items-center">
             <svg
               xmlns="http://www.w3.org/2000/svg"
               width="40"
               height="40"
               fill="currentcolor"
               class="bi bi-plus"
               viewBox="0 0 16 16"
             >
               <path
                 d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z"
               />
             </svg>
           </div>
          </a>
        </div>

        <div class="drop__content -transition-slide-in">
          <div class="drop-list -size-large -position-left -border-rounded">
            <button class="drop-list__btn">
              <nuxt-link
                :to="checkLogin() ? '/t/pharmacySearch' : '/'"
                class="d-flex mx-3 justify-content-between align-items-center"
           
              >
                <div class="text-sm">
                  افزودن آگهی شیفت
                </div>
              </nuxt-link>
            </button>
          </div>
        </div>
      </div>
    </div>
    <div class="d-block fixed-bottom d-sm-none">
      <div class="bg-glass border nav">
        <nuxt-link
          to="/t/Home"
          class="nav-item btn-material"
          :class="
            currentRouteName() == 't-Home'
              ? 'active bg-treaget '
              : 'nav-color-inactive'
          "
        >
        <HomeIconSolid class="text-white h-5 w-5" v-if="currentRouteName() == 't-Home'"/>
        <HomeIcon class="text-gray-600 h-6 w-6" v-else/>
          <!-- <i
            class="fa-home"
            :class="currentRouteName() == 't-Home' ? 'fa' : 'fad'"
            style="font-size: 17px"
          /> -->
          <span class="nav-text">خانه</span>
        </nuxt-link>
        <nuxt-link
          to="/t/blog"
          class="nav-item btn-material"
          :class="
            currentRouteName() == 't-blog'
              ? 'active bg-treaget '
              : 'nav-color-inactive'
          "
        >
        
        <DocumentTextIconSolid class="text-white h-5 w-5" v-if="currentRouteName() == 't-blog'"/>
        <DocumentTextIcon class="text-gray-600 h-6 w-6" v-else/>
          <!-- <i
            class="fad fa-newspaper"
            :class="currentRouteName() == 't-blog' ? 'fa' : 'fad'"
            style="font-size: 17px"
          /> -->
          <span class="nav-text">دارونگار</span>
        </nuxt-link>
        <nuxt-link
          to="/t/shop"
          class="nav-item btn-material"
          :class="
            currentRouteName() == 't-shop'
              ? 'active bg-treaget '
              : 'nav-color-inactive'
          "
        >
        
        <ShoppingBagIconSolid class="text-white h-5 w-5" v-if="currentRouteName() == 't-shop'"/>
        <ShoppingBagIcon class="text-gray-600 h-6 w-6" v-else/>
          <!-- <i
            class="fad fa-video"
            :class="currentRouteName() == 't-video' ? 'fa' : 'fad'"
            style="font-size: 17px"
          /> -->
          <span class="nav-text">فروشگاه</span>
        </nuxt-link>
        <nuxt-link
          :to="
            $store.state.username != ''
              ? '/' + $store.state.username
              : '/t/login'
          "
          class="nav-item btn-material"
          :class="
            currentRouteName() == 'user'
              ? 'active bg-treaget '
              : 'nav-color-inactive'
          "
        >
        <UserIconSolid class="text-white h-5 w-5" v-if="currentRouteName() == 'user'"/>
        <UserIcon class="text-gray-600 h-6 w-6" v-else/>
          <!-- <i
            class="fad fa-user"
            :class="currentRouteName() == 'user' ? 'fa' : 'fad'"
            style="font-size: 17px"
          /> -->
          <span class="nav-text">پروفایل</span>
        </nuxt-link>
      </div>
    </div>
  </div>
</template>

<script>

import {  UserIcon,HomeIcon,DocumentTextIcon,ShoppingBagIcon} from '@heroicons/vue/24/outline' 
import {  UserIcon as UserIconSolid,HomeIcon as HomeIconSolid,DocumentTextIcon as DocumentTextIconSolid,ShoppingBagIcon as ShoppingBagIconSolid} from '@heroicons/vue/24/solid' 

export default {
  components:{UserIcon,HomeIcon,DocumentTextIcon,ShoppingBagIcon,
    UserIconSolid,
    HomeIconSolid,DocumentTextIconSolid,ShoppingBagIconSolid,


  },
  methods: {
    currentRouteCheck (data) {
      return this.$route.name.split('-').includes(data)
    },
    currentRouteName () {
      return this.$route.name
    },
    checkLogin () {
      return this.$store.state.isAuthenticated == true
    }
  }
}
</script>

<style scoped>
.fixed-bottom {
  position: fixed;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: 1030;
}

.bottom-down-navbar-padding {
  padding-top: 18px;
  padding-bottom: 18px;
}

.nav {
  display: flex;
  flex-direction: row;

  margin: auto;

  padding: 10px 15px;
}

.nav-item {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-grow: 1;
  padding: 10px 20px;
  cursor: pointer;
  /* transition: all 0.2s ease-out; */
  border-radius: 30px;
}

.nav-text {
  font-size: 14px;
  margin: auto;
  text-align: center;
  font-weight: 400;
  display: none;
}

.nav-item.active {
  flex-grow: 2;
  justify-content: flex-start;
}

.nav-item.active > .nav-text {
  display: inline-block;
}

.nav-color-inactive {
  color: rgb(88, 88, 88);
}
</style>
