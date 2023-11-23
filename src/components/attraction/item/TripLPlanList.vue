<template>
  <a-card title="관광지 좌표" >

    <a-card v-for="res in responseData" :title="res.title" :style="{ marginTop: '16px' }" @click="clickHeader(res)">
      <template #extra>
        <a href="#">More</a>
      </template>

      <a-carousel arrows dots-class="slick-dots slick-thumb" v-if="res.firstimage || res.firstimage2">
        <template #customPaging="props">
          <a :href="res.firstimage" />
        </template>
        <div>
          <a-image height="100px" :src="res.firstimage"/>
        </div>
      </a-carousel>
      <h2 v-if="res.addr1 + res.addr2">주소 : {{ res.addr1 + res.addr2}} </h2>
      <h2 v-if="res.tel">전화번호  : {{res.tel}}</h2>

    </a-card>

    <a-pagination
        v-model:current="current"
        v-model:pageSize="pageSize"
        show-size-changer
        :total="totalSize"
        @showSizeChange="onShowSizeChange"
    />
  </a-card>
</template>
<script setup>
import {ref, watch} from "vue";
import {tripInfoStore} from "@/stores/tripInfoStore"
import {storeToRefs} from "pinia";
import {kakaoMapPosStoreAttraction} from "@/stores/kakaoMapPosStoreAttraction";

const tripinfoStore = tripInfoStore()
const {selectedPgno, selectedPgSize, responseData, totalSize, isLoading } = storeToRefs(tripinfoStore)
const {currentPos} = storeToRefs(kakaoMapPosStoreAttraction())

const pageSize = ref(20);
const current = ref(1);
const onShowSizeChange = (current, pageSize) => {
  console.log(current, pageSize);
};
watch(pageSize, () => {
  selectedPgSize.value = pageSize.value
});
watch(current, () => {
  selectedPgno.value = current.value
});

const clickHeader = (res) => {
  currentPos.value = {
    latitude: res.mapx,
    longitude: res.mapy,
    title : res.title,
    tel : res.tel,
    zipCode :res.zipccode,
    image : res.firstimage,
    addr1: res.addr1,
    addr2: res.addr2,
    mlevel : res.mlevel,
  };

  console.log(currentPos.value)
}
</script>
<style scoped>
.dataArea {
  width: 100%;
  min-height: 75vh;
  max-height: 75vh;
  overflow-y: scroll;
}

   /* For demo */
 :deep(.slick-dots) {
   position: relative;
   height: auto;
 }
:deep(.slick-slide img) {
  border: 5px solid #fff;
  display: block;
  margin: auto;
  max-width: 80%;
}
:deep(.slick-arrow) {
  display: none !important;
}
:deep(.slick-thumb) {
  bottom: 0px;
}
:deep(.slick-thumb li) {
  width: 60px;
  height: 45px;
}
:deep(.slick-thumb li img) {
  width: 100%;
  height: 100%;
  filter: grayscale(100%);
  display: block;
}
:deep .slick-thumb li.slick-active img {
  filter: grayscale(0%);
}
</style>
