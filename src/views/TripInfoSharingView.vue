<template>
  <!-- 검색 -->
  <a-space direction="horizontal" style="float: right;">
    <a-select v-model:value="param.key" default-active-first-option="default-active-first-option">
      <a-select-option value="">전체검색 </a-select-option>
      <a-select-option value="title">제목</a-select-option>
      <a-select-option value="no">글 번호</a-select-option>
      <a-select-option value="userId">회원명</a-select-option>
    </a-select>
    <a-input-search
        v-model:value="param.word"
        placeholder="search text"
        enter-button=""
        @search="search"
    />
  </a-space>


  <div>
    <a-table :columns="columns" :dataSource="tableData" :pagination="pagination" @change="handleTableChange"/>
  </div>

  <a-button type="primary" @click="moveWrite">글쓰기</a-button>
</template>

<script setup>
import {ref, onMounted} from 'vue';
import axios from 'axios';
import { useRouter } from 'vue-router'

const router = useRouter()

const columns = [
  {
    title: '#',
    width: 10,
    dataIndex: 'no',
    key: 'no',
    fixed: 'left',
  },
  {
    title: '제목',
    width: 20,
    dataIndex: 'title',
    key: 'title',
    fixed: 'left',
  },
  {
    title: '작성자명',
    dataIndex: 'userId',
    key: 'userId',
    width: 20,
  },
  {
    title: '조회수',
    dataIndex: 'hit',
    key: 'hit',
    width: 10,
  },
  {
    title: '등록시간',
    dataIndex: 'registerTime',
    key: 'registerTime',
    width: 15,
  }
];

const tableData = ref([]);
const pagination = ref({
  current: 1,
  pageSize: 10,
  total: 0,
  showSizeChanger: true,
  showQuickJumper: true,
});

const param = ref({
  key : '',
  word : '',
  currentPage : pagination.value.current,
  size : 10
})

const search = () => {
  param.value.pgno = 1
  fetchData()
}

const fetchData = () => {
  const apiUrl = 'http://localhost:8080/board';

  axios
      .get(apiUrl, {params: param.value})
      .then((response) => {
        tableData.value = response.data.result.result.boards; // 데이터 구조에 따라서 적절히 수정
        pagination.value.total = response.data.result.result.totalPageCount;
        param.value.pgno = response.data.result.result.current;
      })
      .catch((error) => {
        console.error('데이터를 불러오는 중 에러 발생:', error);
      });
};

const handleTableChange = (page) => {
  // console.log(page)
  pagination.value.current = page.current
  pagination.value.total = page.total
  pagination.value.pageSize = page.pageSize
  param.value.currentPage = pagination.value.current ;
  param.value.size = pagination.value.pageSize ;
  fetchData();
};

onMounted(() => {
  fetchData();
});

const moveWrite = () => {
  router.push('/attraction/write')
}
</script>

<style>
/* 추가적인 스타일링은 필요에 따라 수행하세요. */
</style>