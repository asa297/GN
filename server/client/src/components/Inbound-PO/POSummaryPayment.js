import React, { Component } from "react";
import { connect } from "react-redux";
import { reduxForm, Field } from "redux-form";
import numeral from "numeral";
import POItemField from "./POItemField";

class POSummaryPayment extends Component {
  constructor() {
    super();
    this.state = {
      resultGrandTotal: 0
    };
  }

  componentWillReceiveProps({ inbound_po }) {
    if (inbound_po.values) {
      const { total, discount, credit, credit_charge } = inbound_po.values;

      if (total) {
        this.setState({ total });
      }

      this.setState({ discount });
      const DC = parseInt(discount, 10);
      if (DC > 0 && DC <= 100) {
        let resultDiscount = this.state.total * (DC / 100);
        this.setState({ resultDiscount });
      } else {
        this.setState({ resultDiscount: 0 });
      }

      if (credit) {
        this.setState({ credit });
      } else {
        this.setState({ credit: 0 });
      }

      this.setState({ credit_charge });
      const credit_charge_temp = parseInt(credit_charge, 10);
      if (credit_charge_temp > 0 && credit_charge_temp <= 100) {
        let resultCreditCharge = this.state.credit * (credit_charge_temp / 100);
        this.setState({ resultCreditCharge });
      } else {
        this.setState({ resultCreditCharge: 0 });
      }

      this.resultGrandTotal();
    }
  }

  resultGrandTotal() {
    const { total, resultDiscount, credit, resultCreditCharge } = this.state;
    let resultGrandTotal = total - resultDiscount - credit + resultCreditCharge;

    this.props.onDataGrandTotal(resultGrandTotal);
    this.setState({ resultGrandTotal });
  }

  render() {
    return (
      <div>
        <table>
          <thead>
            <tr>
              <th style={{ width: "60%" }}>Detail</th>
              <th style={{ width: "40%" }}>Price</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Total Starter</td>
              <td className="center green">
                {numeral(this.state.total).format("0,0.00")}
              </td>
            </tr>

            <tr>
              <td>Discount</td>
              <td className="center red">
                {numeral(this.state.resultDiscount).format("0,0.00")}
              </td>
            </tr>
            <tr>
              <td>Credit</td>
              <td className="center red">
                {numeral(this.state.credit).format("0,0.00")}
              </td>
            </tr>
            <tr>
              <td>Credit Chrage</td>
              <td className="center green">
                {numeral(this.state.resultCreditCharge).format("0,0.00")}
              </td>
            </tr>
            <tr>
              <td>Grand Total</td>
              <td className="center grey">
                {numeral(this.state.resultGrandTotal).format("0,0.00")}
              </td>
            </tr>
            <tr>
              <td>Receive Cash</td>
              <td className="center yellow">
                <div>
                  <Field
                    name="receivecash"
                    key="receivecash"
                    component={POItemField}
                    type="text"
                    onChange={event => {
                      this.setState({ receivecash: event.target.value });
                      this.props.onDataReceiveCash(event.target.value);
                    }}
                  />
                </div>
              </td>
            </tr>
            <tr>
              <td>Change Cash</td>
              <td className="center orange">
                {numeral(
                  this.state.receivecash - this.state.resultGrandTotal
                ).format("0,0.00")}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    );
  }
}

function mapStateToProps({ form: { inbound_po } }) {
  return { inbound_po };
}

export default reduxForm({
  form: "inbound_po"
})(
  connect(
    mapStateToProps,
    null
  )(POSummaryPayment)
);
