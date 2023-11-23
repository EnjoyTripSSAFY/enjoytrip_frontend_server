<template>
  <div>
    <a-time-picker v-model:value="value" v-model:open="open" @openChange="handleOpenChange">
      <template #addon="{ prefixCls }">
        <a-button size="small" type="primary" @click="handleClose">Ok {{ prefixCls }}</a-button>
      </template>
    </a-time-picker>
    <a-time-picker v-model:value="value" v-model:open="open2">
      <template #addon>
        <a-button size="small" type="primary" @click="handleClose">Ok</a-button>
      </template>
    </a-time-picker>
  </div>
</template>

<script setup>
import { ref } from 'vue';

const open = ref(false);
const open2 = ref(false);
const value = ref();

const handleOpenChange = (openStatus) => {
  console.log('open', openStatus);
  open.value = openStatus;
};

const handleClose = () => {
  open.value = false;
  open2.value = false;
};
</script>
