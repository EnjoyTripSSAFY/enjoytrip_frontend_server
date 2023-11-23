<template>
  <div style="background-color: #ececec; padding: 20px">
    <a-row :gutter="16">
      <a-timeline mode="alternate">
        <a-timeline-item v-for="(tp,idx) in elem" :key="tp.contentid">{{tp.title}}</a-timeline-item>
      </a-timeline>
<!--      <a-col :span="8" v-for="(tp,idx) in elem">-->
<!--        <a-card :title="idx+1 + '번째 관광지'"  :bordered="false">-->
<!--          <p>{{tp.title}}</p>-->
<!--        </a-card>-->
<!--      </a-col>-->
    </a-row>
  </div>
</template>

<script setup>
import {storeToRefs} from "pinia";
import {tripInfoSecondStepStore} from "@/stores/tripPlanSecondStepStore";

const props = defineProps(['no']);

const { storedDatePlan } = storeToRefs(tripInfoSecondStepStore());
const elem = storedDatePlan.value[props.no-1];
console.log('elem', elem)
</script>
