<template>
  <a-space direction="vertical" :style="{ width: '100%' }" :size="[0, 48]">
    <a-layout>
      <a-layout-header :style="headerStyle">Header</a-layout-header>
      <!-- page3 부제목 -->
      <Page3SubHeader />

      <!-- 세부 계획 리스트 뿌릴 곳 -->
      <a-layout-content :style="contentStyle"
        ><PlanDetailMaker /><PlanDetailMaker
      /></a-layout-content>
      <a-layout-footer :style="footerStyle">Footer</a-layout-footer>
    </a-layout>
  </a-space>
</template>
<script setup>
import PlanDetailMaker from './items/PlanDetailMaker.vue'
import Page3SubHeader from './items/Page3SubHeader.vue'

const headerStyle = {
  textAlign: 'center',
  height: 64,
  paddingInline: 50,
  lineHeight: '100px',
  backgroundColor: '#7dbcea'
}
const contentStyle = {
  minHeight: 120,
  lineHeight: '100px'
  // backgroundColor: 'lightgray'
}

const footerStyle = {
  textAlign: 'center',
  color: '#fff',
  backgroundColor: '#7dbcea'
}
</script>
