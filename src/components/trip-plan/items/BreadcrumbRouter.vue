<script setup>
import { useRouter } from 'vue-router'

const router = useRouter()

const movePage1 = () => {
  router.push({ name: 'plan-page1' })
}

const movePage2 = () => {
  router.push({ name: 'plan-page2' })
}

const movePage3 = () => {
  router.push({ name: 'plan-page3' })
}
</script>

<template>
  <a-breadcrumb separator="">
    <a-breadcrumb-item><a @click="movePage1">여행 정보 리스트</a></a-breadcrumb-item>
    <a-breadcrumb-separator />
    <a-breadcrumb-item><a @click="movePage2">일자별 계획</a></a-breadcrumb-item>
    <a-breadcrumb-separator />
    <a-breadcrumb-item><a @click="movePage3">세부 계획</a></a-breadcrumb-item>
  </a-breadcrumb>
</template>
