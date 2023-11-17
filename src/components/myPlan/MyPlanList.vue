<script setup>
import GridLayout from './items/GridLayout.vue'
import MyPlanListSubHeader from './items/MyPlanListSubHeader.vue'

const contentStyle = {
  minHeight: 120,
  lineHeight: '100px'
}
</script>

<template>
  <a-space direction="vertical" :style="{ width: '100%' }" :size="[0, 48]">
    <a-layout>
      <MyPlanListSubHeader />
      <a-layout-content :style="contentStyle">
        <GridLayout />
        <GridLayout />
      </a-layout-content>
    </a-layout>
  </a-space>
</template>
