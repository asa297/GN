import React, { Component } from "react";
import { connect } from "react-redux";
import { reduxForm, Field } from "redux-form";
import numeral from "numeral";
import POItemField from "./POItemField";

class POSummaryPayment extends Component {
  constructor(props) {
    super(props);
    this.state = {
      socket: props.socket,
      resultGrandTotal: 0
    };
  }

  componentWillReceiveProps({ inbound_po }) {
    if (inbound_po.values) {
      let { total, discount, credit, credit_charge } = inbound_po.values;
      let resultDiscount;
      let resultCreditCharge;

      this.setState({ total });

      this.setState({ discount });
      const DC = parseInt(discount, 10);
      if (DC > 0 && DC <= 100) {
        resultDiscount = total * (DC / 100);

        this.setState({ resultDiscount });
      } else {
        resultDiscount = 0;
        this.setState({ resultDiscount: 0 });
      }

      if (credit) {
        this.setState({ credit });
      } else {
        credit = 0;
        this.setState({ credit: 0 });
      }

      this.setState({ credit_charge });
      const credit_charge_temp = parseInt(credit_charge, 10);
      if (credit_charge_temp > 0 && credit_charge_temp <= 100) {
        resultCreditCharge = credit * (credit_charge_temp / 100);
        this.setState({ resultCreditCharge });
      } else {
        resultCreditCharge = 0;
        this.setState({ resultCreditCharge: 0 });
      }

      let resultGrandTotal = total - resultDiscount - credit;

      this.setState({ resultGrandTotal });
    }
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
              <td>Total Amount (ยอดรวม)</td>
              <td className="center green">
                {numeral(this.state.total).format("0,0")} ฿
              </td>
            </tr>

            <tr>
              <td>Discount (ส่วนลด)</td>
              <td className="center red">
                {numeral(this.state.resultDiscount).format("0,0")} ฿
              </td>
            </tr>
            <tr>
              <td>Credit (จำนวนชำระเครดิต)</td>
              <td className="center red">
                {numeral(this.state.credit).format("0,0")} ฿
              </td>
            </tr>
            <tr>
              <td>Credit Chrage (เครดิตชาร์จ)</td>
              <td className="center green">
                {numeral(this.state.resultCreditCharge).format("0,0")} ฿
              </td>
            </tr>
            <tr>
              <td style={{ fontWeight: "bold" }}>
                Grand Total (ยอดที่ต้องชำระ)
              </td>
              <td className="center grey">
                {numeral(this.state.resultGrandTotal).format("0,0")} ฿
              </td>
            </tr>
            <tr>
              <td style={{ fontWeight: "bold" }}>Receive Cash (รับเงิน)</td>
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
              <td style={{ fontWeight: "bold" }}>Change (เงินทอน)</td>
              <td className="center orange">
                {numeral(
                  this.state.receivecash - this.state.resultGrandTotal
                ).format("0,0")} ฿
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
})(connect(mapStateToProps)(POSummaryPayment));
