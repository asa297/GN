import React, { Component } from "react";
import _ from "lodash";
import { connect } from "react-redux";
import { reduxForm, Field, change } from "redux-form";
import Select from "react-select";

import GroupField from "./GroupField";
import FIELDS from "./formFields";

class GroupEdit extends Component {
  constructor(props) {
    super(props);
    const value_props = this.props.groups[this.props.index];

    const org_selected = _.find(this.props.orgs, ({ _id }) => {
      return _id === value_props.orgId;
    });

    this.state = {
      _id: value_props._id,
      groupCode: value_props.groupCode,
      guideName: value_props.guideName,
      groupRemarks: value_props.groupRemarks,
      org_selected
    };
  }

  componentDidMount() {
    _.map(FIELDS, ({ name, key }) => {
      this.props.dispatch(change("group_form", name, this.state[key]));
    });

    this.props.dispatch(
      change("group_form", "org_option", {
        _id: this.state.org_selected._id,
        orgName: this.state.org_selected.orgName,
        orgCode: this.state.org_selected.orgCode,
        orgTypeId: this.state.org_selected.orgTypeId,
        orgTypeName: this.state.org_selected.orgTypeName,
        label:
          this.state.org_selected.orgName +
          " (" +
          this.state.org_selected.orgCode +
          ")",
        value:
          this.state.org_selected.orgName +
          " (" +
          this.state.org_selected.orgCode +
          ")"
      })
    );
  }

  renderField() {
    return _.map(FIELDS, ({ label, name, key }) => {
      return (
        <Field
          value={this.state[key]}
          key={name}
          component={GroupField}
          type="text"
          label={label}
          name={name}
          valueField={this.state[key]}
          onChange={event => this.setState({ [key]: event.target.value })}
        />
      );
    });
  }

  renderFieldOrg() {
    const orgOption_list = _.map(
      this.props.orgs,
      ({ _id, orgName, orgCode, orgTypeId, orgTypeName }) => {
        return {
          _id,
          orgName,
          orgCode,
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
      <div>
        <form onSubmit={this.props.handleSubmit(this.props.onSubmit)}>
          {this.renderFieldOrg()}
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

function mapStateToProps({ orgs, groups }) {
  return { orgs, groups };
}

export default reduxForm({
  validate,
  form: "group_form",
  destroyOnUnmount: false
})(
  connect(
    mapStateToProps,
    null
  )(GroupEdit)
);
