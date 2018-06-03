import React, { Component } from "react";
import _ from "lodash";
import { connect } from "react-redux";
import { Field, change } from "redux-form";
import ReportPOViewField from "./ReportPOViewField";

import ReportPOView from "./ReportPOView.css";

let check = false;
class SellerDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      sellerName: null,
      sellerCom: null
    };
  }

  // componentDidMount() {
  //   const report_PO = _.find(this.props.inbound_reports_po, ({ orderId }) => {
  //     return orderId === this.props.orderId;
  //   });
  //   if (report_PO) {
  //     _.map(this.state, (value, key) => {
  //       this.setState({ [key]: report_PO[key] });
  //     });

  //     this.handleInitialize(report_PO);
  //   }
  // }

  componentWillReceiveProps(nextProps) {
    if (nextProps.report_PO && check === false) {
      _.map(this.state, (value, key) => {
        this.setState({ [key]: nextProps.report_PO[key] });
      });

      this.handleInitialize(nextProps.report_PO);

      check = true;
    }
  }

  componentWillUnmount() {
    check = false;
  }

  handleInitialize(report_PO) {
    _.map(this.state, (value, key) => {
      this.props.dispatch(change("report_po_edit", key, report_PO[key]));
    });

    check = true;
  }

  SellerDetail() {
    if (check) {
      return (
        <div className={ReportPOView.ReportPOView_GroupDetail}>
          <div style={{ width: "45%" }}>
            <Field
              key={"sellerName"}
              component={ReportPOViewField}
              type="text"
              label={"sellerName"}
              name={"sellerName"}
              valueField={this.state.sellerName}
              onChange={event =>
                this.setState({ sellerName: event.target.value })
              }
            />
          </div>
          <div style={{ width: "45%" }}>
            <Field
              key={"sellerCom"}
              component={ReportPOViewField}
              type="text"
              label={"sellerCom"}
              name={"sellerCom"}
              valueField={this.state.sellerCom}
              onChange={event =>
                this.setState({ sellerCom: event.target.value })
              }
            />
          </div>
        </div>
      );
    }
  }

  render() {
    return <div>{this.SellerDetail()}</div>;
  }
}

function mapStateToProps({ inbound_reports_po }) {
  return { inbound_reports_po };
}

export default connect(mapStateToProps)(SellerDetail);
