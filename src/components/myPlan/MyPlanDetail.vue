<script setup>
import MyPlanDetailSubHeader from './items/MyPlanDetailSubHeader.vue'
import MyPlanPerDate from './items/MyPlanPerDate.vue'

const contentStyle = {
  minHeight: 120,
  lineHeight: '100px'
}
</script>

<template>
  <a-space direction="vertical" :style="{ width: '100%' }" :size="[0, 48]">
    <a-layout>
      <MyPlanDetailSubHeader />

      <a-layout-content :style="contentStyle">
        <MyPlanPerDate />
      </a-layout-content>
    </a-layout>
  </a-space>
</template>
