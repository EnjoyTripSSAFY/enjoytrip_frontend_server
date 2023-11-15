<script setup>
import KakaoMap from '@/components/attraction/item/KakaoMap.vue'
import SelectType from "@/components/attraction/item/SelectType.vue";


</script>
<template>
  <main
    class="d-flex justify-content-center align-items-center my-auto"
    style="padding: 10vh 0 5vh 0"
  >
    <div>
      <h2 class="text-center">지역별 관광명소</h2>
      <hr />
      <SelectType/>
      <KakaoMap />
    </div>
  </main>
</template>

