import React, { Component } from "react";
import { connect } from "react-redux";

import ReportLink from "./ReportLink/ReportLink";

class Report extends Component {
  renderReportLink() {
    return ReportLink(this.props.auth ? this.props.auth : null);
  }

  render() {
    return <div className="container">{this.renderReportLink()}</div>;
  }
}

function mapStateToProps({ auth }) {
  return { auth };
}

export default connect(mapStateToProps)(Report);
