import React from "react";
import _ from "lodash";

const ColumnItem = ({
  value,
  width,
  height,
  textAlign,
  borderRight,
  borderTop
}) => {
  return (
    <div
      style={{
        width,
        height,
        border: "1px solid",
        textAlign,
        borderRight,
        borderTop
      }}
    >
      {_.map(value, (value1, index) => {
        return <div key={index}>{index + 1}</div>;
      })}
    </div>
  );
};

export default ColumnItem;
