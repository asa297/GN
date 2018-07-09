import React, { Component } from "react";
import { connect } from "react-redux";
import { reduxForm } from "redux-form";
import { withRouter } from "react-router-dom";

import SearchINVBar from "./SearchINVBar";

class SearchINV extends Component {
  handleSearchSubmit() {
    const { item_code } = this.props.search_item.values;

    this.props.history.push({
      pathname: "/report/reportinv/view",
      state: { item_code }
    });
  }

  render() {
    return (
      <div>
        <form
          onSubmit={this.props.handleSubmit(() => this.handleSearchSubmit())}
        >
          <SearchINVBar />
        </form>
      </div>
    );
  }
}

function validate(values) {
  const errors = {};
  if (!values["item_code"]) {
    errors["item_code"] = "Require a value";
  }

  return errors;
}

function mapStateToProps({ form: { search_item } }) {
  return { search_item };
}

export default reduxForm({
  validate,
  form: "search_item"
})(connect(mapStateToProps)(withRouter(SearchINV)));
