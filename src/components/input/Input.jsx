import React, { useId } from "react";

const Input = React.forwardRef(function (
  { label, type = "text", className = "", ...props },
  ref
) {
  const id = useId();
  return (
    <div className="input-container">
      {label && <label htmlFor={id}>{label}</label>}
      <input type={type} className={`${className}`} ref={ref} {...props} />
    </div>
  );
});
export default Input;
