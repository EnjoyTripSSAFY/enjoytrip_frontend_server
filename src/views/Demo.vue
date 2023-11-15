<template>
  <a-layout style="min-height: 100vh">
    <a-layout>
      <CustomHeader/>
      <a-layout-content style="margin: 0 16px">
          <router-view></router-view>
      </a-layout-content>
      <CustomFooter/>
    </a-layout>
  </a-layout>
</template>
<script setup>
import CustomHeader from "@/views/CustomHeader.vue";
import CustomFooter from "@/views/CustomFooter.vue";
</script>
