import React, { useState, useEffect, useContext } from "react";
import ControlButton from "./ControlButton/ControlButton";
import Context from "../../context/data";

const Controls = ({currentMood, ...props}) => {
  const data = useContext(Context);

  return (
    <div className="controls">
      {data.controls.map((control, index) => (
        <ControlButton
          onClick={props.clickHandler}
          key={index}
          value={control.value}
          text={control.text}
          isActive={currentMood == control.value}
        />
      ))}
    </div>
  );
};

export default Controls;
