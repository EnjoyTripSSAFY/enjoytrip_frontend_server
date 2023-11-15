<template>
  <a-form
    :label-col="labelCol"
    :wrapper-col="wrapperCol"
    layout="horizontal"
    :disabled="componentDisabled"
    style="max-width: 300px"
  >
    <a-form-item label="여행 제목">
      <a-input />
    </a-form-item>

    <a-form-item label="여행 날짜">
      <a-range-picker />
    </a-form-item>
  </a-form>
</template>
<script></script>
