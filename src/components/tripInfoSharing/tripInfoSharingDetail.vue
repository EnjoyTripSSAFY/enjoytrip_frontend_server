<template>
  <div style="display: flex; justify-content: center; align-items: center; height: 80vh">
    <a-form
      :model="formState"
      ref="formRef"
      style="width: 65%; display: flex; flex-direction: column"
    >
      <h2></h2>
      <h2></h2>
      <h2></h2>

      <a-form-item label="제목" name="title">
        <a-input :value="formState.title" aria-readonly="true" />
      </a-form-item>

      <div style="flex: 1; width: 100%; max-height: 300px">
        <MarkdownViewer
          class="scrollable-container"
          v-if="contentIsLoaded"
          v-model="content"
          :model-value="content"
        />
        <a-skeleton v-else active />
      </div>

      <a-form-item>
        <a-button type="primary" @click="moveEdit">수정</a-button>
        <a-popconfirm
          title="Are you sure delete this task?"
          ok-text="Yes"
          cancel-text="No"
          @confirm="confirm"
          @cancel="cancel"
        >
          <a-button style="margin-top: 10px; margin-left: 10px">삭제</a-button>
        </a-popconfirm>
        <a-button style="margin-top: 10px; margin-left: 10px" @click="moveList">목록</a-button>
      </a-form-item>

      <a-collapse accordion class="scrollable-reply" style="max-height: 250px">
        <a-collapse-panel key="1" header="댓글">
          <CommentList v-if="replyIsLoaded" :comments="replies" />
        </a-collapse-panel>
      </a-collapse>
      <a-comment>
        <template #avatar>
          <a-avatar src="https://joeschmoe.io/api/v1/random" alt="Han Solo" />
        </template>
        <template #content>
          <a-form-item>
            <a-textarea v-model:value="reply.content" :rows="4" />
          </a-form-item>
          <a-form-item>
            <a-button html-type="submit" :loading="submitting" type="primary" @click="handleSubmit">
              Add Comment
            </a-button>
          </a-form-item>
        </template>
      </a-comment>
    </a-form>
  </div>
</template>

<script setup>
import { onMounted, reactive, ref, watch } from 'vue'
import MarkdownViewer from '@/components/common/editor/viewer.vue'
import { detailBoard, deleteBoard } from '@/api/boardApi'
import { listReply, registReply } from '@/api/replyApi'
import { useRoute, useRouter } from 'vue-router'
import CommentList from '@/components/tripInfoSharing/item/comment/CommentList.vue'

const content = ref('')
const formRef = ref()
const contentIsLoaded = ref(false)
const replyIsLoaded = ref(false)
const boardId = ref(null)
const submitting = ref(false)

import { provide } from 'vue'
import { message } from 'ant-design-vue'
const route = useRoute()
const router = useRouter()

provide('articleNo', route.params.articleno)

const formState = reactive({
  title: ''
})

const reply = ref({
  content: null,
  boardNo: null,
  parentNo: null,
  userId: null
})

const resetForm = () => {
  formRef.value.resetFields()
}

const fail = (error) => {
  console.error(error)
}

onMounted(async () => {
  boardId.value = route.params.articleno
  try {
    await detailBoard(
      boardId.value,
      (res) => {
        console.log(res)
        formState.title = res.data.result.title
        let value = res.data.result.content
        content.value = value
        contentIsLoaded.value = true
      },
      fail
    )

    await listReply(
      boardId.value,
      (res) => {
        replies.value = res.data.result
        replyIsLoaded.value = true
      },
      fail
    )

    reply.value = {
      content: null,
      boardNo: boardId.value,
      parentNo: null,
      userId: 'ssafy'
    }
  } catch (error) {
    console.error('Error fetching data from the server', error)
  }
})

const replies = ref(null)

const handleSubmit = async () => {
  submitting.value = true
  console.log(reply.value)

  await registReply(
    reply.value,
    (res) => {
      const idx = res.data.result.result
      const newComment = {
        no: idx,
        content: reply.value.content,
        boardNo: reply.value.boardNo,
        userId: 'ssafy'
      }
      replies.value.push(newComment)
      submitting.value = false
      reply.value.content = null
    },
    fail
  )
}

watch(replies.value, (newvalue, oldvalue) => {
  console.log(newvalue)
})

const moveEdit = () => {
  router.push({ name: 'tripInfoSharing-modify', params: { articleno: boardId.value } })
}

const confirm = (e) => {
  deleteBoard(
    boardId.value,
    (res) => {
      message.success('Click on Yes')
      router.replace({ name: 'tripInfoSharing' })
    },(err) => {
        message.warn('게시글 삭제를 실패하였습니다.')
      }
  )
}
const cancel = (e) => {}

const moveList = () => {
  router.push({ name: 'tripInfoSharing' })
}
</script>

<style scoped>
.scrollable-container {
  height: 300px;
  max-height: 300px; /* 높이를 원하는 값으로 조절할 수 있습니다. */
  overflow-y: auto;
}

.scrollable-reply {
  max-height: 150px; /* 높이를 원하는 값으로 조절할 수 있습니다. */
  overflow-y: auto;
}

.demo-loadmore-list {
  min-height: 350px;
}
</style>
