import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import List from "./Com/List";
import Header from "./Com/Header";

class ReportView extends Component {
  constructor(props) {
    super(props);

    const { date } = props.location.state;

    this.state = { date };
  }

  render() {
    return (
      <div className="container_report_daily_com">
        <Header date={this.state.date} />
        <List date={this.state.date} />
      </div>
    );
  }
}

export default withRouter(ReportView);
