import React, { Component } from "react";
import { connect } from "react-redux";
import { reduxForm } from "redux-form";
import SearchHeader from "./SearchHeader";
import SearchDatePicker from "./SearchDatePicker";
import moment from "moment";
import { fetchInbound_ReportPO_Filter } from "../../../../actions";
import Report_CSS from "../../../../Style/CSS/Report_OUT_INV_CSS.css";

class Search extends Component {
  handleSearchSubmit() {
    const au = this.props.report_outbound_inv.values.start_date;
    this.props.report_outbound_inv.values.end_date = moment(
      au,
      "YYYY-MM-DD"
    ).add(1, "days");
    const new_date = moment(au, "YYYY-MM-DD").add(1, "days");
    console.log(new_date);
    this.props.fetchInbound_ReportPO_Filter(this.props.report_outbound_inv);
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
})(connect(mapStateToProps, { fetchInbound_ReportPO_Filter })(Search));
