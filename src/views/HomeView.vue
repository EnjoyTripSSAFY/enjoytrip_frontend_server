<template>
  <div class="bg">
    <video muted autoplay loop>
      <source src="@/assets/video/beach.mp4" type="video/mp4" />
    </video>
    <div class="text">
      <p>Enjoy your trip</p>
    </div>
  </div>

  <a-carousel arrows dots-class="slick-dots slick-thumb">
    <template #customPaging="props">
      <a>
        <img :src="getImgUrl(props.i)" />
      </a>
    </template>
    <div v-for="item in 4" :key="item">
      <img :src="getImgUrl(item - 1)" />
    </div>
  </a-carousel>
</template>

<script>
import { defineComponent } from 'vue'
const baseUrl =
  'https://raw.githubusercontent.com/vueComponent/ant-design-vue/main/components/carousel/demo/'
export default defineComponent({
  setup() {
    const getImgUrl = (i) => {
      return `${baseUrl}abstract0${i + 1}.jpg`
    }
    return {
      getImgUrl
    }
  }
})
</script>

<style scoped>
/* For demo */
:deep(.slick-dots) {
  position: relative;
  height: auto;
}
:deep(.slick-slide img) {
  border: 5px solid #fff;
  display: block;
  margin: auto;
  max-width: 80%;
}
:deep(.slick-arrow) {
  display: none !important;
}
:deep(.slick-thumb) {
  bottom: 0px;
}
:deep(.slick-thumb li) {
  width: 60px;
  height: 45px;
}
:deep(.slick-thumb li img) {
  width: 100%;
  height: 100%;
  filter: grayscale(100%);
  display: block;
}
:deep .slick-thumb li.slick-active img {
  filter: grayscale(0%);
}

/*  */
video {
  width: 100%;
}
.text {
  position: absolute;
  width: 100%;
  top: 60%;
  left: 70%;
  transform: translate(-50%, -50%);
}
.text p {
  text-align: center;
  font-size: 48px;
  color: black;
}

@media (max-width: 664px) {
  .bg {
    height: auto;
  }
  video {
    height: 400px;
  }
  .text p {
    font-size: 24px;
  }
}
</style>
