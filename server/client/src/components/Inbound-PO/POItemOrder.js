import React, { Component } from "react";
import _ from "lodash";
import { connect } from "react-redux";
import { reduxForm, Field, change } from "redux-form";
import { fetchInbound_Item } from "../../actions";

import POScanQR from "./POScanQR";
import POItemField from "./POItemField";

import PO_CSS from "../../Style/CSS/PO_CSS.css";

import Toggle from "react-toggle";

class POItemOrder extends Component {
  constructor(props) {
    super(props);
    this.state = {
      itemCode: 0,

      itemList: [],
      scanStatus: false
    };
  }

  componentDidMount() {
    this.props.fetchInbound_Item();
  }

  renderItemCodeField() {
    return (
      <div>
        <div>item_code</div>
        <div style={{ width: "300px" }}>
          <Field
            name="item_code"
            value={this.state.itemCode}
            key="item_code"
            component={POItemField}
            type="text"
            valueField={this.state.itemCode}
            onChange={event => this.setState({ itemCode: event.target.value })}
          />
        </div>
      </div>
    );
  }
  setItemList() {
    const index_item = _.findIndex(
      this.props.inbound_items,
      ({ item_code }) => {
        return item_code === parseInt(this.state.itemCode, 10);
      }
    );

    const index_item_itemList = _.findIndex(
      this.state.itemList,
      ({ item_code }) => {
        return item_code === parseInt(this.state.itemCode, 10);
      }
    );

    if (index_item !== -1 && index_item_itemList === -1) {
      const value = this.props.inbound_items[index_item];
      value.countQty = 1;

      this.setState({
        itemList: [...this.state.itemList, value],
        itemCode: 0
      });
    } else if (index_item !== -1 && index_item_itemList !== -1) {
      this.props.inbound_items[index_item].countQty += 1;

      let clone_state = this.state.itemList.slice();
      clone_state[index_item_itemList] = this.props.inbound_items[index_item];

      this.setState({ itemList: clone_state, itemCode: 0 });
    } else {
      this.setState({
        itemCode: 0
      });
    }
  }

  deleteItemList(data) {
    // const value = _.remove(this.state.itemList, (value, index) => {
    //   return index === data;
    // });
    // console.log(this.state.itemList[data]);
    // const value = _.without(this.state.itemList, this.state.itemList[data]);
    // console.log(value);
    // this.setState({
    //   itemList: value
    // });
    // console.log(this.state);
  }

  renderTableList() {
    return (
      <table>
        <thead>
          <tr>
            <th style={{ width: "20px" }} />
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
                  <th>
                    <button
                      type="button"
                      className="red btn-flat left white-text"
                      onClick={() => this.deleteItemList(_id)}
                    >
                      <i className="material-icons">delete</i>
                    </button>
                  </th>
                  <th>{item_code}</th>
                  <th>{item_name}</th>
                  <th>{countQty}</th>
                  <th>{item_price}</th>
                </tr>
              );
            }
          )}
        </tbody>
      </table>
    );
  }

  render() {
    return (
      <div className="container">
        <h3 className="center">
          <i>Step #3 -</i> Item Selection
        </h3>

        <form onSubmit={this.props.handleSubmit(this.props.onSubmit)}>
          <div className={PO_CSS.flex_center_inline}>
            <input type="checkbox" />
            {this.renderItemCodeField()}
            <div className={PO_CSS.flex_center} style={{ marginLeft: "50px" }}>
              <Toggle
                defaultChecked={this.state.scanStatus}
                onChange={() => {
                  this.setState({
                    itemCode: 0,
                    scanStatus: !this.state.scanStatus
                  });
                }}
              />
              {this.state.scanStatus ? (
                <POScanQR
                  onData={itemCode => {
                    this.setState({ itemCode });
                    this.setItemList();
                  }}
                />
              ) : (
                <button
                  className="blue btn-flat white-text"
                  type="button"
                  onClick={() => {
                    this.setItemList();
                  }}
                >
                  Search
                </button>
              )}
            </div>
          </div>
          <hr />
          {this.renderTableList()}
        </form>
      </div>
    );
  }
}

function mapStateToProps({ inbound_items, form }) {
  // console.log(form);
  return { inbound_items };
}

export default reduxForm({
  form: "inbound_po",
  destroyOnUnmount: false
})(connect(mapStateToProps, { fetchInbound_Item })(POItemOrder));
