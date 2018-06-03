import React, { Component } from "react";
import { Link } from "react-router-dom";
import Report_CSS from "../../../Style/CSS/Report_INV_CSS.css";

class ReportINVHeader extends Component {
  render() {
    return (
      <div className={Report_CSS.headerReport}>
        <div>
          <Link to="/report">
            <i className="medium material-icons">chevron_left</i>
          </Link>
        </div>
        <div>
          <h3 className="center" style={{ marginTop: "0px" }}>
            Report Inventory
          </h3>
        </div>
        <div />
      </div>
    );
  }
}

export default ReportINVHeader;
