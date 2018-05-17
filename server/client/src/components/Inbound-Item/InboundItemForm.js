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

  componentWillReceiveProps({ form: { inbound_item } }) {
    if (inbound_item.values && inbound_item.values.item_type) {
      this.setState({
        itemTypeId: inbound_item.values.item_type.itemTypeId
      });
    }
  }

  // handleChange = props => {
  //   console.log(props);
  //   props.input.value = props.input.value;
  //   // this.setState({ selectedOption });
  // };

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
                value={props.input.value}
                options={[
                  { itemTypeId: 1, itemTypeName: "A", label: "A", value: "A" },
                  { itemTypeId: 2, itemTypeName: "B", label: "B", value: "B" }
                ]}
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

  renderFieldCommission() {
    return _.map(orgChinaList, ({ _id, orgName }) => {
      return (
        <div className="container" key={_id}>
          <b>{orgName}</b>
          <Field
            key={_id}
            name={_id}
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
          {this.state.itemTypeId === 2 ? this.renderFieldCommission() : null}

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

  if (!values["item_type"]) {
    errors["item_type"] = "Require a value";
  }

  _.each(orgChinaList, ({ _id }) => {
    if (!values[_id]) {
      errors[_id] = "Require a value ";
    }

    if (values[_id] && isNaN(values[_id])) {
      errors[_id] = "Require a number only";
    } else {
      if (values[_id] < 0 || values[_id] > 100) {
        errors[_id] = "0% - 100%";
      }
    }
  });

  _.each(FIELDS, ({ name }) => {
    if (!values[name]) {
      errors[name] = "Require a value";
    }

    if (values["item_price"] && isNaN(values["item_price"])) {
      errors["item_price"] = "Require a number only";
    } else {
      if (values["item_price"] < 0) {
        errors["item_price"] = "NOT SUPPORT NEGATIVE PRICE";
      }
    }
  });

  return errors;
}

function mapStateToProps({ inbound_orgs, form }) {
  return { inbound_orgs, form };
}

export default reduxForm({
  validate,
  form: "inbound_item",
  destroyOnUnmount: false
})(connect(mapStateToProps, null)(InboundItemForm));
