import React, { Component }  from "react";
import { withRouter } from "react-router-dom";

class ReportPage extends Component {
  constructor(props) {
    super(props);
    this.goToPage = this.goToPage.bind(this);
  };
  goToPage = (page) =>  {
    this.props.history.push(page);
  };

  render() {
    return (
      <div>
        <main className="busted-template">
          <div className="header">Report</div>
          <div className="body-wrapper"></div>
          <div className="footer">
            © 2021 DSC PKNU Busted! all rights reserved.
          </div>
        </main>
      </div>
    );
  }
}

export default withRouter(ReportPage);