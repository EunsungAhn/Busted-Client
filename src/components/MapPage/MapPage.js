/*global kakao*/
import React, { Component, createRef } from "react";
import { withRouter } from "react-router-dom";
import styled from "styled-components";

import "./MapPage.css";
import "../ReportPage/ReportPage.css";
import Footer from "../partials/Footer";

class MapPage extends Component {
  constructor(props) {
    super(props);
    this.input = createRef();
  };

  goBack = (page) => {
    this.props.history.goBack(page);
  };
  
  componentDidMount() {
    const script = document.createElement("script");
    script.async = true;
    script.src =
      "//dapi.kakao.com/v2/maps/sdk.js?appkey=f9e96edc18f00982ceac1d3de1dc4326&libraries=services&autoload=false";
    document.head.appendChild(script);

    script.onload = () => {
      kakao.maps.load(() => {
        let mapContainer = document.getElementById("Mymap");
        let mapOption = {
          // 지도의 중심좌표
          center: new kakao.maps.LatLng(35.13417396659415, 129.1031194397596),
          // 지도의 확대 레벨
          level: 5
        };

        // 지도를 생성합니다
        const map = new window.kakao.maps.Map(mapContainer, mapOption);

        // 주소-좌표 변환 객체를 생성합니다
        let geocoder = new window.kakao.maps.services.Geocoder();
        
        // 클릭한 위치를 표시할 마커입니다
        let marker = new window.kakao.maps.Marker();

        // 클릭한 위치에 대한 주소를 표시할 인포윈도우입니다
        let infowindow = new window.kakao.maps.InfoWindow({zindex:1}); 
        
        // // 현재 지도 중심좌표로 주소를 검색해서 지도 좌측 상단에 표시합니다
        // searchAddrFromCoords(map.getCenter(), displayCenterInfo);

        // 지도를 클릭했을 때 클릭 위치 좌표에 대한 주소정보를 표시하도록 이벤트를 등록합니다
        window.kakao.maps.event.addListener(
          map,
          "click",
          function (mouseEvent) {
            searchDetailAddrFromCoords(
              mouseEvent.latLng,
              function (result, status) {
                if (status === window.kakao.maps.services.Status.OK) {
                  let detailAddr = !!result[0].road_address
                    ? "<div>도로명주소 : " +
                      result[0].road_address.address_name +
                      "</div>"
                    : "";
                  detailAddr +=
                    "<div>지번 주소 : " +
                    result[0].address.address_name +
                    "</div>";

                  let content =
                    '<div class="bAddr">' +
                    '<span class="title">법정동 주소정보</span>' +
                    detailAddr +
                    "</div>";

                  // 마커를 클릭한 위치에 표시합니다
                  marker.setPosition(mouseEvent.latLng);
                  marker.setMap(map);

                  // 인포윈도우에 클릭한 위치에 대한 법정동 상세 주소정보를 표시합니다
                  infowindow.setContent(content);
                  infowindow.open(map, marker);
                }
              }
            );
          }
        );

        // // 중심 좌표나 확대 수준이 변경됐을 때 지도 중심 좌표에 대한 주소 정보를 표시하도록 이벤트를 등록합니다
        // kakao.maps.event.addListener(map, 'idle', function() {
        //   searchAddrFromCoords(map.getCenter(), displayCenterInfo);
        // });

        function searchAddrFromCoords(coords, callback) {
          // 좌표로 행정동 주소 정보를 요청합니다
          geocoder.coord2RegionCode(coords.getLng(), coords.getLat(), callback);         
        }

        function searchDetailAddrFromCoords(coords, callback) {
          // 좌표로 법정동 상세 주소 정보를 요청합니다
          geocoder.coord2Address(coords.getLng(), coords.getLat(), callback);
        }

        // // 지도 좌측상단에 지도 중심좌표에 대한 주소정보를 표출하는 함수입니다
        // function displayCenterInfo(result, status) {
        //   if (status === kakao.maps.services.Status.OK) {
        //       var infoDiv = document.getElementById('centerAddr');

        //       for(var i = 0; i < result.length; i++) {
        //           // 행정동의 region_type 값은 'H' 이므로
        //           if (result[i].region_type === 'H') {
        //               infoDiv.innerHTML = result[i].address_name;
        //               break;
        //           }
        //       }
        //   }    
        // }
      });
    };
  }

  render() {
    return (
      <div>
        <main className="busted-template">
          <div className="header">
            <div className="valid-btn" onClick={this.goBack}>&lt; 뒤로</div>
            <div>Map</div>
            <div className="invalid-btn">&lt; 뒤로</div>
          </div>
          
          <div className="body-wrapper">
            <MapContents id="Mymap"></MapContents>
            <div id="clickLatlng"></div>
          </div>

          <Footer />
        </main>
      </div>
    );
  }
}

const MapContents = styled.div`
  width: 99.5%;
  height: 94%;
`;

export default withRouter(MapPage);