<template>
  <div>
    <a-transfer
      v-model:target-keys="targetKeys"
      :data-source="mockData"
      :render="(item) => item.title"
      :disabled="disabled"
      pagination
      @change="handleChange"
    />
    <!-- <a-switch
      v-model:checked="disabled"
      un-checked-children="enabled"
      checked-children="disabled"
      style="margin-top: 16px"
    /> -->
  </div>
</template>
<script>
import { ref } from 'vue'
const mockData = []
for (let i = 0; i < 200; i++) {
  mockData.push({
    key: i.toString(),
    title: `content${i + 1}`,
    description: `description of content${i + 1}`
  })
}
const oriTargetKeys = mockData.filter((item) => +item.key % 3 > 1).map((item) => item.key)
const targetKeys = ref(oriTargetKeys)
const handleChange = (nextTargetKeys, direction, moveKeys) => {
  console.log('targetKeys: ', nextTargetKeys)
  console.log('direction: ', direction)
  console.log('moveKeys: ', moveKeys)
}
</script>
