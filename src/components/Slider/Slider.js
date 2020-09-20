import React, { useEffect, useState } from "react";
import CircleSlider from "./CircleSlider";

const options = {
  snap: false,
  clockwise: true,
  startOffset: 90,
  maxAngle: 290,
};

const Slider = (props) => {
  const [process, setProcess] = useState(0);

  useEffect(() => {
    const element = document.querySelector("#slider");

    const cs = new CircleSlider(element, options);

    const targetDiv = document.getElementById("angle");

    cs.on("sliderMove", (angle) => {
      const percent = (angle / 360) * 100;
      setProcess(percent);
      targetDiv.innerHTML = `&nbsp;${angle}&deg;`;
    });

    cs.on("sliderUp", (angle) => {});

    // const btn = document.getElementById("slider-set-angle");
    // btn.addEventListener("click", (e) => {
    //   e.preventDefault();
    //   const val = document.getElementById("slider-form-value").value;
    //   cs.setAngle(val);
    // });
  }, []);
  return (
    <div>
      <div className="container">
        <div id="slider">
          <div className="svg-wrapper">
            <svg
              viewBox="0 0 36 36"
              className="circular-chart orange"
              style={{ transform: `rotate(${options.startOffset + 90}deg)` }}
            >
              <defs>
                <linearGradient id="header-shape-gradient" x2="0.35" y2="1">
                  <stop offset="0%" stopColor="#FF9A9E" />
                  <stop offset="100%" stopColor="#FAD0C4" />
                </linearGradient>
              </defs>
              <path
                className="circle-bg"
                d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
              />
              <path
                className="circle"
                strokeDasharray={process + ",100"}
                d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
              />
            </svg>
          </div>
          <div id="angle">0&deg;</div>
          <div id="handle-wrapper" className="cs-handle-container">
            <div class="muffin">
              <div class="muffin__layer1"></div>
              <div class="muffin__layer2"></div>
              <div class="muffin__layer3"></div>
              <div class="muffin__layer4"></div>
            </div>
          </div>
        </div>
      </div>
      <div style={{ width: "400px" }}></div>
    </div>
  );
};

export default Slider;
