import React, { Component } from "react";
import { connect } from "react-redux";
import { reduxForm } from "redux-form";
import { fetch_Group, fetch_Seller, submitInboundOrder } from "../../actions";
import Collapsible from "react-collapsible";

import POSelectGruop from "./POSelectGruop";
import POSelectSeller from "./POSelectSeller";
import POItemOrder from "./POItemOrder";
import POPayment from "./POPayment";
import POSummaryPayment from "./POSummaryPayment";
import POPrint from "./POPrint";

import Preloader from "../utils/Preloader";
import CircularLoader from "../utils/CircularLoader";
import PO_CSS from "../../Style/CSS/PO_CSS.css";

let grand_total;
class PO extends Component {
  constructor() {
    super();

    this.state = {
      ready: false,
      loading: false,
      print: false,
      print_value: {}
    };
  }

  componentDidMount() {
    this.props.fetch_Seller();
    this.props.fetch_Group();
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.groups.length > 0) {
      this.setState({ ready: true });
    }
  }

  headerCollapseItem(header) {
    return (
      <h5>
        <a href="">{header}</a>
        <hr />
      </h5>
    );
  }

  async handleSubmitPO() {
    this.setState({ loading: true });

    const res = await this.props.submitInboundOrder(
      this.props.inbound_po.values
    );

    if (res) {
      this.setState({ loading: false, print: true, print_value: res });
    }
  }

  renderContent() {
    if (this.state.loading) {
      return (
        <div className={PO_CSS.loading}>
          <CircularLoader />
        </div>
      );
    } else if (this.state.print) {
      return (
        <div>
          <POPrint print_value={this.state.print_value} />
        </div>
      );
    }

    return (
      <form onSubmit={this.props.handleSubmit(() => this.handleSubmitPO())}>
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
          <POSummaryPayment
            onDataGrandTotal={data => (grand_total = data)}
            onDataReceiveCash={receivecash => this.setState({ receivecash })}
          />
        </Collapsible>
        <div style={{ display: "flex ", justifyContent: "center" }}>
          <button className="green btn-flat white-text">Submit</button>
        </div>
      </form>
    );
  }

  render() {
    return (
      <div className="container">
        {this.state.ready ? this.renderContent() : <Preloader />}
      </div>
    );
  }
}

function validate(values) {
  const errors = {};
  if (!values["group_select"]) {
    errors["group_select"] = "Require a value ";
  }

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
    } else if (values["credit"] > grand_total) {
      errors["credit"] = "CREDIT CAN'T MORE THAN GRAND TOTAL";
    }
  }

  if (values["credit"] && !values["credit_charge"]) {
    errors["credit_charge"] = "Please enter a Credit Chrage";
  } else if (values["credit_charge"] && isNaN(values["credit_charge"])) {
    errors["credit_charge"] = "Require a Number";
  } else {
    if (values["credit_charge"] < 0 || values["credit_charge"] > 100) {
      errors["credit_charge"] = "0% - 100%";
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

function mapStateToProps({ form: { inbound_po }, groups }) {
  return { inbound_po, groups };
}

export default reduxForm({
  validate,
  form: "inbound_po",
  destroyOnUnmount: false
})(
  connect(
    mapStateToProps,
    { fetch_Group, fetch_Seller, submitInboundOrder }
  )(PO)
);
