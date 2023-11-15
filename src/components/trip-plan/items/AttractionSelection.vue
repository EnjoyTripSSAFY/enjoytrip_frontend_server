<template>
  <a-divider orientation="left">계획 N일차</a-divider>

  <a-select
    v-model:value="value"
    mode="multiple"
    style="width: 100%"
    placeholder="Please select"
    :options="[...Array(25)].map((_, i) => ({ value: (i + 10).toString(36) + (i + 1) }))"
    @change="handleChange"
  >
  </a-select>

  <!-- 선택된 관광지 정보 뿌리는 곳 -->
  <AttractionCard />
</template>
<script>
import { defineComponent, ref } from 'vue'
import AttractionCard from './AttractionCard.vue'
export default defineComponent({
  setup() {
    const handleChange = (value) => {
      console.log(`selected ${value}`)
    }
    return {
      handleChange,
      value: ref(['a1', 'b2'])
    }
  },
  components: { AttractionCard }
})
</script>
