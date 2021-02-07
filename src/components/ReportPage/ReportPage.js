import React, { Component, createRef }  from "react";
import { withRouter } from "react-router-dom";

class ReportPage extends Component {
  constructor(props) {
    super(props);
    this.input = createRef();
  };

  goBack = (page) =>  {
    this.props.history.goBack(page);
  };

  render() {
    return (
      <div>
        <main className="busted-template">
          <div className="header">
            <button onClick={this.goBack}>뒤로</button>
            Report
          </div>
          <div className="body-wrapper">
            <div className="report-image">* 사진</div>
            <div className="accident-spot">* 발생지역</div>
            <div className="report-contents">* 내용</div>
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