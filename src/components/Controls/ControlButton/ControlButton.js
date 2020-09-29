import React from "react";

const ControlButton = (props) => (
  <button className="button" onClick={props.onClick} data-value={props.value}>
    {props.text}
  </button>
);

export default ControlButton;
