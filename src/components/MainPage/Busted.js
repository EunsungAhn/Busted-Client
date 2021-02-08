import React, { Component, createRef } from "react";
import { withRouter } from "react-router-dom";

import "./Busted.css";

import camera from "../images/camera.png";
import gallery from "../images/gallery.png";
import siren from "../images/siren.png";

class Busted extends Component {
  constructor(props) {
    super(props);
    this.input = createRef();
    this.goToPage = this.goToPage.bind(this);
  };

  goToPage = (page) =>  {
    this.props.history.push(page);
  };

  _handleClick = () => {
    this.input.current.click();
  };

  render() {
    return (
      <div>
        <main className="busted-template">
          <div className="header">Busted!</div>
          <div className="body-wrapper">
            {/* <div>카메라, 갤러리 선택</div>
            <input type="file" accept="image/*;capture=camera" />
            <div>카메라 직접 호출</div>
            <input type="file" accept="image/*" capture="camera" /> */}
            
            <div className="first-item" onClick={this._handleClick}>
              <div className="image-wrapper">
                <img src={camera} alt="camera img" />
              </div>
              <p> 촬영하기 </p>
              <input type="file" accept="image/*" capture="camera" ref={this.input} />
            </div>

            <div className="second-item" onClick={() => this.goToPage("/GalleryPage")}>
              <div className="image-wrapper">
                <img src={gallery} alt="gallery img" />
              </div>
              <p> 갤러리 </p>
            </div>

            <div className="third-item" onClick={() => this.goToPage("/ReportPage")}>
              <div className="image-wrapper">
                <img src={siren} alt="siren img" />
              </div>
              <p> 신고하기 </p>
            </div>
            
            <div className="standard-info">화물차 적재불량 기준</div>
          </div>
          <div className="footer">
            © 2021 DSC PKNU Busted! all rights reserved.
          </div>
        </main>
      </div>
    );
  }
}

export default withRouter(Busted);