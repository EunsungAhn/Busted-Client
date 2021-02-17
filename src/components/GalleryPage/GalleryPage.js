import React, { Component }  from "react";
import { withRouter } from "react-router-dom";
import axios from 'axios';

import "./GalleryPage.css";

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

  state = { selectedFiles: null };
  
  onClickHandler = event => {
    const formData = new FormData();
    
    formData.append(
      "uploadImages",
      this.state.selectedFiles,
      this.state.selectedFiles.name
    );

    const config = {
      headers: {
        "content-type": "multipart/form-data"
      }
    };
    
    axios.post(`uploadAPI`, formData, config);
  };

  fileChangedHandler = event => {
    const files = event.target.files;
    this.setState({
      selectedFiles: files
    });
  };

  render() {
    return (
      <div>
        <main className="busted-template">
          <div className="header">
            <div className="valid-btn" onClick={this.goBack}>&lt; 뒤로</div>
            <div>Gallery</div>
            <div className="invalid-btn">선택</div>
          </div>

          <div className="body-wrapper">
            <label for="select-image" className="select-image-btn">+</label>
          <input type="file" accept="image/*" id="select-image" onChange={this.fileChangedHandler}></input>
          </div>

          <div className="footer">
            © 2021 DSC PKNU Busted! all rights reserved.
          </div>
        </main>
      </div>
    );
  }
}

export default withRouter(GalleryPage);