<template>
  <div class="unscrollable" @click="slideBarDeactivator">
    <div id="sidebar" class="sidebar bg-white scrollBarHidden" style="overflow-y: scroll">
      <div class="d-flex flex-column justify-content-between" style="min-height: 100%">
        <div class="sidebar_inner">
          <div v-if="loading == false"
            class="d-flex flex-wrap flex-row bg-treaget shadow-2 pb-3 justify-content-around align-items-center">
            <span class="rtl col-12 hide-close-icon" @click="slideBarDeactivator"><svg
                xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="currentColor" class="bi bi-x"
                viewBox="0 0 16 16">
                <path
                  d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z" />
              </svg></span>
            <div class="col-3">
              <div class="transform w-16 h-16 transition rounded-pill bg-white" style="padding: 1px 1px 1px 1px">
                <div class="p-1 w-full h-full rounded-pill bg-treaget">
                  <img v-if="user.image_profile" :src="user.image_profile"
                    class="w-full h-full cover shadow-2 rounded-pill" />
                  <img v-else src="@/assets/inside/avatar.jpg" class="w-full rounded-pill h-full cover shadow-2" />
                </div>
              </div>
            </div>
            <div class="rtl" v-if="user.username">
              <div class="fw-bold fs-6 border px-3 py-1" style="border-radius: 20px 20px 0px 20px">
                {{ user.get_full_name }}
              </div>
              <div class="d-flex">
                <div class="text-xs bg-white text-black px-2" style="border-radius: 20px 0px 20px 20px">
                  {{ user.username }}
                </div>
              </div>
            </div>
          </div>
          <div v-else class="d-flex justify-content-center">
            <span class="GradientLoader" />
          </div>

          <!-- <div class="mx-5 px-5 border-t "></div> -->
          <ul class="text-right mt-3">
            <div>
              <li>
                <div class="mb-3 me-4 fw-bold text-black">منو</div>
              </li>
              <li>
                <nuxt-link to="/t/Home" class="rtl hover:text-blue rounded-2xl">
                  <div v-if="currentRouteName() == 't-Home'" class="bg-treaget my-1 rounded-full"
                    style="padding-right: 2px" />

                  <button class="col-12 d-flex align-items-center rounded-pill" :class="currentRouteName() == 't-Home' ? 'btn-material  ' : ''
    ">
                    <div class="child_menu" />
                    <svg width="24" height="24" viewBox="0 0 24 24" :fill="currentRouteName() == 't-Home' ? 'blue' : 'currentcolor'
    " xmlns="http://www.w3.org/2000/svg">
                      <path
                        d="M9.14373 20.7821V17.7152C9.14372 16.9381 9.77567 16.3067 10.5584 16.3018H13.4326C14.2189 16.3018 14.8563 16.9346 14.8563 17.7152V20.7732C14.8562 21.4473 15.404 21.9951 16.0829 22H18.0438C18.9596 22.0023 19.8388 21.6428 20.4872 21.0007C21.1356 20.3586 21.5 19.4868 21.5 18.5775V9.86585C21.5 9.13139 21.1721 8.43471 20.6046 7.9635L13.943 2.67427C12.7785 1.74912 11.1154 1.77901 9.98539 2.74538L3.46701 7.9635C2.87274 8.42082 2.51755 9.11956 2.5 9.86585V18.5686C2.5 20.4637 4.04738 22 5.95617 22H7.87229C8.19917 22.0023 8.51349 21.8751 8.74547 21.6464C8.97746 21.4178 9.10793 21.1067 9.10792 20.7821H9.14373Z" />
                    </svg>

                    <span class="fw-light me-4" :class="currentRouteName() == 't-Home'
    ? 'text-black fw-bold me-5'
    : ''
    ">
                      خانه
                    </span>
                  </button>
                </nuxt-link>
              </li>
              <li v-if="$store.state.isAuthenticated">
                <nuxt-link to="/t/Wallet"  class="rtl hover:text-blue">
                  <div v-if="currentRouteName() == 't-Wallet'" class="bg-treaget my-1 rounded-full"
                    style="padding-right: 2px" />

                  <button class="col-12 d-flex align-items-center rounded-pill" :class="currentRouteName() == 't-Wallet' ? 'btn-material  ' : ''
    ">
                    <div class="child_menu" />
                    <svg width="24" height="24" style="transform: scale(0.9)" viewBox="0 0 24 24" :fill="currentRouteName() == 't-Wallet'
    ? 'blue'
    : 'currentcolor'
    " xmlns="http://www.w3.org/2000/svg">
                      <path
                        d="M6.25 14.75C6.25 15.1642 6.58579 15.5 7 15.5C7.41421 15.5 7.75 15.1642 7.75 14.75V8.75C7.75 8.33579 7.41421 8 7 8C6.58579 8 6.25 8.33579 6.25 8.75V14.75Z"
                        fill="#1C274C" />
                      <path fill-rule="evenodd" clip-rule="evenodd"
                        d="M21.1884 8.00377C21.1262 7.99995 21.0584 7.99998 20.9881 8L20.9706 8.00001H18.2149C15.9435 8.00001 14 9.73607 14 12C14 14.2639 15.9435 16 18.2149 16H20.9706L20.9881 16C21.0584 16 21.1262 16 21.1884 15.9962C22.111 15.9397 22.927 15.2386 22.9956 14.2594C23.0001 14.1952 23 14.126 23 14.0619L23 14.0444V9.95556L23 9.93815C23 9.874 23.0001 9.80479 22.9956 9.74058C22.927 8.76139 22.111 8.06034 21.1884 8.00377ZM17.9706 13.0667C18.5554 13.0667 19.0294 12.5891 19.0294 12C19.0294 11.4109 18.5554 10.9333 17.9706 10.9333C17.3858 10.9333 16.9118 11.4109 16.9118 12C16.9118 12.5891 17.3858 13.0667 17.9706 13.0667Z" />
                      <path opacity="0.5"
                        d="M21.1394 8.00152C21.1394 6.82091 21.0965 5.55447 20.3418 4.64658C20.2689 4.55894 20.1914 4.47384 20.1088 4.39124C19.3604 3.64288 18.4114 3.31076 17.239 3.15314C16.0998 2.99997 14.6442 2.99999 12.8064 3H10.6936C8.85583 2.99999 7.40019 2.99997 6.26098 3.15314C5.08856 3.31076 4.13961 3.64288 3.39124 4.39124C2.64288 5.13961 2.31076 6.08856 2.15314 7.26098C1.99997 8.40019 1.99999 9.85581 2 11.6936V11.8064C1.99999 13.6442 1.99997 15.0998 2.15314 16.239C2.31076 17.4114 2.64288 18.3604 3.39124 19.1088C4.13961 19.8571 5.08856 20.1892 6.26098 20.3469C7.40018 20.5 8.8558 20.5 10.6935 20.5H12.8064C14.6442 20.5 16.0998 20.5 17.239 20.3469C18.4114 20.1892 19.3604 19.8571 20.1088 19.1088C20.3133 18.9042 20.487 18.6844 20.6346 18.4486C21.0851 17.7291 21.1394 16.8473 21.1394 15.9985C21.0912 16 21.0404 16 20.9882 16L18.2149 16C15.9435 16 14 14.2639 14 12C14 9.73607 15.9435 8.00001 18.2149 8.00001L20.9881 8.00001C21.0403 7.99999 21.0912 7.99997 21.1394 8.00152Z" />
                    </svg>

                    <span class="fw-light me-4" :class="currentRouteName() == 't-Wallet'
    ? 'text-black fw-bold me-5'
    : ''
    ">
                      کیف پول
                    </span>
                  </button>
                </nuxt-link>
              </li>
              <li>
                <nuxt-link to="/t/update" class="rtl hover:text-blue">
                  <div v-if="currentRouteName() == 't-shop'" class="bg-treaget my-1 rounded-full"
                    style="padding-right: 2px" />

                  <button class="col-12 d-flex align-items-center rounded-pill" :class="currentRouteName() == 't-shop' ? 'btn-material  ' : ''
    ">
                    <div class="child_menu" />
                    <svg width="24" height="24" style="transform: scale(0.9)" viewBox="0 0 24 24" :fill="currentRouteName() == 't-shop' ? 'blue' : 'currentcolor'
    " xmlns="http://www.w3.org/2000/svg">
                      <path
                        d="M14.5 21.9913V18.5C14.5 17.5654 14.5 17.0981 14.299 16.75C14.1674 16.522 13.978 16.3326 13.75 16.201C13.4019 16 12.9346 16 12 16C11.0654 16 10.5981 16 10.25 16.201C10.022 16.3326 9.83261 16.522 9.70096 16.75C9.5 17.0981 9.5 17.5654 9.5 18.5V21.9913H14.5Z" />
                      <path opacity="0.5"
                        d="M5.73204 12C4.84126 12 4.05323 11.6239 3.5 11.0329V14C3.5 17.7712 3.5 19.6568 4.67157 20.8284C5.61466 21.7715 7.02043 21.9554 9.5 21.9913H14.5C16.9796 21.9554 18.3853 21.7715 19.3284 20.8284C20.5 19.6568 20.5 17.7712 20.5 14V11.034C19.9468 11.6244 19.1592 12 18.269 12C16.6973 12 15.3814 10.8091 15.225 9.24523L15.152 8.51733C15.3385 10.382 13.8742 12 12.0003 12C10.139 12 8.6819 10.4038 8.84499 8.55511L8.77598 9.24523C8.6196 10.8091 7.30367 12 5.73204 12ZM14.5 18.5V21.9913H9.5V18.5C9.5 17.5654 9.5 17.0981 9.70096 16.75C9.83261 16.522 10.022 16.3326 10.25 16.201C10.5981 16 11.0654 16 12 16C12.9346 16 13.4019 16 13.75 16.201C13.978 16.3326 14.1674 16.522 14.299 16.75C14.5 17.0981 14.5 17.5654 14.5 18.5Z" />
                      <path
                        d="M9.4998 2H14.4998L15.1515 8.51737C15.338 10.382 13.8737 12 11.9998 12C10.1259 12 8.6616 10.382 8.84806 8.51737L9.4998 2Z" />
                      <path opacity="0.7"
                        d="M3.33024 5.35133C3.50832 4.46093 3.59736 4.01573 3.7784 3.65484C4.15987 2.89439 4.84628 2.33168 5.66677 2.10675C6.05616 2 6.51017 2 7.4182 2H9.50051L8.77598 9.24527C8.6196 10.8091 7.30367 12 5.73204 12C3.80159 12 2.35373 10.2339 2.73232 8.34093L3.33024 5.35133Z" />
                      <path opacity="0.7"
                        d="M20.6703 5.35133C20.4922 4.46093 20.4031 4.01573 20.2221 3.65484C19.8406 2.89439 19.1542 2.33168 18.3337 2.10675C17.9443 2 17.4903 2 16.5823 2H14.5L15.2245 9.24527C15.3809 10.8091 16.6968 12 18.2685 12C20.1989 12 21.6468 10.2339 21.2682 8.34093L20.6703 5.35133Z" />
                    </svg>

                    <span class="fw-light me-4" :class="currentRouteName() == 't-shop'
    ? 'text-black fw-bold me-5'
    : ''
    ">
                      فروشگاه
                    </span>
                  </button>
                </nuxt-link>
              </li>
              <li v-if="$store.state.isAuthenticated">
                <nuxt-link to="/t/shop/cart"  class="rtl hover:text-blue">
                  <div v-if="currentRouteName() == 't-shop-cart'" class="bg-treaget my-1 rounded-full"
                    style="padding-right: 2px" />

                  <button class="col-12 d-flex align-items-center rounded-pill" :class="currentRouteName() == 't-shop-cart' ? 'btn-material  ' : ''
    ">
                    <div class="child_menu" />
                    <svg width="24" height="24" style="transform: scale(0.9)" viewBox="0 0 24 24"
                      :fill="currentRouteName() == 't-shop-cart' ? 'blue' : 'currentcolor'"
                      xmlns="http://www.w3.org/2000/svg">
                      <path fill-rule="evenodd" clip-rule="evenodd"
                        d="M1.28869 2.76279C1.41968 2.36983 1.84442 2.15746 2.23737 2.28845L2.50229 2.37675C2.51549 2.38115 2.52864 2.38554 2.54176 2.38991C3.16813 2.59867 3.69746 2.7751 4.11369 2.96873C4.55613 3.17456 4.94002 3.42965 5.23112 3.83352C5.52221 4.2374 5.64282 4.68226 5.69817 5.16708C5.75025 5.62318 5.75023 6.18114 5.7502 6.84139L5.7502 9.49996C5.7502 10.9354 5.7518 11.9365 5.85335 12.6918C5.952 13.4256 6.13245 13.8142 6.40921 14.091C6.68598 14.3677 7.07455 14.5482 7.80832 14.6468C8.56367 14.7484 9.56479 14.75 11.0002 14.75H18.0002C18.4144 14.75 18.7502 15.0857 18.7502 15.5C18.7502 15.9142 18.4144 16.25 18.0002 16.25H10.9453C9.57774 16.25 8.47542 16.25 7.60845 16.1334C6.70834 16.0124 5.95047 15.7535 5.34855 15.1516C4.74664 14.5497 4.48774 13.7918 4.36673 12.8917C4.25017 12.0247 4.25018 10.9224 4.2502 9.55484L4.2502 6.883C4.2502 6.17 4.24907 5.69823 4.20785 5.33722C4.16883 4.99538 4.10068 4.83049 4.01426 4.71059C3.92784 4.59069 3.79296 4.47389 3.481 4.32877C3.15155 4.17551 2.70435 4.02524 2.02794 3.79978L1.76303 3.71147C1.37008 3.58049 1.15771 3.15575 1.28869 2.76279Z" />
                      <path opacity="0.5"
                        d="M5.74512 6C5.75008 6.25912 5.75008 6.53957 5.75007 6.8414L5.75006 9.5C5.75006 10.9354 5.75166 11.9365 5.85321 12.6919C5.86803 12.8021 5.8847 12.9046 5.90326 13H16.0221C16.9815 13 17.4612 13 17.8369 12.7523C18.2126 12.5045 18.4016 12.0636 18.7795 11.1818L19.2081 10.1818C20.0176 8.29294 20.4223 7.34853 19.9777 6.67426C19.5331 6 18.5056 6 16.4507 6H5.74512Z" />
                      <path
                        d="M7.5 18C8.32843 18 9 18.6716 9 19.5C9 20.3284 8.32843 21 7.5 21C6.67157 21 6 20.3284 6 19.5C6 18.6716 6.67157 18 7.5 18Z" />
                      <path
                        d="M18 19.5001C18 18.6716 17.3284 18.0001 16.5 18.0001C15.6716 18.0001 15 18.6716 15 19.5001C15 20.3285 15.6716 21.0001 16.5 21.0001C17.3284 21.0001 18 20.3285 18 19.5001Z" />
                    </svg>

                    <span class="fw-light me-4" :class="currentRouteName() == 't-shop-cart'
    ? 'text-black fw-bold me-5'
    : ''
    ">
                      سبد خرید
                    </span>
                    <span v-if="counterCart != 0 && counterCart" class="nav-tag bg-treaget mx-1">
                      {{ counterCart }}</span>
                  </button>
                </nuxt-link>
              </li>

              <li v-if="$store.state.isAuthenticated">
                <nuxt-link to="/t/Chat"  class="rtl hover:text-blue">
                  <div v-if="currentRouteName() == 't-Chat'" class="bg-treaget my-1 rounded-full"
                    style="padding-right: 2px" />

                  <button class="col-12 d-flex align-items-center rounded-pill" :class="currentRouteName() == 't-Chat' ? 'btn-material  ' : ''
    ">
                    <div class="child_menu" />
                    <svg width="24" height="24" style="transform: scale(0.9)" viewBox="0 0 24 24" :fill="currentRouteName() == 't-Chat' ? 'blue' : 'currentcolor'
    " xmlns="http://www.w3.org/2000/svg">
                      <path
                        d="M21.4274 2.5783C20.9274 2.0673 20.1874 1.8783 19.4974 2.0783L3.40742 6.7273C2.67942 6.9293 2.16342 7.5063 2.02442 8.2383C1.88242 8.9843 2.37842 9.9323 3.02642 10.3283L8.05742 13.4003C8.57342 13.7163 9.23942 13.6373 9.66642 13.2093L15.4274 7.4483C15.7174 7.1473 16.1974 7.1473 16.4874 7.4483C16.7774 7.7373 16.7774 8.2083 16.4874 8.5083L10.7164 14.2693C10.2884 14.6973 10.2084 15.3613 10.5234 15.8783L13.5974 20.9283C13.9574 21.5273 14.5774 21.8683 15.2574 21.8683C15.3374 21.8683 15.4274 21.8683 15.5074 21.8573C16.2874 21.7583 16.9074 21.2273 17.1374 20.4773L21.9074 4.5083C22.1174 3.8283 21.9274 3.0883 21.4274 2.5783Z" />
                    </svg>

                    <span class="fw-light me-4" :class="currentRouteName() == 't-Chat'
    ? 'text-black fw-bold me-5'
    : ''
    ">
                      گپ
                    </span>
                    <span v-if="counterMessage != 0 && counterMessage" class="nav-tag bg-treaget mx-1">
                      {{ counterMessage }}</span>
                  </button>
                </nuxt-link>
              </li>
              <li>
                <nuxt-link to="/t/video" class="rtl hover:text-blue">
                  <div v-if="currentRouteName() == 't-video'" class="bg-treaget my-1 rounded-full"
                    style="padding-right: 2px" />
                  <button class="col-12 d-flex align-items-center rounded-pill" :class="currentRouteName() == 't-video' ? 'btn-material  ' : ''
    ">
                    <div class="child_menu" />
                    <svg style="transform: scale(1.5)" viewBox="0 0 24 24" :fill="currentRouteName() == 't-video'
    ? 'blue'
    : 'currentcolor'
    " xmlns="http://www.w3.org/2000/svg">
                      <path
                        d="M7.21433 13.1328L14.0624 8.91355C14.2158 8.81954 14.4122 8.82854 14.5558 8.93955C15.2064 9.44057 15.7877 9.9486 16.1755 10.3756C16.1755 10.3756 16.5096 10.7176 16.6542 10.9346C16.8877 11.2307 17 11.6177 17 11.9937C17 12.4157 16.8769 12.8147 16.6317 13.1338C16.576 13.1908 16.364 13.4418 16.1638 13.6468C14.9954 14.9228 11.9455 17.031 10.3414 17.67C10.1079 17.773 9.48466 17.988 9.16131 18C8.84967 18 8.54879 17.932 8.25962 17.783C7.90403 17.578 7.62561 17.26 7.46931 16.8829C7.36869 16.6209 7.21336 15.8349 7.21336 15.8119C7.11274 15.2509 7.03751 14.4628 7.00039 13.5428C6.99355 13.3778 7.07659 13.2178 7.21433 13.1328Z" />
                      <path opacity="0.4"
                        d="M7.67228 10.8602C7.37041 11.0473 6.9904 10.8082 7.00505 10.4492C7.0412 9.60718 7.10372 8.86514 7.17992 8.31311C7.19164 8.30111 7.34697 7.32207 7.52574 6.99105C7.83737 6.37602 8.44892 6 9.10637 6H9.16108C9.58506 6.011 10.4867 6.38702 10.4867 6.41002C10.941 6.59903 11.534 6.91904 12.1719 7.30406C12.4591 7.47807 12.466 7.90509 12.1787 8.0821L7.67228 10.8602Z" />
                    </svg>

                    <span class="fw-light me-4" :class="currentRouteName() == 't-video'
    ? 'text-black fw-bold me-5'
    : ''
    ">
                      ویدیوی آموزشی
                    </span>
                  </button>
                </nuxt-link>
              </li>
              <li>
                <nuxt-link to="/t/blog"  class="rtl hover:text-blue">
                  <div v-if="currentRouteName() == 't-blog'" class="bg-treaget my-1 rounded-full"
                    style="padding-right: 2px" />

                  <button class="col-12 d-flex align-items-center rounded-pill" :class="currentRouteName() == 't-blog' ? 'btn-material  ' : ''
    ">
                    <div class="child_menu" />
                    <!-- <svg width="24" height="24" style="transform: scale(0.9)" viewBox="0 0 24 24" v-bind:fill="
                                        currentRouteName() == 't-search'
                    ? 'blue'
                    : 'currentcolor'" xmlns="http://www.w3.org/2000/svg">
                      <ellipse cx="10.5992" cy="10.6532" rx="8.59922" ry="8.65324" />
                      <path opacity="0.4"
                        d="M20.6746 21.9553C20.3406 21.9444 20.0229 21.807 19.7854 21.5705L17.7489 19.1902C17.3123 18.7909 17.2766 18.1123 17.6689 17.6689C17.8525 17.4831 18.1021 17.3786 18.3625 17.3786C18.6229 17.3786 18.8726 17.4831 19.0562 17.6689L21.6172 19.7181C21.9862 20.0957 22.1 20.6563 21.9079 21.1492C21.7158 21.6422 21.2536 21.9754 20.728 22L20.6746 21.9553Z" />
                    </svg> -->

                    <i class="fad fa-newspaper" :style="`font-size:18px;color:${currentRouteName() == 't-blog' ? 'blue' : 'currentcolor'
    }`" />

                    <span class="fw-light me-4" :class="currentRouteName() == 't-blog'
    ? 'text-black fw-bold me-5'
    : ''
    ">
                      دارونگار</span>
                    <span v-if="counterMessage != 0 && counterMessage" class="nav-tag bg-treaget mx-1">
                      {{ counterMessage }}</span>
                  </button>
                </nuxt-link>
              </li>

              <li v-if="$store.state.username != ''">
                <nuxt-link :to="'/' + $store.state.username" class="rtl hover:text-blue">
                  <div v-if="currentRouteName() == 'user'" class="bg-treaget my-1 rounded-full"
                    style="padding-right: 2px" />
                  <button class="col-12 d-flex align-items-center rounded-pill" :class="currentRouteName() == 'user' ? 'btn-material  ' : ''
    ">
                    <div class="child_menu" />
                    <svg width="24" height="24" viewBox="0 0 24 24" :fill="currentRouteName() == 'user' ? 'blue' : 'currentcolor'
    " xmlns="http://www.w3.org/2000/svg">
                      <path
                        d="M11.9968 15.1746C7.68382 15.1746 3.99982 15.8546 3.99982 18.5746C3.99982 21.2956 7.66082 21.9996 11.9968 21.9996C16.3098 21.9996 19.9938 21.3206 19.9938 18.5996C19.9938 15.8786 16.3338 15.1746 11.9968 15.1746Z" />
                      <path opacity="0.4"
                        d="M11.9968 12.5837C14.9348 12.5837 17.2888 10.2287 17.2888 7.2917C17.2888 4.3547 14.9348 1.9997 11.9968 1.9997C9.05983 1.9997 6.70483 4.3547 6.70483 7.2917C6.70483 10.2287 9.05983 12.5837 11.9968 12.5837Z" />
                    </svg>
                    <span class="fw-light me-4" :class="currentRouteName() == 'user'
    ? 'text-black fw-bold me-5'
    : ''
    ">
                      آگهی های من
                    </span>
                  </button>
                </nuxt-link>
              </li>
            </div>
            <li>
              <div class="my-3 me-4 text-black fw-bold">عمومی</div>
            </li>
            <li v-if="$store.state.isAuthenticated">
              <nuxt-link to="/t/setting" class="rtl hover:text-blue">
                <div v-if="currentRouteName() == 't-setting'" class="bg-treaget my-1 rounded-full"
                  style="padding-right: 2px" />

                <button class="col-12 d-flex align-items-center rounded-pill" :class="currentRouteName() == 't-setting' ? 'btn-material  ' : ''
    ">
                  <svg width="24" height="24" viewBox="0 0 24 24" :fill="currentRouteName() == 't-setting'
    ? 'blue'
    : 'currentcolor'
    " xmlns="http://www.w3.org/2000/svg">
                    <path
                      d="M12.012 14.8301C10.4075 14.8301 9.1096 13.5801 9.1096 12.0101C9.1096 10.4401 10.4075 9.1801 12.012 9.1801C13.6164 9.1801 14.8837 10.4401 14.8837 12.0101C14.8837 13.5801 13.6164 14.8301 12.012 14.8301Z" />
                    <path opacity="0.4"
                      d="M21.23 14.3701C21.0359 14.0701 20.7599 13.7701 20.4022 13.5801C20.1161 13.4401 19.9321 13.2101 19.7686 12.9401C19.2474 12.0801 19.554 10.9501 20.4227 10.4401C21.4446 9.8701 21.7717 8.6001 21.1789 7.6101L20.4942 6.4301C19.9117 5.4401 18.6343 5.0901 17.6225 5.6701C16.7232 6.1501 15.5684 5.8301 15.0472 4.9801C14.8837 4.7001 14.7917 4.4001 14.8121 4.1001C14.8428 3.7101 14.7202 3.3401 14.5362 3.0401C14.1581 2.4201 13.4734 2.0001 12.7171 2.0001H11.2762C10.5301 2.0201 9.84542 2.4201 9.46729 3.0401C9.27312 3.3401 9.16071 3.7101 9.18115 4.1001C9.20159 4.4001 9.10961 4.7001 8.9461 4.9801C8.4249 5.8301 7.27009 6.1501 6.38098 5.6701C5.35903 5.0901 4.0918 5.4401 3.49906 6.4301L2.81435 7.6101C2.23184 8.6001 2.55886 9.8701 3.5706 10.4401C4.43926 10.9501 4.74585 12.0801 4.23487 12.9401C4.06114 13.2101 3.87719 13.4401 3.59104 13.5801C3.24357 13.7701 2.93699 14.0701 2.77347 14.3701C2.39535 14.9901 2.41579 15.7701 2.79391 16.4201L3.49906 17.6201C3.87719 18.2601 4.58234 18.6601 5.31815 18.6601C5.66561 18.6601 6.0744 18.5601 6.40142 18.3601C6.65691 18.1901 6.9635 18.1301 7.30075 18.1301C8.31248 18.1301 9.16071 18.9601 9.18115 19.9501C9.18115 21.1001 10.1213 22.0001 11.3068 22.0001H12.6967C13.8719 22.0001 14.8121 21.1001 14.8121 19.9501C14.8428 18.9601 15.691 18.1301 16.7028 18.1301C17.0298 18.1301 17.3364 18.1901 17.6021 18.3601C17.9291 18.5601 18.3277 18.6601 18.6854 18.6601C19.4109 18.6601 20.1161 18.2601 20.4942 17.6201L21.2096 16.4201C21.5775 15.7501 21.6081 14.9901 21.23 14.3701Z" />
                  </svg>

                  <span class="fw-light me-4" :class="currentRouteName() == 't-setting'
    ? 'text-black fw-bold me-5'
    : ''
    ">تنظیمات</span>
                </button>
              </nuxt-link>
            </li>
            <li v-if="$store.state.isAuthenticated == false">
              <nuxt-link to="/t/login" class="rtl hover:text-blue">
                <button class="col-12 d-flex align-items-center rounded-pill">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor"
                    xmlns="http://www.w3.org/2000/svg">
                    <path opacity="0.4"
                      d="M6.447 22C3.996 22 2 19.9698 2 17.4755V12.5144C2 10.0252 3.99 8 6.437 8L17.553 8C20.005 8 22 10.0302 22 12.5256V17.4846C22 19.9748 20.01 22 17.563 22H16.623H6.447Z"
                      fill="currentColor" />
                    <path
                      d="M11.4548 2.22108L8.5458 5.06687C8.2458 5.36099 8.2458 5.83431 8.5478 6.12746C8.8498 6.41964 9.3368 6.41866 9.6368 6.12552L11.2298 4.56627V6.06124V14.4515C11.2298 14.8655 11.5748 15.2015 11.9998 15.2015C12.4258 15.2015 12.7698 14.8655 12.7698 14.4515V4.56627L14.3628 6.12552C14.6628 6.41866 15.1498 6.41964 15.4518 6.12746C15.6028 5.9804 15.6788 5.78854 15.6788 5.5957C15.6788 5.40482 15.6028 5.21295 15.4538 5.06687L12.5458 2.22108C12.4008 2.07986 12.2048 2 11.9998 2C11.7958 2 11.5998 2.07986 11.4548 2.22108Z"
                      fill="currentColor" />
                  </svg>

                  <span class="fw-light me-4">ورود</span>
                </button>
              </nuxt-link>
            </li>
            <li class="pb-5">
              <nuxt-link v-if="$store.state.isAuthenticated == true" to="/t/Logout" class="rtl hover:text-blue">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path opacity="0.4"
                    d="M7.91588 22.0001H16.0839C19.6229 22.0001 21.9999 19.7241 21.9999 16.3351V7.6651C21.9999 4.2761 19.6229 2.0001 16.0839 2.0001H7.91588C4.37788 2.0001 1.99988 4.2771 1.99988 7.6661L1.99988 16.3351C1.99988 19.7241 4.37788 22.0001 7.91588 22.0001Z"
                    fill="currentColor" />
                  <path
                    d="M12.8553 16.2794L16.6203 12.5314C16.9033 12.2494 16.9033 11.7504 16.6203 11.4674L12.8553 7.7194C12.5613 7.4274 12.0863 7.4284 11.7943 7.7224C11.5023 8.0164 11.5023 8.4904 11.7963 8.7834L14.2733 11.2504H7.91833C7.50333 11.2504 7.16833 11.5864 7.16833 12.0004C7.16833 12.4144 7.50333 12.7504 7.91833 12.7504H14.2733L11.7963 15.2164C11.6493 15.3634 11.5763 15.5554 11.5763 15.7484C11.5763 15.9394 11.6493 16.1314 11.7943 16.2774C12.0863 16.5704 12.5613 16.5714 12.8553 16.2794Z"
                    fill="currentColor" />
                </svg>

                <span class="fw-light me-4"> خروج </span>
              </nuxt-link>
            </li>
            <div class="treaget-modal rtl" :class="modal ? 'open' : ''">
              <div class="treaget-modal-overlay" />
              <div class="treaget-modal-card">
                <form class="treaget-modal-body" @submit.prevent="sendNumber">
                  <div class="treaget-modal-content fs-5">
                    <div>
                      <div class="fs-6">
                        کد تایید ارسال شده به شماره تلفنتان را وارد نمایید
                      </div>
                      <div v-if="statusCheck == true" class="py-3 px-5 text-danger">
                        خطایی رخ داد ممکن است کد را اشتباه وارد کرده باشید
                      </div>
                    </div>
                    <input id="id_alt" v-model="code" type="text" required name="alt" maxlength="200"
                      class="shadow-none rtl bg-gray-100 border-bottom mt-4" />
                  </div>
                  <div class="treaget-modal-footer">
                    <div class="d-flex">
                      <button type="submit" class="px-4 py-2 rounded-full py-2 text-white bg-treaget">
                        <div v-if="loadingSMS == false">ارسال</div>
                        <div v-if="loadingSMS == true" class="d-flex flex-column align-items-center">
                          <div class="loader-light" />
                        </div>
                      </button>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </ul>
        </div>
        <div>
          <div class="bg-treaget rounded-10 mx-4">
            <div class="rounded-10 d-flex flex-column justify-content-between align-items-center mb-3 py-1 px-3">
              <!-- <div style="margin-top:-55px" class="p-3 bg-glass border-t rounded-pill ">
                <i class="fad fa-hands-helping  fs-2 " style="color: rgb(2, 135, 33);"></i>
              </div> -->
              <div class="text-center fs-7 pt-2">
                با حمایت مالی خود به پیشرفت این پروژه کمک کنید
              </div>
              <a href="https://idpay.ir/pharmedi" tag="button"
                class="btn-material d-flex align-items-center justify-content-center text-black bg-white fs-7 shadow-lg mt-3 mb-2 mx-3 col-10">
                درگاه حمایت مالی
              </a>
            </div>
          </div>

          <!-- e-namad -->
          <div style="width: 100%; text-align: center">
            <a referrerpolicy="origin" target="_blank" href="http://127.0.0.1:8000/api/wallet/enamad">
              <img referrerpolicy="origin" src="@/assets/inside/images/enamad.png" alt="نماد اعتماد الکترونیکی"
                title="نماد اعتماد الکترونیکی" style="cursor: pointer; width: 60px; align-items: center" />
            </a>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      counterNotification: 0,
      counterMessage: 0,
      counterCart: 0,
      results: [],
      user: {},
      title: null,
      loading: true,
      loadingSMS: false,
      modal: false,
      code: null,
      statusSend: false,
      statusCheck: false,
      idToken: "",
      isInputDialogVisible: false,
    };
  },
  mounted() {
    this.userData();
    this.getCartItems();
    // this.CountRead();
    // setInterval(() => this.CountRead(), 18000);
  },
  methods: {
    async userData() {
      this.loading = true;
      await fetch(
        `http://127.0.0.1:8000/api/account/user_retrieve/${this.$store.state.username}/`
      )
        .then((response) => response.json())
        .then((data) => {
          this.user = data;
        });
      this.loading = false;
      this.$store.commit("getType", this.user.user_type);
      this.$store.commit("getCity", this.user.city);
    },
    async getCartItems() {
      this.loading = true;
      await fetch(`http://127.0.0.1:8000/api/shop/list-cart-items/`, {
        headers: {
          "Content-type": "application/json",
          Accept: "application/json",
          Authorization:
            this.$store.state.token != ""
              ? `Token ${this.$store.state.token}`
              : "",
        },
      })
        .then((response) => response.json())
        .then((data) => {
          this.counterCart = data.length;
        });

      this.loading = false;
    },
    CountRead() {
      fetch("http://127.0.0.1:8000/api/CountReadStatus/", {
        headers: {
          "Content-type": "application/json",
          Accept: "application/json",
          Authorization:
            this.$store.state.token != ""
              ? `Token ${this.$store.state.token}`
              : "",
        },
      })
        .then((response) => response.json())
        .then((data) => {
          this.counterNotification = data.notification;
          this.counterMessage = data.message;
          if (data.verify_phone == false && this.statusSend == false) {
            this.SendSms();
          }
        });
    },
    async SendSms() {
      this.statusSend = true;
      await fetch("http://127.0.0.1:8000/api/Send_code/", {
        headers: {
          "Content-type": "application/json",
          Accept: "application/json",
          Authorization:
            this.$store.state.token != ""
              ? `Token ${this.$store.state.token}`
              : "",
        },
      });
      this.modal = true;
    },
    async sendNumber() {
      this.loadingSMS = true;

      try {
        if (this.code != null) {
          this.statusCheck = false;
          const statusCheckApi = await fetch(
            `http://127.0.0.1:8000/api/Code_check/?code=${this.code}`,
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
          );
          // console.log(statusCheckApi.status) // returns 200
          this.statusCheck = true;
          if (statusCheckApi.ok) {
            this.modal = false;
          }
        }
      } catch (error) {
        this.statusCheck = true;
      }
      this.loadingSMS = false;
    },
    currentRouteName() {
      return this.$route.name;
    },
    currentRouteCheck(data) {
      return this.$route.name.split("-").includes(data);
    },
    slideBarDeactivator() {
      document.getElementById("wrapper").classList.remove("sidebar-active");
    },
  },
};
</script>

<style lang="scss">
$dropArrowOffset: 2px;
$dropArrowRadius: 7px;
$dropMenuBorderRadius: 10px;
$dropSafeZoneOverlap: 10px;
$dropAnimationSpeedMultiplier: 1;

/**********************
 * Drop Block
 **********************/

.drop {
  cursor: pointer;
  display: inline-block;
  min-width: ($dropArrowRadius * 2);
  overflow: visible;
  position: relative;
  text-align: center;

  // Fixes a font rendering issue in Safari

  &.is-disabled {
    cursor: not-allowed;
  }
}

/**********************
 * Drop Content Element
 **********************/

.drop__content {
  position: absolute;
  visibility: hidden;
  width: 100%;

  // Position depends on the current drop variation.
  .drop--down & {
    top: 100%;
  }

  .drop--up & {
    bottom: 100%;
  }

  // Make visible when drop is open.
  .drop:not(.is-disabled).is-open &,
  .drop:not(.is-disabled):hover & {
    visibility: visible;
  }

  // Fade In Transition Modifier

  &.-transition-fade-in {
    opacity: 0;
    transition: visibility 0s linear,
      opacity (0.25s * $dropAnimationSpeedMultiplier) ease-in;
    transition-delay: 0.1s;
  }

  .drop.is-open &.-transition-fade-in,
  .drop:hover &.-transition-fade-in {
    opacity: 1;
    transition-delay: 0s;
  }

  // Slide In Transition Modifier

  &.-transition-slide-in {
    opacity: 0;
    transition: visibility 0s linear,
      opacity (0.25s * $dropAnimationSpeedMultiplier) ease,
      transform (0.25s * $dropAnimationSpeedMultiplier) ease;
    transition-delay: 0.1s;
  }

  .drop--up &.-transition-slide-in {
    transform: translateY(-10px);
  }

  .drop--down &.-transition-slide-in {
    transform: translateY(10px);
  }

  .drop.is-open &.-transition-slide-in,
  .drop:hover &.-transition-slide-in {
    opacity: 1;
    transform: translateY(0);
    transition-delay: 0s;
  }
}

/**********************
 * Drop Arrow
 **********************/

/**********************
 * Drop List
 **********************/

.drop-list {
  min-width: 100%;
  background-color: rgb(255, 255, 255);
  box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;
  margin: 0;
  padding: 5px;
  position: absolute;
  white-space: nowrap;

  // Outside effects
  .drop--down & {
    top: 100%;
  }

  .drop--up & {
    bottom: 100%;
  }

  // Pull Modifiers
  &.-position-left.-pull-left {
    margin-right: ($dropArrowRadius * 1.5);
  }

  &.-position-left.-pull-right {
    margin-right: -($dropArrowRadius * 1.5);
  }

  &.-position-center.-pull-left {
    margin-left: -($dropArrowRadius * 1.5);
  }

  &.-position-center.-pull-right {
    margin-left: ($dropArrowRadius * 1.5);
  }

  &.-position-right.-pull-left {
    margin-left: -($dropArrowRadius * 1.5);
  }

  &.-position-right.-pull-right {
    margin-left: ($dropArrowRadius * 1.5);
  }

  // Position Modifier
  &.-position-center {
    left: 50%;
    transform: translateX(-50%);
  }

  &.-position-left {
    right: 0;
  }

  &.-position-right {
    left: 0;
  }

  // Size Modifier
  &.-size-medium {
    width: 150px;
  }

  &.-size-large {
    width: 225px;
  }

  // Rounded Borders Modifier
  &.-border-rounded {
    border-radius: $dropMenuBorderRadius;
  }

  // Safe Zone Element

  .drop--down &::before,
  .drop--up &::after {
    content: " ";
    height: $dropArrowRadius + $dropArrowOffset + $dropSafeZoneOverlap;
    left: 0;
    position: absolute;
    width: 100%;
  }

  .drop--down &::before {
    bottom: 100%;
  }

  .drop--up &::after {
    top: 100%;
  }
}

/**************************
 * Drop List Item Element
 **************************/

.drop-list__item {
  display: block;
}

/**************************
 * Drop List Button Element
 **************************/

.drop-list__btn {
  border-radius: 5px;
  cursor: pointer;
  display: block;
  font-weight: 450;
  outline: none;
  padding: 4px;
  width: 100%;
}

.drop-list__btn.is-selected {
  background-color: rgba(237, 237, 237, 0.541);
}

.drop-list__btn:hover {
  background-color: rgba(241, 241, 241, 0.541);
}
</style>

