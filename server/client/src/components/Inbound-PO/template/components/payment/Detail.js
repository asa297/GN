import React from "react";
import CSS_class from "../../../../../Style/CSS/PO_PRINT_CSS.css";

const Detail = ({ label, text, fontSize }) => {
  return (
    <div
      className={CSS_class.font}
      style={{ display: "flex", alignItems: "baseline", fontSize }}
    >
      <label>{label}</label>
      <div>&nbsp;: {text}</div>
    </div>
  );
};
export default Detail;
