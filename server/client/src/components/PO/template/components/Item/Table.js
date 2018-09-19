import React from "react";
import _ from "lodash";
import numeral from "numeral";

// let CreditReady = false;
let DiscountReady = false;
let CreditChargeReady = false;

const Table = ({
  itemList,
  credit,
  discount,
  discountPercent,
  creditcharge,
  creditchargePercent
}) => {
  if (discountPercent > 0 && !DiscountReady) {
    let model = {};
    model._id = "discount_id";
    model.item_code = null;
    model.item_name = `Discount (${discountPercent}%)`;
    model.countQty = 1;

    model.item_price = discount * -1;
    itemList.push(model);
    DiscountReady = true;
  }

  // if (credit > 0 && !CreditReady) {
  //   let model = {};
  //   model._id = "credit_id";
  //   model.item_code = null;
  //   model.item_name = `Credit`;
  //   model.countQty = 1;

  //   model.item_price = credit * -1;
  //   itemList.push(model);
  //   CreditReady = true;
  // }

  if (creditchargePercent > 0 && !CreditChargeReady) {
    let model = {};
    model._id = "creditcharge_id";
    model.item_code = null;
    model.item_name = `${creditchargePercent}% charge from ${credit}฿ (amount of credit card pay)`;
    model.countQty = 1;

    model.item_price = creditcharge;
    itemList.push(model);
    CreditChargeReady = true;
  }

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
          <div key={_id} style={{ fontSize: "13px" }}>
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
          <div key={_id} style={{ marginLeft: "5px", fontSize: "13px" }}>
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
          <div key={_id} style={{ marginLeft: "5px", fontSize: "13px" }}>
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
          <div key={_id} style={{ fontSize: "13px" }}>
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
            style={{
              marginRight: "5px",
              fontSize: "13px"
            }}
          >
            {numeral(item_price).format("0,0.00")} ฿
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
            style={{
              marginRight: "5px",
              fontSize: "13px"
            }}
          >
            {numeral(item_price * countQty).format("0,0.00")} ฿
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
