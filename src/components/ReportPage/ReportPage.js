/*global kakao*/
import React, { Component, createRef } from "react";
import { withRouter } from "react-router-dom";
import PropTypes from 'prop-types';
import FlipMove from 'react-flip-move';
import UploadIcon from '../images/UploadIcon.svg'
import $ from "jquery";
import styled from "styled-components";
import "./ReportPage.css";
import Footer from "../partials/Footer";

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
      fileErrors: [],
      toggle: false,
    };

    this.inputElement = "";
    this.onDropFile = this.onDropFile.bind(this);
    this.onUploadClick = this.onUploadClick.bind(this);
    this.triggerFileUpload = this.triggerFileUpload.bind(this);
  }

  handleToggle = () => {
    this.setState({
      toggle: {
        ...this.state.toggle,
        change: !this.state.toggle.change,
      },
    });
  };

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
    const pattern =
      "(" + this.props.imgExtension.join("|").replace(/\./g, "\\.") + ")$";
    return new RegExp(pattern, "i").test(fileName);
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
    const removeIndex = this.state.pictures.findIndex(
      (event) => event === picture
    );
    const filteredPictures = this.state.pictures.filter(
      (event, index) => index !== removeIndex
    );
    const filteredFiles = this.state.files.filter(
      (event, index) => index !== removeIndex
    );

    this.setState({ pictures: filteredPictures, files: filteredFiles }, () => {
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
        <div
          className={"errorMessage " + this.props.errorClass}
          key={index}
          style={this.props.errorStyle}
        >
          * {fileError.name}{" "}
          {fileError.type === ERROR.FILESIZE_TOO_LARGE
            ? this.props.fileSizeError
            : this.props.fileTypeError}
        </div>
      );
    });
  }

  renderIcon() {
    if (this.props.withIcon) {
      return <img src={UploadIcon} className="uploadIcon" alt="Upload Icon" />;
    }
  }

  renderLabel() {
    if (this.props.withLabel) {
      return (
        <p className={this.props.labelClass} style={this.props.labelStyles}>
          {this.props.label}
        </p>
      );
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
          <div
            className="deleteImage"
            onClick={() => this.removeImage(picture)}
          >
            X
          </div>
          <img src={picture} className="uploadPicture" alt="preview" />
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

  componentDidMount() {
    const script = document.createElement("script");
    script.async = true;
    script.src =
      "//dapi.kakao.com/v2/maps/sdk.js?appkey=f9e96edc18f00982ceac1d3de1dc4326&libraries=services&autoload=false";
    document.head.appendChild(script);

    script.onload = () => {
      kakao.maps.load(() => {
        let mapContainer = document.getElementById("Mymap");
        let mapOption = {
          // 지도의 중심좌표
          center: new kakao.maps.LatLng(35.13417396659415, 129.1031194397596),
          // 지도의 확대 레벨
          level: 5
        };

        // 지도를 생성합니다
        const map = new window.kakao.maps.Map(mapContainer, mapOption);

        // 주소-좌표 변환 객체를 생성합니다
        let geocoder = new window.kakao.maps.services.Geocoder();
        
        // 클릭한 위치를 표시할 마커입니다
        let marker = new window.kakao.maps.Marker();

        // 클릭한 위치에 대한 주소를 표시할 인포윈도우입니다
        let infowindow = new window.kakao.maps.InfoWindow({zindex:1}); 
        
        // // 현재 지도 중심좌표로 주소를 검색해서 지도 좌측 상단에 표시합니다
        // searchAddrFromCoords(map.getCenter(), displayCenterInfo);

        // 지도를 클릭했을 때 클릭 위치 좌표에 대한 주소정보를 표시하도록 이벤트를 등록합니다
        window.kakao.maps.event.addListener(
          map,
          "click",
          function (mouseEvent) {
            searchDetailAddrFromCoords(
              mouseEvent.latLng,
              function (result, status) {
                if (status === window.kakao.maps.services.Status.OK) {
                  let detailAddr = !!result[0].road_address
                    ? "<div>도로명주소 : " +
                      result[0].road_address.address_name +
                      "</div>"
                    : "";
                  detailAddr +=
                    "<div>지번 주소 : " +
                    result[0].address.address_name +
                    "</div>";

                  let content =
                    '<div class="bAddr">' +
                    '<span class="title">법정동 주소정보</span>' +
                    detailAddr +
                    "</div>";

                  // 마커를 클릭한 위치에 표시합니다
                  marker.setPosition(mouseEvent.latLng);
                  marker.setMap(map);

                  // 인포윈도우에 클릭한 위치에 대한 법정동 상세 주소정보를 표시합니다
                  infowindow.setContent(content);
                  infowindow.open(map, marker);
                }
              }
            );
          }
        );

        // // 중심 좌표나 확대 수준이 변경됐을 때 지도 중심 좌표에 대한 주소 정보를 표시하도록 이벤트를 등록합니다
        // kakao.maps.event.addListener(map, 'idle', function() {
        //   searchAddrFromCoords(map.getCenter(), displayCenterInfo);
        // });

        function searchAddrFromCoords(coords, callback) {
          // 좌표로 행정동 주소 정보를 요청합니다
          geocoder.coord2RegionCode(coords.getLng(), coords.getLat(), callback);         
        }

        function searchDetailAddrFromCoords(coords, callback) {
          // 좌표로 법정동 상세 주소 정보를 요청합니다
          geocoder.coord2Address(coords.getLng(), coords.getLat(), callback);
        }

        // // 지도 좌측상단에 지도 중심좌표에 대한 주소정보를 표출하는 함수입니다
        // function displayCenterInfo(result, status) {
        //   if (status === kakao.maps.services.Status.OK) {
        //       var infoDiv = document.getElementById('centerAddr');

        //       for(var i = 0; i < result.length; i++) {
        //           // 행정동의 region_type 값은 'H' 이므로
        //           if (result[i].region_type === 'H') {
        //               infoDiv.innerHTML = result[i].address_name;
        //               break;
        //           }
        //       }
        //   }    
        // }
      });
    };
  }

  render() {
    const { toggle } = this.state;

    // const tmpStyle = {
    //   position: "relative",
    //   display: "flex",
    //   // align-items: "center",
    //   // justify-content: "center",
    //   width: "100%",
    // };

    // console.log(toggle);
    return (
      <div>
        <main className="busted-template">
          <div className="header">
            <div className="valid-btn" onClick={this.goBack}>
              &lt; 뒤로
            </div>
            <div>Report</div>
            <div className="invalid-btn">&lt; 뒤로</div>
          </div>

          <div className="body-wrapper">
            <div className="title-wrapper">
              <div className="title-accident-pic">* 사진</div>
              {/* <div className="func-btn">촬영/갤러리</div> */}
            </div>

            {/* 이미지 업로드 시작 부분 */}
            <div
              className={"fileUploader " + this.props.className}
              style={this.props.style}
            >
              <div
                className="fileContainer"
                style={this.props.fileContainerStyle}
              >
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
                  ref={(input) => (this.inputElement = input)}
                  name={this.props.name}
                  multiple={!this.props.singleImage}
                  onChange={this.onDropFile}
                  onClick={this.onUploadClick}
                  accept={this.props.accept}
                />

                {this.props.withPreview ? this.renderPreview() : null}
              </div>
            </div>

            <br></br>

            <div className="title-wrapper">
              <div className="title-accident-spot">* 발생지역</div>
              <div
                className="func-btn"
                onClick={() => this.goToPage("/MapPage")}
                // onClick={() => {
                //   this.setState({ toggle: !toggle });
                // }}
              >
                {/* {toggle ? <MapPage /> : "위치 찾기"} */}
                위치 찾기
              </div>
            </div>
            
            <div className="spot-wrapper">
              <label for="location">위치를 입력해주세요.</label>
              <input type="text" id="location"></input>
            </div>

            <div className="title-wrapper">
              <div className="title-report-contents">* 내용</div>
            </div>

            <div className="contents-wrapper">
              <label for="report-contents">내용을 구체적으로 입력해주세요.</label>
              <input type="text" id="report-contents"></input>
            </div>
            <div className="func-btn">신고 접수</div>
            {/* <div className="body-wrapper">
              <div style={{width: "99.5%", height: "94%"}} id="Mymap"></div>
              <div id="clickLatlng"></div>
            </div> */}
            <div style={{width: "99.5%", height: "45%"}} id="Mymap"></div>
            <div id="clickLatlng"></div>
          </div>
          <Footer />
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