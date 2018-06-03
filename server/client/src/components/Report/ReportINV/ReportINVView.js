import React, { Component } from "react";
import { Link } from "react-router-dom";
import Report_CSS from "../../../Style/CSS/Report_INV_CSS.css";
import FormINVView from "./ReportINVView/FormINVView";

class ReportINVView extends Component {
  constructor(props) {
    super(props);

    const { item_code } = props.location.state;

    this.state = {
      item_code
    };
  }

  renderReportINVView() {
    return (
      <div className="container">
        <div className={Report_CSS.viewReportINVHeader}>
          <Link to="/report/reportinv">
            <i className="medium material-icons">chevron_left</i>
          </Link>
          <h3>INVENTORY Report : {this.state.item_code}</h3>
          <div />
        </div>
        <FormINVView item_code={this.state.item_code} />
      </div>
    );
  }

  render() {
    return (
      <div>
        {this.state.item_code === undefined ? null : this.renderReportINVView()}
      </div>
    );
  }
}

export default ReportINVView;
