import React from "react";

const ControlButton = ({isActive, ...props}) => (
  <button className={isActive ? 'button is-active' : 'button'} onClick={props.onClick} data-value={props.value}>
    {props.text}
  </button>
);

export default ControlButton;
