import React, { Component } from "react";
import _ from "lodash";
import { connect } from "react-redux";
import { reduxForm, Field, change } from "redux-form";
import Select from "react-select";

import OrgField from "./OrgField";
import FIELDS from "./formFields";

class OrgEdit extends Component {
  constructor(props) {
    super(props);
    const value_props = this.props.orgs[this.props.index];

    const org_type_selected = _.find(this.props.typeorgs, ({ org_typeId }) => {
      return org_typeId === value_props.orgTypeId;
    });

    this.state = {
      _id: value_props._id,
      orgTypeId: value_props.orgTypeId,
      orgName: value_props.orgName,
      orgCom: value_props.orgCom,
      orgCode: value_props.orgCode,
      org_type_selected
    };
  }

  componentDidMount() {
    _.map(FIELDS, ({ name, key }) => {
      this.props.dispatch(change("org_form", name, this.state[key]));
    });

    this.props.dispatch(
      change("org_form", "org_type", {
        org_typeId: this.state.org_type_selected.org_typeId,
        org_typeName: this.state.org_type_selected.org_typeName,
        label: this.state.org_type_selected.org_typeName,
        value: this.state.org_type_selected.org_typeName
      })
    );
  }

  renderField() {
    return _.map(FIELDS, ({ label, name, key }) => {
      return (
        <Field
          value={this.state[key]}
          key={name}
          component={OrgField}
          type="text"
          label={label}
          name={name}
          valueField={this.state[key]}
          onChange={event => this.setState({ [key]: event.target.value })}
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
      <div>
        <form onSubmit={this.props.handleSubmit(this.props.onSubmit)}>
          {this.renderFieldOrgType()}
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

function mapStateToProps({ orgs, typeorgs }) {
  return { orgs, typeorgs };
}

export default reduxForm({
  validate,
  form: "org_form",
  destroyOnUnmount: false
})(
  connect(
    mapStateToProps,
    null
  )(OrgEdit)
);
