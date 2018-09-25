import React, { Component } from "react";
import _ from "lodash";
import { find_ReportPO } from "../../../actions";
import { connect } from "react-redux";
import { reduxForm } from "redux-form";
import { withRouter } from "react-router-dom";
import Alert from "react-s-alert";

import SearchPOBar from "./SearchPOBar";

class SearchPO extends Component {
  constructor() {
    super();
    this.state = {
      searching: false
    };
  }
  async handleSearchSubmit() {
    const { orderId } = this.props.search_po.values;
    this.setState({ searching: true });
    await this.props.find_ReportPO(orderId);
    this.setState({ searching: false });
    const _found = _.find(this.props.reports_po, ({ orderId: _orderId }) => {
      return _orderId === parseInt(orderId, 10);
    });
    if (_found) {
      this.props.history.push({
        pathname: "/report/reportpo/view",
        state: { orderId: parseInt(orderId, 10) }
      });
    } else {
      Alert.error(`Purchase Order ${orderId} is not found.`, {
        position: "bottom",
        timeout: 2000
      });
    }
  }

  render() {
    return (
      <div>
        <form
          onSubmit={this.props.handleSubmit(() => this.handleSearchSubmit())}
        >
          <SearchPOBar searching={this.state.searching} />
        </form>
      </div>
    );
  }
}

function validate(values) {
  const errors = {};
  if (!values["orderId"]) {
    errors["orderId"] = "Require a value";
  } else {
    if (isNaN(values["orderId"])) {
      errors["orderId"] = "Require a number only";
    }
  }

  return errors;
}

function mapStateToProps({ form: { search_po }, reports_po }) {
  return { search_po, reports_po };
}

export default reduxForm({
  validate,
  form: "search_po"
})(
  connect(
    mapStateToProps,
    { find_ReportPO }
  )(withRouter(SearchPO))
);
