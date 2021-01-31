import React from 'react';
import './Busted.css';

import camera from './images/camera.png'
import gallery from './images/gallery.png'
import siren from './images/siren.png'

const Busted = () => {
  return (
    <main className="busted-template">
      <div className="header">
        Busted!
      </div>
      <div className="body-wrapper">
            <div className="first-item">
                <div className="image-wrapper">
                    <img src={camera}/>
                </div>
                <p> 촬영하기 </p>
            </div>
            <div className="second-item">
                <div className="image-wrapper">
                    <img src={gallery}/>
                </div>
                <p> 불러오기 </p>
            </div>
            <div className="third-item">
                <div className="image-wrapper">
                    <img src={siren}/>
                </div>
                <p> 신고하기 </p>
            </div>
            <div className="standard-info">
                화물차 적재불량 기준
            </div>
      </div>
      <div className="footer">
        © 2021 DSC PKNU Busted! all rights reserved.
      </div>
    </main>
  );
};

export default Busted;