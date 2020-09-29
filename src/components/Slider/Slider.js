import React, { useEffect, useState } from "react";
import CircleSlider from "./CircleSlider";

const options = {
  snap: false,
  clockwise: true,
  startOffset: 90,
  maxAngle: 290,
};

const Slider = (props) => {
  useEffect(() => {
    const element = document.querySelector("#slider");

    const cs = new CircleSlider(element, options);

    const targetDiv = document.getElementById("angle");

    cs.on("sliderMove", (angle) => {});

    cs.on("sliderUp", (angle) => {});

    cs.setAngle(props.angle);
  });

  return (
    <div className="slider">
      <div id="slider" className="slider__wrapper">
        <div className="svg-wrapper">
          <svg
            viewBox="0 0 36 36"
            className="circular-chart orange"
            style={{ transform: `rotate(${options.startOffset + 90}deg)` }}
          >
            <path
              className="circle-bg"
              strokeDasharray={80}
              d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
            />
            <path
              className="circle"
              strokeDasharray={props.angle + ",100"}
              d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
            />
          </svg>
        </div>
        <div id="handle-wrapper" className="cs-handle-container">
          <div className="muffin">
            <div className="muffin__layer1"></div>
            <div className="muffin__layer2"></div>
            <div className="muffin__layer3"></div>
            <div className="muffin__layer4"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Slider;
