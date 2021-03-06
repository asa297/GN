import React, { Component } from "react";
import _ from "lodash";
import { connect } from "react-redux";
import { reduxForm, Field, change } from "redux-form";

import SellerField from "./SellerField";
import FIELDS from "./formFields";

class SellerEdit extends Component {
  constructor(props) {
    super(props);
    const value_props = this.props.sellers[this.props.index];

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
      this.props.dispatch(change("seller_form", name, this.state[key]));
    });
  }

  renderField() {
    return _.map(FIELDS, ({ label, name, key }) => {
      if (name !== "seller_code") {
        return (
          <Field
            value={this.state[key]}
            key={name}
            component={SellerField}
            type="text"
            label={label}
            name={name}
            valueField={this.state[key]}
            onChange={event => this.setState({ [key]: event.target.value })}
          />
        );
      } else {
        return (
          <div>
            <label>{label}</label>
            <input
              style={{ marginBottom: "5px" }}
              value={this.state[key]}
              disabled
            />
          </div>
        );
      }
    });
  }

  render() {
    return (
      <div>
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
    if (!values[name] && name !== "seller_remarks" && name !== "seller_com") {
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

function mapStateToProps({ sellers }) {
  return { sellers };
}

export default reduxForm({
  validate,
  form: "seller_form",
  destroyOnUnmount: false
})(connect(mapStateToProps)(SellerEdit));
