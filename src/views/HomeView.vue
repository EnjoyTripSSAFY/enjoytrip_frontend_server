<script setup>
// document.querySelector('.object-fit-cover').addEventListener(
//   'ended',
//   function () {
//     this.currentTime = 0
//     this.play()
//   },
//   false
// )
</script>

<template>
  <main>
    <section>

      <div>
        여행의 시작, 앤조이 트립
      </div>
    </section>

    <div class="">
      <div class="">어디로 가고 싶나요?</div>
      <!--  Carousel    -->
    </div>
  </main>

  <footer>
    <nav class="navbar navbar-expand-md navbar-light">
      <div class="container">
        <div class="d-flex justify-content-between align-items-center w-100">
          <div>
            <a href="#" class="fw-bold text-light text-decoration-none">이용약관</a><br />
            <a href="#" class="fw-bold text-light text-decoration-none">개인정보약관</a>
          </div>

          <div>
            <a class="navbar-brand" href="/">
              <img
                src="@/assets/img/gallery/logo.png"
                width="50px"
                height="50px"
                alt="Reader | Hugo Personal Blog Template"
              />
            </a>
          </div>

          <div>
            <ul class="list-inline footer-list mb-0">
              <li class="list-inline-item">
                <a href="#"><i class="fab fa-instagram"></i></a>
              </li>
              <li class="list-inline-item">
                <a href="#"><i class="fab fa-facebook"></i></a>
              </li>
              <li class="list-inline-item">
                <a href="#"><i class="fab fa-youtube"></i></a>
              </li>
              <li class="list-inline-item">
                <a href="#"><i class="fab fa-twitter"></i></a>
              </li>
              <li class="list-inline-item">
                <a href="#"><i class="fab fa-github-alt"></i></a>
              </li>
            </ul>
          </div>
        </div>

        <button
          class="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarNav"
        >
          <span class="navbar-toggler-icon"></span>
        </button>

        <div class="collapse navbar-collapse" id="navbarNav">
          <!-- 다른 내용을 추가할 수 있음 -->
        </div>
      </div>
    </nav>
  </footer>
</template>

<style scoped>
* {
  font-family: 'Do Hyeon', sans-serif;
  font-family: 'IBM Plex Sans KR', sans-serif;
  overflow-x: hidden;
}
</style>
