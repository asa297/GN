import React, { Component } from "react";
import _ from "lodash";
import { connect } from "react-redux";
import numeral from "numeral";
import { reduxForm, Field, change } from "redux-form";
import { find_Item } from "../../actions";

import POScanQR from "./POScanQR";
import POScanBarCode from "./POScanBarCode";
import POItemField from "./POItemField";

import PO_CSS from "../../Style/CSS/PO_CSS.css";
import CircularLoader from "../utils/CircularLoader";

import Toggle from "react-toggle";
import Alert from "react-s-alert";

class POItemOrder extends Component {
  constructor(props) {
    super(props);

    this.state = {
      socket: props.socket,
      itemCode: 0,
      itemList: [],
      scanStatus: false,
      loading: false,
      fetching: false
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
    if (this.state.fetching === false) {
      const { socket } = this.state;
      this.setState({ loading: true, fetching: true });
      await this.props.find_Item(this.state.itemCode);

      const index_item_itemList = _.findIndex(
        this.state.itemList,
        ({ item_code }) => {
          return item_code === this.state.itemCode;
        }
      );

      if (index_item_itemList === -1) {
        const { item_qty_PTY } = this.props.items;

        if (item_qty_PTY > 0) {
          const value = this.props.items;
          value.countQty = 1;

          this.setState({
            itemList: [...this.state.itemList, value]
          });

          const _getCustomer = this.getCustomerMonitorItem(value._id);
          _getCustomer.status = 1;

          const { auth } = this.props;

          socket.emit("showitem", { _getCustomer, auth });
        } else if (item_qty_PTY === 0 || item_qty_PTY === null) {
          Alert.error(`QTY is not enough.`, {
            position: "bottom",
            timeout: 2000
          });
        } else {
          Alert.error(`Item is not found.`, {
            position: "bottom",
            timeout: 2000
          });
        }
      } else if (index_item_itemList !== -1) {
        let clone_state = this.state.itemList.slice();

        const { countQty, item_qty_PTY, _id } = clone_state[
          index_item_itemList
        ];

        if (countQty < item_qty_PTY) {
          clone_state[index_item_itemList].countQty += 1;
          this.setState({ itemList: clone_state });

          const _getCustomer = this.getCustomerMonitorItem(_id);
          _getCustomer.status = 1;

          const { auth } = this.props;

          socket.emit("showitem", { _getCustomer, auth });
        } else {
          Alert.error(`QTY is not enough.`, {
            position: "bottom",
            timeout: 2000
          });
        }
      }

      this.setState({ itemCode: 0, loading: false });

      setTimeout(
        function() {
          this.setState({ fetching: false });
        }.bind(this),
        1000
      );
    }
  }

  deleteItemList(data) {
    const { socket } = this.state;

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

      const _getCustomer = this.getCustomerMonitorItem(data);
      _getCustomer.countQty = 0;
      _getCustomer.status = 2;

      const { auth } = this.props;

      socket.emit("showitem", { _getCustomer, auth });
    } else {
      clone_state[index_item].countQty -= 1;

      this.setState({ itemList: clone_state });

      const _getCustomer = this.getCustomerMonitorItem(data);
      _getCustomer.status = 2;

      const { auth } = this.props;

      socket.emit("showitem", { _getCustomer, auth });
    }
  }

  addItemList(data) {
    const { socket } = this.state;

    const index_item = _.findIndex(this.state.itemList, ({ _id }) => {
      return _id === data;
    });

    let clone_state = this.state.itemList.slice();

    const { countQty, item_qty_PTY } = clone_state[index_item];

    if (countQty < item_qty_PTY) {
      clone_state[index_item].countQty += 1;

      this.setState({ itemList: clone_state });

      const _getCustomer = this.getCustomerMonitorItem(data);
      _getCustomer.status = 1;

      const { auth } = this.props;

      socket.emit("showitem", { _getCustomer, auth });
    } else {
      Alert.error(`QTY is not enough.`, {
        position: "bottom",
        timeout: 2000
      });
    }
  }

  getCustomerMonitorItem(_id) {
    const index_item = _.findIndex(this.state.itemList, ({ _id: __id }) => {
      return _id === __id;
    });

    return this.state.itemList[index_item];
  }

  renderTableList() {
    return (
      <table>
        <thead>
          <tr>
            <th style={{ width: "10px" }} />
            <th style={{ width: "10px" }} />
            <th>รหัสสินค้า</th>
            <th style={{ width: "35%" }}>ชื่อสินค้า</th>
            <th>จำนวนสินค้า</th>
            <th>ราคาต่อหน่วย</th>
            <th>รวมราคา</th>
          </tr>
        </thead>
        <tbody>
          {_.map(
            this.state.itemList,
            ({
              _id,
              item_code,
              item_name,
              item_color,
              item_price,
              countQty
            }) => {
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
                  <th>
                    {item_name} {item_color ? " " + item_color : null}
                  </th>
                  <th>{countQty}</th>
                  <th>{numeral(item_price).format("0,0.00")}</th>
                  <th>{numeral(item_price * countQty).format("0,0.00")}</th>
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
              // <POScanQR
              //   onData={itemCode => {
              //     this.setState({ itemCode });
              //     this.setItemList();
              //   }}
              // />

              <POScanBarCode
                onData={itemCode => {
                  this.setState({ itemCode });
                  this.setItemList();
                }}
              />
            ) : (
              <button
                className="blue btn-flat white-text"
                type="submit"
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
        <div className="right">
          <h4>
            Total Amount : {numeral(this.props.subtotal || 0).format("0,0.00")}
            &nbsp;Baht
          </h4>
        </div>
      </div>
    );
  }
}

function mapStateToProps({ items, auth }) {
  return { items, auth };
}

export default reduxForm({
  form: "inbound_po"
})(
  connect(
    mapStateToProps,
    { find_Item }
  )(POItemOrder)
);
