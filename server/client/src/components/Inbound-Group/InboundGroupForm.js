import React, { Component } from "react";
import _ from "lodash";
import { reduxForm, Field } from "redux-form";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { fetchInbound_Org } from "../../actions";
import InboundGroupField from "./InboundGroupField";
import FIELDS from "./formFields";

import Select from "react-select";

class InboundGroupForm extends Component {
  componentDidMount() {
    this.props.fetchInbound_Org();
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
    const org_list = _.map(
      this.props.inbound_orgs,
      ({ _id, orgName, orgTypeId, orgTypeName, orgCode }) => {
        return {
          org_Id: _id,
          org_Name: orgName,
          org_TypeId: orgTypeId,
          org_TypeName: orgTypeName,
          org_Code: orgCode,
          label: orgName + " (" + orgCode + ")"
        };
      }
    );

    return (
      <div>
        <label>Organization</label>

        <Field
          name="org_show"
          component={props => (
            <div>
              <Select
                value={props.input.value}
                options={org_list}
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
          <Link to="/home" className="red btn-flat white-text">
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

  if (!values["org_show"]) {
    errors["org_show"] = "Require a value";
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
})(connect(mapStateToProps, { fetchInbound_Org })(InboundGroupForm));
