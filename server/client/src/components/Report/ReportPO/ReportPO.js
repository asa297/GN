import React, { Component } from "react";
import Report_CSS from "../../../Style/CSS/Report_PO_CSS.css";

import ReportPOHeader from "./ReportPOHeader";
import ReportPODatepicker from "./ReportPODatepicker";
import ReportPOList from "./ReportPOList";
import SearchPO from "./SearchPO";

class ReportPO extends Component {
  render() {
    return (
      <div className={Report_CSS.container}>
        <ReportPOHeader />
        <div className={Report_CSS.filterbar}>
          <SearchPO />
          <ReportPODatepicker />
        </div>
        <ReportPOList />
        <br />
      </div>
    );
  }
}

export default ReportPO;
