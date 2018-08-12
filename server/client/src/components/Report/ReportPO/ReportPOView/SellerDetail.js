import React, { Component } from "react";
import _ from "lodash";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { fetch_Seller } from "../../../../actions";
import { Field, change } from "redux-form";

import ReportPOView from "./ReportPOView.css";
import ReportPOViewField from "./ReportPOViewField";
import Select from "react-select";

class SellerDetail extends Component {
  constructor(props) {
    super(props);
    const {
      sellerId,
      sellerName,
      sellerCode,
      sellerCom,
      sellerRemarks
    } = props.report_PO;
    this.state = {
      ready: false,
      sellerId,
      sellerName,
      sellerCode,
      sellerCom,
      sellerRemarks
    };
  }

  async componentDidMount() {
    const { report_PO } = this.props;

    if (report_PO) {
      await this.props.fetch_Seller();
      _.map(this.state, (value, key) => {
        if (key !== "ready") {
          this.props.dispatch(change("report_po_edit", key, this.state[key]));
        }
      });

      const seller_select = _.find(this.props.sellers, ({ _id }) => {
        return this.state.sellerId === _id;
      });

      if (seller_select) {
        this.props.dispatch(
          change("report_po_edit", "seller_select", {
            _id: seller_select._id,
            sellerName: seller_select.sellerName,
            sellerCode: seller_select.sellerCode,
            sellerCom: seller_select.sellerCom,
            sellerRemarks: seller_select.sellerRemarks,
            label:
              seller_select.sellerName + " (" + seller_select.sellerCode + ")",
            value:
              seller_select.sellerName + " (" + seller_select.sellerCode + ")"
          })
        );
      }
    }

    this.setState({ ready: true });
  }

  renderSellerDetails() {
    if (this.state.ready && this.state.sellerId) {
      return (
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <div style={{ width: "22.5%" }}>
            <label>Seller Name</label>
            <input
              defaultValue={this.state.sellerName}
              style={{ marginBottom: "25px" }}
              disabled
            />
          </div>
          <div style={{ width: "22.5%" }}>
            <label>Seller Code</label>
            <input
              defaultValue={this.state.sellerCode}
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
              onChange={event =>
                this.setState({ sellerCom: event.target.value })
              }
            />
          </div>
          <div style={{ width: "22.5%" }}>
            <label>Seller Remarks</label>
            <input
              defaultValue={this.state.sellerRemarks}
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

    if (this.state.ready) {
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
                    // onChange={props.input.onChange}
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

      this.props.dispatch(
        change("report_po_edit", "seller_select", {
          _id: values._id,
          sellerName: values.sellerName,
          sellerCode: values.sellerCode,
          sellerCom: values.sellerCom,
          sellerRemarks: values.sellerRemarks,
          label: values.sellerName + " (" + values.sellerCode + ")",
          value: values.sellerName + " (" + values.sellerCode + ")"
        })
      );
    } else {
      this.setState({
        sellerId: null,
        sellerName: "",
        sellerCode: "",
        sellerCom: 0,
        sellerRemarks: ""
      });

      this.props.dispatch(change("report_po_edit", "seller_select", null));
    }
  }

  render() {
    return <div>{this.renderSeller()}</div>;
  }
}

function mapStateToProps({ sellers }) {
  return { sellers };
}

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
    ...bindActionCreators(
      {
        fetch_Seller
      },
      dispatch
    )
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SellerDetail);
