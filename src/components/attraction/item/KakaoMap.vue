<template>
  <div>
    <div id="map" class="map"></div>
  </div>
</template>

<script setup>
import {tripInfoStore} from '@/stores/tripInfoStore'
import {storeToRefs} from 'pinia'
import {onMounted, ref, watch, watchEffect} from 'vue'
import {kakaoMapPosStore} from "@/stores/kakaoMapPosStore";


var map = null
var overlay = null
const positions = ref([])
const markers = ref([])

const attractionInform = ref()
const tripinfoStore = tripInfoStore()
const {responseData} = storeToRefs(tripinfoStore)
const {currentPos} = storeToRefs(kakaoMapPosStore())

onMounted(() => {
  if (window.kakao && window.kakao.maps) {
    initMap()
  } else {
    const script = document.createElement('script')
    script.src = `//dapi.kakao.com/v2/maps/sdk.js?autoload=false&appkey=63b138442d63d32e8905bf20dab9be5d&libraries=services,clusterer`
    /* global kakao */
    script.onload = () => kakao.maps.load(() => initMap())
    document.head.appendChild(script)
  }
})

const initMap = () => {
  const container = document.getElementById('map')
  const options = {
    center: new kakao.maps.LatLng(33.450701, 126.570667),
    level: 3
  }
  map = new kakao.maps.Map(container, options)

  // loadMarkers();
}

watchEffect(() => {
  ;(async () => {
    // Use responseData.value instead of attractionInform.value
    positions.value = []

    const data = await responseData.value;

    if (data) {
      data.forEach((attraction) => {
        let obj = {}
        obj.latlng = new kakao.maps.LatLng(attraction.mapy, attraction.mapx)
        obj.title = attraction.title

        positions.value.push(obj)
      })
      loadMarkers()
    }
  })()
})

watch(currentPos, (newPos, oldPos) => {
  const moveLatLon = new kakao.maps.LatLng(newPos.longitude, newPos.latitude);
  map.setCenter(moveLatLon);
  map.setLevel(newPos.mlevel)

  if(overlay != undefined) overlay.setMap(null);
  newPos.image = newPos.image ? newPos.image : "https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/thumnail.png"
  var content = `<div class="wrap">
    <div class="info">
        <div class="title">
            ${newPos.title}
            <div class="close" onclick="closeOverlay()" title="닫기"></div>
        </div>
        <div class="body">
            <div class="img">
                <img src="${newPos.image}" width="73" height="70">
            </div>
            <div class="desc">
                <div class="ellipsis">${newPos.addr1}</div>
                <div class="jibun ellipsis">${newPos.addr2}</div>
                <a href=https://search.naver.com/search.naver?where=view&sm=tab_jum&query=${newPos.title}>
                    <img width="20px" height="20px" src="https://littledeep.com/wp-content/uploads/2020/09/naver-icon-style.png" target="_blank" class="link">
                </a>
            </div>
        </div>
    </div>
</div>`;


  // 마커 위에 커스텀오버레이를 표시합니다
  // 마커를 중심으로 커스텀 오버레이를 표시하기위해 CSS를 이용해 위치를 설정했습니다
  overlay = new kakao.maps.CustomOverlay({
    content: content,
    map: map,
    position: moveLatLon
  });
  overlay.setMap(map);


},);



const loadMarkers = () => {
  // 현재 표시되어있는 marker들이 있다면 map에 등록된 marker를 제거한다.
  deleteMarkers()

  // 마커 이미지를 생성합니다
  //   const imgSrc = require("@/assets/map/markerStar.png");
  // 마커 이미지의 이미지 크기 입니다
  //   const imgSize = new kakao.maps.Size(24, 35);
  // const markerImage = new kakao.maps.MarkerImage(imgSrc, imgSize);

  // 마커를 생성합니다
  markers.value = []
  positions.value.forEach((position) => {
    const marker = new kakao.maps.Marker({
      map: map, // 마커를 표시할 지도
      position: position.latlng, // 마커를 표시할 위치
      title: position.title, // 마커의 타이틀, 마커에 마우스를 올리면 타이틀이 표시됨.
      clickable: true // // 마커를 클릭했을 때 지도의 클릭 이벤트가 발생하지 않도록 설정합니다
      // image: markerImage, // 마커의 이미지
    })
    markers.value.push(marker)
  })

  // 4. 지도를 이동시켜주기
  // 배열.reduce( (누적값, 현재값, 인덱스, 요소)=>{ return 결과값}, 초기값);
  const bounds = positions.value.reduce(
      (bounds, position) => bounds.extend(position.latlng),
      new kakao.maps.LatLngBounds()
  )

  map.setBounds(bounds)
}

const deleteMarkers = () => {
  if (markers.value.length > 0) {
    markers.value.forEach((marker) => marker.setMap(null))
  }
}

window.closeOverlay = function() {
  if (overlay) {
    overlay.setMap(null);
  }
};
</script>

<style scoped>
.map {
  width: 100%;
  height: 75vh;
}
</style>
<style>
.wrap {position: absolute;left: 0;bottom: 40px;width: 400px;height: 200px;margin-left: -144px;text-align: left;overflow: hidden;font-size: 12px;font-family: 'Malgun Gothic', dotum, '돋움', sans-serif;line-height: 1.5;}
.wrap * {padding: 0;margin: 0;}
.wrap .info {;width: 400px;height: 200px;border-radius: 5px;border-bottom: 2px solid #ccc;border-right: 1px solid #ccc;overflow: hidden;background: #fff;}
.wrap .info:nth-child(1) {border: 0;box-shadow: 0px 1px 2px #888;}
.info .title {padding: 5px 0 0 10px;height: 30px;background: #eee;border-bottom: 1px solid #ddd;font-size: 18px;font-weight: bold;}
.info .close {position: absolute;top: 10px;right: 10px;color: #888;width: 17px;height: 17px;background: url('https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/overlay_close.png');}
.info .close:hover {cursor: pointer;}
.info .body {position: relative;overflow: hidden;}
.info .desc {position: relative;margin: 13px 0 0 90px;height: 75px;}
.desc .ellipsis {overflow: hidden;text-overflow: ellipsis;white-space: nowrap;}
.desc .jibun {font-size: 11px;color: #888;margin-top: -2px;}
.info .img {position: absolute;top: 6px;left: 5px;width: 73px;height: 71px;border: 1px solid #ddd;color: #888;overflow: hidden;}
.info:after {content: '';position: absolute;margin-left: -12px;left: 50%;bottom: 0;width: 22px;height: 12px;background: url('https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/vertex_white.png')}
.info .link {color: #5085BB;}
</style>
