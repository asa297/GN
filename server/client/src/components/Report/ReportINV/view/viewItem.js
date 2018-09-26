import React, { Component } from "react";
import _ from "lodash";
import { connect } from "react-redux";
import ViewComponent from "./ViewComponent";

class viewItem extends Component {
  constructor() {
    super();

    this.state = {};
  }

  componentDidMount() {
    const item_select = _.find(this.props.items, ({ _id }) => {
      return _id === this.props._id;
    });
    console.log(item_select);
    this.setState({ item_select });
  }

  renderContent() {
    return (
      <div>
        <div style={{ display: "flex", justifyContent: "center" }}>
          <img
            style={{ width: "400px", height: "300px" }}
            src={this.state.item_select.image}
            alt=""
          />
        </div>
        <ViewComponent
          icon="business_center"
          value={
            this.state.item_select.item_name
              ? this.state.item_select.item_name
              : ""
          }
          title="Item Name"
        />
        <ViewComponent
          icon="code"
          value={
            this.state.item_select.item_code
              ? this.state.item_select.item_code
              : ""
          }
          title="Item Code"
        />
        <ViewComponent
          icon="flag"
          value={
            this.state.item_select.itemTypeName
              ? this.state.item_select.itemTypeName
              : ""
          }
          title="Item Grade"
        />
        <ViewComponent
          icon="domain"
          value={
            this.state.item_select.item_factory
              ? this.state.item_select.item_factory
              : ""
          }
          title="Item Factory"
        />
        <ViewComponent
          icon="turned_in"
          value={
            this.state.item_select.item_skin
              ? this.state.item_select.item_skin
              : ""
          }
          title="Item Skin"
        />
        <ViewComponent
          icon="color_lens"
          value={
            this.state.item_select.item_color
              ? this.state.item_select.item_color
              : ""
          }
          title="Item Color"
        />
        <ViewComponent
          icon="attach_money"
          value={
            this.state.item_select.item_price
              ? this.state.item_select.item_price
              : ""
          }
          title="Item Price"
        />
        <ViewComponent
          icon="drafts"
          value={this.state.item_select.item_qty_PTY}
          title="Product Quality(จำนวนสินค้า)"
        />
        <ViewComponent
          icon="event_note"
          value={
            this.state.item_select.item_remarks
              ? this.state.item_select.item_remarks
              : ""
          }
          title="Item Remarks"
        />
        <ViewComponent
          icon="history"
          value={
            new Date(this.state.item_select.RecordDate).toLocaleDateString() +
            " " +
            new Date(this.state.item_select.RecordDate).toLocaleTimeString() +
            " " +
            "(" +
            this.state.item_select.RecordNameBy +
            ")"
          }
          title="Record"
        />
        <ViewComponent
          icon="update"
          value={
            new Date(
              this.state.item_select.LastModifyDate
            ).toLocaleDateString() +
            " " +
            new Date(
              this.state.item_select.LastModifyDate
            ).toLocaleTimeString() +
            " " +
            "(" +
            this.state.item_select.LastModifyByName +
            ")"
          }
          title="LastModify"
        />
      </div>
    );
  }

  render() {
    return <div>{this.state.item_select ? this.renderContent() : null}</div>;
  }
}

function mapStateToProps({ items }) {
  return { items };
}

export default connect(mapStateToProps)(viewItem);
