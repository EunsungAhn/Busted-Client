import React, { Component, createRef } from "react";
import { withRouter } from "react-router-dom";

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

  render() {
    return (
      <div>
        <main className="busted-template">
          <div className="header">
            <div className="valid-btn" onClick={this.goBack}>&lt; 뒤로</div>
            <div>Map</div>
            <div className="invalid-btn">&lt; 뒤로</div>
          </div>
          
          <script type="text/javascript" src="//dapi.kakao.com/v2/maps/sdk.js?appkey=발급받은 APP KEY를 넣으시면 됩니다."></script>
          
          <div id="map"></div>

          <div className="body-wrapper">
              
          </div>

          <div className="footer">
            © 2021 DSC PKNU Busted! all rights reserved.
          </div>
        </main>
      </div>
    );
  }
}

export default withRouter(MapPage);