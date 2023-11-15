<template>
  <a-breadcrumb style="margin: 16px 0">
    <a-breadcrumb-item v-for="(item, index) in items" :key="index">{{ item }}</a-breadcrumb-item>
  </a-breadcrumb>
</template>

<script>
export default {
  name: 'CustomBreadCrumb',
  props: {
    items: {
      type: Array,
      required: true,
    },
  },
};
</script>