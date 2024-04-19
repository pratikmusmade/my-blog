import React, { useId } from "react";

function Select({ options, lable, className = "", ...props }, ref) {
  const id = useId();
  return (
    <div className="select-container">
      {lable && <lable htmlFor={id} className=""></lable>}
      <select id={id} {...props} ref={ref}>
        {options?.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
    </div>
  );
}

export default React.forwardRef(Select);
