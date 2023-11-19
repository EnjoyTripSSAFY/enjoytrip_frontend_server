<template>
  <div style="display: flex; justify-content: center; align-items: center; height: 80vh;">
    <a-form :model="formState" :rules="rules" ref="formRef" style="width: 65%; display: flex; flex-direction: column;">
      <h2>글 수정하기</h2>

      <a-form-item label="제목" name="title">
        <a-input v-model:value="formState.title" />
      </a-form-item>

      <div style="flex: 1; width: 100%;">
        <markdown-editor v-if="contentIsLoaded" :data="content" @setContent="setContent"  />
      </div>

      <a-form-item>
        <a-button type="primary" @click="onSubmit">수정</a-button>
        <a-button style="margin-top: 10px; margin-left: 30px" @click="resetForm">취소</a-button>
        <a-button style="margin-top: 10px; margin-left: 30px" @click="moveList">목록</a-button>
      </a-form-item>
    </a-form>
  </div>
</template>

<script setup>
import { onMounted, reactive, ref, watch } from "vue";
import MarkdownEditor from "@/components/common/editor/editor.vue";
import { detailBoard, editBoard } from "@/api/boardApi";
import {useRoute} from "vue-router";
import router from "@/router";

const content = ref("");
const formRef = ref();
const route = useRoute()
const contentIsLoaded = ref(false);

const formState = reactive({
  title: "",
});

const rules = {
  title: [
    {
      required: true,
      message: "제목을 입력하세요!",
      trigger: "blur",
    },
  ],
};

const setContent = (e) => {
  content.value = e;
};

const onSubmit = async () => {
  try {
    formRef.value.validate();

    const params = {
      no: route.params.articleno, // You may need to get the board ID from the route or other source
      content: content.value,
      title: formState.title,
      userId: "ssafy",
    };

    const success = (response) => {
      console.log(response);
    };
    const fail = (error) => {
      console.error(error);
    };

    await editBoard(params, success, fail);
  } catch (error) {
    console.log("Validation error", error);
  }
};

const resetForm = () => {
  formRef.value.resetFields();
  content.value = null
};

onMounted(async () => {
  try {
    const boardId = route.params.articleno
    let fail = (error) => {
      console.error(error)
    };

    let success = (res) => {
      console.log(res)
      formState.title = res.data.result.title
      content.value = res.data.result.content;
      contentIsLoaded.value = true
    }

    await detailBoard(boardId, success , fail);


  } catch (error) {
    console.error("Error fetching data from the server", error);
  }
});

const moveList = () => {
  router.push({name : 'tripInfoSharing'})
}
</script>
