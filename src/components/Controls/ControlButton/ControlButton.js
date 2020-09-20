import React from "react";

const ControlButton = (props) => (
  <button onClick={props.clickHandler}>{props.text}</button>
);

export default ControlButton;
