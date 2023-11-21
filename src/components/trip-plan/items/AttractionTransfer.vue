<template>
  <div>
    <a-transfer
        v-model:target-keys="targetKeys"
        :data-source="mockData"
        show-search
        :filter-option="(inputValue, item) => item.title.indexOf(inputValue) !== -1"
        :show-select-all="false"
        @change="onChange"
        :pagination='true'
    >
      <template
          #children="{
          direction,
          filteredItems,
          selectedKeys,
          onItemSelectAll,
          onItemSelect,
        }"
      >
        <a-table
            :row-selection="
            getRowSelection({
              selectedKeys,
              onItemSelectAll,
              onItemSelect,
            })
          "
            :columns="direction === 'left' ? leftColumns : rightColumns"
            :data-source="filteredItems"
            size="small"
            :style="{ pointerEvents: listDisabled ? 'none' : null }"
            :custom-row="
            ({ key, disabled: itemDisabled }) => ({
              onClick: () => {
                if (itemDisabled || listDisabled) return;
                onItemSelect(key, !selectedKeys.includes(key));
              },
            })
          "
        />
      </template>
    </a-transfer>
  </div>
</template>
<script setup>
import { ref } from 'vue';
import {storeToRefs} from "pinia";
import {tripInfoStore} from "@/stores/tripInfoStore";
const tripinfoStore = tripInfoStore()

const { selectedState, selectedCity, selectedType, selectedPgno } = storeToRefs(tripinfoStore)


const mockData = ref([]);
for (let i = 0; i < 100; i++) {
  mockData.value.push({
    key: i.toString(),
    title: `content${i + 1}`,
    description: `description of content${i + 1}`,
  });
}

const leftTableColumns = [
  {
    dataIndex: 'title',
    title: 'Name',
  },
  {
    dataIndex: 'description',
    title: 'Description',
  },
];
const rightTableColumns = [
  {
    dataIndex: 'title',
    title: 'Name',
  },
];
const targetKeys = ref([]);
const leftColumns = ref(leftTableColumns);
const rightColumns = ref(rightTableColumns);
const onChange = (nextTargetKeys, direction, moveKeys) => {
  console.log('targetKeys: ', nextTargetKeys);
  console.log('direction: ', direction);
  console.log('moveKeys: ', moveKeys);
};
const getRowSelection = ({ disabled, selectedKeys, onItemSelectAll, onItemSelect }) => {
  return {
    getCheckboxProps: item => ({
      disabled: disabled || item.disabled,
    }),
    onSelectAll(selected, selectedRows) {
      const treeSelectedKeys = selectedRows.filter(item => !item.disabled).map(({ key }) => key);
      onItemSelectAll(treeSelectedKeys, selected);
    },
    onSelect({ key }, selected) {
      onItemSelect(key, selected)
      // 커스텀
      console.log(key, selected)
    },
    selectedRowKeys: selectedKeys,
  };
};
</script>