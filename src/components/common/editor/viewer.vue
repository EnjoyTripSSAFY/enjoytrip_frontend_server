<template>
  <div>
    <div :id="id"></div>
  </div>
</template>

<script setup>
import "@toast-ui/editor/dist/toastui-editor.css";
import Editor from "@toast-ui/editor";
import defaultOptions from "./default-options.js";

import {
  computed,
  nextTick,
  onMounted,
  onUnmounted,
  reactive, ref,
  watch,
} from "vue";
import axios from "axios";

const props = defineProps({
  modelValue: {
    type: String,
    default: "",
  },
  id: {
    type: String,
    required: false,
    default: () => {
      return (
          "markdown-editor-" +
          +new Date() +
          ((Math.random() * 1000).toFixed(0) + "")
      );
    },
  },
  options: {
    type: Object,
    default: () => {
      return defaultOptions;
    },
  },
  mode: {
    type: String,
    default: "markdown", // Change the default mode to "wysiwyg"
  },
  height: {
    type: String,
    required: false,
    default: "600px",
  },
  language: {
    type: String,
    required: false,
    default: "ko-KR", //'zh-CN'
  },
});

const emit = defineEmits(["update:modelValue"]);

const data = ref({
  editor: null,
});

const editorOptions = computed(() => {
  const options = Object.assign({}, props.options);
  options.initialEditType = props.mode;
  options.height = props.height;
  options.language = props.language;
  return options;
});

watch(
    () => props.modelValue,
    (newValue, preValue) => {
      if (newValue !== preValue) {
        data.editor.setHTML(newValue);
      }
    }
);

watch(
    () => props.language,
    (val) => {
      destroyEditor();
      initEditor();
    }
);

watch(
    () => props.height,
    (newValue) => {
      data.editor?.setHeight(newValue);
    },
    {}
);

watch(
    () => props.mode,
    (newValue) => {
      data.editor?.changeMode(newValue);
    }
);

onMounted(() => {
  initEditor();
});

onUnmounted(() => {
  destroyEditor();
});

function initEditor() {
  const $el = document.getElementById(props.id);
  data.editor = new Editor({
    el: $el,
    initialValue: props.modelValue,
    viewer : true,
  });


  data.editor.on("change", () => {
    emit("update:modelValue", data.editor?.getHTML());
  });
}

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

function destroyEditor() {
  if (!data.editor) return;
  data.editor.off("change");
  data.editor?.destroy();
}

function setMarkdown(value) {
  data.editor?.setMarkdown(value);
}

function getMarkdown() {
  return data.editor.getMarkdown();
}

function setHtml(value) {
  data.editor?.setHTML(value);
}

function getHtml() {
  console.log(
      "getHtml:",
      document.getElementById(props.id)?.querySelector(".toastui-editor-contents")
          ?.innerHTML
  );
  return (
      document.getElementById(props.id)?.querySelector(".toastui-editor-contents")
          ?.innerHTML || ""
  );
  // Uncaught RangeError: Applying a mismatched transaction
  // return data.editor?.getHTML();
}
defineExpose({
  getMarkdown,
  getHtml,
  setMarkdown,
  setHtml,
});
</script>

<style scoped></style>
