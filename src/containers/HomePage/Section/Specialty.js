import React, { Component } from "react";

import { connect } from "react-redux";
import "./Specialty.scss";

import { FormattedMessage } from "react-intl";

import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import specialtyImg from "../../../assets/specialty/co-xuong-khop.jpg";

class Specialty extends Component {
  render() {
    let settings = {
      dots: false,
      infinity: true,
      speed: 500,
      slidesToShow: 4,
      slidesToScroll: 2,
      // nextArrow: <SampleNextArrow />,
      // prevArrow: <SamplePrevArrow />,
    };
    return (
      <div className="section-specialty">
        <div className="specialty-container">
          <div className="specialty-header">
            <span className="title-section">Chuyên khoa phổ biên</span>
            <button className="btn-section">Xem thêm</button>
          </div>
          <div className="specialty-body">
            <Slider {...settings}>
              <div className="specialty-customize">
                <div className="bg-image" />
                <div>Khoa châm cứu 1</div>
              </div>
              <div className="specialty-customize">
                <div className="bg-image" />
                <div>Khoa châm cứu 2</div>
              </div>
              <div className="specialty-customize">
                <div className="bg-image" />
                <div>Khoa châm cứu 3</div>
              </div>
              <div className="specialty-customize">
                <div className="bg-image" />
                <div>Khoa châm cứu 4</div>
              </div>
              <div className="specialty-customize">
                <div className="bg-image" />
                <div>Khoa châm cứu 5</div>
              </div>
              <div className="specialty-customize">
                <div className="bg-image" />
                <div>Khoa châm cứu 6</div>
              </div>
              <div className="specialty-customize">
                <div className="bg-image" />
                <div>Khoa châm cứu 7</div>
              </div>
            </Slider>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    isLoggedIn: state.user.isLoggedIn,
    language: state.app.language,
    //inject
  };
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(Specialty);
