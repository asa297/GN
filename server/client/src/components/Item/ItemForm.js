import React, { Component } from "react";
import _ from "lodash";
import { reduxForm, Field, reset } from "redux-form";
import { Link } from "react-router-dom";

import ItemField from "./ItemField";
import FIELDS from "./formFields";
import itemType_list from "../../utils/ItemTypeLIst";

import Select from "react-select";

class ItemForm extends Component {
  componentDidMount() {
    this.props.dispatch(reset("item_form"));
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
          {this.renderField()}
          {this.renderFieldItemType()}

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

export default reduxForm({
  validate,
  form: "item_form",
  destroyOnUnmount: false
})(ItemForm);
