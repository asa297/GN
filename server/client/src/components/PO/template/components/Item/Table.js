import React from "react";
import _ from "lodash";
import numeral from "numeral";

import CSS_class from "../../../../../Style/CSS/PO_PRINT_CSS.css";

const Table = ({ itemList }) => {
  const RunNumberColumn = (
    <div
      style={{
        width: "8%",
        height: "250px",
        borderStyle: "solid",
        borderWidth: "2px 0px 2px 2px",
        textAlign: "center"
      }}
    >
      {_.map(itemList, ({ _id }, index) => {
        return (
          <div
            key={_id}
            className={CSS_class.font}
            style={{ fontSize: "13px" }}
          >
            {index + 1}
          </div>
        );
      })}
    </div>
  );

  const ItemCodeColumn = (
    <div
      style={{
        width: "20%",
        height: "250px",
        borderStyle: "solid",
        borderWidth: "2px 0px 2px 2px",
        textAlign: "center"
      }}
    >
      {_.map(itemList, ({ item_code, _id }) => {
        return (
          <div
            key={_id}
            className={CSS_class.font}
            style={{ marginLeft: "5px", fontSize: "13px" }}
          >
            {item_code}
          </div>
        );
      })}
    </div>
  );

  const ItemNameColumn = (
    <div
      style={{
        width: "32%",
        height: "250px",
        borderStyle: "solid",
        borderWidth: "2px 0px 2px 2px",
        textAlign: "left"
      }}
    >
      {_.map(itemList, ({ item_name, item_color, _id }) => {
        return (
          <div
            key={_id}
            className={CSS_class.font}
            style={{ marginLeft: "5px", fontSize: "13px" }}
          >
            {item_name} {item_color ? " " + item_color : null}
          </div>
        );
      })}
    </div>
  );

  const QTYCoulmn = (
    <div
      style={{
        width: "10%",
        height: "250px",
        borderStyle: "solid",
        borderWidth: "2px 0px 2px 2px",
        textAlign: "center"
      }}
    >
      {_.map(itemList, ({ _id, countQty }) => {
        return (
          <div
            key={_id}
            className={CSS_class.font}
            style={{ fontSize: "13px" }}
          >
            {countQty}
          </div>
        );
      })}
    </div>
  );

  const UnitPriceColumn = (
    <div
      style={{
        width: "15%",
        height: "250px",
        borderStyle: "solid",
        borderWidth: "2px 0px 2px 2px",
        textAlign: "right"
      }}
    >
      {_.map(itemList, ({ item_price, _id }) => {
        return (
          <div
            key={_id}
            className={CSS_class.font}
            style={{
              marginRight: "5px",
              fontSize: "13px"
            }}
          >
            {numeral(item_price).format("0,0.00")}
          </div>
        );
      })}
    </div>
  );

  const TotalColumn = (
    <div
      style={{
        width: "15%",
        height: "250px",
        borderStyle: "solid",
        borderWidth: "2px 2px 2px 2px",
        textAlign: "right"
      }}
    >
      {_.map(itemList, ({ item_price, countQty, _id }) => {
        return (
          <div
            key={_id}
            className={CSS_class.font}
            style={{
              marginRight: "5px",
              fontSize: "13px"
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
      {RunNumberColumn}
      {ItemCodeColumn}
      {ItemNameColumn}
      {QTYCoulmn}
      {UnitPriceColumn}
      {TotalColumn}
    </div>
  );
};

export default Table;
