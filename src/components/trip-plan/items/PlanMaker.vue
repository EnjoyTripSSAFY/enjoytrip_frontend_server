<template>
  <a-form
    :label-col="labelCol"
    :wrapper-col="wrapperCol"
    layout="horizontal"
    :disabled="componentDisabled"
    style="max-width: 300px"
  >
    <a-form-item label="여행 제목">
      <a-input v-model:value="storedTripTitle"/>
    </a-form-item>

    <a-form-item label="여행 날짜">
      <a-range-picker v-model:value="storedTripTerm"/>
    </a-form-item>
  </a-form>
</template>
<script setup>
import {storeToRefs} from "pinia";
import {tripInfoFirstStepStore} from "@/stores/tripPlanOneStepStore";

const {storedTripTitle, storedTripTerm} = storeToRefs(tripInfoFirstStepStore());

</script>
