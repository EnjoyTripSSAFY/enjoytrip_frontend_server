
<!-- CommentList.vue -->
<template>
  <div>
    <a-comment v-for="comment in comments" :key="comment.id">
      <template #actions v-if="comment.content.indexOf('삭제') === -1">
        <span @click="startReply(comment)" v-if="!comment.isModifying">Reply</span>
        <span @click="startModify(comment)" v-if="!comment.isModifying">Modify</span>
        <span v-if="!comment.isDeleted">
          <a-popconfirm
            title="정말로 해당 댓글을 삭제하시겠습니끼?"
            ok-text="Yes"
            cancel-text="No"
            @confirm="confirm(comment)"
            @cancel="cancel"
        >
        <a href="#">Delete</a>
        </a-popconfirm></span>
      </template>
      <template #author>
        <a v-if="!comment.isDeleted">{{ comment.userId }}</a>
        <a v-else> ???? </a>
      </template>
      <template #avatar>
        <a-avatar src="https://joeschmoe.io/api/v1/random" alt="{{ comment.userId }}"/>
      </template>
      <template #content>
        <p v-if="!comment.isModifying">{{ comment.content }}</p>
        <a-comment v-if="comment.isModifying">
          <!-- Modified comment content -->
          <template #avatar>
            <a-avatar src="https://joeschmoe.io/api/v1/random" alt="Han Solo" />
          </template>
          <template #content>
            <a-form-item>
              <a-textarea v-model:value="comment.modifiedContent" :rows="4" />
            </a-form-item>
            <a-form-item>
              <a-button html-type="submit" :loading="comment.submitting" type="primary" @click="handleModifySubmit(comment)">
                Add Comment
              </a-button>
              <a-button html-type="submit" type="primary" @click="cancelModify(comment)">
                Cancel
              </a-button>
            </a-form-item>
          </template>
        </a-comment>
      </template>
      <template #datetime>
        <a-tooltip :title="dayjs().format('YYYY-MM-DD HH:mm:ss')">
          <span v-if="!comment.isDeleted">{{ comment.registerTime }}</span>
          <span v-else> </span>
        </a-tooltip>
      </template>
      <a-comment v-if="comment.replying">
        <!-- Reply content -->
        <!-- ... same structure as modified comment content ... -->
        <template #content>
          <a-form-item>
            <a-textarea v-model:value="comment.replyContent" :rows="4" />
          </a-form-item>
          <a-form-item>
            <a-button html-type="submit" :loading="comment.submitting" type="primary" @click="handleReplySubmit(comment)">
              Add Reply
            </a-button>
            <a-button html-type="submit" type="primary" @click="cancelReply(comment)">
              Cancel
            </a-button>
          </a-form-item>
        </template>
      </a-comment>

      <!-- Recursively render nested comments -->
      <CommentList :comments="comment.children" v-if="comment.children && comment.children.length > 0" />
    </a-comment>
  </div>
</template>

<!-- CommentList.vue -->
<script setup>
import { ref } from 'vue';
import dayjs from "dayjs";
import { message } from 'ant-design-vue';
import { deleteReply, registReply, modifyReply } from "@/api/replyApi"
import { useRoute } from "vue-router";

const props = defineProps(['comments']);
const route = useRoute()
const currentBoardNo = route.params.articleno + ""


const startModify = (comment) => {
  comment.isModifying = true;
  comment.modifiedContent = comment.content;
};

const handleModifySubmit = async (comment) => {
  const param = {
    boardNo: currentBoardNo,
    no: comment.id + "" || comment.no + "",
    content: comment.modifiedContent,
  }

  console.log(param)

  await modifyReply(param,
      () => {
        comment.content = comment.modifiedContent;
        comment.isModifying = false;
        message.success('댓글이 성공적으로 수정되었습니다.');
      },
      () => {
        message.warn('댓글 수정에 실패하였습니다.');
      }
  );
};

const cancelModify = (comment) => {
  comment.isModifying = false;
};

const confirm = async (comp) => {
  const param = {
    boardNo: currentBoardNo,
    no: comp.id + "",
  }
  console.log(param)


  await deleteReply(param,
      () => {
        comp.content = "삭제된 댓글입니다."
        comp.isDeleted = true
        message.success('해당 댓글은 성공적으로 삭제되었습니다.');
      },
      () => {
        message.warn('댓글 삭제에 실패하였습니다.');
      }
  );
};

const cancel = e => {
};

const startReply = (comment) => {
  comment.replying = true;
  comment.replyContent = ''; // 이전의 답글 내용 지우기
};

const handleReplySubmit = async (comment) => {
  const param = {
    content: comment.replyContent,
    userId: 'ssafy',
    boardNo: currentBoardNo,
    parentNo: comment.no
  }
  console.log(param)
  console.log(comment)


  await registReply(param,
      (res) => {
        console.log(res)

        const newReplyComment = {
          no: res.data.result.result,
          id: res.data.result.result,
          content: comment.replyContent,
          userId: 'ssafy',
          children: [],
          replying: false,
        };

        if(!comment.hasOwnProperty("children")){
          comment.children = [];
        }
        comment.children.push(newReplyComment)

        //
        // comment.children.push({
        //   no: res.data.result.result,
        //   id : res.data.result.result,
        //   content: comment.replyContent,
        //   userId: 'ssafy',
        //   children: [],
        //   replying: false,
        // });
        comment.replying = false;
        message.success('답글이 성공적으로 추가되었습니다.');
      }
  );
};

const cancelReply = (comment) => {
  comment.replying = false;
};
</script>
