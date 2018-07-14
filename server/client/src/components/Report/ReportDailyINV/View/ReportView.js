import React, { Component } from "react";
import TableList from "./Com/TableList";
import Header from "./Com/Header";

import Report_CSS from "../../../../Style/CSS/Report_OUT_INV_CSS.css";

class ReportView extends Component {
  constructor(props) {
    super(props);

    const { date } = props.location.state;

    this.state = { date };
  }

  render() {
    return (
      <div className={Report_CSS.container}>
        <Header date={this.state.date} />
        <TableList />
      </div>
    );
  }
}

export default ReportView;
