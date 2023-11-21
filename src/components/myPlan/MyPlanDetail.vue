<script setup>
import MyPlanDetailSubHeader from './items/MyPlanDetailSubHeader.vue'
import { onMounted, reactive, ref, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { listPlanPerDateAndDetail } from '@/api/planApi'
import dayjs from 'dayjs'

const route = useRoute()
const planPerDate = ref([])
const tripPlanNo = ref(null)

onMounted(async () => {
  tripPlanNo.value = route.params.tripPlanNo
  console.log('tripPlanNo : ' + tripPlanNo.value)
  await listPlanPerDateAndDetail(
    tripPlanNo.value,
    (res) => {
      planPerDate.value = res.data.result
      console.log('success!')
      console.log('planPerDate : ' + planPerDate.value)
    },
    (error) => {
      console.error(error)
    }
  )
})

const parseDate = (dp) => {
  return dayjs(dp).format('YYYY-MM-DD')
}

const parseDateToTime = (dp) => {
  return dayjs(dp).format('HH-mm')
}

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
        <div v-for="ppd in planPerDate" :key="ppd.no">
          <a-divider orientation="left">계획 날짜 : {{ parseDate(ppd.planTime) }}</a-divider>
          <div v-for="(dp, index) in ppd.detailPlans" :key="dp.no">
            <a-descriptions :title="`계획 ${index + 1}`" bordered>
              <a-descriptions-item label="관광지 명">{{ dp.attractionName }}</a-descriptions-item>
              <a-descriptions-item label="비용">{{ dp.cost }}</a-descriptions-item>
              <br />
              <a-descriptions-item label="시작 시간">
                {{ parseDateToTime(dp.startTime) }}
              </a-descriptions-item>
              <a-descriptions-item label="끝난 시간">
                {{ parseDateToTime(dp.endTime) }}
              </a-descriptions-item>
              <!-- <a-descriptions-item label="Config Info">
                컨텐츠 정보1
                <br />
                컨텐츠 정보2
                <br />
                컨텐츠 정보3
              </a-descriptions-item> -->
            </a-descriptions>
          </div>
          <br />
        </div>
      </a-layout-content>
    </a-layout>
  </a-space>
</template>
