import React from "react";
import Header from "./Header";
import Table from "./Table";

const Item = ({ itemList }) => {
  return (
    <div>
      <Header />
      <Table itemList={itemList} />
    </div>
  );
};

export default Item;
