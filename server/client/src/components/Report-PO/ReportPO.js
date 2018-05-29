import React, { Component } from "react";
import Report_PO_CSS from "../../Style/CSS/Report_PO_CSS.css";

import ReportPODatepicker from "./ReportPODatepicker";
import ReportPOList from "./ReportPOList";

class ReportPO extends Component {
  render() {
    return (
      <div className={Report_PO_CSS.container}>
        <h3 className="center">Report PO</h3>
        <ReportPODatepicker />
        <hr />
        <ReportPOList />
        <br />
      </div>
    );
  }
}

export default ReportPO;
