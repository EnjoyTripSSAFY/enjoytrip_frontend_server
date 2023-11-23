<template>
  <a-form :model="dynamicValidateForm" :ref="formRef" :label-col="formItemLayout.labelCol" :wrapper-col="formItemLayout.wrapperCol">
    <a-divider orientation="left">계획 {{ no }}일차</a-divider>

    <a-form-item
        v-for="(domain, index) in dynamicValidateForm.domains"
        :key="domain.key"
        :label="`장소명 ${index + 1}`"
        :rules="[
        { required: true, message: '장소명을 입력하세요', trigger: 'change' },
      ]"
    >
      <a-input
          v-model:value="domain.attractionName"
          placeholder="장소명을 입력하세요"
          style="width: 60%; margin-right: 8px"
          disabled
      />

      <div>
        <a-time-picker v-model:value="domain.startTime">

        </a-time-picker>
        <a-time-picker v-model:value="domain.endTime">

        </a-time-picker>
      </div>

      <a-input-number
          v-model:value="domain.cost"
          placeholder="비용을 입력하세요"
          style="width: 60%; margin-right: 8px"
      />

      <a-form-item v-if="no === gap && index+1 === dynamicValidateForm.domains.length"
                   v-bind="formItemLayoutWithOutLabel" style="margin-top: 20px">
        <a-button type="primary" html-type="submit" @click="submitForm">Complete</a-button>
        <a-button style="margin-left: 10px" @click="resetForm">Reset</a-button>
      </a-form-item>
    </a-form-item>
  </a-form>
</template>

<script setup>
import {ref, reactive, defineProps, onMounted, watch} from 'vue';
import { storeToRefs } from 'pinia';
import { tripInfoSecondStepStore } from '@/stores/tripPlanSecondStepStore';
import { tripInfoFirstStepStore } from "@/stores/tripPlanOneStepStore";
import {tripInfoFinalStepStore} from "@/stores/tripPlanFinalStepStore";
import dayjs from "dayjs";
const props = defineProps(['no', 'gap'])
const { storedDatePlan } = storeToRefs(tripInfoSecondStepStore());
const  {storedSchedule} = storeToRefs(tripInfoFinalStepStore())
const {storedTripTitle, storedTripTerm} = storeToRefs(tripInfoFirstStepStore());
const formRef = ref();
const formItemLayout = {
  labelCol: { xs: { span: 24 }, sm: { span: 4 } },
  wrapperCol: { xs: { span: 24 }, sm: { span: 20 } },
};

const dynamicValidateForm = reactive({
  domains: [],
});


onMounted(async () => {
  dynamicValidateForm.domains = await storedDatePlan.value[props.no - 1].value.map((t, i) => ({
    key: i,
    attractionName: t.title,
    contentId: t.contentid,
    planPerDateNo: props.no,
    startTime: null,
    endTime: null,
    cost: null,
    tempTime : null,
  }));

  // console.log(storedSchedule.value[props.no-1])
});

watch(dynamicValidateForm, (newVal, oldValue) => {
  // console.log(newVal)
  // console.log(storedSchedule.value[props.no-1])

  storedSchedule.value[props.no-1].value = newVal


}, {deep:true})

const submitForm = () => {
  const detailPlanList = [];

  storedSchedule.value.forEach((t) => {
    t.value.domains.forEach((x) => {
      detailPlanList.push({
        startTime: dayjs(x.startTime).format("hh:mm:ss"),
        endTime: dayjs(x.endTime).format("hh:mm:ss"),
        contentId: x.contentId,
        planPerDateNo: x.planPerDateNo,
        cost: x.cost
      });
    });
  });

  // detailPlanList 배열을 어떻게 사용할지는 여기에 추가 코드를 작성해 주세요.
  const title = storedTripTitle.value
  let planPerDateList = []

  let tripPlanNo = 1;

  for (let i = 0; i < props.gap; i++) {

    planPerDateList.push({
        "tripPlanNo" : tripPlanNo,
        "planTime" : dayjs(storedTripTerm.value[0]).add(i, 'day').format('YYYY-MM-DD')
    })
  }

  let userNo = 1;
  let describe = "노잼도시"

  const param = {
    "userNo" : userNo,
    "describle" : describe,
    "title" : title,
    "planPerDateList" : planPerDateList,
    "detailPlanList" : detailPlanList
  }

  console.log(detailPlanList)
  console.log('param', param)
};

</script>

<style>
/* Add your styles here if needed */
</style>

