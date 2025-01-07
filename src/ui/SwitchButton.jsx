import React from "react";

function SwitchButton({ inputName, extra }) {
  return (
    <>
      <label className="switch">
        <input type="checkbox" name={inputName} id={inputName} {...extra} />
        <span className="slider round"></span>
      </label>
    </>
  );
}

export default SwitchButton;
