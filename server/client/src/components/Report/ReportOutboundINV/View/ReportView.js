import React, { Component } from "react";

import TableList from "./Com/TableList";

import Report_CSS from "../../../../Style/CSS/Report_OUT_INV_CSS.css";

class ReportView extends Component {
  render() {
    return (
      <div className={Report_CSS.container}>
        <TableList />
      </div>
    );
  }
}

export default ReportView;
