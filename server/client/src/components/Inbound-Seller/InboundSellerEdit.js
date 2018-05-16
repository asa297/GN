import React, { Component } from "react";
import _ from "lodash";
import { connect } from "react-redux";
import { reduxForm, Field, change } from "redux-form";

import InboundSellerField from "./InboundSellerField";
import FIELDS from "./formFields";

class InboundSellerEdit extends Component {
  constructor(props) {
    super(props);
    const value_props = this.props.inbound_sellers[this.props.index];

    this.state = {
      _id: value_props._id,
      sellerName: value_props.sellerName,
      sellerCode: value_props.sellerCode,
      sellerCom: value_props.sellerCom,
      sellerRemarks: value_props.sellerRemarks
    };
  }

  componentDidMount() {
    _.map(FIELDS, ({ name, key }) => {
      this.props.dispatch(change("inbound_item", name, this.state[key]));
    });
  }

  renderField() {
    return _.map(FIELDS, ({ label, name, key }) => {
      return (
        <Field
          value={this.state[key]}
          key={name}
          component={InboundSellerField}
          type="text"
          label={label}
          name={name}
          valueField={this.state[key]}
          onChange={event => this.setState({ [key]: event.target.value })}
        />
      );
    });
  }

  render() {
    return (
      <div className="container">
        <form onSubmit={this.props.handleSubmit(this.props.onSubmit)}>
          {this.renderField()}

          <button
            onClick={this.props.onCancal}
            className="red btn-flat white-text"
          >
            <i className="material-icons left">chevron_left</i>
            Back
          </button>
          <button type="submit" className="teal btn-flat right white-text">
            Next
            <i className="material-icons right">chevron_right</i>
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

function mapStateToProps({ inbound_sellers }) {
  return { inbound_sellers };
}

export default reduxForm({
  validate,
  form: "inbound_item",
  destroyOnUnmount: false
})(connect(mapStateToProps, null)(InboundSellerEdit));
