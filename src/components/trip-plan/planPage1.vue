<script setup>
import DefaultButton from '@/components/common/items/DefaultButton.vue'
import Page1SubHeader from '@/components/trip-plan/items/Page1SubHeader.vue'
import PlanMaker from '@/components/trip-plan/items/PlanMaker.vue'
import SelectType from "@/components/attraction/item/SelectType.vue";
import KakaoMap from "@/components/attraction/item/KakaoMap.vue";
import TripList from "@/components/trip-plan/items/TripList.vue";
import TripLPlanList from "@/components/trip-plan/items/TripLPlanList.vue";


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



</script>

<template>
  <div>
    <Page1SubHeader />
    <SelectType/>

    <a-row>
      <a-col :span="12">
        <KakaoMap/>
      </a-col>

      <a-col :span="12">
        <a-space direction="horizontal">
          <PlanMaker />
        </a-space>
        <a-space direction="horizontal">
            <TripList style="width: 100%; height:63vh; max-height: 63vh; overflow-y: scroll"/>
            <TripLPlanList style="width: 100%; height:63vh; max-height: 63vh; overflow-y: scroll"/>
        </a-space>
      </a-col>

    </a-row>
  </div>
</template>

<style scoped>

</style>
