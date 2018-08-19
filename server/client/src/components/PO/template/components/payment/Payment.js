import React from "react";
import numeral from "numeral";
import CSS_class from "../../../../../Style/CSS/PO_PRINT_CSS.css";

const Payment = ({
  labelThai,
  labelEng,
  text,
  fontSizeheader,
  fontSizecontent
}) => {
  return (
    <div
      className={CSS_class.font}
      style={{
        display: "flex",
        alignItems: "center",
        width: "100%"
      }}
    >
      <div style={{ width: "40% " }}>
        <div>
          <label style={{ fontSize: fontSizeheader }}>{labelThai}</label>
        </div>
        <div>
          <label style={{ fontSize: fontSizeheader }}>{labelEng}</label>
        </div>
      </div>
      <div
        style={{
          width: "50% ",
          textAlign: "right",
          fontSize: fontSizecontent
        }}
      >
        <b>
          <i>{numeral(text).format("0,0.00")} &nbsp; Baht</i>
        </b>
      </div>
    </div>
  );
};
export default Payment;
