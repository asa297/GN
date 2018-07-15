import React from "react";

const ItemField = ({
  valueField,
  input,
  label,
  disabled,
  meta: { error, touched }
}) => {
  return (
    <div>
      <label>{label}</label>
      {disabled ? (
        <input
          {...input}
          style={{ marginBottom: "5px", color: "red" }}
          value={valueField}
          disabled
        />
      ) : (
        <input {...input} style={{ marginBottom: "5px" }} value={valueField} />
      )}

      <div className="red-text" style={{ marginBottom: "20px" }}>
        {touched && error}
      </div>
    </div>
  );
};

export default ItemField;
