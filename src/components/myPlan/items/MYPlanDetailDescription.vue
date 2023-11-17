<template>
  <a-descriptions title="N 번째 계획" bordered>
    <a-descriptions-item label="관광지 명">관광지 명</a-descriptions-item>
    <a-descriptions-item label="비용">50000</a-descriptions-item>
    <a-descriptions-item label="컨텐츠 아이디">1</a-descriptions-item>
    <a-descriptions-item label="시작 시간">2018-04-24 18:00:00</a-descriptions-item>
    <a-descriptions-item label="끝난 시간" :span="2">2019-04-24 18:00:00</a-descriptions-item>
    <a-descriptions-item label="Config Info">
      컨텐츠 정보1
      <br />
      컨텐츠 정보2
      <br />
      컨텐츠 정보3
    </a-descriptions-item>
  </a-descriptions>
</template>
