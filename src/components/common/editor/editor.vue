<template>
  <div className="toast-edit" ref="editor"></div>
</template>

<script setup>
import "prismjs/themes/prism.css";
import "@toast-ui/editor-plugin-code-syntax-highlight/dist/toastui-editor-plugin-code-syntax-highlight.css";
import "tui-color-picker/dist/tui-color-picker.css";
import "@toast-ui/editor-plugin-color-syntax/dist/toastui-editor-plugin-color-syntax.css";

import colorSyntax from "@toast-ui/editor-plugin-color-syntax";
import Prism from "prismjs";
import "prismjs/components/prism-c";
import "prismjs/components/prism-cpp";
import "prismjs/components/prism-java";
import "prismjs/components/prism-python";
import "@toast-ui/editor/dist/i18n/ko-kr";
import Editor from "@toast-ui/editor";
import codeSyntaxHighlight from "@toast-ui/editor-plugin-code-syntax-highlight";
import {onMounted, ref, watch, defineEmits} from "vue";
import "@toast-ui/editor/dist/toastui-editor.css";
import axios from "axios";

const props = defineProps(["data"]);
const editor = ref(null);
const changedPrism = ref(Prism);
const emit = defineEmits(["setContent"])

onMounted(() => {
  console.log(props.data)
  setEditor();
  if (props.data) {
    try {
      editor.value.setMarkdown(props.data);
    } catch (e) {
      editor.value.setHTML(props.data);
    }
  }
});

const setEditor = () => {
  editor.value = new Editor({
    el: editor.value,
    plugins: [
      colorSyntax,
      [codeSyntaxHighlight, {highlighter: changedPrism.value}],
    ],
    initialEditType: "markdown",
    language: "ko",
    events: {
      change: onChangeEditor,
    },
    hooks: {
      addImageBlobHook: uploadImage,
    },
    initialValue : props.data,
    height: '500px',
  });
};

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

const onChangeEditor = () => {
  editorText.value = editor.value.getMarkdown();
};

watch(
    () => props.data,
    (newValue) => {
      if (editorText.value !== newValue) {
        editor.value.setMarkdown(newValue);
      }
    }
);

const editorText = ref(null);

watch(
    () => editorText.value,
    (newValue, oldValue) => {
      if (newValue !== oldValue) {
        emit("setContent", editor.value.getMarkdown());
      }
    }
);
</script>

<style>
/* Add your styles here if needed */
</style>
