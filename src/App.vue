<template>
<demo/>
</template>

<script>
import Demo from "@/views/Demo.vue";
import {defineComponent} from "vue";
import Demo2 from "@/views/Demo2.vue";

export default defineComponent({
  components: {Demo2, Demo}
})

</script>

<style scoped>

</style>