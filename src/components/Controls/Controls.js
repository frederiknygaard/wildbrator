import React, { useState, useEffect, useContext } from "react";
import ControlButton from "./ControlButton/ControlButton";
import Context from "../../context/data";

const Controls = (props) => {
  const data = useContext(Context);

  return (
    <div>
      {data.controls.map((control, index) => (
        <ControlButton key={index} text={control.text} />
      ))}
    </div>
  );
};

export default Controls;
