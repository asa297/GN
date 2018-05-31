import React, { Component } from "react";
import _ from "lodash";
import { connect } from "react-redux";

import Header from "./ReportPOView/Header";
import GroupDetail from "./ReportPOView/GroupDetail";
import SellerDetail from "./ReportPOView/SellerDetail";
import DetailItem from "./ReportPOView/ItemDetail";
import PaymentDetail from "./ReportPOView/PaymentDetail";

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
    const report_PO = _.find(this.props.inbound_reports_po, ({ orderId }) => {
      return orderId === this.state.orderId;
    });
    this.setState({ report_PO });
  }

  render() {
    return (
      <div className="container">
        <div className="center">
          <h3>PO Report : {this.state.orderId}</h3>
        </div>
        <Header report_PO={this.state.report_PO} />
        <hr />
        <div className="center">
          <h5>Group Detail</h5>
        </div>
        <GroupDetail orderId={this.state.orderId} />
        <hr />
        <div className="center">
          <h5>Seller Detail</h5>
        </div>
        <SellerDetail orderId={this.state.orderId} />
        <hr />
        <div className="center">
          <h5>Item Detail</h5>
        </div>
        <DetailItem orderId={this.state.orderId} />
        <hr />
        <div className="center">
          <h5>Payments Detail</h5>
        </div>
        <PaymentDetail orderId={this.state.orderId} />
        <button
          className="red btn-flat white-text left"
          style={{ marginTop: "30px" }}
        >
          Delete
        </button>
        <button
          className="green btn-flat white-text right"
          style={{ marginTop: "30px" }}
        >
          Save
        </button>
      </div>
    );
  }
}

function mapStateToProps({ inbound_reports_po }) {
  return { inbound_reports_po };
}

export default connect(mapStateToProps)(ReportPOView);
