import React, { Component } from "react";
// import List from "./Com/List";
// import Header from "./Com/Header";

class ReportView extends Component {
  constructor(props) {
    super(props);

    const { date } = props.location.state;

    this.state = { date };
  }

  render() {
    return (
      <div className="container_report_daily_cashbalance">
        test
        {/* <Header date={this.state.date} />
        <List date={this.state.date} /> */}
      </div>
    );
  }
}

export default ReportView;
