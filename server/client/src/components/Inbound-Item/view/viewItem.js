import React, { Component } from "react";
import _ from "lodash";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import ViewComponent from "./ViewComponent";

class viewItem extends Component {
  constructor(props) {
    super(props);

    const item_id = props.location.state._id;
    this.state = { item_id };
  }

  componentDidMount() {
    const item_select = _.find(this.props.inbound_items, ({ _id }) => {
      return _id === this.state.item_id;
    });

    this.setState({ item_select });
  }

  renderContent() {
    console.log(this.state);
    return (
      <div>
        <ViewComponent
          icon="business_center"
          value={this.state.item_select.item_name}
          title="Item Name"
        />
        <ViewComponent
          icon="code"
          value={this.state.item_select.item_code}
          title="Item Code"
        />
        <ViewComponent
          icon="flag"
          value={this.state.item_select.itemTypeName}
          title="Item Grade"
        />
        <ViewComponent
          icon="domain"
          value={this.state.item_select.item_factory}
          title="Item Factory"
        />
        <ViewComponent
          icon="turned_in"
          value={this.state.item_select.item_skin}
          title="Item Skin"
        />
        <ViewComponent
          icon="color_lens"
          value={this.state.item_select.item_color}
          title="Item Color"
        />
        <ViewComponent
          icon="attach_money"
          value={this.state.item_select.item_price}
          title="Item Price"
        />
        <ViewComponent
          icon="drafts"
          value={this.state.item_select.item_qty}
          title="Item Quality"
        />
        <ViewComponent
          icon="event_note"
          value={this.state.item_select.item_remarks}
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
    return (
      <div className="container">
        <h3 className="center">Item Views</h3>
        {this.state.item_select ? this.renderContent() : null}
        <Link to="/inbounditem">
          <button className="red btn-flat white-text">
            <i className="material-icons left">chevron_left</i>
            Back
          </button>
        </Link>
      </div>
    );
  }
}

function mapStateToProps({ inbound_items }) {
  return { inbound_items };
}

export default connect(mapStateToProps)(viewItem);
