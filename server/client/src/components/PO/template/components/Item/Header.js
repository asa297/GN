import React from "react";
import ColumnHeader from "./ColumnHeader";

const Header = () => {
  return (
    <div style={{ display: "flex", margin: "5px 0px 3px 0px" }}>
      <ColumnHeader
        textEng="#"
        textThai="#"
        width="8%"
        textAlign="center"
        borderWidth="2px 0px 2px 2px"
      />
      <ColumnHeader
        textEng="BarCode"
        textThai="รหัสสินค้า"
        width="20%"
        textAlign="center"
        borderWidth="2px 0px 2px 2px"
      />
      <ColumnHeader
        textEng="Item Name"
        textThai="รายการสินค้า"
        width="32%"
        textAlign="center"
        borderWidth="2px 0px 2px 2px"
      />
      <ColumnHeader
        textEng="QTY"
        textThai="จำนวน"
        width="10%"
        textAlign="center"
        borderWidth="2px 0px 2px 2px"
      />
      <ColumnHeader
        textEng="Unit Price"
        textThai="ราคา/หน่วย"
        width="15%"
        textAlign="center"
        borderWidth="2px 0px 2px 2px"
      />
      <ColumnHeader
        textEng="Total"
        textThai="รวม"
        width="15%"
        textAlign="center"
        borderWidth="2px 2px 2px 2px"
      />
    </div>
  );
};

export default Header;
