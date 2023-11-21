<script setup>
import AttractionTransfer from '@/components/trip-plan/items/AttractionTransfer.vue'
import DefaultButton from '@/components/common/items/DefaultButton.vue'
import Page1SubHeader from '@/components/trip-plan/items/Page1SubHeader.vue'
import PlanMaker from '@/components/trip-plan/items/PlanMaker.vue'
import AttractionList from '@/components/attraction/AttractionList.vue'
import SelectType from "@/components/attraction/item/SelectType.vue";
import KakaoMap from "@/components/attraction/item/KakaoMap.vue";

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
        <PlanMaker /><AttractionTransfer />
        <div class="button"><DefaultButton /></div>
      </a-col>
    </a-row>
  </div>
</template>

<style scoped>
.button {
  display: flex;
  justify-content: flex-end;
  align-items: start;
}
</style>
