<script setup>
import AttractionTransfer from '@/components/trip-plan/items/AttractionTransfer.vue'
import DefaultButton from '@/components/commons/items/DefaultButton.vue'
import SubHeader from '@/components/trip-plan/items/SubHeader.vue'
import PlanMaker from '@/components/trip-plan/items/PlanMaker.vue'

const headerStyle = {
  textAlign: 'center',
  height: 64,
  paddingInline: 50,
  lineHeight: '100px',
  backgroundColor: '#7dbcea'
}
const contentStyle = {
  textAlign: 'center',
  minHeight: 120,
  lineHeight: '510px',
  color: '#fff',
  backgroundColor: 'lightgray'
}
const siderStyle = {
  textAlign: 'center',
  lineHeight: '510px',
  color: '#fff',
  backgroundColor: 'white',
  paddingInline: '30px'
}

const footerStyle = {
  textAlign: 'center',
  color: '#fff',
  backgroundColor: '#7dbcea'
}
</script>

<template>
  <div>
    <a-space direction="vertical" :style="{ width: '100%' }" :size="[0, 48]">
      <a-layout>
        <a-layout-header :style="headerStyle">header</a-layout-header>
        <SubHeader />
        <a-layout>
          <a-layout-content :style="contentStyle">Content</a-layout-content>
          <a-layout-sider :style="siderStyle" :width="600" :theme="dark">
            <PlanMaker /><AttractionTransfer />
            <div class="button"><DefaultButton /></div>
          </a-layout-sider>
        </a-layout>
        <a-layout-footer :style="footerStyle">Footer</a-layout-footer>
      </a-layout>
    </a-space>
  </div>
</template>

<style scoped>
.button {
  display: flex;
  justify-content: flex-end;
  align-items: start;
  background-color: red;
}
</style>
