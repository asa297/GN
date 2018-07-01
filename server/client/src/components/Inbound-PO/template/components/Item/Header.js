import React from "react";
import ColumnHeader from "./ColumnHeader";

const Header = ({}) => {
  return (
    <div style={{ display: "flex" }}>
      <ColumnHeader text="#" width="10%" textAlign="center" borderRight="0px" />
      <ColumnHeader
        text="Item"
        width="40%"
        textAlign="center"
        borderRight="0px"
      />
      <ColumnHeader
        text="QTY"
        width="10%"
        textAlign="center"
        borderRight="0px"
      />
      <ColumnHeader
        text="Price"
        width="15%"
        textAlign="center"
        borderRight="0px"
      />
      <ColumnHeader
        text="Total"
        width="25%"
        textAlign="center"
        borderRight="1px solid"
      />
    </div>
  );
};

export default Header;
