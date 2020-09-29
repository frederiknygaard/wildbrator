import React, { useState, useEffect, useContext } from "react";
import ControlButton from "./ControlButton/ControlButton";
import Context from "../../context/data";

const Controls = (props) => {
  const data = useContext(Context);

  return (
    <div className="controls">
      {data.controls.map((control, index) => (
        <ControlButton
          onClick={props.clickHandler}
          key={index}
          value={control.text}
          text={control.text}
        />
      ))}
    </div>
  );
};

export default Controls;
