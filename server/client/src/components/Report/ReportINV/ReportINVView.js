import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";
import Report_CSS from "../../../Style/CSS/Report_INV_CSS.css";
// import FormINVView from "./ReportINVView/FormINVView";
import ViewItem from "./view/viewItem";

class ReportINVView extends Component {
  constructor() {
    super();

    this.state = {};
  }

  componentDidMount() {
    const { _id } = this.props.location.state;
    this.setState({ _id });
  }

  renderReportINVView() {
    return (
      <div className="container">
        <div className={Report_CSS.viewReportINVHeader}>
          <Link to="/report/reportinv">
            <i className="medium material-icons">chevron_left</i>
          </Link>
          <h3>INVENTORY Report</h3>
          <div />
        </div>
        <ViewItem _id={this.state._id} />
        {/* <FormINVView item_code={this.state.item_code} /> */}
      </div>
    );
  }

  render() {
    return (
      <div>
        {this.state._id === undefined ? null : this.renderReportINVView()}
      </div>
    );
  }
}

export default withRouter(ReportINVView);
