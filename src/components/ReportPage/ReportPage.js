import React, { Component, createRef } from "react";
import { withRouter } from "react-router-dom";
import $ from "jquery";

import "./ReportPage.css";

class ReportPage extends Component {
  constructor(props) {
    super(props);
    this.input = createRef();
    this.goToPage = this.goToPage.bind(this);
  }

  componentDidMount() {
    var placeholderTarget = $(
      '.spot-wrapper input[type="text"], .contents-wrapper input[type="text"]'
    );

    //포커스시
    placeholderTarget.on("focus", function () {
      $(this).siblings("label").fadeOut("fast");
    });

    //포커스아웃시
    placeholderTarget.on("focusout", function () {
      if ($(this).val() === "") {
        $(this).siblings("label").fadeIn("fast");
      }
    });
  }

  goToPage = (page) => {
    this.props.history.push(page);
  };

  _handleClick = () => {
    this.input.current.click();
  };

  goBack = (page) => {
    this.props.history.goBack(page);
  };

  render() {
    return (
      <div>
        <main className="busted-template">
          <div className="header">
            <div className="valid-btn" onClick={this.goBack}>&lt; 뒤로</div>
            <div>Report</div>
            <div className="invalid-btn">&lt; 뒤로</div>
          </div>

          <div className="body-wrapper">
            
            <div className="title-wrapper">
              <div className="title-accident-pic">* 사진</div>
              <div className="func-btn">촬영/갤러리</div>
            </div>

            <br></br>
            <br></br>

            <div className="tmp-tmp-tmp">차량 이미지 보일 공간</div>

            <br></br>
            <br></br>

            <div className="title-wrapper">
              <div className="title-accident-spot">* 발생지역</div>
              <div className="func-btn" onClick={() => this.goToPage("/MapPage")}>위치 찾기</div>
            </div>
            
            <div className="spot-wrapper">
              <label for="location">위치를 입력해주세요.</label>
              <input type="text" id="location"></input>
            </div>

            <br></br>
            <br></br>
            
            <div className="title-wrapper">
              <div className="title-report-contents">* 내용</div>
            </div>
            

            <div className="contents-wrapper">
              <label for="report-contents">내용을 구체적으로 입력해주세요.</label>
              <input type="text" id="report-contents"></input>
            </div>
          </div>

          <div className="footer">
            © 2021 DSC PKNU Busted! all rights reserved.
          </div>
        </main>
      </div>
    );
  }
}
 
export default withRouter(ReportPage);