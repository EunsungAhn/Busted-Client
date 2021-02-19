import React, { Component } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";

import Busted from "./components/MainPage/Busted";
// import CameraPage from "./components/CameraPage/CameraPage";
import GalleryPage from "./components/GalleryPage/GalleryPage";
import ReportPage from "./components/ReportPage/ReportPage";
import MapPage from "./components/MapPage/MapPage";
import AwsPage from "./components/AwsPage/AwsPage";

class App extends Component {
  render() {
    return (
      <div>
        <Router>
          <Route path="/" component={Busted} exact />
          <Route path="/main" component={Busted} />
          {/* <Route path="/CameraPage" component={CameraPage} /> */}
          <Route path="/GalleryPage" component={GalleryPage} />
          <Route path="/ReportPage" component={ReportPage} />
          <Route path="/MapPage" component={MapPage} />
          <Route path="/AwsPage" component={AwsPage} />
        </Router>
      </div>
    );
  }
}

// export default withRouter(App);
export default App;
