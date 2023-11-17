<template>
  <div style="display: flex; justify-content: center; align-items: center; height: 80vh;">
    <a-form :model="formState" ref="formRef" style="width: 65%; display: flex; flex-direction: column;">
      <h2>글 조회</h2>

      <a-form-item label="제목" name="title">
        <a-input :value="formState.title" aria-readonly="true" />
      </a-form-item>

      <div style="flex: 1; width: 100%;">
        <MarkdownViewer v-model="content" ref="childRef" />
      </div>

      <a-form-item>
        <a-button type="primary" @click="onSubmit">수정</a-button>
        <a-button style="margin-top: 10px; margin-left: 10px" @click="resetForm">삭제</a-button>
        <a-button style="margin-top: 10px; margin-left: 10px" @click="resetForm">목록</a-button>
      </a-form-item>
    </a-form>
  </div>
</template>

<script setup>
import { onMounted, reactive, ref, watch } from "vue";
import MarkdownViewer from "@/components/common/editor/viewer.vue";
import { detailBoard, editBoard } from "@/api/boardApi";
import {useRoute} from "vue-router";

const content = ref("");
const formRef = ref();
const route = useRoute()

const childRef = ref(null);

const formState = reactive({
  title: "",
});


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
      let value = res.data.result.content;
      console.log(value)
      childRef.value.setHtml(value)

    }

    await detailBoard(boardId, success , fail);


  } catch (error) {
    console.error("Error fetching data from the server", error);
  }
});
</script>
