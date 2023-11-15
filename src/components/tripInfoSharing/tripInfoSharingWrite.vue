<script setup>
import TripInfoSharingWriteItem from './item/tripInfoSharingWriteItem.vue'
</script>

<template>
  <div class="container mt-5 pt-5">
    <div class="row justify-content-center">
      <div class="col-lg-10">
        <h2 class="my-3 py-3 shadow-sm bg-light text-center">
          <mark class="sky">글쓰기</mark>
        </h2>
      </div>
      <div class="col-lg-10 text-start">
        <TripInfoSharingWriteItem type="regist" />
      </div>
    </div>
  </div>
  <!-- <main
    class="d-flex justify-content-center align-items-center my-auto"
    style="padding: 10vh 0 5vh 0"
  >
    <div>
      <h2 class="text-center">여행정보공유</h2>
      <hr />

      <div class="mb-3">
        <div class="container">
          <div class="row">
            <div class="col-md-9">
              <div class="row my-3"></div> -->
  <!-- 가운데 정렬을 원하는 내용 -->
  <!-- <div class="row">
                <h4>글 쓰기</h4>
              </div>
            </div>
            <div class="row my-3"></div>
            <form action="/article" method="post">
              <div class="mb-3">
                <label class="mb-2 text-muted" for="title">제목</label>
                <input
                  id="signup_nickname"
                  type="text"
                  class="form-control"
                  name="title"
                  value=""
                  required
                  autofocus
                  placeholder="제목을 입력하세요"
                />
              </div>
              <div class="mb-3">
                <label class="mb-2 text-muted" for="contents">내용</label>
                <div id="editor">
                  <textarea id="contents" name="contents"></textarea>
                </div>
              </div>
              <input type="hidden" id="hiddenField" name="content" value="" />
              <input type="hidden" id="action" name="action" value="write" />

              <div style="padding: 5px 0px 5px 50px; float: right">
                <input class="btn btn-primary" type="submit" value="글 등록하기" />
              </div>
              
            </form>
          </div>
        </div>
      </div>
    </div>
  </main> -->
</template>

<style scoped>
#contents {
  width: 500px;
  height: 500px;
}
</style>
