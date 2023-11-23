<template>
  <div class="base-container">
    <div class="logo-container">
      <h1 style="font-size: 60px">아냐와 함께 여행을 떠나보자!</h1>
    </div>
  </div>
  <img
    v-if="data === null"
    src="@/assets/video/anya.gif"
    alt="Loading"
    style="height: 30%; width: 30%"
  />
  <div v-else>
    <div>Here's the data!</div>
    <pre>{{ data.toString() }}</pre>
  </div>
</template>

<script>
import { ref, onMounted } from 'vue'

export default {
  setup() {
    const data = ref(null)

    onMounted(() => {
      // Replace this `fetch` call with whatever your endpoint call may be.
      fetch('./endpoint')
        .then((resp) => resp.json())
        .then((json) => (data.value = json))
    })

    return { data }
  }
}
</script>

<style>
.base-container {
  display: flex;
  flex-direction: column;
  align-items: stretch;
  justify-content: center;
  height: 10vh; /* 화면 전체 높이에 따라 중앙에 배치 */
}

.logo-container {
  display: flex;
  flex-direction: row;
  justify-content: center;
}
</style>
