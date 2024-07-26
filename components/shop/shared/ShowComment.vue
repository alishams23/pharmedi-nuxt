<template>
  
    <div class="py-1" v-if="comment">
        <figure class="mx-auto rtl  border-t  pr-10">
            <p class="sr-only">پنچ ستاره</p>
            <div class="flex gap-x-1 text-indigo-600">

            </div>
            <figcaption class="mt-10 flex items-center gap-x-6">
                <div class="flex items-center">
                    <div class="h-10 w-10 flex justify-center items-center p-[2px] me-2 rounded-full bg-blue-600">
                        <img v-if="comment.user.image_profile" v-bind:src="comment.user.image_profile"
                            class="shadow-2 bg-gray-200 cover rounded-full" />
                        <img v-else src="@/assets/inside/avatar.jpg" class="shadow-2 bg-gray-200 cover rounded-full" />
                    </div>
                    <div class="text-sm leading-6">
                        <div class="font-semibold text-gray-600">
                            {{ comment.user.first_name }}
                            {{ comment.user.last_name }}</div>

                    </div>
                </div>
            </figcaption>

            <blockquote class="mt-4 text-lg leading-8 tracking-tight text-gray-700 text-sm  sm:leading-9">
                <p><span class="text-2xl">”</span>{{ comment.content }}<span class="text-2xl">“</span></p>
                <div class="flex items-center ">
                  
                    <ShopSharedReplyComment :data="comment"></ShopSharedReplyComment>
                    <p class="text-xs mt-2 text-gray-400 irsa">{{ comment.jalali_time }}</p>
                </div>
            </blockquote>
            <div v-for="item in comment.replies">
                    <ShopSharedShowComment :comment="item"></ShopSharedShowComment>
                 </div>
        </figure>
    </div>
</template>

<script>
export default {

    props: ["comment"],

   

}
</script>