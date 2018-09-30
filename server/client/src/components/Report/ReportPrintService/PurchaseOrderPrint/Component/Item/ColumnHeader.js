import React from "react";

const ColumnHeader = ({
  textThai,
  textEng,
  width,
  textAlign,
  borderWidth,
  padding
}) => {
  return (
    <div
      style={{
        width,
        textAlign,
        borderStyle: "solid",
        borderWidth,
        borderColor: "white",
        background: "#cccccc",
        padding
      }}
    >
      {textThai === textEng ? (
        <div>
          <font style={{ fontSize: "19px", fontWeight: "bold" }}>
            {textEng}
          </font>
        </div>
      ) : (
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            fontSize: "12px",
            fontWeight: "bold"
          }}
        >
          <font>{textThai}</font>
          <font style={{ marginTop: "-8px" }}>{textEng}</font>
        </div>
      )}
    </div>
  );
};

export default ColumnHeader;
