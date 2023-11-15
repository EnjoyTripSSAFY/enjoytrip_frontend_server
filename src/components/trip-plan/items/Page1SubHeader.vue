<template>
  <a-page-header
    style="border: 1px solid rgb(235, 237, 240)"
    title="여행 정보 리스트"
    :breadcrumb="{ routes }"
    sub-title="담고 싶은 여행지를 선택하세요!"
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
