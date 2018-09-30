import React from "react";
import HeaderTable from "./HeaderTable";
import Table from "./Table";
import Header from "./Header";
import FooterTable from "./FooterTable";

const Item = ({
  itemList,
  grandtotal,
  copy,
  credit,
  discount,
  discountPercent,
  creditcharge,
  creditchargePercent
}) => {
  return (
    <div>
      <Header copy={copy} />
      <HeaderTable />
      <Table
        itemList={itemList}
        credit={credit}
        discount={discount}
        discountPercent={discountPercent}
        creditcharge={creditcharge}
        creditchargePercent={creditchargePercent}
      />
      <FooterTable
        grandtotal={grandtotal}
        credit={credit}
        creditcharge={creditcharge}
      />
    </div>
  );
};

export default Item;
