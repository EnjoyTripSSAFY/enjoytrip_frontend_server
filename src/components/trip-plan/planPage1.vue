<script setup>
import AttractionTransfer from '@/components/trip-plan/items/AttractionTransfer.vue'
import DefaultButton from '@/components/common/items/DefaultButton.vue'
import Page1SubHeader from '@/components/trip-plan/items/Page1SubHeader.vue'
import PlanMaker from '@/components/trip-plan/items/PlanMaker.vue'
import AttractionList from '@/components/attraction/AttractionList.vue'

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
        <Page1SubHeader />
        <a-layout>
          <a-layout-content :style="contentStyle"><AttractionList /></a-layout-content>
          <a-layout-sider :style="siderStyle" :width="800" :theme="dark">
            <PlanMaker /><AttractionTransfer />
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
