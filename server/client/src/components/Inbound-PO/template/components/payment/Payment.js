import React from "react";

const Payment = ({ label, text }) => {
  return (
    <div style={{ display: "flex", alignItems: "baseline", width: "100%" }}>
      <label style={{ width: "40% " }}>{label}</label>

      <div>:</div>
      <div style={{ width: "35% ", textAlign: "right" }}>
        {parseFloat(text).toFixed(2)}
      </div>
      <div style={{ width: "25% " }}>
        &nbsp; <i>Baht</i> (฿)
      </div>
    </div>
  );
};
export default Payment;
