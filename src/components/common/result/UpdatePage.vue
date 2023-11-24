<template>
  <a-result title="지금은 서비스를 업데이트 중에 있습니다. 많은 관심 부탁드립니다.">
    <template #icon>
      <img
        v-if="data === null"
        src="https://i.namu.wiki/i/SfSJlndFJVJUnIutrcL3_2AwpHIIDxSF8lgF2dAlAu1traJdehjV-NyAXucewHb70ep9d4Vsm4t51BcBsALbnw.gif"
        alt="Loading"
        style="height: 50%; width: 50%"
      />
      <div v-else>
        <div>Here's the data!</div>
        <pre>{{ data.toString() }}</pre>
      </div>
    </template>
    <template #extra>
      <a-button type="primary" @click="moveHome()">Go Home</a-button>
    </template>
  </a-result>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

const data = ref(null)
const moveHome = () => {
  router.push({ name: 'home' })
}

onMounted(() => {
  fetch('./endpoint')
    .then((resp) => resp.json())
    .then((json) => (data.value = json))
})
</script>
