import React, { Component }  from "react";
import { withRouter } from "react-router-dom";
import ImageUploader from "react-images-upload";

import "./GalleryPage.css";

class GalleryPage extends Component {
  constructor(props) {
    super(props);
    this.goToPage = this.goToPage.bind(this);
    this.state = { pictures: [] };
    this.onDrop = this.onDrop.bind(this);
  };
  
  goToPage = (page) =>  {
    this.props.history.push(page);
  };

  goBack = (page) =>  {
    this.props.history.goBack(page);
  };
  
  onDrop(pictureFiles, pictureDataURLs) {
    this.setState({
      pictures: this.state.pictures.concat(pictureFiles)
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
            <ImageUploader
              withIcon={true}
              buttonText='이미지를 선택하세요.'
              label="최대 사진 크기: 5MB, jpg/gif/png 형식만 가능"
              onChange={this.onDrop}
              imgExtension={['.jpg', '.gif', '.png', '.gif']}
              maxFileSize={5242880}
              withPreview={true}
            />
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