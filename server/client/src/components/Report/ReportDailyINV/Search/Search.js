import React, { Component } from "react";
import { connect } from "react-redux";
import { reduxForm } from "redux-form";
import moment from "moment";
import { withRouter } from "react-router-dom";

import SearchHeader from "./SearchHeader";
import SearchDatePicker from "./SearchDatePicker";

import { fetchDialy_Inventory_Filter } from "../../../../actions";
import Report_CSS from "../../../../Style/CSS/Report_OUT_INV_CSS.css";

class Search extends Component {
  constructor() {
    super();

    this.state = {
      searching: false
    };
  }
  async handleSearchSubmit() {
    const { start_date } = this.props.report_daily_inv.values;

    const time_selected = {
      select_date: moment(start_date)
    };

    this.setState({ searching: true });

    await this.props.fetchDialy_Inventory_Filter(time_selected);

    this.setState({ searching: false });
    this.props.history.push({
      pathname: "/report/reportdailyinv/view",
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
          <SearchDatePicker searching={this.state.searching} />
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

function mapStateToProps({ form: { report_daily_inv } }) {
  return { report_daily_inv };
}

export default reduxForm({
  validate,
  form: "report_daily_inv"
})(
  connect(
    mapStateToProps,
    { fetchDialy_Inventory_Filter }
  )(withRouter(Search))
);
