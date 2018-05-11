import React, { Component } from "react";
import _ from "lodash";
import { reduxForm, Field } from "redux-form";
import { Link } from "react-router-dom";
import InboundOrgField from "./InboundOrgField";
import FIELDS from "./formFields";

import "react-widgets/dist/css/react-widgets.css";
import DropdownList from "react-widgets/lib/DropdownList";

const colors = [
  { org_typeId: 1, org_typeName: "RUSSIA" },
  { org_typeId: 2, org_typeName: "CHINA" }
];

const renderDropdownList = ({ input, ...rest }) => (
  <div>
    <DropdownList {...input} {...rest} />
    <div className="red-text" style={{ marginBottom: "20px" }}>
      {rest.meta.touched && rest.meta.error}
    </div>
  </div>
);

class InboundOrgForm extends Component {
  renderField() {
    return _.map(FIELDS, ({ label, name }) => {
      return (
        <Field
          key={name}
          component={InboundOrgField}
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
        <form onSubmit={this.props.handleSubmit(this.props.onSurveySubmit)}>
          <div>
            <label>Organization Type</label>
            <Field
              name="org_type"
              component={renderDropdownList}
              data={colors}
              valueField="value"
              textField="org_typeName"
            />
          </div>

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

  if (!values["org_type"]) {
    errors["org_type"] = "Require a value";
  }

  _.each(FIELDS, ({ name }) => {
    if (!values[name]) {
      errors[name] = "Require a value";
    }
  });

  return errors;
}

export default reduxForm({
  validate,
  form: "inbound_org",
  destroyOnUnmount: false
})(InboundOrgForm);
