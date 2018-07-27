import React, { Component } from "react";
import { fetchDialy_CashBalance_Filter } from "../../../../actions";
import { connect } from "react-redux";
import { reduxForm } from "redux-form";
import moment from "moment";
import { withRouter } from "react-router-dom";

import SearchHeader from "./SearchHeader";
import SearchDatePicker from "./SearchDatePicker";

class Search extends Component {
  constructor() {
    super();

    this.state = {
      searching: false
    };
  }

  async handleSearchSubmit() {
    const { start_date } = this.props.report_daily_cashbalance.values;

    const time_selected = {
      select_date: moment(start_date)
    };

    this.setState({ searching: true });

    await this.props.fetchDialy_CashBalance_Filter(time_selected);

    this.setState({ searching: false });
    this.props.history.push({
      pathname: "/report/reportdialycashbalance/view",
      state: { date: moment(start_date).format("YYYY-MM-DD") }
    });
  }

  render() {
    return (
      <div className="container_report_daily_cashbalance">
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

function mapStateToProps({ form: { report_daily_cashbalance } }) {
  return { report_daily_cashbalance };
}

export default reduxForm({
  validate,
  form: "report_daily_cashbalance"
})(
  connect(
    mapStateToProps,
    { fetchDialy_CashBalance_Filter }
  )(withRouter(Search))
);
