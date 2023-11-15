<template>
  <a-page-header
    style="border: 1px solid rgb(235, 237, 240)"
    title="세부 계획"
    :breadcrumb="{ routes }"
    sub-title="세부 계획을 작성하세요!"
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
