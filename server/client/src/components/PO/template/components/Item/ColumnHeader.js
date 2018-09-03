import React from "react";

const ColumnHeader = ({ textThai, textEng, width, textAlign, borderWidth }) => {
  return (
    <div
      style={{
        width,
        textAlign,
        borderStyle: "solid",
        borderWidth,
        borderColor: "white",
        background: "#cccccc"
      }}
    >
      {textThai === textEng ? (
        <div>
          <text style={{ fontSize: "25px", fontWeight: "bold" }}>
            {textEng}
          </text>
        </div>
      ) : (
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            fontSize: "13px",
            fontWeight: "bold"
          }}
        >
          <text>{textThai}</text>
          <text>{textEng}</text>
        </div>
      )}
    </div>
  );
};

export default ColumnHeader;
