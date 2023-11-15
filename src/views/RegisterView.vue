<template>
  <div class="base-container">
    <div class="logo-container">
      <h1 style="font-size: 60px"> Register </h1>
    </div>
    <div class="logo-container">
      <img src="@/assets/logo.svg" alt="Logo" width="160" height="160"/>
    </div>
    <div class="login-container">
      <a-form
          :model="formState"
          name="basic"
          :label-col="{ span: 8 }"
          :wrapper-col="{ span: 24 }"
          autocomplete="off"
          @finish="onFinish"
          @finishFailed="onFinishFailed"
      >
        <a-form-item
            label="Username"
            name="username"
            :rules="[{ required: true, message: 'Please input your username!' }]"
        >
          <a-input v-model:value="formState.username" />
        </a-form-item>


        <a-form-item
            label="Email"
            name="email"
            :rules="[{ required: true, message: 'Please input your email!' }]"
        >
            <a-input v-model:value="formState.email_id">
            <template #addonAfter>
              <a-select v-model:value="formState.email_domain" style="width: 80px">
                <a-select-option value=".com">.com</a-select-option>
                <a-select-option value=".jp">.jp</a-select-option>
                <a-select-option value=".cn">.cn</a-select-option>
                <a-select-option value=".org">.org</a-select-option>
              </a-select>
            </template>
          </a-input>
        </a-form-item>

        <a-form-item
            label="Password"
            name="password"
            :rules="[{ required: true, message: 'Please input your password!' }]"
        >
          <a-input-password v-model:value="formState.password" />
        </a-form-item>

        <a-form-item
            label="Password2"
            name="password2"
            :rules="[{ required: true, message: 'Please input your password!' }]"
        >
          <a-input-password v-model:value="formState.password" />
        </a-form-item>

        <a-form-item :wrapper-col="{ offset: 8, span: 16 }">
          <a-button type="primary" html-type="submit">Submit</a-button>
        </a-form-item>
      </a-form>
    </div>
  </div>

</template>

<script setup>
import { reactive, computed } from 'vue';
import CustomBreadCrumb from "@/views/CustomBreadCrumb.vue";
const formState = reactive({
  username: '',
  password: '',
  email_id: '',
  email_domain : '',
});
const onFinish = values => {
  console.log('Success:', values);
};
const onFinishFailed = errorInfo => {
  console.log('Failed:', errorInfo);
};
const disabled = computed(() => {
  return !(formState.username && formState.password);
});

</script>

<style scoped>
.base-container {
  display: flex;
  flex-direction:column;
  align-items: stretch;
  justify-content: center;
  height: 70vh; /* 화면 전체 높이에 따라 중앙에 배치 */
}


.logo-container {
  display: flex;
  flex-direction: row;
  justify-content: center;
}

.login-container {
  display: flex;
  flex-direction: row-reverse;
  align-items: center;
  justify-content: center;
//height: 70vh; /* 화면 전체 높이에 따라 중앙에 배치 */
}

#components-form-demo-normal-login .login-form {
  max-width: 300px;
}
#components-form-demo-normal-login .login-form-forgot {
  float: right;
}
#components-form-demo-normal-login .login-form-button {
  width: 100%;
}

/* 필요한 스타일을 추가하세요. */
</style>

