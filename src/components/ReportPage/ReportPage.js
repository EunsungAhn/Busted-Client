import React, { Component, createRef } from "react";
import { withRouter } from "react-router-dom";
import $ from "jquery";

import "./ReportPage.css";

$(document).ready(function () {
  var placeholderTarget = $(
    '.spot-wrapper input[type="text"], .report-contents input[type="text"]'
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
});

class ReportPage extends Component {
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
            <div>Report</div>
            <div className="invalid-btn">&lt; 뒤로</div>
          </div>

          <div className="body-wrapper">
            <div className="report-image">
              * 사진
              <button>촬영 / 갤러리</button>
            </div>

            <div className="image-wrapper">차량 이미지 보일 공간</div>

            <div className="accident-spot">* 발생지역</div>

            <div className="spot-wrapper">
              <label for="sw_input">위치를 입력해주세요.</label>
              <input type="text" id="accident-spot"></input>
              <button>위치 찾기</button>
            </div>

            <div className="report-contents">* 내용
              <label for="rc_input">내용을 구체적으로 입력해주세요.</label>
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