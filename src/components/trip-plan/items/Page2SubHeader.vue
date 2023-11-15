<template>
  <a-page-header
    style="border: 1px solid rgb(235, 237, 240)"
    title="일자별 계획"
    :breadcrumb="{ routes }"
    sub-title="일자별로 계획을 담아보세요!"
  />
</template>
<script setup>
const routes = [
  {
    path: 'index',
    breadcrumbName: 'First-level Menu'
  },
  {
    path: 'first',
    breadcrumbName: 'Second-level Menu'
  },
  {
    path: 'second',
    breadcrumbName: 'Third-level Menu'
  }
]
</script>
