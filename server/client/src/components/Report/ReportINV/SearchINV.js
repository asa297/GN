import React, { Component } from "react";
import _ from "lodash";
import { connect } from "react-redux";
import { reduxForm } from "redux-form";
import { withRouter } from "react-router-dom";

import SearchINVBar from "./SearchINVBar";

class SearchINV extends Component {
  constructor() {
    super();

    this.state = {
      searching: false
    };
  }
  async handleSearchSubmit() {
    const { item_code } = this.props.search_item.values;
    this.setState({ searching: true });
    const result = _.find(this.props.items, value => {
      return value.item_code === item_code;
    });
    this.setState({ searching: false });
    if (result) {
      this.props.history.push({
        pathname: "/report/reportinv/view",
        state: { _id: result._id }
      });
    }
  }

  render() {
    return (
      <div>
        <form
          onSubmit={this.props.handleSubmit(() => this.handleSearchSubmit())}
        >
          <SearchINVBar searching={this.state.searching} />
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

function mapStateToProps({ form: { search_item }, items }) {
  return { search_item, items };
}

export default reduxForm({
  validate,
  form: "search_item"
})(connect(mapStateToProps)(withRouter(SearchINV)));
