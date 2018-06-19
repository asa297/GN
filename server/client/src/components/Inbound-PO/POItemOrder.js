import React, { Component } from "react";
import _ from "lodash";
import { connect } from "react-redux";
import { reduxForm, Field, change } from "redux-form";
import { find_Item } from "../../actions";

import POScanQR from "./POScanQR";
import POItemField from "./POItemField";

import PO_CSS from "../../Style/CSS/PO_CSS.css";
import CircularLoader from "../utils/CircularLoader";

import Toggle from "react-toggle";

class POItemOrder extends Component {
  constructor(props) {
    super(props);
    this.state = {
      itemCode: 0,
      itemList: [],
      scanStatus: false,
      loading: false
    };
  }

  componentWillUpdate(nextProps, nextState) {
    if (nextState.itemList) {
      let total = 0;

      _.map(nextState.itemList, ({ item_price, countQty }) => {
        total = total + item_price * countQty;
      });

      this.props.dispatch(change("inbound_po", "total", total));
      this.props.dispatch(change("inbound_po", "itemList", nextState.itemList));
    }
  }

  loading() {
    return (
      <div className={PO_CSS.loading}>
        <CircularLoader />
      </div>
    );
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

  async setItemList() {
    this.setState({ loading: true });
    await this.props.find_Item(this.state.itemCode);

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
      const { item_qty } = this.props.inbound_items[index_item];

      if (item_qty > 0) {
        const value = this.props.inbound_items[index_item];
        value.countQty = 1;

        this.setState({
          itemList: [...this.state.itemList, value]
        });
      }
    } else if (index_item !== -1 && index_item_itemList !== -1) {
      let clone_state = this.state.itemList.slice();

      const { countQty, item_qty } = clone_state[index_item_itemList];

      if (countQty < item_qty) {
        clone_state[index_item_itemList].countQty += 1;
        this.setState({ itemList: clone_state });
      }
    }

    this.setState({ itemCode: 0, loading: false });
  }

  deleteItemList(data) {
    const index_item = _.findIndex(this.state.itemList, ({ _id }) => {
      return _id === data;
    });

    let clone_state = this.state.itemList.slice();

    const { countQty } = clone_state[index_item];

    if (countQty === 1) {
      const value = _.remove(clone_state, (value, index) => {
        return index !== index_item;
      });

      this.setState({ itemList: value });
    } else {
      clone_state[index_item].countQty -= 1;
      this.setState({ itemList: clone_state });
    }
  }

  addItemList(data) {
    const index_item = _.findIndex(this.state.itemList, ({ _id }) => {
      return _id === data;
    });

    let clone_state = this.state.itemList.slice();

    const { countQty, item_qty } = clone_state[index_item];

    if (countQty < item_qty) {
      clone_state[index_item].countQty += 1;
      this.setState({ itemList: clone_state });
    }
  }

  renderTableList() {
    return (
      <table>
        <thead>
          <tr>
            <th style={{ width: "10px" }} />
            <th style={{ width: "10px" }} />
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
                      <i className="material-icons">remove</i>
                    </button>
                  </th>
                  <th>
                    <button
                      type="button"
                      className="green btn-flat left white-text"
                      onClick={() => this.addItemList(_id)}
                    >
                      <i className="material-icons">add</i>
                    </button>
                  </th>
                  <th>{item_code}</th>
                  <th>{item_name}</th>
                  <th>{countQty}</th>
                  <th>{item_price.toLocaleString()}</th>
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
      <div>
        <div className={PO_CSS.flex_center_inline}>
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
        <div className={PO_CSS.overflow_table}>
          {this.state.loading ? this.loading() : this.renderTableList()}
        </div>
      </div>
    );
  }
}

function mapStateToProps({ inbound_items }) {
  return { inbound_items };
}

export default reduxForm({
  form: "inbound_po"
})(
  connect(
    mapStateToProps,
    { find_Item }
  )(POItemOrder)
);
