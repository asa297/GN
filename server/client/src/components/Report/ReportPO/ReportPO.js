import React, { Component } from "react";
import Report_CSS from "../../../Style/CSS/Report_PO_CSS.css";

import ReportPOHeader from "./ReportPOHeader";
import ReportPODatepicker from "./ReportPODatepicker";
import ReportPOList from "./ReportPOList";

class ReportPO extends Component {
  render() {
    return (
      <div className={Report_CSS.container}>
        <ReportPOHeader />
        <ReportPODatepicker />
        <hr />
        <ReportPOList />
        <br />
      </div>
    );
  }
}

export default ReportPO;
