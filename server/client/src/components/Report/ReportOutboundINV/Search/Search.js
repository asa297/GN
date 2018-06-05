import React, { Component } from "react";
import { connect } from "react-redux";
import { reduxForm } from "redux-form";
import moment from "moment";
import { withRouter } from "react-router-dom";

import SearchHeader from "./SearchHeader";
import SearchDatePicker from "./SearchDatePicker";

import { fetchInbound_ReportPO_Filter } from "../../../../actions";
import Report_CSS from "../../../../Style/CSS/Report_OUT_INV_CSS.css";

class Search extends Component {
  async handleSearchSubmit() {
    const { start_date } = this.props.report_outbound_inv.values;

    const time_selected = {
      values: {
        start_date: moment(start_date),
        end_date: moment(start_date).add(1, "days")
      }
    };

    await this.props.fetchInbound_ReportPO_Filter(time_selected);

    this.props.history.push({
      pathname: "/report/reportoutinv/view",
      state: { date: moment(start_date).format("YYYY-MM-DD") }
    });
  }

  render() {
    return (
      <div className={Report_CSS.container}>
        <SearchHeader />
        <form
          onSubmit={this.props.handleSubmit(() => this.handleSearchSubmit())}
        >
          <SearchDatePicker />
        </form>
      </div>
    );
  }
}

function validate(values) {
  const errors = {};
  if (!values["start_date"]) {
    errors["start_date"] = "Require a value";
  }

  return errors;
}

function mapStateToProps({ form: { report_outbound_inv } }) {
  return { report_outbound_inv };
}

export default reduxForm({
  validate,
  form: "report_outbound_inv"
})(
  connect(mapStateToProps, { fetchInbound_ReportPO_Filter })(withRouter(Search))
);
