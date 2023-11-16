<script setup>
import DefaultButton from '@/components/common/items/DefaultButton.vue'
import Page2SubHeader from '@/components/trip-plan/items/Page2SubHeader.vue'
import AttractionList from '@/components/attraction/AttractionList.vue'
import AttractionSelection from './items/AttractionSelection.vue'

const contentStyle = {
  minHeight: 120
  // backgroundColor: 'lightgray'
}
const siderStyle = {
  textAlign: 'center',
  lineHeight: '51px',
  color: '#fff',
  backgroundColor: 'white',
  paddingInline: '30px'
}
</script>

<template>
  <div>
    <a-space direction="vertical" :style="{ width: '100%' }" :size="[0, 48]">
      <a-layout>
        <Page2SubHeader />
        <a-layout>
          <a-layout-content :style="contentStyle"><AttractionList /></a-layout-content>
          <a-layout-sider :style="siderStyle" :width="800" :theme="dark">
            <!-- <PlanMaker /><AttractionTransfer /> -->

            <!-- 선택된 날짜만큼 관광지 선택지 뿌리기 -->
            <AttractionSelection />
            <AttractionSelection />
            <div class="button"><DefaultButton /></div>
          </a-layout-sider>
        </a-layout>
      </a-layout>
    </a-space>
  </div>
</template>

<style scoped>
.button {
  display: flex;
  justify-content: flex-end;
  align-items: start;
}
</style>
