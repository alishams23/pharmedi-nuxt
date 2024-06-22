<template>
  <nuxt-link :to="'/t/pharmacy/' + data.id">
    <div class="rounded-2xl shadow-1 border-t  bg-white w-full text-center mt-3 pt-2" style="
                      box-shadow: rgba(0, 0, 0, 0.1) 0px 10px 15px -3px,
                        rgba(0, 0, 0, 0.05) 0px 4px 6px -2px;
                    ">
      <p class="fw-bold  ">   نام داروخانه {{ data.name }}  </p>
      <div class="pb-1">
        <p class="text-muted">   آدرس {{ data.location }} </p>
      </div>
      <div class="px-1 mb-2">

      </div>
    </div>
  </nuxt-link>
</template>
  
<script>
export default {
  props: ["data"]
};
</script>
  
<style>

</style>