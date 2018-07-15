import React, { Component } from "react";
import _ from "lodash";
import { connect } from "react-redux";
import { reduxForm, Field, change, reset } from "redux-form";
import Select from "react-select";

import ItemField from "./ItemField";
import FIELDS from "./formFields";

import itemType_list from "../../utils/ItemTypeLIst";

const required = value => (value ? undefined : "Required");
const isNumber = value =>
  value && isNaN(Number(value)) ? "Must be a number" : undefined;
const ComValidate = value =>
  value < 0 || value > 100 ? "0 - 100%" : undefined;

class ItemEdit extends Component {
  constructor(props) {
    super(props);

    const value_props = this.props.items[
      _.findIndex(this.props.items, { _id: this.props._id })
    ];

    const {
      _id,
      item_code,
      item_name,
      item_price,
      item_qty,
      orgChinaList
    } = value_props;

    const itemType_selected = _.find(itemType_list, ({ itemTypeId }) => {
      return itemTypeId === value_props.itemTypeId;
    });

    const orgChina = _.filter(
      this.props.orgs,
      ({ _id, orgTypeId, orgName }) => {
        return orgTypeId === 2;
      }
    );

    this.state = {
      _id,
      item_code,
      item_name,
      item_price,
      item_qty,
      itemType_selected,
      itemTypeId: itemType_selected.itemTypeId,
      orgChinaList,
      orgChina
    };
  }

  componentDidMount() {
    this.props.dispatch(reset("item_form"));

    if (this.state.orgChinaList) {
      _.map(this.state.orgChinaList, ({ _id, orgCom_B }) => {
        this.setState({ [_id]: orgCom_B });
      });
    }

    _.map(FIELDS, ({ name, key }) => {
      this.props.dispatch(change("item_form", name, this.state[name]));
    });
    this.props.dispatch(
      change("item_form", "item_type", this.state.itemType_selected)
    );

    if (this.state.orgChinaList) {
      _.map(this.state.orgChinaList, ({ _id, orgCom_B }) => {
        this.props.dispatch(change("item_form", _id, orgCom_B));
      });
    }
  }

  componentWillReceiveProps({ form: { item_form } }) {
    if (item_form.values && item_form.values.item_type) {
      this.setState({
        itemTypeId: item_form.values.item_type.itemTypeId
      });
    }
  }

  renderField() {
    return _.map(FIELDS, ({ label, name, disabled }) => {
      return (
        <Field
          value={this.state[name]}
          disabled={disabled}
          key={name}
          component={ItemField}
          type="text"
          label={label}
          name={name}
          valueField={this.state[name]}
          onChange={event => this.setState({ [name]: event.target.value })}
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
    return _.map(this.state.orgChina, ({ _id, orgName }) => {
      return (
        <div className="container" key={_id}>
          <b>{orgName}</b>
          <Field
            key={_id}
            name={_id}
            component={ItemField}
            placeholder={orgName}
            valueField={this.state[_id] ? this.state[_id] : ""}
            onChange={event => this.setState({ [_id]: event.target.value })}
            validate={[required, isNumber, ComValidate]}
          />
        </div>
      );
    });
  }

  renderContent() {
    return (
      <div>
        {this.renderFieldItemType()}
        {this.renderField()}

        {this.state.itemTypeId === 2 ? this.renderFieldCommission() : null}

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
      </div>
    );
  }

  render() {
    return (
      <div>
        <form onSubmit={this.props.handleSubmit(this.props.onSubmit)}>
          {this.renderContent()}
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
      } else if (values["item_qty"] === 0) {
        errors["item_qty"] = "Require a Quantity";
      }
    }
  });

  return errors;
}

function mapStateToProps({ items, orgs, form }) {
  return { items, orgs, form };
}

export default reduxForm({
  validate,
  form: "item_form",
  destroyOnUnmount: false
})(connect(mapStateToProps)(ItemEdit));
