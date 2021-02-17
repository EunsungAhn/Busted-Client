import React, { Component }  from "react";
import { withRouter } from "react-router-dom";
import axios from 'axios';

import "./GalleryPage.css";

class GalleryPage extends Component {
  constructor(props) {
    super(props);
    this.goToPage = this.goToPage.bind(this);
    this.state = {
      file : '',
      previewURL : ''
    }
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
    event.preventDefault();
    let reader = new FileReader();
    let file = event.target.files[0];
    reader.onloadend = () => {
      this.setState({
        file : file,
        previewURL : reader.result
      })
    }
    reader.readAsDataURL(file);
  };

  render() {
    let img_preview = null;
    
    if(this.state.file !== ''){
      img_preview = <img className='img_preview' src={this.state.previewURL}></img>
    }

    return (
      <div>
        <main className="busted-template">
          <div className="header">
            <div className="valid-btn" onClick={this.goBack}>&lt; 뒤로</div>
            <div>Gallery</div>
            <div className="invalid-btn">선택</div>
          </div>

          <div className="body-wrapper">
            <div className="image-wrapper">
              <label for="select-image" className="select-image-btn">+</label>
              <input type="file" accept="image/*" id="select-image" onChange={this.fileChangedHandler}></input>
              {img_preview}
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

export default withRouter(GalleryPage);