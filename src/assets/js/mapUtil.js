var markers = [];

function addMarker(position, contents) {
  let imageSrc = "https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/markerStar.png";
  let imageSize = new kakao.maps.Size(24, 35);
  let markerImage = new kakao.maps.MarkerImage(imageSrc, imageSize);

  // 마커를 생성합니다
  let marker = new kakao.maps.Marker({
    map: map, // 마커를 표시할 지도
    position: position,
    // title : localTrip["title"],
    image: markerImage // 마커 이미지
  });

  // 인포윈도우 내용 (contents)을 설정합니다
  var iwContent = '<div style="padding:5px; width: 500px; height: 200px;">' + contents + '</div>';

  // 인포윈도우를 생성합니다
  var infowindow = new kakao.maps.InfoWindow({
    content: iwContent,
    removable: true // removeable 속성을 true로 설정하면 인포윈도우를 닫을 수 있는 x버튼이 표시됩니다
  });

  // 마커에 클릭이벤트를 등록합니다
  kakao.maps.event.addListener(marker, 'click', function () {
    // 마커 위에 인포윈도우를 표시합니다
    infowindow.open(map, marker);
  });

  // 마커가 지도 위에 표시되도록 설정합니다
  marker.setMap(map);

  // 생성된 마커를 배열에 추가합니다
  markers.push(marker);
}

// 배열에 추가된 마커들을 지도에 표시하거나 삭제하는 함수입니다
function setMarkers(map) {
  for (var i = 0; i < markers.length; i++) {
    markers[i].setMap(map);
  }
}

// "마커 보이기" 버튼을 클릭하면 호출되어 배열에 추가된 마커를 지도에 표시하는 함수입니다
function showMarkers() {
  setMarkers(map)
}

// "마커 감추기" 버튼을 클릭하면 호출되어 배열에 추가된 마커를 지도에서 삭제하는 함수입니다
function hideMarkers() {
  setMarkers(null);
  markers = [];
}

function createInfoWindows(localTrip) {
  let ret =
      `<h2>${localTrip["title"]}</h2>
          <img src="${localTrip["firstimage"]}" width="100px" height="100px" alt="이미지가 없습니다!"></img>
          <div>전화번호 : ${localTrip["tel"]}</div>
          <div>주소 : ${localTrip["addr1"]} &nbsp; ${localTrip["addr2"]} </div>`
  return ret;
}

async function markTripMap(localTripDatas) {
    hideMarkers();

    if (localTripDatas){
      let bounds = new kakao.maps.LatLngBounds();

      for (const localTrip of localTripDatas) {
        addMarker(
            new kakao.maps.LatLng(localTrip["mapy"], localTrip["mapx"]),
            createInfoWindows(localTrip)
        );
        bounds.extend(new kakao.maps.LatLng(localTrip["mapy"], localTrip["mapx"]));
      }
      map.setBounds(bounds);
      showMarkers();
    }
    else {
      alert("해당 위치의 관광지가 없습니다!");
    }
}
