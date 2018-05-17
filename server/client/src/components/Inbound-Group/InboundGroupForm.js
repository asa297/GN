import React, { Component } from "react";
import _ from "lodash";
import { reduxForm, Field, reset } from "redux-form";
import { Link } from "react-router-dom";
import { connect } from "react-redux";

import InboundGroupField from "./InboundGroupField";
import FIELDS from "./formFields";

import Select from "react-select";

class InboundGroupForm extends Component {
  componentDidMount() {
    this.props.dispatch(reset("inbound_group"));
  }

  renderField() {
    return _.map(FIELDS, ({ label, name }) => {
      return (
        <Field
          key={name}
          component={InboundGroupField}
          type="text"
          label={label}
          name={name}
        />
      );
    });
  }

  renderFieldOrg() {
    const orgOption_list = _.map(
      this.props.inbound_orgs,
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
        <label>Organization</label>

        <Field
          name="org_option"
          component={props => (
            <div>
              <Select
                value={props.input.value}
                options={orgOption_list}
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
          {this.renderFieldOrg()}
          {this.renderField()}

          <Link to="/inboundgroup" className="red btn-flat white-text">
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
    if (!values[name] && name !== "group_remark") {
      errors[name] = "Require a value";
    }
  });

  return errors;
}

function mapStateToProps({ inbound_orgs }) {
  return { inbound_orgs };
}

export default reduxForm({
  validate,
  form: "inbound_group",
  destroyOnUnmount: false
})(connect(mapStateToProps, null)(InboundGroupForm));
