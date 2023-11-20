<script setup>
import AttractionList from "@/components/attraction/AttractionList.vue";
</script>
<template>
  <main>
    <div>
      <a-page-header
          style="border: 1px solid rgb(235, 237, 240)"
          title="여행지 조회"
          sub-title="여행지를 탐색 해볼까요?"
      />
      <AttractionList></AttractionList>
    </div>
  </main>
</template>
