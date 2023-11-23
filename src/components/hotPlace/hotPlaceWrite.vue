<script setup>
import KakaoMap from "@/components/hotPlace/item/KakaoMap.vue";
import SearchList from "@/components/hotPlace/item/SearchList.vue";
import RegitstHotPlace from "@/components/hotPlace/item/RegitstHotPlace.vue";

</script>
<template>
  <div>
    <a-page-header
        style="border: 1px solid rgb(235, 237, 240)"
        title="여행 정보 리스트"
        sub-title="담고 싶은 여행지를 선택하세요!"
    />

    <a-row>
      <a-col :span="11">
        <KakaoMap/>
      </a-col>
      <a-col :span="7">
        <SearchList style="width: 100%; height:75vh; max-height: 75vh; overflow-y: scroll"/>
      </a-col>
      <a-col :span="6">
        <RegitstHotPlace/>
      </a-col>
    </a-row>
  </div>
</template>