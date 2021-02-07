import React, { Component }  from "react";
import { withRouter } from "react-router-dom";

class GalleryPage extends Component {
  constructor(props) {
    super(props);
    this.goToPage = this.goToPage.bind(this);
  };
  
  goToPage = (page) =>  {
    this.props.history.push(page);
  };

  goBack = (page) =>  {
    this.props.history.goBack(page);
  };

  _handleClick = () => {
    this.input.current.click();
  };

  render() {
    return (
      <div>
        <main className="busted-template">
          <div className="header">
            <button onClick={this.goBack}>뒤로</button>
            Gallery
            <button>선택</button>
            </div>
          <div className="body-wrapper"></div>
          <div className="footer">
            © 2021 DSC PKNU Busted! all rights reserved.
          </div>
        </main>
      </div>
    );
  }
}

export default withRouter(GalleryPage);