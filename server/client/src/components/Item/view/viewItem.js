import React, { Component } from "react";
import _ from "lodash";
import { Link, withRouter } from "react-router-dom";
import { connect } from "react-redux";
import ViewComponent from "./ViewComponent";

class viewItem extends Component {
  constructor(props) {
    super(props);

    const item_id = props.location.state._id;
    this.state = { item_id };
  }

  componentDidMount() {
    const item_select = _.find(this.props.items, ({ _id }) => {
      return _id === this.state.item_id;
    });

    this.setState({ item_select });
  }

  renderContent() {
    return (
      <div>
        <ViewComponent
          icon="business_center"
          value={this.state.item_select.item_code}
          title="Product Barcode (บาร์โค้ดสินค้า)"
        />
        <ViewComponent
          icon="code"
          value={this.state.item_select.item_name}
          title="Product Name (ชื่อสินค้า)"
        />
        <ViewComponent
          icon="flag"
          value={this.state.item_select.itemTypeName}
          title="Product Type (ประเภทผลิตภัณฑ์)"
        />
        <ViewComponent
          icon="domain"
          value={this.state.item_select.item_factory}
          title="Factory (โรงงาน)"
        />
        <ViewComponent
          icon="turned_in"
          value={this.state.item_select.item_skin}
          title="Leatter Type (ประเภทหนัง)"
        />
        <ViewComponent
          icon="color_lens"
          value={this.state.item_select.item_color}
          title="Product Color / Pattern (สี/ลาย)"
        />
        <ViewComponent
          icon="attach_money"
          value={this.state.item_select.item_price}
          title="Unit Price (ราคาต่อหน่วย)"
        />
        <ViewComponent
          icon="drafts"
          value={this.state.item_select.item_qty}
          title="Product Quality (จำนวนสินค้า)"
        />
        <ViewComponent
          icon="event_note"
          value={this.state.item_select.item_remarks}
          title="Product Remarks (หมายเหตุ)"
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
          title="Record (วันเวลาและบุคคลที่เพิ่มข้อมูลครั้งแรก)"
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
          title="LastModify (วันเวลาและบุคคลที่ทำการแก้ไขข้อมูลล่าสุด)"
        />
      </div>
    );
  }

  render() {
    return (
      <div className="container">
        <h3 className="center">Item Views</h3>
        {this.state.item_select ? this.renderContent() : null}
        <Link to="/Item">
          <button className="red btn-flat white-text">
            <i className="material-icons left">chevron_left</i>
            Back
          </button>
        </Link>
      </div>
    );
  }
}

function mapStateToProps({ items }) {
  return { items };
}

export default connect(mapStateToProps)(withRouter(viewItem));
