import React, { Component } from "react";

import ReportINVList from "./ReportINVList";

import Report_CSS from "../../../Style/CSS/Report_INV_CSS.css";

class ReportInventory extends Component {
  render() {
    return (
      <div className={Report_CSS.container}>
        <ReportINVList />
      </div>
    );
  }
}

export default ReportInventory;
