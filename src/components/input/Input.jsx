import React, { useId } from "react";
import './input.css'
const Input = React.forwardRef(function (
  {
    type = "text",
    label = "",
    customStyles = {},
    classNames = "",
    isMandatory = false,
    ...props
  },
  ref
) {
  const star = <span style={{ color: "red" }}>*</span>;

  const id = useId();
  return (
    <div className="input-container">
      {label && (
        <label htmlFor={id}>
          {label} {isMandatory && star}
        </label>
      )}
      <input
        type={type}
        className={`${classNames}`}
        style={customStyles}
        ref={ref}
        {...props}
      />
    </div>
  );
});
export default Input;
