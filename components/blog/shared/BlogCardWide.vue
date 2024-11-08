<template>
    <div class="shadow-3 bg-white p-3  rounded-2xl   ">

        <div v-if="data.imageBlog" class="img-course-height  cover rounded-10"
            :style="`background-image:url('${data.imageBlog.photo}');background-size: cover;`">
            <!-- <img class="rounded-10 w-full h-full cover"  src="https://i.gyazo.com/4193ee51b263d4a0dab88720352ca87a.jpg" alt="img"> -->
        </div>
        <div class="d-flex nm-4  rtl ">
            <div class="d-flex bg-gray-100/70 backdrop-blur-md rounded-pill px-1 py-1 ">
                <div class=" rounded-pill bg-white h-10 w-10 p-half shadow-md " v-if="data.author">
                    <img class="rounded-pill w-full h-full cover" v-if="data.author.image_profile != null"
                        :src="data.author.image_profile" alt="img">
                    <img class="rounded-pill w-full h-full cover" v-else src="@/assets/inside/avatar.jpg" alt="img">
                </div>
                <div class="pe-4  ps-3 ">
                    <div class=" fw-bold text-sm text-nowrap  ">
                        {{ data.author.get_full_name }}
                    </div>
                    <div class="fs-7 text-muted ">
                        {{ data.author.username }}
                    </div>
                </div>
            </div>
        </div>
        <div class="text-right rtl pt-3 pb-1">
            <h4 class="fw-bold text-sm irsa  text-md leading-7">{{ data.title }}</h4>
        </div>
       <div class="d-flex pb-1 mx-1">
        <div class="rtl text-xs bg-gray-100  px-3 p-1 rounded-lg">
          تعداد بازدید :  {{ data.visit_count }}
        </div>
       </div>
    </div>
</template>

<script>

export default {
    props: ["data",],
    data() {
        return {

        };
    },
    methods: {

    }, mounted() {

    },
};
</script>

<style>
.img-course-width {
    width: 250px;

}

.img-course-height {
    height: 130px;
}

.text-nowrap {
    text-overflow: ellipsis;
    overflow: hidden;
    white-space: nowrap;
}

.p-half {
    padding: 3px;
}

.nm-4 {
    margin-top: -28px;

}
</style>