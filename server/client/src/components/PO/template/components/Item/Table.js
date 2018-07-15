import React from "react";
import _ from "lodash";
import numeral from "numeral";

import CSS_class from "../../../../../Style/CSS/PO_PRINT_CSS.css";

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
          <div key={_id} className={CSS_class.font}>
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
      {_.map(itemList, ({ item_name, item_color, _id }) => {
        return (
          <div
            key={_id}
            className={CSS_class.font}
            style={{ marginLeft: "5px" }}
          >
            {item_name} {item_color ? " " + item_color : null}
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
          <div key={_id} className={CSS_class.font}>
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
            className={CSS_class.font}
            style={{
              marginRight: "5px"
            }}
          >
            {numeral(item_price).format("0,0.00")}
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
            className={CSS_class.font}
            style={{
              marginRight: "5px"
            }}
          >
            {numeral(item_price * countQty).format("0,0.00")}
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
