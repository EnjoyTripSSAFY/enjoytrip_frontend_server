<template>
  <a-card title="카카오맵 검색 리스트" >
    <a-row justify="end" style="margin-bottom: 30px">
      <a-input-search style="width: 250px; float: right"
          v-model="searchValue"
          placeholder="input search text"
          enter-button="Search"
          size="large"
          @search="onSearch"
      />
    </a-row>

    <a-empty v-if="!places"/>

    <a-divider>
      <a-card v-for="res in places" :title="res.place_name" :style="{ marginTop: '16px' }"
              @click="clickHeader(res)"  :class="{ 'custom-card': isSelected(res) }">

        <a-carousel arrows dots-class="slick-dots slick-thumb" v-if="res.firstimage || res.firstimage2">
          <template #customPaging="props">
            <a :href="res.firstimage" />
          </template>
          <div>
            <a-image height="100px" :src="res.firstimage"/>
          </div>
        </a-carousel>
        <h2 class="inform" style="margin-bottom: 10px">분류 : {{res.category_name}}</h2>
        <h2 class="inform" >주소 : {{ res.road_address_name }} </h2>
        <h2 class="inform">지번 : {{ res.address_name }} </h2>
        <h2 class="inform" v-if="res.phone">전화번호  : {{res.phone}}</h2>
      </a-card>
    </a-divider>


    <a-pagination
        v-model:current="currentPage"
        v-model:pageSize="pageSize"
        :total="totalSize"
        show-less-items
        :show-total="total => `Total ${total} items`"
        :default-page-size="pageSizeOption"
    />
  </a-card>
</template>
<script setup>
import {ref, watch} from "vue";
import {tripInfoStore} from "@/stores/tripInfoStore"
import {storeToRefs} from "pinia";
import {kakaoMapPosStoreHotPlace} from "@/stores/kakaoMapPosStoreHotPlace";
import {imageSearch} from "@/api/kakoAPI";

const selectedPlace = ref(null);

const pageSizeOption = ref([15])

const isSelected = (place) => {
  return selectedPlace.value === place;
};

const {currentPos, searchKeyword, places, totalSize, currentPage} = storeToRefs(kakaoMapPosStoreHotPlace())

const pageSize = ref(15);
const current = ref(1);
const searchValue = ref()

watch(pageSize, () => {
  totalSize.value = pageSize.value
});
watch(current, () => {
  currentPage.value = current.value
});

const clickHeader = async (res) => {
  selectedPlace.value = res;


  let imageLink = undefined

  currentPos.value = {
    latitude: res.x,
    longitude: res.y,
    title: res.place_name,
    tel: res.phone,
    zipCode: "",
    image: "",
    addr1: res.address_name,
    addr2: "",
    mlevel: 2,
  };

  console.log(currentPos.value)
}

const onSearch = (searchValue) => {
  if (!searchValue.replace(/^\s+|\s+$/g, '')) {
    alert('키워드를 입력해주세요!');
    return;
  }
  searchKeyword.value = searchValue
  console.log(searchKeyword.value)
};
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

.inform {
  word-wrap: break-word;
  white-space: normal;
}

.custom-card {
  border-color: #5085BB;
}
</style>
