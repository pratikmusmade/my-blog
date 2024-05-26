import React from "react";
import "./button.css";
function Button({
  children,
  type = "button",
  className = "",
  onClick,
  ...props
}) 
{

  function handelBtnClick() {
    if (onClick) onClick();
  }
  const btnStyle = {};

  return (
    <button
      onClick={handelBtnClick}
      className={`${className} `}
      style={btnStyle}
      type={type}
      {...props}
    >
      {children}
    </button>
  );
}

export default Button;
