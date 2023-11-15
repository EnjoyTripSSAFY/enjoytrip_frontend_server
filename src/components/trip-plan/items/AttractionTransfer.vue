<template>
  <div>
    <a-transfer
      :data-source="mockData"
      :target-keys="targetKeys"
      :disabled="disabled"
      :show-search="showSearch"
      :filter-option="(inputValue, item) => item.title.indexOf(inputValue) !== -1"
      :show-select-all="false"
      @change="onChange"
    >
      <template
        #children="{
          direction,
          filteredItems,
          selectedKeys,
          disabled: listDisabled,
          onItemSelectAll,
          onItemSelect
        }"
      >
        <a-table
          :row-selection="
            getRowSelection({
              disabled: listDisabled,
              selectedKeys,
              onItemSelectAll,
              onItemSelect
            })
          "
          :columns="direction === 'left' ? leftColumns : rightColumns"
          :data-source="filteredItems"
          size="small"
          :style="{ pointerEvents: listDisabled ? 'none' : null }"
          :custom-row="
            ({ key, disabled: itemDisabled }) => ({
              onClick: () => {
                if (itemDisabled || listDisabled) return
                onItemSelect(key, !selectedKeys.includes(key))
              }
            })
          "
        />
      </template>
    </a-transfer>
    <a-switch
      un-checked-children="disabled"
      checked-children="disabled"
      v-model:checked="disabled"
      style="margin-top: 16px"
    />
    <a-switch
      un-checked-children="showSearch"
      checked-children="showSearch"
      v-model:checked="showSearch"
      style="margin-top: 16px"
    />
  </div>
</template>
<script>
import { difference } from 'lodash-es'
import { defineComponent, ref } from 'vue'
const mockData = []
for (let i = 0; i < 20; i++) {
  mockData.push({
    key: i.toString(),
    title: `content${i + 1}`,
    description: `description of content${i + 1}`,
    disabled: i % 4 === 0
  })
}
const originTargetKeys = mockData.filter((item) => +item.key % 3 > 1).map((item) => item.key)
const leftTableColumns = [
  {
    dataIndex: 'title',
    title: 'Name'
  },
  {
    dataIndex: 'description',
    title: 'Description'
  }
]
const rightTableColumns = [
  {
    dataIndex: 'title',
    title: 'Name'
  }
]
export default defineComponent({
  setup() {
    const targetKeys = ref(originTargetKeys)
    const disabled = ref(false)
    const showSearch = ref(false)
    const leftColumns = ref(leftTableColumns)
    const rightColumns = ref(rightTableColumns)
    const onChange = (nextTargetKeys) => {
      targetKeys.value = nextTargetKeys
    }
    const getRowSelection = ({ disabled, selectedKeys, onItemSelectAll, onItemSelect }) => {
      return {
        getCheckboxProps: (item) => ({
          disabled: disabled || item.disabled
        }),
        onSelectAll(selected, selectedRows) {
          const treeSelectedKeys = selectedRows
            .filter((item) => !item.disabled)
            .map(({ key }) => key)
          const diffKeys = selected
            ? difference(treeSelectedKeys, selectedKeys)
            : difference(selectedKeys, treeSelectedKeys)
          onItemSelectAll(diffKeys, selected)
        },
        onSelect({ key }, selected) {
          onItemSelect(key, selected)
        },
        selectedRowKeys: selectedKeys
      }
    }
    return {
      mockData,
      targetKeys,
      disabled,
      showSearch,
      leftColumns,
      rightColumns,
      onChange,
      getRowSelection
    }
  }
})
</script>
