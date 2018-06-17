import React, { Component } from "react";
import { connect } from "react-redux";
import { reduxForm, reset } from "redux-form";
import { fetchInbound_Group, fetchInbound_Seller } from "../../actions";
import Collapsible from "react-collapsible";

import POSelectGruop from "./POSelectGruop";
import POSelectSeller from "./POSelectSeller";
import POItemOrder from "./POItemOrder";
import POPayment from "./POPayment";
import POSummaryPayment from "./POSummaryPayment";
import POPrint from "./POPrint";

import PO_CSS from "../../Style/CSS/PO_CSS.css";

class PO extends Component {
  componentDidMount() {
    this.props.dispatch(reset("inbound_po"));
    this.props.fetchInbound_Group();
    this.props.fetchInbound_Seller();
  }

  headerCollapseItem(header) {
    return (
      <h5>
        <a href="#">{header}</a>
        <hr />
      </h5>
    );
  }

  renderContent() {
    return (
      <form onSubmit={this.props.handleSubmit(() => console.log("dd"))}>
        <div className="container">
          <h3 className="center">New Purchase Order</h3>
          <h5>
            <i>Header</i>
          </h5>
          <hr />
          <div className={PO_CSS.headerPO_con}>
            <div style={{ width: "40%" }}>
              <POSelectGruop />
            </div>
            <div style={{ width: "40%" }}>
              <POSelectSeller />
            </div>
          </div>

          <Collapsible trigger={this.headerCollapseItem("Item")}>
            <POItemOrder />
          </Collapsible>

          <Collapsible trigger={this.headerCollapseItem("Payments")}>
            <POPayment />
          </Collapsible>

          <Collapsible trigger={this.headerCollapseItem("Summary Payments")}>
            <POSummaryPayment />
          </Collapsible>

          <button
            className="green btn-flat white-text"
            style={{ marginTop: "30px" }}
          >
            Next
          </button>
        </div>
      </form>
    );
  }

  render() {
    return <div>{this.renderContent()}</div>;
  }
}

function validate(values) {
  const errors = {};
  if (!values["group_select"]) {
    errors["group_select"] = "Require a value ";
  }

  // if (!values["seller_select"]) {
  //   errors["seller_select"] = "Require a value ";
  // }

  if (values["discount"] && isNaN(values["discount"])) {
    errors["discount"] = "Require a Number";
  } else {
    if (values["discount"] < 0 || values["discount"] > 100) {
      errors["discount"] = "0% - 100%";
    }
  }

  if (values["credit"] && isNaN(values["credit"])) {
    errors["credit"] = "Require a Number";
  } else {
    if (values["credit"] < 0) {
      errors["credit"] = "NOT SUPPORT NEGATIVE CREDIT";
    }
  }

  if (values["credit_charge"] && isNaN(values["credit_charge"])) {
    errors["credit_charge"] = "Require a Number";
  } else {
    if (values["credit_charge"] < 0 || values["credit_charge"] > 100) {
      errors["credit_charge"] = "0% - 100%";
    }
  }

  return errors;
}

export default reduxForm({
  validate,
  form: "inbound_po"
})(
  connect(
    null,
    { fetchInbound_Group, fetchInbound_Seller }
  )(PO)
);
