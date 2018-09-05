import React from "react";
import ColumnHeader from "./ColumnHeader";

const HeaderTable = () => {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        margin: "3px 0px 3px 0px"
      }}
    >
      <ColumnHeader
        textEng="#"
        textThai="#"
        width="8%"
        textAlign="center"
        borderWidth="2px 0px 2px 2px"
        padding="2px 0px 2px 0px"
      />
      <ColumnHeader
        textEng="BarCode"
        textThai="รหัสสินค้า"
        width="20%"
        textAlign="center"
        borderWidth="2px 0px 2px 2px"
        padding="2px 0px 2px 0px"
      />
      <ColumnHeader
        textEng="Item Name"
        textThai="รายการสินค้า"
        width="32%"
        textAlign="center"
        borderWidth="2px 0px 2px 2px"
        padding="2px 0px 2px 0px"
      />
      <ColumnHeader
        textEng="QTY"
        textThai="จำนวน"
        width="10%"
        textAlign="center"
        borderWidth="2px 0px 2px 2px"
        padding="2px 0px 2px 0px"
      />
      <ColumnHeader
        textEng="Unit Price"
        textThai="ราคา/หน่วย"
        width="15%"
        textAlign="center"
        borderWidth="2px 0px 2px 2px"
        padding="2px 0px 2px 0px"
      />
      <ColumnHeader
        textEng="Total"
        textThai="รวม"
        width="15%"
        textAlign="center"
        borderWidth="2px 2px 2px 2px"
        padding="2px 0px 2px 0px"
      />
    </div>
  );
};

export default HeaderTable;
