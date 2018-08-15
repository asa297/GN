import React, { Component } from "react";

import _ from "lodash";
import numeral from "numeral";

class ItemDetail extends Component {
  constructor(props) {
    super(props);

    const { itemList } = props.report_PO;

    this.state = { itemList };
  }

  renderitemList() {
    return (
      <table>
        <thead>
          <tr>
            <th>item_code</th>
            <th>item_name</th>
            <th>QTY</th>
            <th>Price</th>
          </tr>
        </thead>
        <tbody>
          {_.map(
            this.state.itemList,
            ({ _id, item_code, item_name, item_price, countQty }) => {
              return (
                <tr key={_id}>
                  <th>{item_code}</th>
                  <th>{item_name}</th>
                  <th>{countQty}</th>
                  <th>{numeral(item_price).format("0,0.00")}</th>
                </tr>
              );
            }
          )}
        </tbody>
      </table>
    );
  }

  render() {
    return <div>{this.renderitemList()}</div>;
  }
}

export default ItemDetail;
