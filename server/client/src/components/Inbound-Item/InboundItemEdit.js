import React, { Component } from "react";
import _ from "lodash";
import { connect } from "react-redux";
import { reduxForm, Field, change, reset } from "redux-form";
import Select from "react-select";

import InboundItemField from "./InboundItemField";
import FIELDS from "./formFields";

import itemType_list from "../../utils/ItemTypeLIst";

let orgChina;
class InboundItemEdit extends Component {
  constructor(props) {
    super(props);

    const value_props = this.props.inbound_items[
      _.findIndex(this.props.inbound_items, { _id: this.props._id })
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

    this.state = {
      _id,
      item_code,
      item_name,
      item_price,
      item_qty,
      itemType_selected,
      itemTypeId: itemType_selected.itemTypeId,
      orgChinaList
    };

    orgChina = _.filter(
      this.props.inbound_orgs,
      ({ _id, orgTypeId, orgName }) => {
        return orgTypeId === 2;
      }
    );

    _.map(orgChina, ({ _id }) => {
      this.state[_id] = "";
    });
  }

  componentDidMount() {
    this.props.dispatch(reset("inbound_item"));

    if (this.state.orgChinaList) {
      _.map(this.state.orgChinaList, ({ _id, orgCom_B }) => {
        this.setState({ [_id]: orgCom_B });
      });
    }

    _.map(FIELDS, ({ name, key }) => {
      this.props.dispatch(change("inbound_item", name, this.state[name]));
    });
    this.props.dispatch(
      change("inbound_item", "item_type", this.state.itemType_selected)
    );

    if (this.state.orgChinaList) {
      _.map(this.state.orgChinaList, ({ _id, orgCom_B }) => {
        this.props.dispatch(change("inbound_item", _id, orgCom_B));
      });
    }
  }

  componentWillReceiveProps({ form: { inbound_item } }) {
    if (inbound_item.values && inbound_item.values.item_type) {
      this.setState({
        itemTypeId: inbound_item.values.item_type.itemTypeId
      });
    }
  }

  renderField() {
    return _.map(FIELDS, ({ label, name, key }) => {
      return (
        <Field
          value={this.state[name]}
          key={name}
          component={InboundItemField}
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
    return _.map(orgChina, ({ _id, orgName }) => {
      return (
        <div className="container" key={_id}>
          <b>{orgName}</b>
          <Field
            value={this.state[_id]}
            key={_id}
            name={_id}
            component={InboundItemField}
            placeholder={orgName}
            valueField={this.state[_id]}
            onChange={event => this.setState({ [_id]: event.target.value })}
          />
        </div>
      );
    });
  }

  render() {
    return (
      <div className="container">
        <form onSubmit={this.props.handleSubmit(this.props.onSubmit)}>
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

  _.each(orgChina, ({ _id }) => {
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

function mapStateToProps({ inbound_items, inbound_orgs, form }) {
  return { inbound_items, inbound_orgs, form };
}

export default reduxForm({
  validate,
  form: "inbound_item",
  destroyOnUnmount: false
})(
  connect(
    mapStateToProps,
    null
  )(InboundItemEdit)
);
