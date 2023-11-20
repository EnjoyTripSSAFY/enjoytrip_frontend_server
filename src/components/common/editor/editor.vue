<template>
  <div ref="editor"/>
</template>

<script setup>
import {onMounted, ref, watch, onUnmounted} from 'vue';
import Editor from '@toast-ui/editor';
import '@toast-ui/editor/dist/toastui-editor.css';
import axios from "axios";

const props = defineProps({
  data: {
    type: String,
    required: false,
    default: '',
  },
});

const emit = defineEmits(['setContent']);
const editor = ref();
const editorHolder = ref();

//마운트될때 Editor 생성
onMounted(() => {
  editorHolder.value = new Editor({
    el: editor.value,
    height: '500px',
    initialEditType: 'markdown',
    initialValue : props.data,
    hooks: {
      addImageBlobHook: uploadImage,
    },
    events: {
      change: () => emit('setContent', editorHolder.value.getMarkdown()),
    },
  });
});

async function uploadImage(blob, callback) {
  const formData = new FormData();
  formData.append('file', blob);
  await axios.post('http://localhost:8080/upload/single', formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  })
      .then(response => {
        console.log('File uploaded successfully:', response.data);
        const url = response.data.result.saveFile
        callback(url, '사진 대체 텍스트 입력');
      })
      .catch(error => {
        console.error('Error uploading file:', error);
        callback('image_load_fail', '사진 대체 텍스트 입력');
      });
}

//작성한 내용 불러와서 html 적용
</script>