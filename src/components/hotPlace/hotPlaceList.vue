<script setup>
import HeartOutlined from "@ant-design/icons-vue/lib/icons/HeartOutlined";
import { useRouter } from 'vue-router'
import { ref } from 'vue';

const router = useRouter()


const contentStyle = {
  minHeight: 120,
  lineHeight: '100px'
}

const hotplace = [
  {
    no: 1,
    title: 'Hot Place 1'
  },
  {
    no: 2,
    title: 'Hot Place 2'
  },
  {
    no: 3,
    title: 'Hot Place 3'
  },
  {
    no: 4,
    title: 'Hot Place 4'
  },
  {
    no: 5,
    title: 'Hot Place 5'
  },
  {
    no: 6,
    title: 'Hot Place 6'
  },
  {
    no: 1,
    title: 'Hot Place 1'
  },
  {
    no: 2,
    title: 'Hot Place 2'
  },
  {
    no: 3,
    title: 'Hot Place 3'
  },
  {
    no: 4,
    title: 'Hot Place 4'
  },
  {
    no: 5,
    title: 'Hot Place 5'
  },
  {
    no: 6,
    title: 'Hot Place 6'
  },
];

const current1 = ref(1);
const pageSize1 = ref(20);

const moveWrite = () => {
  router.push({name : 'hotPlace-write'})
}
</script>

<template>
  <a-space direction="vertical" :style="{ width: '100%' }" :size="[0, 48]">
    <a-layout>
      <a-page-header
          style="border: 1px solid rgb(235, 237, 240)"
          title="핫플 자랑하기"
          sub-title="좋은 곳은 서로 공유해요!"
      />
      <a-row justify = "end"  style="margin-top:20px; margin-bottom: 20px">
        <a-button type="primary" @click="moveWrite">글쓰기</a-button>
      </a-row>

      <a-layout-content :style="contentStyle" >
          <a-row :gutter="16" >
            <a-col :span="4" v-for="(data, index) in hotplace" :key="data.no">
              <router-link :to="{ name: 'hotPlace-view', params: { articleno : index } }">
                <a-card :title="data.title" style="width: 300px; margin-bottom: 50px">
                  <template #extra>
                    <heart-outlined/> 6
                  </template>
                  <template #cover>
                    <a-image alt="example" src="https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png" :width="300" :height="250"/>
                  </template>
                  <a-card-meta title="하늘궁 롤스로이스">
                    <template #avatar>
                      <a-image
                          width="30px"
                          height="30px"
                          src="https://i.namu.wiki/i/tKpc3dNDvUC7-_uJFuEBGhFfeXKvkr7KCIbjtXoYjZPjKsm0Q1X2f_U7z6AVME3zsFcktdxrdrl6E4LSeSAE2qalOR1ILCtBJZ9gnN5D3ydP6Nq2H_x7rB_p6ArU8iHUKvlvDfxOMzsIbxy7Ifr3ZQ.webp"
                      ></a-image>
                    </template>
                    <template #description>2023.10.11</template>
                  </a-card-meta>
                </a-card>
              </router-link>
            </a-col>
          </a-row>
      </a-layout-content>

      <a-layout-footer style="position: initial; bottom: 50px; left: 0; width: 100%;">
        <a-row justify="center">
          <a-col :span="24" style="text-align: center">
            <a-pagination
                v-model:current="current1"
                v-model:page-size="pageSize1"
                :total="85"
                :show-total="total => `Total ${total} items`"
            />
          </a-col>
        </a-row>
      </a-layout-footer>

    </a-layout>
  </a-space>
</template>

<style scoped>

</style>