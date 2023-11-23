<template>
  <a-row>
    <a-col :span="24">
      <a-form>
        <a-form-item label="이미지 업로드">
          <a-upload-dragger
              v-model:fileList="fileList"
              name="file"
              :multiple="true"
              action="http://localhost:8080/upload/single"
              @change="handleChange"
              @drop="handleDrop"
              list-type="picture"
          >
            <p class="ant-upload-drag-icon">
              <inbox-outlined></inbox-outlined>
            </p>
            <p class="ant-upload-text">Click or drag file to this area to upload</p>
            <p class="ant-upload-hint">
              Support for a single or bulk upload. Strictly prohibit from uploading company data or other
              band files
            </p>
          </a-upload-dragger>
        </a-form-item>
        <a-form-item label="장소">
          <a-input v-model:value="place" />
        </a-form-item>
        <a-form-item label="방문일">
          <a-date-picker v-model:value="date" style="width: 100%" />
        </a-form-item>
        <a-form-item label="장소유형">
          <a-select v-model:value="type" placeholder="관광지 전체">
            <a-select-option value="">관광지 전체</a-select-option>
            <a-select-option value="12">관광지</a-select-option>
            <a-select-option value="14">문화시설</a-select-option>
            <a-select-option value="15">축제공연행사</a-select-option>
            <a-select-option value="25">여행코스</a-select-option>
            <a-select-option value="28">레포츠</a-select-option>
            <a-select-option value="32">숙박</a-select-option>
            <a-select-option value="38">쇼핑</a-select-option>
            <a-select-option value="39">음식점</a-select-option>
          </a-select>
        </a-form-item>
        <a-form-item label="핫플 상세설명">
          <a-textarea v-model:value="txt" :rows="3" />
        </a-form-item>
        <a-form-item label="평점">
          <a-input type="hidden" v-model:value="rate" disabled></a-input>
          <a-rate v-model:value="rate" allow-half />
        </a-form-item>

        <a-form-item :wrapper-col="{ span: 24}">
          <a-button type="primary" @click="onSubmit">Create</a-button>
          <a-button style="margin-left: 10px" @click="onCancel">Cancel</a-button>
        </a-form-item>
      </a-form>
    </a-col>
  </a-row>
</template>

<script setup>
import { ref } from 'vue';
import InboxOutlined from "@ant-design/icons-vue/lib/icons/InboxOutlined";
const fileList = ref([])
import {kakaoMapPosStoreHotPlace} from "@/stores/kakaoMapPosStoreHotPlace";
import {storeToRefs} from "pinia";
import {message} from "ant-design-vue";
import dayjs from "dayjs";

const fileId = ref([])
const place = ref('');
const date = ref(null);
const type = ref('');
const txt = ref('');

const rate = ref(0);

const handleChange = info => {
  const status = info.file.status;
  if (status !== 'uploading') {
    console.log(info.file, info.fileList);
  }
  if (status === 'done') {
    message.success(`${info.file.name} file uploaded successfully.`);
  } else if (status === 'error') {
    message.error(`${info.file.name} file upload failed.`);
  }
};
function handleDrop(e) {
  console.log(e);
}

const onSubmit = () => {



  const param = {
    image : fileList.value.map(f => f.response.result.no),
    rate : rate.value,
    place : place.value,
    date : dayjs(date.value).format('YYYY-MM-DD'),
    description : txt.value,
  }

  console.log(param)
};

const onCancel = () => {
  console.log('Success:', values);
};

</script>

<style scoped>

</style>
