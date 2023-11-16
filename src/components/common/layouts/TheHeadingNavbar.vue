<script setup>
import { useRouter } from 'vue-router'

const router = useRouter()

function moveHome() {
  router.push({ name: 'home' })
}
function moveTripInfoSharing() {
  router.push({ name: 'tripInfoSharing' })
}

function moveAttraction() {
  router.push({ name: 'attraction' })
}

function moveHotPlace() {
  router.push({ name: 'hotPlace' })
}

function moveTripPlan() {
  router.push({ name: 'tripPlan' })
}
</script>

<template>
  <nav class="navbar navbar-expand-sm navbar-light fixed-top">
    <div class="container-fluid">
      <a class="navbar-brand fw-bolder text-light-emphasis" @click="moveHome">
        <img class="logo_png" src="../../../assets/img/gallery/logo.png" />
        앤조이트립
      </a>

      <div class="collapse navbar-collapse" id="collapsibleNavbar">
        <ul class="navbar-nav mx-auto">
          <li class="nav-item">
            <a class="nav-link fw-bold" @click="moveAttraction">지역별 관광지</a>
          </li>
          <li class="nav-item">
            <a class="nav-link fw-bolder" @click="moveTripPlan">나의여행계획</a>
          </li>
          <li class="nav-item">
            <a class="nav-link fw-bolder" @click="moveHotPlace">핫플자랑하기</a>
          </li>
          <li class="nav-item">
            <a class="nav-link fw-bolder" @click="moveTripInfoSharing">여행정보공유</a>
          </li>
        </ul>
        <v-if>
          <ul class="navbar-nav me-2" id="beforeLogIn">
            <li class="nav-item">
              <a class="nav-link active" href="">로그인</a>
            </li>
            <li class="nav-item">
              <a class="nav-link" href="">회원가입</a>
            </li>
          </ul>
        </v-if>
      </div>
    </div>
  </nav>
</template>

<style>
.logo_png {
  width: 50px;
  height: 50px;
}

a {
  cursor: pointer;
}
</style>
