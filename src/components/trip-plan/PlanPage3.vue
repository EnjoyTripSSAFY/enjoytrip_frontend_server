<script setup>
import PlanDetailMaker from './items/PlanDetailMaker.vue'
import Page3SubHeader from './items/Page3SubHeader.vue'
import {storeToRefs} from "pinia";
import {tripInfoFirstStepStore} from "@/stores/tripPlanOneStepStore";
import {tripInfoSecondStepStore} from "@/stores/tripPlanSecondStepStore";
import {ref} from "vue";
import dayjs from "dayjs";
import AttractionSelection from "@/components/trip-plan/items/AttractionSelection.vue";
import {tripInfoFinalStepStore} from "@/stores/tripPlanFinalStepStore";
const { storedTripTerm } = storeToRefs(tripInfoFirstStepStore());
const {storedSchedule} = storeToRefs(tripInfoFinalStepStore())

const gap = ref(dayjs(storedTripTerm.value[1]).diff(storedTripTerm.value[0], 'day') + 1)
storedSchedule.value.push(...Array.from({ length: gap.value }, () => ref([])));

const contentStyle = {
  minHeight: 120,
  lineHeight: '100px'
  // backgroundColor: 'lightgray'
}

</script>

<template>
  <a-space direction="vertical" :style="{ width: '100%' }" :size="[0, 48]">
    <a-layout>
      <!-- page3 부제목 -->
      <Page3SubHeader />

      <!-- 세부 계획 리스트 뿌릴 곳 -->
      <a-layout-content :style="contentStyle">
        <PlanDetailMaker v-for="(n) in gap"  key="n" :no="n" :gap="gap" />
      </a-layout-content>
    </a-layout>
  </a-space>
</template>
