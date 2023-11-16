<script setup>
import PlanDetailMaker from './items/PlanDetailMaker.vue'
import Page3SubHeader from './items/Page3SubHeader.vue'

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
      <a-layout-content :style="contentStyle"
        ><PlanDetailMaker /><PlanDetailMaker
      /></a-layout-content>
    </a-layout>
  </a-space>
</template>
