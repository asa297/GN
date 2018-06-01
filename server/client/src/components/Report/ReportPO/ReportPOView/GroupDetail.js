import React, { Component } from "react";
import _ from "lodash";
import { connect } from "react-redux";
import { Field, change } from "redux-form";
import ReportPOViewField from "./ReportPOViewField";

import ReportPOViewCSS from "./ReportPOView.css";

let check = false;
class GroupDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      groupCode: null,
      guideName: null,
      orgName: null,
      orgTypeName: null,
      orgCom: null
    };
  }

  componentDidMount() {
    const report_PO = _.find(this.props.inbound_reports_po, ({ orderId }) => {
      return orderId === this.props.orderId;
    });
    if (report_PO) {
      _.map(this.state, (value, key) => {
        this.setState({ [key]: report_PO[key] });
      });

      this.handleInitialize(report_PO);

      check = true;
    }
  }

  handleInitialize(report_PO) {
    _.map(this.state, (value, key) => {
      this.props.dispatch(change("report_po_edit", key, report_PO[key]));
    });
  }

  componentWillUnmount() {
    check = false;
  }

  GroupDetail() {
    if (check) {
      return (
        <div className={ReportPOViewCSS.ReportPOView_GroupDetail}>
          <div style={{ width: "45%" }}>
            <Field
              key={"groupCode"}
              component={ReportPOViewField}
              type="text"
              label={"groupCode"}
              name={"groupCode"}
              valueField={this.state.groupCode}
              onChange={event =>
                this.setState({ groupCode: event.target.value })
              }
            />
          </div>
          <div style={{ width: "45%" }}>
            <Field
              key={"guideName"}
              component={ReportPOViewField}
              type="text"
              label={"guideName"}
              name={"guideName"}
              valueField={this.state.guideName}
              onChange={event =>
                this.setState({ guideName: event.target.value })
              }
            />
          </div>
          <div style={{ width: "30%" }}>
            <Field
              key={"orgName"}
              component={ReportPOViewField}
              type="text"
              label={"orgName"}
              name={"orgName"}
              valueField={this.state.orgName}
              onChange={event => this.setState({ orgName: event.target.value })}
            />
          </div>
          <div style={{ width: "30%" }}>
            <label>orgTypeName</label>
            <input defaultValue={this.state.orgTypeName} readOnly />
          </div>
          <div style={{ width: "30%" }}>
            <Field
              key={"orgCom"}
              component={ReportPOViewField}
              type="text"
              label={"orgCom"}
              name={"orgCom"}
              valueField={this.state.orgCom}
              onChange={event => this.setState({ orgCom: event.target.value })}
            />
          </div>
        </div>
      );
    }
  }

  render() {
    return <div>{this.GroupDetail()}</div>;
  }
}

function mapStateToProps({ inbound_reports_po }) {
  return { inbound_reports_po };
}

export default connect(mapStateToProps)(GroupDetail);
