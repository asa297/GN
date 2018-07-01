import React from "react";
import _ from "lodash";
import ColumnItem from "./ColumnItem";

const Table = ({ itemList }) => {
  const RunNumberCloumn = (
    <div
      style={{
        width: "10%",
        height: "250px",
        border: "1px solid",
        textAlign: "center",
        borderRight: "0px",
        borderTop: "0px"
      }}
    >
      {_.map(itemList, ({ _id }, index) => {
        return (
          <div key={_id} style={{ fontFamily: "Sofia", fontSize: "14px" }}>
            {index + 1}
          </div>
        );
      })}
    </div>
  );

  const ItemNameCloumn = (
    <div
      style={{
        width: "40%",
        height: "250px",
        border: "1px solid",
        textAlign: "left",
        borderRight: "0px",
        borderTop: "0px"
      }}
    >
      {_.map(itemList, ({ item_name, _id }) => {
        return (
          <div
            key={_id}
            style={{ marginLeft: "5px", fontFamily: "Sofia", fontSize: "14px" }}
          >
            {item_name}
          </div>
        );
      })}
    </div>
  );

  const QTYCloumn = (
    <div
      style={{
        width: "10%",
        height: "250px",
        border: "1px solid",
        textAlign: "center",
        borderRight: "0px",
        borderTop: "0px"
      }}
    >
      {_.map(itemList, ({ _id, countQty }) => {
        return (
          <div key={_id} style={{ fontFamily: "Sofia", fontSize: "14px" }}>
            {countQty}
          </div>
        );
      })}
    </div>
  );

  const PriceCloumn = (
    <div
      style={{
        width: "15%",
        height: "250px",
        border: "1px solid",
        textAlign: "right",
        borderRight: "0px",
        borderTop: "0px"
      }}
    >
      {_.map(itemList, ({ item_price, _id }) => {
        return (
          <div
            key={_id}
            style={{
              marginRight: "5px",
              fontFamily: "Sofia",
              fontSize: "14px"
            }}
          >
            {parseFloat(item_price).toFixed(2)}
          </div>
        );
      })}
    </div>
  );

  const TotalCloumn = (
    <div
      style={{
        width: "25%",
        height: "250px",
        border: "1px solid",
        textAlign: "right",
        borderTop: "0px"
      }}
    >
      {_.map(itemList, ({ item_price, countQty, _id }) => {
        return (
          <div
            key={_id}
            style={{
              marginRight: "5px",
              fontFamily: "Sofia",
              fontSize: "14px"
            }}
          >
            {parseFloat(item_price * countQty).toFixed(2)}
          </div>
        );
      })}
    </div>
  );

  return (
    <div style={{ display: "flex" }}>
      {RunNumberCloumn}
      {ItemNameCloumn}
      {QTYCloumn}
      {PriceCloumn}
      {TotalCloumn}
    </div>
  );
};

export default Table;
