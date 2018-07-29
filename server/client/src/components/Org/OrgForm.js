import React, { Component } from "react";
import _ from "lodash";
import { reduxForm, Field, reset } from "redux-form";
import { Link } from "react-router-dom";
import { connect } from "react-redux";

import OrgField from "./OrgField";
import FIELDS from "./formFields";

import Select from "react-select";

class OrgForm extends Component {
  componentDidMount() {
    this.props.dispatch(reset("org_form"));
  }

  renderField() {
    return _.map(FIELDS, ({ label, name }) => {
      return (
        <Field
          key={name}
          component={OrgField}
          type="text"
          label={label}
          name={name}
        />
      );
    });
  }

  renderFieldOrgType() {
    const orgType_list = _.map(
      this.props.typeorgs,
      ({ org_typeId, org_typeName }) => {
        return {
          org_typeId: org_typeId,
          org_typeName: org_typeName,
          label: org_typeName,
          value: org_typeName
        };
      }
    );

    return (
      <div>
        <label>Organization Type (ประเภทบริษัท)</label>

        <Field
          name="org_type"
          component={props => (
            <div>
              <Select
                value={props.input.value}
                options={orgType_list}
                onChange={props.input.onChange}
                placeholder={props.meta.touched && props.meta.error}
                className="form-control"
                simpleValue
              />
            </div>
          )}
        />
      </div>
    );
  }

  render() {
    return (
      <div className="container">
        <form onSubmit={this.props.handleSubmit(this.props.onSubmit)}>
          {this.renderFieldOrgType()}
          {this.renderField()}

          <Link to="/Org" className="red btn-flat white-text">
            Cancel
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

  if (!values["org_type"]) {
    errors["org_type"] = "Require a value";
  }

  _.each(FIELDS, ({ name }) => {
    if (!values[name]) {
      errors[name] = "Require a value";
    }

    if (values["org_com"] && isNaN(values["org_com"])) {
      errors["org_com"] = "Require a Number";
    } else {
      if (values["org_com"] < 0 || values["org_com"] > 100) {
        errors["org_com"] = "0% - 100%";
      }
    }
  });

  return errors;
}

function mapStateToProps({ typeorgs }) {
  return { typeorgs };
}

export default reduxForm({
  validate,
  form: "org_form",
  destroyOnUnmount: false
})(
  connect(
    mapStateToProps,
    null
  )(OrgForm)
);
