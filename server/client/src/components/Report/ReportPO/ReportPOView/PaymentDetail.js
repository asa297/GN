import React, { Component } from "react";
import _ from "lodash";
import { connect } from "react-redux";
import { reduxForm, Field, change } from "redux-form";

import ReportPOViewField from "./ReportPOViewField";
import ReportPOViewCSS from "./ReportPOView.css";

class PaymentDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      total: null,
      discount: null,
      credit: null,
      cash: null,
      receivecash: null,
      changecash: null
    };
  }

  componentDidMount() {
    const report_PO = _.find(this.props.inbound_reports_po, ({ orderId }) => {
      return orderId === this.props.orderId;
    });
    if (report_PO) {
      _.map(this.state, (value, key) => {
        this.setState({ [key]: report_PO[key] });
      });

      this.handleInitialize(report_PO);
    }
  }

  handleInitialize(report_PO) {
    _.map(this.state, (value, key) => {
      this.props.dispatch(change("report_po_edit", key, report_PO[key]));
    });
  }

  renderPaymentDetail() {
    if (this.state.total) {
      return (
        <form>
          <div className={ReportPOViewCSS.ReportPOView_PaymentDetail}>
            <div style={{ width: "45%" }}>
              <label>Total</label>
              <input defaultValue={this.state.total} readOnly />
            </div>
            <div style={{ width: "45%" }}>
              <Field
                key={"discount"}
                component={ReportPOViewField}
                type="text"
                label={"discount"}
                name={"discount"}
                valueField={this.state.discount}
                onChange={event =>
                  this.setState({ discount: event.target.value })
                }
              />
            </div>
            <div style={{ width: "45%" }}>
              <label>Credit</label>
              <input defaultValue={this.state.credit} readOnly />
            </div>
            <div style={{ width: "45%" }}>
              <label>Cash</label>
              <input defaultValue={this.state.cash} readOnly />
            </div>
            <div style={{ width: "45%" }}>
              <label>Receive Cash</label>
              <input defaultValue={this.state.receivecash} readOnly />
            </div>
            <div style={{ width: "45%" }}>
              <label>Change Cash</label>
              <input defaultValue={this.state.changecash} readOnly />
            </div>
          </div>
        </form>
      );
    }
  }

  render() {
    return <div>{this.renderPaymentDetail()}</div>;
  }
}

function validate(values) {
  const errors = {};

  return errors;
}

function mapStateToProps({ inbound_reports_po }) {
  return { inbound_reports_po };
}

export default reduxForm({
  validate,
  form: "report_po_edit"
})(connect(mapStateToProps)(PaymentDetail));
