<template>
      <a-space>
        <a-select
            v-model:value="selectedState"
            style="width: 120px"
            :loading="stateDataLoding"
            :size="large"
        >
          <a-select-option value="">광역 전체</a-select-option>
          <a-select-option v-for="state in stateList" :key="state.rnum" :value="state.code" :firstActiveValue ="selectedState">{{ state.name }}</a-select-option>
        </a-select>

        <a-select
            v-model:value="selectedCity"
            style="width: 120px"
            :loading="cityDataLoading"
            :size="large"
        >
          <a-select-option value="">도시 전체</a-select-option>
          <a-select-option v-for="city in cityList" :key="city.rnum" :value="city.code" :firstActiveValue ="selectedCity">{{ city.name }}</a-select-option>
        </a-select>

        <a-select
            v-model:value="selectedType"
            style="width: 120px"
            :size="large"
            :firstActiveValue ="selectedType"
        >
          <a-select-option value="">관광지 전체</a-select-option>
          <a-select-option value="12">관광지</a-select-option>
          <a-select-option value="14">문화시설</a-select-option>
          <a-select-option value="15">축제공연행사</a-select-option>
          <a-select-option value="25">여행코스</a-select-option>
          <a-select-option value="28">레포츠</a-select-option>
          <a-select-option value="32">숙박</a-select-option>
          <a-select-option value="38">쇼핑</a-select-option>
          <a-select-option value="39">음식점</a-select-option>
        </a-select>

      </a-space>

        <!-- <HotelDatePicker format="DD/MM/YYYY"></HotelDatePicker> -->
    <hr />
</template>
<script setup>
import {onMounted, ref, watch} from 'vue'
import {getCityData, getStateData} from '@/api/tripApi'
import {tripInfoStore} from '@/stores/tripInfoStore'
import {storeToRefs} from 'pinia'

const stateList = ref([])
const cityList = ref([])
const stateDataLoding = ref(false)
const cityDataLoading = ref(false)

const tripinfoStore = tripInfoStore()
const { selectedState, selectedCity, selectedType } = storeToRefs(tripinfoStore)

onMounted(async () => {
  stateDataLoding.value = true
  const stateData = await getStateData();
  const items = stateData && stateData.items; // 안전한 접근
  const item = items && items.item; // 안전한 접근
  stateList.value = item
  stateDataLoding.value = false

  if(selectedState.value){
    const stateData = await getStateData(selectedState.value);
    const items = stateData && stateData.items;
    cityList.value = items && items.item;
  }

})

watch(
  () => selectedState.value,
  async (newVal) => {
    cityDataLoading.value = true
    const stateData = await getCityData(selectedState.value);
    const items = stateData && stateData.items;
    cityList.value = items && items.item;
    selectedCity.value = ""
    cityDataLoading.value = false
  }
)
</script>
