import React, { Component } from "react";
import _ from "lodash";
import { connect } from "react-redux";
import { reduxForm } from "redux-form";
import { Link, withRouter } from "react-router-dom";

import Report_CSS from "../../../Style/CSS/Report_PO_CSS.css";
import { update_ReportPO } from "../../../actions";

import Header from "./ReportPOView/Header";
import GroupDetail from "./ReportPOView/GroupDetail";
import SellerDetail from "./ReportPOView/SellerDetail";
import DetailItem from "./ReportPOView/ItemDetail";
import PaymentDetail from "./ReportPOView/PaymentDetail";
import ButtonFooter from "./ReportPOView/ButtonFooter";

class ReportPOView extends Component {
  constructor(props) {
    super(props);
    const { orderId } = props.location.state;

    this.state = {
      orderId,
      report_PO: null
    };
  }

  componentDidMount() {
    const report_PO = _.find(this.props.reports_po, ({ orderId }) => {
      return orderId === this.state.orderId;
    });
    this.setState({ report_PO });
  }

  handleFormSubmit() {
    this.props.update_ReportPO(
      this.state.orderId,
      this.props.report_po_edit,
      this.props.history
    );
  }

  renderReportPOView() {
    return (
      <form onSubmit={this.props.handleSubmit(() => this.handleFormSubmit())}>
        <div className={Report_CSS.viewReportPOHeader}>
          <Link to="/report/reportpo">
            <i className="medium material-icons">chevron_left</i>
          </Link>
          <h3>PO Report : {this.state.orderId}</h3>
          <div />
        </div>

        <Header report_PO={this.state.report_PO} />
        <hr />
        <div className="center">
          <h5>Group Detail</h5>
        </div>
        <GroupDetail report_PO={this.state.report_PO} />
        <hr />

        <div className="center">
          <h5>Seller Detail</h5>
        </div>
        <SellerDetail report_PO={this.state.report_PO} />
        <hr />

        <div className="center">
          <h5>Item Detail</h5>
        </div>
        <DetailItem report_PO={this.state.report_PO} />
        <hr />
        <div className="center">
          <h5>Payments Detail</h5>
        </div>
        <PaymentDetail report_PO={this.state.report_PO} />
        <ButtonFooter orderId={this.state.orderId} />
      </form>
    );
  }

  render() {
    return (
      <div className="container">
        {this.state.report_PO === undefined ? null : this.renderReportPOView()}
      </div>
    );
  }
}

function validate(values) {
  const errors = {};
  if (!values["groupCode"]) {
    errors["groupCode"] = "Require a value";
  }

  if (!values["guideName"]) {
    errors["guideName"] = "Require a value";
  }

  if (!values["orgName"]) {
    errors["orgName"] = "Require a value";
  }

  if (!values["orgCom"]) {
    errors["orgCom"] = "Require a value";
  } else {
    if (isNaN(values["orgCom"])) {
      errors["orgCom"] = "Require a number only";
    } else if (values["orgCom"] < 0 || values["orgCom"] > 100) {
      errors["orgCom"] = "0% - 100%";
    }
  }

  if (!values["sellerName"]) {
    errors["sellerName"] = "Require a value";
  }

  if (!values["sellerCom"]) {
    errors["sellerCom"] = "Require a value";
  } else {
    if (isNaN(values["sellerCom"])) {
      errors["sellerCom"] = "Require a number only";
    } else if (values["sellerCom"] < 0 || values["sellerCom"] > 100) {
      errors["sellerCom"] = "0% - 100%";
    }
  }

  if (!values["discount"]) {
    errors["discount"] = "Require a value";
  }

  if (values["cash"] < 0) {
    errors["cash"] = "NOT SUPPORT NEGATIVE CASH";
  }

  if (values["changecash"] < 0) {
    errors["changecash"] = "NOT SUPPORT NEGATIVE CHANGE CASH";
  }

  return errors;
}

function mapStateToProps({ reports_po, form: { report_po_edit } }) {
  return { reports_po, report_po_edit };
}

export default reduxForm({
  validate,
  form: "report_po_edit"
})(
  connect(
    mapStateToProps,
    { update_ReportPO }
  )(withRouter(ReportPOView))
);
