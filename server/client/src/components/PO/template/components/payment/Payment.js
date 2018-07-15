import React from "react";
import numeral from "numeral";
import CSS_class from "../../../../../Style/CSS/PO_PRINT_CSS.css";

const Payment = ({ label, text, fontSize }) => {
  return (
    <div
      className={CSS_class.font}
      style={{
        display: "flex",
        alignItems: "baseline",
        width: "100%",
        fontSize
      }}
    >
      <label style={{ width: "55% " }}>{label}</label>
      <div style={{ width: "35% ", textAlign: "right" }}>
        {numeral(text).format("0,0.00")}
      </div>
      <div style={{ width: "15% " }}>
        &nbsp; <i>Baht</i>
      </div>
    </div>
  );
};
export default Payment;
