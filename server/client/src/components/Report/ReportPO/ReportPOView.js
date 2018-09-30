import React, { Component } from "react";
import _ from "lodash";
import { connect } from "react-redux";
import { reduxForm } from "redux-form";
import { Link, withRouter } from "react-router-dom";

import Report_CSS from "../../../Style/CSS/Report_PO_CSS.css";
import { update_ReportPO, fetch_Seller, fetch_Group } from "../../../actions";

import Preloader from "../../utils/Preloader";
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
      report_PO: undefined,
      clickSubmit: false,
      ready: false
    };
  }

  componentDidMount() {
    const report_PO = _.find(this.props.reports_po, ({ orderId }) => {
      return orderId === this.state.orderId;
    });
    this.setState({ report_PO });
    this.props.fetch_Group();
    this.props.fetch_Seller();
  }

  async handleFormSubmit() {
    this.setState({ clickSubmit: true });
    await this.props.update_ReportPO(
      this.state.orderId,
      this.props.report_po_edit,
      this.props.history
    );
  }

  componentWillReceiveProps({ sellers, groups }) {
    if (!_.isEmpty(sellers) && !_.isEmpty(groups)) {
      this.setState({ ready: true });
    }
  }

  renderReportPOView() {
    if (this.state.ready) {
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
          <ButtonFooter
            orderId={this.state.orderId}
            clickSubmit={this.state.clickSubmit}
            report_PO={this.state.report_PO}
          />
        </form>
      );
    } else {
      return <Preloader />;
    }
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

  if (!values["orgComA"]) {
    errors["orgComA"] = "Require a value";
  } else {
    if (isNaN(values["orgComA"])) {
      errors["orgComA"] = "Require a number only";
    } else if (values["orgCom"] < 0 || values["orgComA"] > 100) {
      errors["orgComA"] = "0% - 100%";
    }
  }

  if (isNaN(values["orgComB"])) {
    errors["orgComB"] = "Require a number only";
  } else if (values["orgCom"] < 0 || values["orgComB"] > 100) {
    errors["orgComB"] = "0% - 100%";
  }

  if (values["seller_select"] && !values["sellerCom"]) {
    errors["sellerCom"] = "Require a value";
  } else if (values["seller_select"]) {
    if (values["sellerCom"] && isNaN(values["sellerCom"])) {
      errors["sellerCom"] = "Require a number only";
    } else if (values["sellerCom"] < 0 || values["sellerCom"] > 100) {
      errors["sellerCom"] = "0% - 100%";
    }
  }

  return errors;
}

function mapStateToProps({
  reports_po,
  form: { report_po_edit },
  groups,
  sellers
}) {
  return { reports_po, report_po_edit, groups, sellers };
}

export default reduxForm({
  validate,
  form: "report_po_edit"
})(
  connect(
    mapStateToProps,
    { update_ReportPO, fetch_Group, fetch_Seller }
  )(withRouter(ReportPOView))
);
