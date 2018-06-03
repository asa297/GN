import React, { Component } from "react";

import ReportINVList from "./ReportINVList";
import SearchINV from "./SearchINV";
import ReportINVHeader from "./ReportINVHeader";

import Report_CSS from "../../../Style/CSS/Report_INV_CSS.css";

class ReportInventory extends Component {
  render() {
    return (
      <div className={Report_CSS.container}>
        <ReportINVHeader />
        <div>
          <SearchINV />
        </div>

        <ReportINVList />
      </div>
    );
  }
}

export default ReportInventory;
