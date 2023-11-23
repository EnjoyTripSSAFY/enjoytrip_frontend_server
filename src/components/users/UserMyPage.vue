<script setup></script>

<template>
  <div style="display: flex">
    <a-space direction="vertical" :size="32" style="margin: 50px">
      <a-space wrap :size="16">
        <a-avatar :size="120">
          <template #icon><UserOutlined /></template>
        </a-avatar>
      </a-space>
    </a-space>
    <a-descriptions title="User Info" style="margin-top: 50px">
      <a-descriptions-item label="아이디">Zhou Maomao</a-descriptions-item>
      <a-descriptions-item label="이름">1810000000</a-descriptions-item>
      <a-descriptions-item label="이메일">Hangzhou, Zhejiang</a-descriptions-item>
      <a-descriptions-item label="가입일">empty</a-descriptions-item>
      <a-descriptions-item label="계정 유형">
        No. 18, Wantang Road, Xihu District, Hangzhou, Zhejiang, China
      </a-descriptions-item>
    </a-descriptions>
  </div>
</template>
