import React, { Component } from "react";
import _ from "lodash";
import { reduxForm, Field, reset } from "redux-form";
import { Link } from "react-router-dom";
import { connect } from "react-redux";

import InboundItemField from "./InboundItemField";
import FIELDS from "./formFields";

import Select from "react-select";

let orgChinaList;

class InboundItemForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      selectedOption: "",
      itemTypeId: 1
    };
  }

  componentDidMount() {
    this.props.dispatch(reset("inbound_item"));

    orgChinaList = _.filter(
      this.props.inbound_orgs,
      ({ _id, orgTypeId, orgName }) => {
        return orgTypeId === 2;
      }
    );
  }

  handleChange = selectedOption => {
    this.setState({ selectedOption });
  };

  renderField() {
    return _.map(FIELDS, ({ label, name }) => {
      return (
        <Field
          key={name}
          component={InboundItemField}
          type="text"
          label={label}
          name={name}
        />
      );
    });
  }

  renderFieldItemType() {
    return (
      <div>
        <label>Item Type</label>

        <Field
          name="item_type"
          component={props => (
            <div>
              <Select
                value={this.state.selectedOption}
                options={[
                  { itemTypeId: 1, itemTypeName: "A", label: "A", value: "A" },
                  { itemTypeId: 2, itemTypeName: "B", label: "B", value: "B" }
                ]}
                onChange={this.handleChange}
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

  renderFieldCommission() {
    return _.map(orgChinaList, ({ _id, orgName }) => {
      return (
        <div className="container" key={_id}>
          <b>{orgName}</b>
          <Field
            key={_id}
            name={orgName}
            component={InboundItemField}
            placeholder={orgName}
          />
        </div>
      );
    });
  }

  render() {
    return (
      <div className="container">
        <form onSubmit={this.props.handleSubmit(this.props.onSubmit)}>
          {this.renderField()}
          {this.renderFieldItemType()}
          {this.state.selectedOption.itemTypeId === 2
            ? this.renderFieldCommission()
            : null}
          <Link to="/inbounditem" className="red btn-flat white-text">
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

  _.each(orgChinaList, ({ orgName }) => {
    if (!values[orgName]) {
      errors[orgName] = "Require a value";
    }
  });

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
  form: "inbound_item",
  destroyOnUnmount: false
})(connect(mapStateToProps, null)(InboundItemForm));
