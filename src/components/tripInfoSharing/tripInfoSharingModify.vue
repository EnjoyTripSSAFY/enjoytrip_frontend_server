<script setup></script>

<template>
  <div class="row justify-content-center">
    <div class="col-lg-8 col-md-10 col-sm-12">
      <h2 class="my-3 py-3 shadow-sm bg-light text-center">
        <mark class="sky">글수정</mark>
      </h2>
    </div>
    <div class="col-lg-8 col-md-10 col-sm-12">
      <form id="form-modify" method="POST" action="">
        <input type="hidden" name="action" value="modify" />
        <input type="hidden" name="articleno" value="${article.articleNo}" />
        <div class="mb-3">
          <label for="subject" class="form-label">제목 : </label>
          <input
            type="text"
            class="form-control"
            id="subject"
            name="subject"
            value="${article.subject}"
          />
        </div>
        <div class="mb-3">
          <label for="content" class="form-label">내용 : </label>
          <textarea class="form-control" id="content" name="content" rows="7">
${article.content}</textarea
          >
        </div>
        <div class="col-auto text-center">
          <button type="button" id="btn-modify" class="btn btn-outline-primary mb-3">글수정</button>
          <button type="button" id="btn-list" class="btn btn-outline-danger mb-3">
            목록으로이동...
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<style scoped></style>
