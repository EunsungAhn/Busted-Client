/*global kakao*/
import React, { Component, createRef } from "react";
import { withRouter } from "react-router-dom";
import styled from "styled-components";

import "./MapPage.css";
import "../ReportPage/ReportPage.css";

class MapPage extends Component {
  constructor(props) {
    super(props);
    this.input = createRef();
  }

  goBack = (page) => {
    this.props.history.goBack(page);
  };

  componentDidMount() {
    const script = document.createElement("script");
    script.async = true;
    script.src =
      "//dapi.kakao.com/v2/maps/sdk.js?appkey=f9e96edc18f00982ceac1d3de1dc4326&autoload=false";
    document.head.appendChild(script);

    script.onload = () => {
      kakao.maps.load(() => {
        let container = document.getElementById("Mymap");
        let options = {
          center: new kakao.maps.LatLng(35.13417396659415, 129.1031194397596),
          level: 5
        };

        const map = new window.kakao.maps.Map(container, options);
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
          </div>

          <div className="footer">
            © 2021 DSC PKNU Busted! all rights reserved.
          </div>
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