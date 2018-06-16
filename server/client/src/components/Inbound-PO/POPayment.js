import React, { Component } from "react";
import { connect } from "react-redux";
import Toggle from "react-toggle";
import { reduxForm, Field, change } from "redux-form";

import POItemField from "./POItemField";
import formFields from "./formFields";

import PO_CSS from "../../Style/CSS/PO_CSS.css";

let total_val, grand_total;

class POPayment extends Component {
  constructor(props) {
    super(props);

    // const { orgTypeId } = this.props.inbound_po.values.group_select;

    // this.state = {
    //   orgTypeId,
    //   creditToggle: false,
    //   creditChargeStatus: false,
    //   creditCharge: 0,
    //   discount: 0,
    //   credit: 0,
    //   total: 0,
    //   receivecash: 0
    // };

    // orgTypeId is china group will not charge for credit card
    this.state = {
      orgTypeId: 2
    };
  }

  componentDidMount() {
    // const { orgTypeId } = this.state;
    // this.setState({
    //   creditChargeStatus: orgTypeId === 1 ? true : false,
    //   creditCharge: orgTypeId === 1 ? 2 : 0
    // });
  }

  componentWillReceiveProps({ inbound_po }) {
    if (inbound_po.values) {
      if (inbound_po.values.group_select) {
        const { orgTypeId } = inbound_po.values.group_select;
        this.setState({ orgTypeId });
      }
    }
  }

  componentWillUnmount() {
    // this.props.dispatch(
    //   change("inbound_po", "grandtotal", parseFloat(total_val).toFixed(2))
    // );
    // this.props.dispatch(
    //   change(
    //     "inbound_po",
    //     "cash",
    //     parseFloat(total_val - this.state.credit).toFixed(2)
    //   )
    // );
    // this.props.dispatch(
    //   change("inbound_po", "credit", parseFloat(this.state.credit).toFixed(2))
    // );
    // this.props.dispatch(
    //   change(
    //     "inbound_po",
    //     "receivecash",
    //     parseFloat(this.state.receivecash).toFixed(2)
    //   )
    // );
    // this.props.dispatch(
    //   change(
    //     "inbound_po",
    //     "changecash",
    //     parseFloat(
    //       this.state.receivecash -
    //         parseFloat(total_val - this.state.credit)
    //           .toFixed(2)
    //           .toLocaleString()
    //     ).toFixed(2)
    //   )
    // );
  }

  renderFieldDC() {
    const { name } = formFields[0];
    return (
      <Field
        name={name}
        key={name}
        label={name}
        component={POItemField}
        type="text"
        onChange={event => this.setState({ discount: event.target.value })}
      />
    );
  }

  renderFieldCredit() {
    const { name } = formFields[1];
    return (
      <Field
        name={name}
        key={name}
        label={name}
        component={POItemField}
        type="text"
        onChange={event => this.setState({ credit: event.target.value })}
      />
    );
  }

  renderSum() {
    // const {
    //   creditToggle,
    //   creditChargeStatus,
    //   creditCharge,
    //   discount
    // } = this.state;
    // const DC = parseInt(discount, 10);
    // let { total } = this.state;
    // if (DC !== 0 && DC > 0 && DC <= 100) {
    //   const dis = (100 - DC) / 100;
    //   total = total * dis;
    // }
    // if (creditToggle && creditChargeStatus) {
    //   const charge = 1 + creditCharge / 100;
    //   total = total * charge;
    // }
    // total_val = total;
    // return (
    //   <h4 style={{ marginBottom: "0px" }}>
    //     Total :{" "}
    //     {parseFloat(total)
    //       .toFixed(2)
    //       .toLocaleString()}
    //   </h4>
    // );
  }

  renderDC() {
    // return (
    //   <h6 style={{ marginBottom: "0px" }}>
    //     Discount :{" "}
    //     {this.state.discount > 0 && this.state.discount <= 100
    //       ? parseFloat(
    //           parseInt(this.state.total, 10) *
    //             parseInt(this.state.discount, 10) /
    //             100
    //         )
    //           .toFixed(2)
    //           .toLocaleString()
    //       : 0}
    //   </h6>
    // );
  }

  renderCR() {
    // return (
    //   <h6 style={{ marginBottom: "0px" }}>
    //     Credit :{" "}
    //     {this.state.credit > 0
    //       ? parseFloat(this.state.credit)
    //           .toFixed(2)
    //           .toLocaleString()
    //       : 0}
    //   </h6>
    // );
  }

  renderGrandTotal() {
    // grand_total = parseInt(total_val - this.state.credit, 10);
    // return (
    //   <h3 style={{ marginBottom: "0px" }}>
    //     <b>
    //       GrandTotal :{" "}
    //       {parseFloat(total_val - this.state.credit)
    //         .toFixed(2)
    //         .toLocaleString()}
    //     </b>
    //   </h3>
    // );
  }

  renderReceiveCash() {
    // return (
    //   <div className={PO_CSS.receivecash}>
    //     <Field
    //       name="receivecash"
    //       key="receivecash"
    //       label="receivecash"
    //       component={POItemField}
    //       type="text"
    //       onChange={event => this.setState({ receivecash: event.target.value })}
    //     />
    //   </div>
    // );
  }

  renderChangeCash() {
    // return (
    //   <h3>
    //     ChangeCash :{" "}
    //     {this.state.receivecash > 0
    //       ? parseFloat(
    //           this.state.receivecash -
    //             parseFloat(total_val - this.state.credit)
    //               .toFixed(2)
    //               .toLocaleString()
    //         )
    //           .toFixed(2)
    //           .toLocaleString()
    //       : 0.0}
    //   </h3>
    // );
  }

  render() {
    return (
      <div>
        <div className={PO_CSS.DC_CR_con}>
          <div style={{ width: "40%" }}>{this.renderFieldDC()}</div>
          <div style={{ width: "40%" }}>{this.renderFieldCredit()}</div>
        </div>

        <div className={PO_CSS.footer_Payments}>
          {this.renderSum()}
          {this.renderDC()}
          {this.renderCR()}
          {this.renderGrandTotal()}
          {this.renderReceiveCash()}
          {this.renderChangeCash()}
        </div>
      </div>
    );
  }
}

function validate(values) {
  const errors = {};

  if (values["discount"] && isNaN(values["discount"])) {
    errors["discount"] = "Require a Number";
  } else {
    if (values["discount"] < 0 || values["discount"] > 100) {
      errors["discount"] = "0% - 100%";
    }
  }

  if (isNaN(values["credit"])) {
    errors["credit"] = "Require a Number";
  } else {
    if (values["credit"] < 0) {
      errors["credit"] = "NOT SUPPORT NEGATIVE CREDIT";
    } else if (values["credit"] > total_val) {
      errors["credit"] = "CREDIT CAN't EXCEED MORE TOTAL";
    }
  }

  if (!values["receivecash"]) {
    errors["receivecash"] = "Require a value";
  } else if (isNaN(values["receivecash"])) {
    errors["receivecash"] = "Require a Number";
  } else {
    if (values["receivecash"] < 0) {
      errors["receivecash"] = "NOT SUPPORT NEGATIVE RECEIVE CASH";
    } else if (values["receivecash"] < grand_total) {
      errors["receivecash"] = "RECEIVE CASH CAN'T LESS MORE GRAND TOTAL";
    }
  }

  return errors;
}

function mapStateToProps({ form: { inbound_po } }) {
  console.log(inbound_po);
  return { inbound_po };
}

export default reduxForm({
  form: "inbound_po",
  destroyOnUnmount: false
})(
  connect(
    mapStateToProps,
    null
  )(POPayment)
);
