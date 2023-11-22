<script setup>
import SelectType from "@/components/attraction/item/SelectType.vue";
import KakaoMap from "@/components/attraction/item/KakaoMap.vue";
import TripList from "@/components/attraction/item/TripList.vue";

</script>
<template>
  <div>
    <a-page-header
        style="border: 1px solid rgb(235, 237, 240)"
        title="여행 정보 리스트"
        sub-title="담고 싶은 여행지를 선택하세요!"
    />
    <SelectType/>

    <a-row>
      <a-col :span="12">
        <KakaoMap/>
      </a-col>
      <a-col :span="12">
        <TripList style="width: 100%; height:75vh; max-height: 75vh; overflow-y: scroll"/>
      </a-col>
    </a-row>
  </div>
</template>