import React, { Component } from "react";
import _ from "lodash";
import { reduxForm, Field, reset } from "redux-form";
import { Link } from "react-router-dom";
import { connect } from "react-redux";

import GroupField from "./GroupField";
import FIELDS from "./formFields";

import Select from "react-select";

class GroupForm extends Component {
  componentDidMount() {
    this.props.dispatch(reset("group_form"));
  }

  renderField() {
    return _.map(FIELDS, ({ label, name }) => {
      return (
        <Field
          key={name}
          component={GroupField}
          type="text"
          label={label}
          name={name}
        />
      );
    });
  }

  renderFieldOrg() {
    const orgOption_list = _.map(
      this.props.orgs,
      ({ _id, orgName, orgCode, orgCom, orgTypeId, orgTypeName }) => {
        return {
          _id,
          orgName,
          orgCode,
          orgCom,
          orgTypeId,
          orgTypeName,
          label: orgName + " (" + orgCode + ")",
          value: orgName + " (" + orgCode + ")"
        };
      }
    );

    return (
      <div>
        <label>Organization (บริษัททัวร์)</label>

        <Field
          name="org_option"
          component={props => (
            <div>
              <Select
                value={props.input.value}
                options={orgOption_list}
                onChange={props.input.onChange}
                placeholder={props.meta.touched && props.meta.error}
                className="basic-single"
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
          {this.renderFieldOrg()}
          {this.renderField()}

          <Link to="/Group" className="red btn-flat white-text">
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

  if (!values["org_option"]) {
    errors["org_option"] = "Require a value";
  }

  _.each(FIELDS, ({ name }) => {
    if (
      !values[name] &&
      name !== "group_remark" &&
      name !== "group_stickernumber"
    ) {
      errors[name] = "Require a value";
    }
  });

  if (values["group_stickernumber"] && isNaN(values["group_stickernumber"])) {
    errors["group_stickernumber"] = "Require a number only";
  } else {
    if (values["group_stickernumber"] < 0) {
      errors["group_stickernumber"] = "NOT SUPPORT NEGATIVE PRICE";
    }
  }

  return errors;
}

function mapStateToProps({ orgs }) {
  return { orgs };
}

export default reduxForm({
  validate,
  form: "group_form",
  destroyOnUnmount: false
})(
  connect(
    mapStateToProps,
    null
  )(GroupForm)
);
