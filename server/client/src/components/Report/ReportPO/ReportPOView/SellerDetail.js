import React, { Component } from "react";
import _ from "lodash";
import { connect } from "react-redux";
import { Field, change } from "redux-form";

import ReportPOView from "./ReportPOView.css";
import ReportPOViewField from "./ReportPOViewField";
import Select from "react-select";

class SellerDetail extends Component {
  constructor(props) {
    super(props);
    const { seller } = props.report_PO;

    const {
      sellerId,
      sellerName,
      sellerCode,
      sellerCom,
      sellerRemarks
    } = seller;
    this.state = {
      sellerId,
      sellerName,
      sellerCode,
      sellerCom,
      sellerRemarks
    };
  }

  componentDidMount() {
    const seller_select = _.find(this.props.sellers, ({ _id }) => {
      return this.state.sellerId === _id;
    });

    if (seller_select) {
      seller_select.label = `${seller_select.sellerName}(${
        seller_select.sellerCode
      })`;
      seller_select.value = `${seller_select.sellerName}(${
        seller_select.sellerCode
      })`;

      this.props.dispatch(
        change("report_po_edit", "seller_select", seller_select)
      );

      this.props.dispatch(
        change(
          "report_po_edit",
          "seller_select.sellerCom",
          this.state.sellerCom
        )
      );

      this.props.dispatch(
        change("report_po_edit", "sellerCom", this.state.sellerCom)
      );
    }
  }

  renderSellerDetails() {
    if (this.state.sellerId) {
      return (
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <div style={{ width: "22.5%" }}>
            <label>Seller Name</label>
            <input
              value={this.state.sellerName}
              style={{ marginBottom: "25px" }}
              disabled
            />
          </div>
          <div style={{ width: "22.5%" }}>
            <label>Seller Code</label>
            <input
              value={this.state.sellerCode}
              style={{ marginBottom: "25px" }}
              disabled
            />
          </div>
          <div style={{ width: "22.5%" }}>
            <Field
              key={"sellerCom"}
              component={ReportPOViewField}
              type="text"
              label={"sellerCom"}
              name={"sellerCom"}
              valueField={this.state.sellerCom}
              onChange={event => this.OnChangeSellerCom(event.target.value)}
              // onChange={event =>
              //   this.setState({ sellerCom: event.target.value })
              // }
            />
          </div>
          <div style={{ width: "22.5%" }}>
            <label>Seller Remarks</label>
            <input
              value={this.state.sellerRemarks}
              style={{ marginBottom: "25px" }}
              disabled
            />
          </div>
        </div>
      );
    }
  }

  renderSeller() {
    const seller_list = _.map(
      this.props.sellers,
      ({ _id, sellerName, sellerCode, sellerCom, sellerRemarks }) => {
        return {
          _id,
          sellerName,
          sellerCode,
          sellerCom,
          sellerRemarks,
          label: sellerName,
          value: sellerName
        };
      }
    );

    return (
      <div className={ReportPOView.ReportPOView_GroupDetail}>
        <Field
          name="seller_select"
          component={props => (
            <div style={{ width: "100%" }}>
              <label>Seller&nbsp;:&nbsp;</label>
              <div style={{ width: "100%" }}>
                <Select
                  value={props.input.value}
                  options={seller_list}
                  onChange={event => {
                    this.onChangeSellerSelect(event);
                  }}
                  placeholder="Select Seller"
                  className="basic-single"
                  simpleValue
                  isClearable={true}
                />
              </div>
              <div className="red-text" style={{ marginBottom: "20px" }}>
                {props.meta.touched && props.meta.error}
              </div>
            </div>
          )}
        />

        <div style={{ width: "100%" }}>{this.renderSellerDetails()}</div>
      </div>
    );
  }

  onChangeSellerSelect(values) {
    if (values) {
      const { _id, sellerName, sellerCode, sellerCom, sellerRemarks } = values;
      this.setState({
        sellerId: _id,
        sellerName,
        sellerCode,
        sellerCom,
        sellerRemarks
      });
      values.label = `${sellerName}(${sellerCode})`;
      values.value = `${sellerName}(${sellerCode})`;

      this.props.dispatch(change("report_po_edit", "seller_select", values));
      this.props.dispatch(change("report_po_edit", "sellerCom", sellerCom));
    } else {
      this.setState({
        sellerId: null,
        sellerName: "",
        sellerCode: "",
        sellerCom: 0,
        sellerRemarks: ""
      });

      this.props.dispatch(change("report_po_edit", "seller_select", null));

      this.props.dispatch(change("report_po_edit", "sellerCom", null));
    }
  }

  OnChangeSellerCom(Com) {
    this.setState({ sellerCom: Com });
    this.props.dispatch(
      change("report_po_edit", "seller_select.sellerCom", parseInt(Com, 10))
    );
  }

  render() {
    return <div>{this.renderSeller()}</div>;
  }
}

function mapStateToProps({ sellers }) {
  return { sellers };
}

export default connect(mapStateToProps)(SellerDetail);
