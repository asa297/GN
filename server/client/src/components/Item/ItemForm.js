import React, { Component } from "react";
import _ from "lodash";
import { reduxForm, Field, reset } from "redux-form";
import { Link } from "react-router-dom";
import { connect } from "react-redux";

import ItemField from "./ItemField";
import FIELDS from "./formFields";
import itemType_list from "../../utils/ItemTypeLIst";

import Select from "react-select";

let orgChinaList;

const required = value => (value ? undefined : "Required");
const isNumber = value =>
  value && isNaN(Number(value)) ? "Must be a number" : undefined;
const ComValidate = value =>
  value < 0 || value > 100 ? "0 - 100%" : undefined;

class ItemForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      itemTypeId: 1
    };
  }

  componentDidMount() {
    this.props.dispatch(reset("item_form"));

    orgChinaList = _.filter(this.props.orgs, ({ _id, orgTypeId, orgName }) => {
      return orgTypeId === 2;
    });
  }

  componentWillReceiveProps({ form: { item_form } }) {
    if (item_form.values && item_form.values.item_type) {
      this.setState({
        itemTypeId: item_form.values.item_type.itemTypeId
      });
    }
  }

  renderField() {
    return _.map(FIELDS, ({ label, name }) => {
      return (
        <Field
          key={name}
          component={ItemField}
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
                options={itemType_list}
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
            component={ItemField}
            placeholder={orgName}
            validate={[required, isNumber, ComValidate]}
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

          <Link to="/Item" className="red btn-flat white-text">
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

  _.each(FIELDS, ({ name }) => {
    if (
      !values[name] &&
      name !== "item_qty" &&
      name !== "item_factory" &&
      name !== "item_color" &&
      name !== "item_skin" &&
      name !== "item_remarks"
    ) {
      errors[name] = "Require a value";
    }

    if (values["item_price"] && isNaN(values["item_price"])) {
      errors["item_price"] = "Require a number only";
    } else {
      if (values["item_price"] < 0) {
        errors["item_price"] = "NOT SUPPORT NEGATIVE PRICE";
      }
    }

    if (values["item_qty"] && isNaN(values["item_qty"])) {
      errors["item_qty"] = "Require a number only";
    } else {
      if (values["item_qty"] < 0) {
        errors["item_qty"] = "NOT SUPPORT NEGATIVE QTY";
      }
    }
  });

  return errors;
}

function mapStateToProps({ orgs, form }) {
  return { orgs, form };
}

export default reduxForm({
  validate,
  form: "item_form",
  destroyOnUnmount: false
})(connect(mapStateToProps)(ItemForm));
