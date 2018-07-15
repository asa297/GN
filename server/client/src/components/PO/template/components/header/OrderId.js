import React from "react";

const OrderId = ({ label, text, copy }) => {
  return (
    <div style={{ display: "flex", alignItems: "baseline", width: "100%" }}>
      <label>
        <i>###{copy}###</i>
      </label>
      <div style={{ width: "97% ", textAlign: "right" }}>
        <label>{label}</label> : {text}
      </div>
    </div>
  );
};
export default OrderId;
