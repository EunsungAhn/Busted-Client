import React, { Component, createRef } from "react";
import { withRouter } from "react-router-dom";
import PropTypes from 'prop-types';
import FlipMove from 'react-flip-move';
import UploadIcon from '../images/UploadIcon.svg'
import $ from "jquery";

import "./ReportPage.css";

const ERROR = {
  NOT_SUPPORTED_EXTENSION: 'NOT_SUPPORTED_EXTENSION',
  FILESIZE_TOO_LARGE: 'FILESIZE_TOO_LARGE'
}

const styles = {
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  flexWrap: "wrap",
  width: "100%"
};

class ReportPage extends Component {
  constructor(props) {
    super(props);
    this.input = createRef();
    this.goToPage = this.goToPage.bind(this);

    // 이미지 업로드 부분 시작 //
    this.state = {
      pictures: [...props.defaultImages],
      files: [],
      fileErrors: []
    };

    this.inputElement = '';
    this.onDropFile = this.onDropFile.bind(this);
    this.onUploadClick = this.onUploadClick.bind(this);
    this.triggerFileUpload = this.triggerFileUpload.bind(this);
  }

  componentDidUpdate(prevProps, prevState, snapshot){
    if(prevState.files !== this.state.files){
      this.props.onChange(this.state.files, this.state.pictures);
    }
  }
  
  componentWillReceiveProps(nextProps){
    if(nextProps.defaultImages !== this.props.defaultImages){
      this.setState({pictures: nextProps.defaultImages});
    }
  }

  hasExtension(fileName) {
    const pattern = '(' + this.props.imgExtension.join('|').replace(/\./g, '\\.') + ')$';
    return new RegExp(pattern, 'i').test(fileName);
  }

  onDropFile(e) {
    const files = e.target.files;
    const allFilePromises = [];
    const fileErrors = [];

    // Iterate over all uploaded files
    for (let i = 0; i < files.length; i++) {
      let file = files[i];
      let fileError = {
        name: file.name,
      };

      // Check for file extension
      if (!this.hasExtension(file.name)) {
        fileError = Object.assign(fileError, {
          type: ERROR.NOT_SUPPORTED_EXTENSION
        });
        fileErrors.push(fileError);
        continue;
      }

      // Check for file size
      if(file.size > this.props.maxFileSize) {
        fileError = Object.assign(fileError, {
          type: ERROR.FILESIZE_TOO_LARGE
        });
        fileErrors.push(fileError);
        continue;
      }

      allFilePromises.push(this.readFile(file));
    }

    this.setState({
      fileErrors
    });

    const {singleImage} = this.props;

    Promise.all(allFilePromises).then(newFilesData => {
      const dataURLs = singleImage? [] : this.state.pictures.slice();
      const files = singleImage? [] : this.state.files.slice();

      newFilesData.forEach(newFileData => {
        dataURLs.push(newFileData.dataURL);
        files.push(newFileData.file);
      });

      this.setState({pictures: dataURLs, files: files});
    });
  }

  onUploadClick(e) {
    e.target.value = null;
  }
  
  readFile(file) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();

      // Read the image via FileReader API and save image result in state.
      reader.onload = function (e) {
        // Add the file name to the data URL
        let dataURL = e.target.result;
        dataURL = dataURL.replace(";base64", `;name=${file.name};base64`);
        resolve({file, dataURL});
      };

      reader.readAsDataURL(file);
    });
  }

  removeImage(picture) {
    const removeIndex = this.state.pictures.findIndex(event => event === picture);
    const filteredPictures = this.state.pictures.filter((event, index) => index !== removeIndex);
    const filteredFiles = this.state.files.filter((event, index) => index !== removeIndex);

    this.setState({pictures: filteredPictures, files: filteredFiles}, () => {
      this.props.onChange(this.state.files, this.state.pictures);
    });
  }

  triggerFileUpload() {
    this.inputElement.click();
  }

  clearPictures() {
    this.setState({pictures: []})
  }

  renderErrors() {
    const { fileErrors } = this.state;
    return fileErrors.map((fileError, index) => {
      return (
        <div className={'errorMessage ' + this.props.errorClass} key={index} style={this.props.errorStyle}>
          * {fileError.name} {fileError.type === ERROR.FILESIZE_TOO_LARGE ? this.props.fileSizeError: this.props.fileTypeError}
        </div>
      );
    });
  }

  renderIcon() {
    if (this.props.withIcon) {
      return <img src={UploadIcon} className="uploadIcon"	alt="Upload Icon" />;
    }
  }

  renderLabel() {
    if (this.props.withLabel) {
      return <p className={this.props.labelClass} style={this.props.labelStyles}>{this.props.label}</p>
    }
  }

  renderPreview() {
    return (
      <div className="uploadPicturesWrapper">
        <FlipMove enterAnimation="fade" leaveAnimation="fade" style={styles}>
          {this.renderPreviewPictures()}
        </FlipMove>
      </div>
    );
  }

  renderPreviewPictures() {
    return this.state.pictures.map((picture, index) => {
      return (
        <div key={index} className="uploadPictureContainer">
          <div className="deleteImage" onClick={() => this.removeImage(picture)}>X</div>
          <img src={picture} className="uploadPicture" alt="preview"/>
        </div>
      );
    });
  }
  // 이미지 관련 부분 끝 //

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
              {/* <div className="func-btn">촬영/갤러리</div> */}
            </div>

            {/* 이미지 업로드 시작 부분 */}
            <div className={"fileUploader " + this.props.className} style={this.props.style}>
              <div className="fileContainer" style={this.props.fileContainerStyle}>
                {/* {this.renderIcon()}
                {this.renderLabel()} */}

                <button
                  type={this.props.buttonType}
                  className={"chooseFileButton " + this.props.buttonClassName}
                  style={this.props.buttonStyles}
                  onClick={this.triggerFileUpload}
                >
                  {this.props.buttonText}
                </button>
          
                <input
                  type="file"
                  ref={input => this.inputElement = input}
                  name={this.props.name}
                  multiple={!this.props.singleImage}
                  onChange={this.onDropFile}
                  onClick={this.onUploadClick}
                  accept={this.props.accept}
                />
          
                { this.props.withPreview ? this.renderPreview() : null }
              </div>
            </div>

            {/* <div className="tmp-tmp-tmp">차량 이미지 보일 공간</div> */}

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

// 기본 속성
ReportPage.defaultProps = {
  className: '',
  fileContainerStyle: {},
  buttonClassName: "",
  buttonStyles: {},
  withPreview: true,
  accept: "image/*",
  name: "",
  withIcon: true,
  buttonText: "사진을 선택해주세요.",
  buttonType: "button",
  withLabel: true,
  label: "최대 사진 크기: 5MB, jpg/gif/png 형식만 가능합니다.",
  labelStyles: {},
  labelClass: "",
  imgExtension: ['.jpg', '.jpeg', '.gif', '.png'],
  maxFileSize: 5242880,
  fileSizeError: " 5MB보다 큰 사진입니다.",
  fileTypeError: " is not a supported file extension",
  style: {},
  errorStyle: {},
  singleImage: false,
  onChange: () => {},
  defaultImages: []
};

ReportPage.propTypes = {
  style: PropTypes.object,
  fileContainerStyle: PropTypes.object,
  className: PropTypes.string,
  onChange: PropTypes.func,
  onDelete: PropTypes.func,
  buttonClassName: PropTypes.string,
  buttonStyles: PropTypes.object,
  buttonType: PropTypes.string,
  withPreview: PropTypes.bool,
  accept: PropTypes.string,
  name: PropTypes.string,
  withIcon: PropTypes.bool,
  buttonText: PropTypes.string,
  withLabel: PropTypes.bool,
  label: PropTypes.string,
  labelStyles: PropTypes.object,
  labelClass: PropTypes.string,
  imgExtension: PropTypes.array,
  maxFileSize: PropTypes.number,
  fileSizeError: PropTypes.string,
  fileTypeError: PropTypes.string,
  errorClass: PropTypes.string,
  errorStyle: PropTypes.object,
  singleImage: PropTypes.bool,
  defaultImages: PropTypes.array
};
 
export default withRouter(ReportPage);