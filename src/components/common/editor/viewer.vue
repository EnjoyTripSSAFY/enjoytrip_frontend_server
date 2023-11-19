<template>
  <div class="toast-viewer">
    <div ref="viewer"></div>
  </div>
</template>

<script setup>
import "@toast-ui/editor/dist/toastui-editor-viewer.css";
import 'prismjs/themes/prism.css';
import '@toast-ui/editor-plugin-code-syntax-highlight/dist/toastui-editor-plugin-code-syntax-highlight.css';
import Prism from 'prismjs';
import "prismjs/components/prism-c";
import "prismjs/components/prism-cpp";
import "prismjs/components/prism-java";
import "prismjs/components/prism-python";
import Viewer from '@toast-ui/editor/dist/toastui-editor-viewer';
import codeSyntaxHighlight from '@toast-ui/editor-plugin-code-syntax-highlight';
import {onMounted, ref} from "vue";

const props = defineProps(['modelValue']);
const viewer = ref(null);

onMounted(() => {
  getViewer();
  viewer.value.setMarkdown(props.modelValue);
});

const getViewer = () => {
  viewer.value = new Viewer({
    el: viewer.value,
    plugins: [[codeSyntaxHighlight, {highlighter: Prism}]],
    height: '250px'
  });
};
</script>

<style scoped>

</style>
