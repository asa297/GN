import React, { Component } from "react";
import _ from "lodash";
import { reduxForm, Field, reset } from "redux-form";
import { Link } from "react-router-dom";
import { connect } from "react-redux";

import InboundSellerField from "./InboundSellerField";
import FIELDS from "./formFields";

class InboundSellerForm extends Component {
  componentDidMount() {
    this.props.dispatch(reset("inbound_seller"));
  }

  renderField() {
    return _.map(FIELDS, ({ label, name }) => {
      return (
        <Field
          key={name}
          component={InboundSellerField}
          type="text"
          label={label}
          name={name}
        />
      );
    });
  }

  render() {
    return (
      <div className="container">
        <form onSubmit={this.props.handleSubmit(this.props.onSubmit)}>
          {this.renderField()}

          <Link to="/inboundseller" className="red btn-flat white-text">
            Cancal
          </Link>
          <button type="submit" className="teal btn-flat right white-text">
            Next
            <i className="material-icons right">done</i>
          </button>
        </form>
      </div>
    );
  }
}

function validate(values) {
  const errors = {};

  _.each(FIELDS, ({ name }) => {
    if (!values[name] && name !== "seller_remarks") {
      errors[name] = "Require a value";
    }

    if (values["seller_com"] && isNaN(values["seller_com"])) {
      errors["seller_com"] = "Require a Number";
    } else {
      if (values["seller_com"] < 0 || values["seller_com"] > 100) {
        errors["seller_com"] = "0% - 100%";
      }
    }
  });

  return errors;
}

function mapStateToProps({ orgs }) {
  return { orgs };
}

export default reduxForm({
  validate,
  form: "inbound_seller",
  destroyOnUnmount: false
})(
  connect(
    mapStateToProps,
    null
  )(InboundSellerForm)
);
