<script setup>
import MyPlanCard from './MyPlanCard.vue'
</script>

<template>
  <a-divider orientation="left">Horizontal</a-divider>
  <a-row :gutter="16">
    <a-col class="gutter-row" :span="6">
      <div class="gutter-box">
        <MyPlanCard />
      </div>
    </a-col>
    <a-col class="gutter-row" :span="6">
      <div class="gutter-box">
        <MyPlanCard />
      </div>
    </a-col>
    <a-col class="gutter-row" :span="6">
      <div class="gutter-box">
        <MyPlanCard />
      </div>
    </a-col>
    <a-col class="gutter-row" :span="6">
      <div class="gutter-box">
        <MyPlanCard />
      </div>
    </a-col>
  </a-row>
</template>
