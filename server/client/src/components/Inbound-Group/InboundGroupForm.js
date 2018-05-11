import React, { Component } from "react";
import _ from "lodash";
import { reduxForm, Field } from "redux-form";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { fetchInbound_Org } from "../../actions";
import InboundGroupField from "./InboundGroupField";
import FIELDS from "./formFields";

import "react-widgets/dist/css/react-widgets.css";
import DropdownList from "react-widgets/lib/DropdownList";

const renderDropdownList = ({ input, ...rest }) => (
  <div>
    <DropdownList {...input} {...rest} />

    <div className="red-text" style={{ marginBottom: "20px" }}>
      {rest.meta.touched && rest.meta.error}
    </div>
  </div>
);

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
    const org_list = _.map(this.props.inbound_orgs, inbound_org => {
      return {
        org_Id: inbound_org._id,
        org_Name: inbound_org.orgName,
        org_TypeId: inbound_org.orgTypeId,
        org_TypeName: inbound_org.orgTypeName,
        org_Code: inbound_org.orgCode,
        org_Show: inbound_org.orgName + " (" + inbound_org.orgCode + ")"
      };
    });

    return (
      <div>
        <label>Organization</label>
        <Field
          name="org_show"
          component={renderDropdownList}
          data={org_list}
          valueField="value"
          textField="org_Show"
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
    if (!values[name]) {
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
