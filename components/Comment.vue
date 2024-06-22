<template>
  <nuxt-link :to="'/' + comment.user.username">
    <div class="row align-items-center text-right">
      <div class="col-1">
        <div style="width: 45px;margin-right: 100%;">
          <img v-if="comment.user.image_profile" v-bind:src="comment.user.image_profile"
            class="shadow-2 bg-gray-200 cover rounded-full" />
          <img v-else src="@/assets/inside/avatar.jpg" class="shadow-2 bg-gray-200 cover rounded-full" />
        </div>
      </div>

      <div class="col-11 speech right" style="font-size: 14px;">
        <p class="text-sm irsa mb-2">{{ comment.content }}</p>
        <p class="text-xs irsa">{{ comment.jalali_time }}</p>
      </div>
    </div>
  </nuxt-link>
</template>

<script>
export default {
  props: {
    comment: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
    };
  },
  computed: {

  },
  methods: {

  },
};
</script>

<style scoped>
/* (A) SPEECH BOX */
.speech {
  /* (A1) FONT */
  font-size: 1.1em;

  /* (A2) COLORS */
  color: #000;
  background: #00000015;

  word-wrap: break-word;

  /* (A3) DIMENSIONS + POSITION */
  position: relative;
  padding: 20px;
  border-radius: 10px;
  margin: 20px auto;
  max-width: 60%;
}

/* (B) ADD SPEECH "CALLOUT TAIL" */
/* (B1) USE ::AFTER TO CREATE THE "TAIL" */
.speech::after {
  /* (B1-1) ATTACH TRANSPARENT BORDERS */
  content: "";
  border: 20px solid transparent;

  /* (B1-2) NECESSARY TO POSITION THE "TAIL" */
  position: absolute;
}

/* (B2) BOTTOM "CALLOUT TAIL" */
.bottom.speech::after {
  /* (B2-1) DOWN TRIANGLE */
  border-top-color: #00000015;
  border-bottom: 0;

  /* (B2-2) POSITION AT BOTTOM */
  bottom: -20px;
  left: 50%;
  margin-left: -20px;
}

/* (C) DIFFERENT TAIL POSITIONS */
/* (C1) TOP */
.top.speech::after {
  /* (C1-1) UP TRIANGLE */
  border-bottom-color: #00000015;
  border-top: 0;

  /* (C1-2) POSITION AT TOP */
  top: -20px;
  left: 50%;
  margin-left: -20px;
}

/* (C2) LEFT */
.left.speech::after {
  /* (C2-1) LEFT TRIANGLE */
  border-right-color: #00000015;
  border-left: 0;

  /* (C2-2) POSITION AT LEFT */
  left: -20px;
  top: 50%;
  margin-top: -20px;
}

/* (C3) RIGHT */
.right.speech::after {
  /* (C3-1) RIGHT TRIANGLE */
  border-left-color: #00000015;
  border-right: 0;

  /* (C3-2) POSITION AT RIGHT */
  right: -20px;
  top: 50%;
  margin-top: -20px;
}

/* (X) THE REST DOES NOT MATTER - COSMETICS */
/* PAGE & BODY */
* {
  font-family: arial, sans-serif;
  box-sizing: border-box;
}

body {
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  background-image: url(https://images.unsplash.com/photo-1600172454132-ada7faa101cf?crop=entropy&cs=srgb&fm=jpg&ixid=MnwxNDU4OXwwfDF8cmFuZG9tfHx8fHx8fHx8MTY0NjU0ODA0Mg&ixlib=rb-1.2.1&q=85);
  background-repeat: no-repeat;
  background-position: center;
  background-size: cover;
  text-align: center;
}

/* WIDGET */
.widget-wrap {
  max-width: 500px;
  padding: 30px;
  border-radius: 20px;
  background: rgba(255, 255, 255, 0.4);
}

/* SVG */
#talk {
  width: 100%;
  height: 120px;
  background-image: url('data:image/svg+xml;utf8,<svg viewBox="0 0 512 512" width="100" xmlns="http://www.w3.org/2000/svg"><path d="M448 0H64C28.7 0 0 28.7 0 64v288c0 35.3 28.7 64 64 64h96v84c0 9.8 11.2 15.5 19.1 9.7L304 416h144c35.3 0 64-28.7 64-64V64c0-35.3-28.7-64-64-64z" /></svg>');
  background-repeat: no-repeat;
  background-position: center;
}

/* FOOTER */
#code-boxx {
  font-weight: 600;
  margin-top: 30px;
}

#code-boxx a {
  display: inline-block;
  padding: 5px;
  text-decoration: none;
  background: #b90a0a;
  color: #000;
}
</style>