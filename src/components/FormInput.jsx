import React from "react";

function FormInput({ lebal, type, name, plecholder, size, useRef }) {
  return (
    <label className="form-control w-full max-w-xs">
      <div className="label">
        <span className="label-text font-medium">{lebal}</span>
      </div>
      <input
        type={type}
        name={name}
        placeholder={plecholder}
        className={`input input-bordered w-full max-w-xs ${size}`}
        ref={useRef}
      />
    </label>
  );
}

export default FormInput;
