<template>
  <a-table :columns="columns" :data-source="data">
    <template #bodyCell="{ column }">
      <template v-if="column.key === 'operation'">
        <a>action</a>
      </template>
    </template>
  </a-table>
</template>
<script setup>
const columns = [
  {
    title: '#',
    width: 100,
    dataIndex: 'idx',
    key: 'idx',
    fixed: 'left',
  },
  {
    title: '제목',
    width: 100,
    dataIndex: 'subject',
    key: 'subject',
    fixed: 'left',
  },
  {
    title: '작성자명',
    dataIndex: 'userId',
    key: 'userId',
    width: 150,
  },
  {
    title: '좋아요',
    dataIndex: 'Like',
    key: 'Like',
    width: 150,
  },
  {
    title: '조회수',
    dataIndex: 'hit',
    key: 'hit',
    width: 150,
  },
  {
    title: '등록시간',
    dataIndex: 'registeredTime',
    key: 'registeredTime',
    width: 150,
  }
];
const data = [];
for (let i = 1; i <= 123; i++) {
  data.push({
    idx: i,
    userId: `Edrward`,
    subject: `Edrward ${i}`,
    address: `London Park no. ${i}`,
    hit : parseInt(Math.random() * 1001),
    Like : parseInt(Math.random() * 1001),
    registeredTime : new Date()
  });
}
</script>