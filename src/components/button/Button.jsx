import React from "react";

function Button({
  children,
  type = "button",
  bgColor = "",
  textColor = "",
  className = "",
  ...props
}) {
  const btnStyle = {};
  if (!bgColor) btnStyle.backgroundColor = bgColor;
  if (!textColor) btnStyle.color = textColor;
  return (
    <button className={` ${className}`} style={btnStyle} type={type} {...props}>
      {children}
    </button>
  );
}

export default Button;
