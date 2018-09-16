import React, { Component } from "react";
import { connect } from "react-redux";
import { reduxForm } from "redux-form";
import {
  fetch_Group_Filter,
  fetch_Seller,
  submit_Order,
  submitOutbound_ItemElement_PO
} from "../../actions";
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

import io from "socket.io-client";

let grand_total;
let total_NoCredit;
let _total;

class PO extends Component {
  constructor() {
    super();
    const socket = io("https://www.giornies.com", {
      transports: ["websocket"]
    });
    this.state = {
      socket,
      ready: false,
      loading: false,
      print: false,
      print_value: {}
    };
  }
  componentDidMount() {
    this.props.fetch_Seller();
    this.props.fetch_Group_Filter();
    const { socket } = this.state;
    const { auth } = this.props;
    socket.emit("joinroom", { auth });
    socket.emit("openpo", { auth });
  }
  componentWillReceiveProps({ groups, inbound_po }) {
    if (groups.length > 0) {
      this.setState({ ready: true });
    }
    if (inbound_po.values) {
      let { total, discount, credit } = inbound_po.values;
      const DC = parseInt(discount, 10);
      // const credit_charge_temp = parseInt(credit_charge, 10);
      let resultDiscount = DC > 0 && DC <= 100 ? total * (DC / 100) : 0;
      credit = credit ? parseInt(credit, 10) : 0;
      // let resultCreditCharge =
      //   credit_charge_temp > 0 && credit_charge_temp <= 100
      //     ? credit * (credit_charge_temp / 100)
      //     : 0;
      let totalNoCredit = total - resultDiscount;
      let resultGrandTotal = total - resultDiscount - credit;
      _total = total;
      total_NoCredit = totalNoCredit;
      grand_total = resultGrandTotal;
    }
  }
  componentWillUnmount() {
    const { socket } = this.state;
    const { auth } = this.props;
    socket.emit("closepo", { auth });
    socket.disconnect();
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
    const { values } = this.props.inbound_po;
    const res = await this.props.submit_Order(values);
    if (res) {
      const { socket } = this.state;
      const { receivecash } = values;
      const { auth } = this.props;
      socket.emit("submitpo", { receivecash, auth });
      socket.disconnect();
      this.props.submitOutbound_ItemElement_PO({
        itemList: values.itemList
      });
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
        <h3 className="center">New Purchase Order (รายการขายใหม่)</h3>
        <h5>
          <i>Section 1 : ส่วนที่ 1</i>
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
        <Collapsible trigger={this.headerCollapseItem("Section 2 : ส่วนที่ 2")}>
          <POItemOrder subtotal={_total} socket={this.state.socket} />
        </Collapsible>
        <Collapsible
          trigger={this.headerCollapseItem("Section 3 : ส่วนลดและเครดิต")}
        >
          <POPayment socket={this.state.socket} />
        </Collapsible>
        <Collapsible
          trigger={this.headerCollapseItem("Payments รายละเอียดการชำระเงิน")}
        >
          <POSummaryPayment
            // onDataGrandTotal={data => (grand_total = data)}
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
    } else if (values["credit"] > total_NoCredit) {
      errors["credit"] = "CREDIT CAN'T MORE THAN SUBTOTAL AFTER DISCOUNT";
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

function mapStateToProps({ form: { inbound_po }, groups, auth }) {
  return { inbound_po, groups, auth };
}

export default reduxForm({
  validate,
  form: "inbound_po",
  destroyOnUnmount: false
})(
  connect(
    mapStateToProps,
    {
      fetch_Group_Filter,
      fetch_Seller,
      submit_Order,
      submitOutbound_ItemElement_PO
    }
  )(PO)
);
