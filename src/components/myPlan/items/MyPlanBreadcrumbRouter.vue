<script setup>
import { useRouter } from 'vue-router'

const router = useRouter()

const moveList = () => {
  router.push({ name: 'myPlan-list' })
}

const moveDetail = () => {
  router.push({ name: 'myPlan-detail' })
}
</script>

<template>
  <a-breadcrumb separator="">
    <a-breadcrumb-item><a @click="moveList">계획 리스트</a></a-breadcrumb-item>
    <a-breadcrumb-separator />
    <a-breadcrumb-item><a @click="moveDetail">세부 계획</a></a-breadcrumb-item>
  </a-breadcrumb>
</template>
