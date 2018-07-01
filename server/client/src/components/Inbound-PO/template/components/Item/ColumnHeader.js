import React from "react";

const ColumnHeader = ({ text, width, textAlign, borderRight }) => {
  return (
    <div
      style={{
        width,
        border: "1px solid",
        textAlign,
        borderRight
      }}
    >
      {text}
    </div>
  );
};

export default ColumnHeader;
