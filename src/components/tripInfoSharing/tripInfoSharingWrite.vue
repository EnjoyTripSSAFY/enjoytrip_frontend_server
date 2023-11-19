<template>
  <div style="display: flex; justify-content: center; align-items: center; height: 80vh;">
    <a-form ref="formRef" :model="formState" :rules="rules" style="width: 65%; display: flex; flex-direction: column;">
      <h2>글 작성하기</h2>

      <a-form-item ref="title" label="제목 " name="title">
        <a-input v-model:value="formState.title"/>
      </a-form-item>

      <div style="flex: 1; width: 100%;">
        <markdown-editor  :data="content" @setContent="setContent"  />
      </div>

      <a-form-item>
        <a-button type="primary" @click="onSubmit">Create</a-button>
        <a-button style="margin-top:10px; margin-left: 30px" @click="resetForm">Reset</a-button>
        <a-button style="margin-top:10px; margin-left: 30px" @click="moveList">List</a-button>
      </a-form-item>
    </a-form>
  </div>
</template>

<script setup>
import {onMounted, reactive, ref, watch} from "vue";
import MarkdownEditor from "@/components/common/editor/editor.vue"
import {postBoard} from "@/api/boardApi"
import router from "@/router";

const content = ref('');
const formRef = ref();

const setContent = (e) => {
  content.value = e;
};

const formState = reactive({
  title: '',
});
const rules = {
  title: [
    {
      required: true,
      message: '제목을 입력하세요!',
      trigger: 'cursor',
    },
  ],
};

const onSubmit = () => {
  formRef.value
      .validate()
      .then(async () => {
        const params = {
          content: content.value,
          title: formState.title,
          userId: 'ssafy'
        }

        const success = (response) => {
          console.log(content.value)
          console.log(response)
        };
        const fail = (error) => {
          console.error(error)
        };

        await postBoard(params, success, fail)

      })
      .catch(error => {
        console.log('error', error);
      });
};

const moveList = () => {
  router.push({name : 'tripInfoSharing'})
}
const resetForm = () => {
  formRef.value.resetFields();
};
</script>