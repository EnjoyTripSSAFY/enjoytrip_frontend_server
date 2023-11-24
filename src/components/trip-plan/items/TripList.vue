<template>
  <a-card title="관광지 좌표">
    <a-card
      v-for="res in responseData"
      :title="res.title"
      :style="{ marginTop: '16px' }"
      @click="clickHeader(res)"
      :class="{ 'custom-card': isSelected(res) }"
    >
      <template #extra>
        <a @click="AddTrip(res)">담기</a>
      </template>

      <a-carousel
        arrows
        dots-class="slick-dots slick-thumb"
        v-if="res.firstimage || res.firstimage2"
      >
        <template #customPaging="props">
          <a :href="res.firstimage" />
        </template>
        <div>
          <a-image height="100px" :src="res.firstimage" />
        </div>
      </a-carousel>
      <h2 v-if="res.addr1 + res.addr2">주소 : {{ res.addr1 + res.addr2 }}</h2>
      <h2 v-if="res.tel">전화번호 : {{ res.tel }}</h2>
    </a-card>

    <a-pagination
      v-model:current="current"
      v-model:pageSize="pageSize"
      show-size-changer
      :total="totalSize"
      @showSizeChange="onShowSizeChange"
      :show-total="(total) => `Total ${total} items`"
    />
  </a-card>
</template>
<script setup>
import { ref, watch } from 'vue'
import { tripInfoStore } from '@/stores/tripInfoStore'
import { storeToRefs } from 'pinia'
import { kakaoMapPosStoreAttraction } from '@/stores/kakaoMapPosStoreAttraction'
import { tripInfoFirstStepStore } from '@/stores/tripPlanOneStepStore'

const selectedPlace = ref(null)

const isSelected = (place) => {
  return selectedPlace.value === place
}

const tripinfoStore = tripInfoStore()
const { selectedPgno, selectedPgSize, responseData, totalSize, isLoading } =
  storeToRefs(tripinfoStore)
const { currentPos } = storeToRefs(kakaoMapPosStoreAttraction())
const { storedTripList, storedTripTitle, storedTripTerm } = storeToRefs(tripInfoFirstStepStore())

const pageSize = ref(20)
const current = ref(1)
const onShowSizeChange = (current, pageSize) => {
  console.log(current, pageSize)
}
watch(pageSize, () => {
  selectedPgSize.value = pageSize.value
})
watch(current, () => {
  selectedPgno.value = current.value
})

const clickHeader = (res) => {
  selectedPlace.value = res

  currentPos.value = {
    latitude: res.mapx,
    longitude: res.mapy,
    title: res.title,
    tel: res.tel,
    zipCode: res.zipccode,
    image: res.firstimage,
    addr1: res.addr1,
    addr2: res.addr2,
    mlevel: res.mlevel
  }

  console.log(currentPos.value)
}

const AddTrip = (trip) => {
  console.log(trip)
  storedTripList.value.push(trip)
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

.custom-card {
  border-color: #5085bb;
}
</style>
