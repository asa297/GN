import React from "react";

const SearchPOField = ({
  valueField,
  input,
  label,
  meta: { error, touched }
}) => {
  return (
    <div>
      <input
        {...input}
        style={{ margin: "0px" }}
        placeholder="Search Order ID"
      />
      <div className="red-text"> {touched && error}</div>
    </div>
  );
};

export default SearchPOField;
