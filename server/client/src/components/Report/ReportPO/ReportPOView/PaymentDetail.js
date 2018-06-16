import React, { Component } from "react";
import _ from "lodash";
import { connect } from "react-redux";
import { Field, change } from "redux-form";

import ReportPOViewField from "./ReportPOViewField";
import ReportPOViewCSS from "./ReportPOView.css";

let check = false;
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

  // componentDidMount() {
  //   const report_PO = _.find(this.props.inbound_reports_po, ({ orderId }) => {
  //     return orderId === this.props.orderId;
  //   });
  //   if (report_PO) {
  //     _.map(this.state, (value, key) => {
  //       this.setState({ [key]: report_PO[key] });
  //     });

  //     this.handleInitialize(report_PO);
  //     check = true;
  //   }
  // }

  componentWillReceiveProps(nextProps) {
    if (nextProps.report_PO && check === false) {
      _.map(this.state, (value, key) => {
        this.setState({ [key]: nextProps.report_PO[key] });
      });

      this.handleInitialize(nextProps.report_PO);

      check = true;
    }
  }

  componentWillUnmount() {
    check = false;
  }

  handleInitialize(report_PO) {
    _.map(this.state, (value, key) => {
      this.props.dispatch(change("report_po_edit", key, report_PO[key]));
    });
  }

  gg(event) {
    const discount = parseInt(event.target.value ? event.target.value : 0, 10);
    if (discount >= 0 && discount <= 100) {
      const new_dis = parseInt(100 - event.target.value, 10) / 100;
      const credit = parseFloat(this.state.credit);
      const cash = parseFloat(this.state.total * new_dis) - credit;
      const receivecash = parseFloat(this.state.receivecash);
      const changecash = receivecash - (cash + credit).toFixed(2);

      this.setState({ cash });
      this.props.dispatch(change("report_po_edit", "cash", cash));
      this.setState({ changecash });
      this.props.dispatch(change("report_po_edit", "changecash", changecash));

      this.setState({ discount });
    }
  }

  renderPaymentDetail() {
    if (check) {
      return (
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
                // this.setState({ discount: event.target.value })
                this.gg(event)
              }
            />
          </div>
          <div style={{ width: "45%" }}>
            <label>Credit</label>
            <input defaultValue={this.state.credit} readOnly />
          </div>
          <div style={{ width: "45%" }}>
            <Field
              key={"cash"}
              component={ReportPOViewField}
              type="text"
              label={"cash"}
              name={"cash"}
              valueField={this.state.cash}
            />
          </div>
          <div style={{ width: "45%" }}>
            <label>Receive Cash</label>
            <input defaultValue={this.state.receivecash} readOnly />
          </div>
          <div style={{ width: "45%" }}>
            <Field
              key={"changecash"}
              component={ReportPOViewField}
              type="text"
              label={"changecash"}
              name={"changecash"}
              valueField={this.state.changecash}
            />
          </div>
        </div>
      );
    }
  }

  render() {
    return <div>{this.renderPaymentDetail()}</div>;
  }
}

function mapStateToProps({ inbound_reports_po, form: { report_po_edit } }) {
  return { inbound_reports_po, report_po_edit };
}

export default connect(mapStateToProps)(PaymentDetail);
