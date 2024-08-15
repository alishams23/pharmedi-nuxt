<template>
  <div>
    <div class="flex lg:flex-row flex-col justify-content-between lg:py-8 lg:space-x-8 px-3 rtl border-bottom">
      <div class="lg:w/8/12 flex-column d-flex align-items-start">
        <h2 class="font-semibold mt-3 lg:text-2xl text-lg mb-2 irsa d-flex">
          <span class>نام داروخانه : {{ data.name }}</span>
        </h2>
        <p class="rtl mb-2 text-sm dark:text-gray-100 irsa">
          آدرس داروخانه :{{ data.location }}
        </p>
      </div>
      <div
        class="d-flex justify-content-start align-items-center flex-wrap font-semibold space-x-3 text-center text-sm my-2">
        <div class="drop -color-lighter drop--down">
          <button class="">
            <a href="#"
              class="my-1 btn-shadow-black btn-animation bg-white flex items-center justify-center rounded-pill text-xl p-2">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                class="bi bi-chevron-down" viewBox="0 0 16 16">
                <path fill-rule="evenodd"
                  d="M1.646 4.646a.5.5 0 0 1 .708 0L8 10.293l5.646-5.647a.5.5 0 0 1 .708.708l-6 6a.5.5 0 0 1-.708 0l-6-6a.5.5 0 0 1 0-.708z" />
              </svg>
            </a>
          </button>
          <div class="drop__content -transition-slide-in">
            <div class="drop-list -size-large -position-left -border-rounded">
              <button class="drop-list__btn py-2">
                <div class="d-flex mx-3 justify-content-between align-items-center text-blue-500" @click="shareLink()">
                  <i class="fa fa-share" />
                  <div class="text-sm">اشتراک گذاری</div>
                </div>
              </button>
            </div>
          </div>
        </div>
        <nuxt-link v-if="data.head && data.head.username == $store.state.username" tag="button" to="/t/setting"
          class="text-xs my-1 btn-material btn-animation bg-treaget rounded-pill btn-animation-shadow">
          تنظیمات
        </nuxt-link>
        <nuxt-link v-if="data.head && data.head.username != $store.state.username" tag="button" to="/"
          class="text- mx-2 my-1 btn-material btn-animation bg-treaget rounded-pill btn-animation-shadow">
          امتیاز دادن
        </nuxt-link>
        <div />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ["data"],
  data() {
    return { loadingFollow: false };
  },
  methods: {
    copyToClipboard(textToCopy) {
      // navigator clipboard api needs a secure context (https)
      if (navigator.clipboard && window.isSecureContext) {
        // navigator clipboard api method'
        return navigator.clipboard.writeText(textToCopy);
      } else {
        // text area method
        const textArea = document.createElement("textarea");
        textArea.value = textToCopy;
        // make the textarea out of viewport
        textArea.style.position = "fixed";
        textArea.style.left = "-999999px";
        textArea.style.top = "-999999px";
        document.body.appendChild(textArea);
        textArea.focus();
        textArea.select();
        // eslint-disable-next-line promise/param-names
        return new Promise((res, rej) => {
          // here the magic happens
          // eslint-disable-next-line prefer-promise-reject-errors
          document.execCommand("copy") ? res() : rej();
          textArea.remove();
        });
      }
    },
    shareLink() {
      this.copyToClipboard(`https://pharmedi.ir/${this.data.username}/`);
      alert(" کپی شد.");
    },
  },
};
</script>

<style></style>
