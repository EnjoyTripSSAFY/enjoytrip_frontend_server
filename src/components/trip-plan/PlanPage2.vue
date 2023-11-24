<script setup>
import DefaultButton from '@/components/common/items/DefaultButton.vue'
import Page2SubHeader from '@/components/trip-plan/items/Page2SubHeader.vue'
import AttractionList from '@/components/attraction/AttractionList.vue'
import AttractionSelection from './items/AttractionSelection.vue'
import {storeToRefs} from "pinia";
import {tripInfoSecondStepStore} from "@/stores/tripPlanSecondStepStore";
import {tripInfoFirstStepStore} from "@/stores/tripPlanOneStepStore";
import dayjs from "dayjs";
import {onMounted, ref} from "vue";
import {message} from "ant-design-vue";
import {useRouter} from "vue-router";

const { storedTripList, storedTripTerm } = storeToRefs(tripInfoFirstStepStore());
const { storedDatePlan } = storeToRefs(tripInfoSecondStepStore())

const router = useRouter();
const gap = ref(null)


onMounted(async () => {
  const afterDate = await storedTripTerm.value[1];
  const beforeDate = await storedTripTerm.value[0];
  const dateDiff = dayjs(afterDate).diff(beforeDate, 'day') + 1;
  gap.value = dateDiff;


  if(await storedDatePlan.value.length !== gap.value){
    await storedDatePlan.value.push(...Array.from({ length: gap.value }, () => ref([])));

  }
})




const contentStyle = {
  minHeight: 120
  // backgroundColor: 'lightgray'
}
const siderStyle = {
  textAlign: 'center',
  lineHeight: '51px',
  color: '#fff',
  backgroundColor: 'white',
  paddingInline: '30px'
}

const goNext = () => {
  let target = []
  storedDatePlan.value.forEach((e,i) => {
    console.log(e, i)
    if(e.value.length === 0) target.push(i)
  })

  console.log(target)

  if(target.length > 0) {
    target = target.map(i => i+1)
    message.warn(target.join(',') + "일차 일정을 작성해주세요!")
    return
  }

  router.push({name : 'plan-page3'})
}

</script>

<template>
  <div>
    <a-space direction="vertical" :style="{ width: '100%' }" :size="[0, 48]">
      <a-layout>
        <Page2SubHeader />
        <a-layout>
          <a-layout-content :style="contentStyle"><AttractionList /></a-layout-content>
          <a-layout-sider :style="siderStyle" :width="800" :theme="dark">
            <!-- <PlanMaker /><AttractionTransfer /> -->

            <!-- 선택된 날짜만큼 관광지 선택지 뿌리기 -->
            <AttractionSelection v-for="n in gap"  key="n" :no="n"/>
            <div class="button" @click="goNext"><DefaultButton /></div>
          </a-layout-sider>
        </a-layout>
      </a-layout>
    </a-space>
  </div>
</template>


<style scoped>
.button {
  display: flex;
  justify-content: flex-end;
  align-items: start;
}
</style>
