<script setup>
import GridLayout from './items/GridLayout.vue'
import MyPlanListSubHeader from './items/MyPlanListSubHeader.vue'
import MyPlanCard from '@/components/myPlan/items/MyPlanCard.vue'

import { onMounted, reactive, ref, watch } from 'vue'
import { listTripPlan } from '@/api/planApi'
import { useRoute, useRouter } from 'vue-router'

const router = useRouter()
const tripPlan = ref([])

const userNo = ref(1)
// const tripPlanNo = ref(null)
// const title = ref(null)
// const describ = ref(null)
// const createdTime = ref(null)

onMounted(async () => {
  await listTripPlan(
    userNo.value,
    (res) => {
      tripPlan.value = res.data.result
      console.log('success!')
      console.log('tripPlan : ' + tripPlan.value)
    },
    (error) => {
      console.error(error)
    }
  )
})

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
        <div v-for="tp in tripPlan" :key="tp.no">
          <a-card :title="tp.title" style="width: 300px">
            <template #extra
              ><router-link :to="{ name: 'myPlan-detail', params: { tripPlanNo: tp.no } }"
                >detail</router-link
              ></template
            >
            <p>내용 : {{ tp.describ }}</p>
            <p>생성 일자 : {{ tp.createdTime }}</p>
          </a-card>
        </div>
      </a-layout-content>
    </a-layout>
  </a-space>
</template>
