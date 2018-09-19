import React, { Component } from "react";
import _ from "lodash";
import { connect } from "react-redux";
import { reduxForm, change } from "redux-form";
import Alert from "react-s-alert";
import { find_Item } from "../../../../actions";
import CircularLoaderBlue from "../../../utils/CircularLoaderBlue";

class Grid extends Component {
  constructor() {
    super();

    const _columns = [
      { key: "_id" },
      { key: "item_factory" },
      { key: "item_code" },
      { key: "item_name" },
      { key: "item_skin" },
      { key: "item_color" },
      { key: "item_qty_PTY" },
      { key: "qty" },
      { key: "remarks" }
    ];

    this.state = {
      _columns,
      ItemList: [],
      item_code: "",
      searching: false
    };
  }

  componentWillUpdate(nextProps, { ItemList }) {
    if (ItemList) {
      this.props.dispatch(change("dn_form", "ItemList", ItemList));
    }
  }

  async SearchItem() {
    let { item_code, ItemList } = this.state;

    if (item_code) {
      this.setState({ item_code: "", searching: true });
      await this.props.find_Item(item_code);
      this.setState({ searching: false });
      const { items } = this.props;
      const found = _.find(ItemList, ({ _id }) => {
        return _id === items._id;
      });

      if (items && !found && items.item_qty_PTY) {
        let ItemListModel = {};
        _.each(this.state._columns, ({ key }) => {
          ItemListModel[key] = items[key];
        });
        ItemListModel.qty = 1;
        ItemListModel.remarks = "";

        ItemList.push(ItemListModel);
        this.setState({ ItemList });
      } else if (found) {
        Alert.warning(`This Item Code is already have(${item_code}).`, {
          timeout: 2000
        });
      } else if (!items) {
        Alert.error(`This Item Code is not have in system.`, {
          timeout: 2000
        });
      } else if (!items.item_qty_PTY || items.item_qty_PTY === 0) {
        Alert.error(`The Item Quantity of ${item_code} is zero.`, {
          timeout: 2000
        });
      }
    } else {
      Alert.warning("Please , Enter Item Code.", {
        timeout: 2000
      });
    }
  }

  renderTableList() {
    return (
      <table>
        <thead>
          <tr>
            <th style={{ width: "5%" }} />
            <th
              style={{
                textAlign: "center",
                fontSize: "18px",
                fontWeight: "bold"
              }}
            >
              โรงงาน
            </th>
            <th
              style={{
                textAlign: "center",
                fontSize: "18px",
                fontWeight: "bold"
              }}
            >
              รหัสสินค้า
            </th>
            <th
              style={{
                width: "25%",
                textAlign: "center",
                fontSize: "18px",
                fontWeight: "bold"
              }}
            >
              ชื่อสินค้า
            </th>
            <th
              style={{
                width: "10%",
                textAlign: "center",
                fontSize: "18px",
                fontWeight: "bold"
              }}
            >
              หนัง
            </th>
            <th
              style={{
                width: "10%",
                textAlign: "center",
                fontSize: "18px",
                fontWeight: "bold"
              }}
            >
              สี
            </th>
            <th
              style={{
                width: "10%",
                textAlign: "center",
                fontSize: "18px",
                fontWeight: "bold"
              }}
            >
              จำนวนสินค้า
            </th>
            <th
              style={{
                width: "20%",
                textAlign: "center",
                fontSize: "18px",
                fontWeight: "bold"
              }}
            >
              หมายเหตุ
            </th>
          </tr>
        </thead>
        <tbody>
          {_.map(
            this.state.ItemList,
            (
              {
                _id,
                item_factory,
                item_code,
                item_name,
                item_skin,
                item_color,
                qty,
                remarks
              },
              index
            ) => {
              return (
                <tr key={_id}>
                  <th>
                    <button
                      type="button"
                      className="red btn-flat left white-text"
                      onClick={() => this.DeleteItemList(index)}
                    >
                      <i className="material-icons">remove</i>
                    </button>
                  </th>
                  <th style={{ textAlign: "center" }}>{item_factory}</th>
                  <th style={{ textAlign: "center" }}>{item_code}</th>
                  <th style={{ textAlign: "center" }}>{item_name}</th>
                  <th style={{ textAlign: "center" }}>{item_skin}</th>
                  <th style={{ textAlign: "center" }}>{item_color}</th>
                  <th style={{ textAlign: "center" }}>
                    <input
                      placeholder="QTY"
                      value={qty}
                      type="number"
                      onChange={event =>
                        this.handleQTYChange(index, event.target.value)
                      }
                    />
                  </th>
                  <th style={{ textAlign: "center" }}>
                    <input
                      placeholder="Remarks"
                      value={remarks}
                      onChange={event =>
                        this.handleRemarkChange(index, event.target.value)
                      }
                    />
                  </th>
                </tr>
              );
            }
          )}
        </tbody>
      </table>
    );
  }

  DeleteItemList(index) {
    const { ItemList } = this.state;
    ItemList.splice(index, 1);
    this.setState({ ItemList });
  }

  handleQTYChange(index, value) {
    const { ItemList } = this.state;
    const { item_qty_PTY } = ItemList[index];
    ItemList[index].qty =
      value > item_qty_PTY || parseInt(value, 10) === 0 || !value
        ? item_qty_PTY
        : value;
    this.setState({ ItemList });
  }

  handleRemarkChange(index, value) {
    const { ItemList } = this.state;
    ItemList[index].remarks = value;
    this.setState({ ItemList });
  }

  AddNewItem() {
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "flex-end",
          alignItems: "center"
        }}
      >
        {this.state.searching ? (
          <div style={{ marginRight: "5px" }}>
            <CircularLoaderBlue />
          </div>
        ) : null}

        <input
          style={{ width: "30%" }}
          placeholder="search Item"
          value={this.state.item_code}
          onChange={event => this.setState({ item_code: event.target.value })}
        />

        <button
          className="green btn-flat white-text"
          onClick={() => this.SearchItem()}
        >
          Add Item
        </button>
      </div>
    );
  }

  render() {
    return (
      <div>
        {this.AddNewItem()}
        <div
          style={{
            height: "600px",
            width: "100%",
            overflowY: "scroll"
          }}
        >
          {this.renderTableList()}
        </div>
      </div>
    );
  }
}

function mapStateToProps({ items }) {
  return { items };
}

export default reduxForm({
  form: "dn_form"
})(
  connect(
    mapStateToProps,
    { find_Item }
  )(Grid)
);
