<script setup>
import MyPlanListSubHeader from './items/MyPlanListSubHeader.vue'

import { onMounted, reactive, ref, watch } from 'vue'
import { listTripPlan } from '@/api/planApi'
import { useRoute, useRouter } from 'vue-router'
import dayjs from 'dayjs'

const router = useRouter()
const tripPlan = ref([])

const userNo = ref(1)

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

const parseDate = (dp) => {
  return dayjs(dp).format('YYYY-MM-DD')
}

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
        <div>
          <a-row :gutter="16">
            <a-col :span="6" v-for="(tp, index) in tripPlan" :key="tp.no">
              <a-card :title="tp.title" style="width: 300px; margin-bottom: 50px">
                <template #extra>
                  <router-link :to="{ name: 'myPlan-detail', params: { tripPlanNo: tp.no } }"
                    >detail
                  </router-link>
                </template>
                <p>내용 : {{ tp.describ }}</p>
                <p>생성 일자 : {{ parseDate(tp.createdTime) }}</p>
              </a-card>
            </a-col>
          </a-row>
        </div>
      </a-layout-content>
    </a-layout>
  </a-space>
</template>
