import React, { Component } from "react";
import numeral from "numeral";
import _ from "lodash";
import { connect } from "react-redux";
import { change } from "redux-form";

import ReportPOViewCSS from "./ReportPOView.css";

let check = false;
class PaymentDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      total: 0,
      discount: 0,
      credit: 0,
      cash: 0,
      receivecash: 0,
      changecash: 0,
      creditcharge: 0,
      grandtotal: 0
    };
  }

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
          <div style={{ width: "22.5%" }}>
            <label>Total</label>
            <input
              defaultValue={numeral(this.state.total).format("0,0.00")}
              style={{ marginBottom: "25px" }}
              disabled
            />
          </div>
          <div style={{ width: "22.5%" }}>
            <label>Discount</label>
            <input
              defaultValue={numeral(this.state.discount).format("0,0.00")}
              style={{ marginBottom: "25px" }}
              disabled
            />
          </div>
          <div style={{ width: "22.5%" }}>
            <label>Credit</label>
            <input
              defaultValue={numeral(this.state.credit).format("0,0.00")}
              style={{ marginBottom: "25px" }}
              disabled
            />
          </div>
          <div style={{ width: "22.5%" }}>
            <label>Credit Charge</label>
            <input
              defaultValue={numeral(this.state.creditcharge).format("0,0.00")}
              style={{ marginBottom: "25px" }}
              disabled
            />
          </div>
          <div style={{ width: "30%" }}>
            <label>Grand Total</label>
            <input
              defaultValue={numeral(this.state.grandtotal).format("0,0.00")}
              style={{ marginBottom: "25px" }}
              disabled
            />
          </div>
          <div style={{ width: "30%" }}>
            <label>Receive Cash</label>
            <input
              defaultValue={numeral(this.state.receivecash).format("0,0.00")}
              style={{ marginBottom: "25px" }}
              disabled
            />
          </div>
          <div style={{ width: "30%" }}>
            <label>Change</label>
            <input
              defaultValue={numeral(this.state.changecash).format("0,0.00")}
              style={{ marginBottom: "25px" }}
              disabled
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

function mapStateToProps({ reports_po, form: { report_po_edit } }) {
  // console.log(report_po_edit);
  return { reports_po, report_po_edit };
}

export default connect(mapStateToProps)(PaymentDetail);
