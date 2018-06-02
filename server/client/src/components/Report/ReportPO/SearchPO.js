import React, { Component } from "react";
import { connect } from "react-redux";
import { reduxForm } from "redux-form";
import { withRouter } from "react-router-dom";
import { searchInbound_ReportPO } from "../../../actions";

import SearchPOBar from "./SearchPOBar";

class SearchPO extends Component {
  handleSearchSubmit() {
    const { orderId } = this.props.search_po.values;

    this.props.history.push({
      pathname: "/report/reportpo/view",
      state: { orderId: parseInt(orderId, 10) }
    });
  }

  render() {
    return (
      <div>
        <form
          onSubmit={this.props.handleSubmit(() => this.handleSearchSubmit())}
        >
          <SearchPOBar />
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

function mapStateToProps({ form: { search_po } }) {
  return { search_po };
}

export default reduxForm({
  validate,
  form: "search_po"
})(connect(mapStateToProps, { searchInbound_ReportPO })(withRouter(SearchPO)));
