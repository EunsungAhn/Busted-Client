import React, { Component, createRef } from "react";
import { withRouter } from "react-router-dom";
import Footer from "../partials/Footer";

import "./AwsPage.css";

class AwsPage extends Component {
  constructor(props) {
    super(props);
  }

  goBack = (page) => {
    this.props.history.goBack(page);
  };

  render() {
    return (
      <div>
        <main className="busted-template">
          <div className="header">
            <div className="valid-btn" onClick={this.goBack}>
              &lt; 뒤로
            </div>
            <div>AWS</div>
            <div className="invalid-btn">&lt; 뒤로</div>
          </div>

          <div className="body-wrapper">
            <img
              src="https://desiacw.s3.ap-northeast-2.amazonaws.com/busted/test1.png"
              alt="test"
            ></img>
            <img
              src="https://desiacw.s3.ap-northeast-2.amazonaws.com/busted/test2.png"
              alt="test"
            ></img>
            <img
              src="https://desiacw.s3.ap-northeast-2.amazonaws.com/busted/test3.png"
              alt="test"
            ></img>
            <img
              src="https://desiacw.s3.ap-northeast-2.amazonaws.com/busted/test4.png"
              alt="test"
            ></img>
            {/* <img src="https://placeimg.com/300/300/any" alt="just-test"  />
            <img src="https://placeimg.com/300/300/animals" alt="just-test"  />
            <img src="https://placeimg.com/300/300/any/grayscale" alt="just-test"  />
            <img src="https://placeimg.com/300/300/any" alt="just-test"  />
            <img src="https://placeimg.com/300/300/animals" alt="just-test"  />
            <img src="https://placeimg.com/300/300/any/grayscale" alt="just-test"  />
            <img src="https://placeimg.com/300/300/any" alt="just-test"  /> */}
          </div>
          <Footer />
        </main>
      </div>
    );
  }
}

export default withRouter(AwsPage);
