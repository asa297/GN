import React, { Component } from "react";
import { connect } from "react-redux";
import { reduxForm, Field, change } from "redux-form";
import POItemField from "./POItemField";

class POSummaryPayment extends Component {
  constructor() {
    super();

    this.state = {
      sum: 0
    };
  }

  componentWillReceiveProps({ inbound_po }) {
    if (inbound_po.values) {
      const { total, discount, credit, credit_charge } = inbound_po.values;
      if (total) {
        this.setState({ total });
      }
      if (discount) {
        this.setState({ discount });
      }
      if (credit) {
        this.setState({ credit });
      }
      if (credit_charge) {
        this.setState({ credit_charge });
      }
    }
  }

  renderSum() {
    const { credit_charge, discount, total } = this.state;
    let { sum } = this.state;
    sum = total;
    const DC = parseInt(discount, 10);

    if (DC !== 0 && DC > 0 && DC <= 100) {
      const dis = (100 - DC) / 100;
      sum = sum * dis;
    }
    if (credit_charge) {
      const charge = 1 + credit_charge / 100;
      sum = sum * charge;
    }

    return (
      <h4 style={{ marginBottom: "0px" }}>
        Total :{" "}
        {parseFloat(sum)
          .toFixed(2)
          .toLocaleString()}
      </h4>
    );
  }

  render() {
    console.log(this.state);
    return <div>{this.renderSum()}</div>;
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
