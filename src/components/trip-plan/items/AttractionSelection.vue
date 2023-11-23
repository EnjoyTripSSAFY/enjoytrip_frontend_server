<template>
  <a-divider orientation="left">계획 {{no}}일차</a-divider>

  <a-select
      v-model:value="value"
      mode="multiple"
      style="width: 100%"
      placeholder="Please select"
      :options="optionList"
      @change="handleChange"
  >
  </a-select>

  <!-- 선택된 관광지 정보 뿌리는 곳 -->
  <AttractionCard :no="no" />
</template>

<script setup>
import {ref, watch} from 'vue'
import AttractionCard from './AttractionCard.vue'
import {storeToRefs} from "pinia";
import {tripInfoFirstStepStore} from "@/stores/tripPlanOneStepStore";
import {tripInfoSecondStepStore} from "@/stores/tripPlanSecondStepStore";
const { storedTripList, storedTripTerm } = storeToRefs(tripInfoFirstStepStore());
const { storedDatePlan } = storeToRefs(tripInfoSecondStepStore());

const props = defineProps(['no']);
const optionList = storedTripList.value.map((t, _) => ({ value: t.contentid, label: t.title }));


const handleChange = (value) => {
  // console.log(value)
}
// storedDatePlan.value[props.no-1].map(t => t.contentid)
const value = ref([])

watch(value, (newVal, oldVal) => {

  const target = storedTripList.value.filter(obj => newVal.includes(obj.contentid));
  storedDatePlan.value[props.no-1].value = target

  console.log(storedDatePlan.value[props.no-1].value )
  console.log(target)
})
</script>
