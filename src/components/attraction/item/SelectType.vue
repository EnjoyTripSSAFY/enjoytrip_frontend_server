<template>
  <div class="mb-3">
    <form action="/" class="row g-3">
      <div class="col-auto">
        <select v-model="selectedState" class="form-select" id="state" name="state">
          <option value="">광역 전체</option>
          <option v-for="state in stateList" :key="state.rnum"  :value="state.code">{{state.name}}</option>
        </select>
      </div>
      <div class="col-auto">
        <select v-model="selectedCity" class="form-select" id="city" name="city">
          <option value="" >도시 전체</option>
          <option v-for="city in cityList" :key="city.rnum"  :value="city.code">{{city.name}}</option>
        </select>
      </div>
      <div class="col-auto">
        <select v-model="selectedType" class="form-select" id="type" name="type">
          <option value="">관광지 전체</option>
          <option value="12">관광지</option>
          <option value="14">문화시설</option>
          <option value="15">축제공연행사</option>
          <option value="25">여행코스</option>
          <option value="28">레포츠</option>
          <option value="32">숙박</option>
          <option value="38">쇼핑</option>
          <option value="39">음식점</option>
        </select>
        <HotelDatePicker format="DD/MM/YYYY"></HotelDatePicker>
      </div>
    </form>
    <hr/>
  </div>
</template>
<script setup>
import {computed, onMounted, ref, watch} from "vue";
import {getStateData, getCityData} from "@/api/tripApi"
import { tripInfoStore } from "@/stores/tripInfoStore"
import {storeToRefs} from "pinia";
// import HotelDatePicker from 'vue-hotel-datepicker'


const stateList = ref([])
const cityList = ref([])

const tripinfoStore = tripInfoStore()
const {selectedState, selectedCity, selectedType} = storeToRefs(tripinfoStore)



onMounted(
    async () => {
      stateList.value = await getStateData()
    }
)

watch(() => selectedState.value, async (newVal) => {
  cityList.value = await getCityData(newVal);
});


</script>
