import React from "react";

function SwitchButton({ inputName, extra, checked = false, disabled = false }) {
  return (
    <>
      <label className="switch">
        <input
          type="checkbox"
          name={inputName}
          id={inputName}
          defaultChecked={checked}
          disabled={disabled}
          {...extra}
        />
        <span className="slider round"></span>
      </label>
    </>
  );
}

export default SwitchButton;
