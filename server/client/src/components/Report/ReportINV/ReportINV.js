import React, { Component } from "react";

import ReportINVList from "./ReportINVList";
import SearchPO from "./SearchINV";

import Report_CSS from "../../../Style/CSS/Report_INV_CSS.css";

class ReportInventory extends Component {
  render() {
    return (
      <div className={Report_CSS.container}>
        <div>
          <SearchPO />
        </div>

        <ReportINVList />
      </div>
    );
  }
}

export default ReportInventory;
