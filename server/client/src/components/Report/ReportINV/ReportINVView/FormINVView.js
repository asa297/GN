import React, { Component } from "react";
import _ from "lodash";
import { connect } from "react-redux";
import { reduxForm, Field, change } from "redux-form";
import { withRouter } from "react-router-dom";
import Select from "react-select";
import { fetchInbound_Org, updateInbound_Item } from "../../../../actions";

import ReportINVField from "../ReportINVField";
import FIELDS from "../formFields";
import ButtonFooter from "./ButtonFooter";

import itemType_list from "../../../../utils/ItemTypeLIst";

let orgChina;

const required = value => (value ? undefined : "Required");
const isNumber = value =>
  value && isNaN(Number(value)) ? "Must be a number" : undefined;
const ComValidate = value =>
  value < 0 || value > 100 ? "0 - 100%" : undefined;

class FormINVView extends Component {
  constructor(props) {
    super(props);

    const value_props = this.props.inbound_items[
      _.findIndex(this.props.inbound_items, {
        item_code: this.props.item_code
      })
    ];

    if (value_props) {
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
    }
  }

  componentDidMount() {
    this.props.fetchInbound_Org();

    if (this.state !== null) {
      _.map(this.state.orgChinaList, ({ _id, orgCom_B }) => {
        this.setState({ [_id]: orgCom_B });
        this.props.dispatch(change("inbound_item", _id, orgCom_B));
      });

      _.map(FIELDS, ({ name, key }) => {
        this.props.dispatch(change("inbound_item", name, this.state[name]));
      });
      this.props.dispatch(
        change("inbound_item", "item_type", this.state.itemType_selected)
      );
    }
  }

  componentWillReceiveProps({ form: { inbound_item }, inbound_orgs }) {
    if (inbound_item.values && inbound_item.values.item_type) {
      this.setState({
        itemTypeId: inbound_item.values.item_type.itemTypeId
      });
    }

    if (inbound_orgs) {
      orgChina = _.filter(inbound_orgs, ({ _id, orgTypeId, orgName }) => {
        return orgTypeId === 2;
      });
    }
  }

  renderField() {
    return _.map(FIELDS, ({ label, name, key }) => {
      return (
        <Field
          value={this.state[name]}
          key={name}
          component={ReportINVField}
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
            component={ReportINVField}
            placeholder={orgName}
            valueField={this.state[_id]}
            onChange={event => this.setState({ [_id]: event.target.value })}
            validate={[required, isNumber, ComValidate]}
          />
        </div>
      );
    });
  }

  handleFormSubmit() {
    const orgChinaList = _.forEach(
      _.filter(this.props.inbound_orgs, ({ _id, orgTypeId, orgName }) => {
        return orgTypeId === 2;
      }),
      values => {
        values.orgCom_B = parseInt(
          this.props.form.inbound_item.values[values._id],
          10
        );
      }
    );

    this.props.updateInbound_Item(
      this.state._id,
      this.props.form.inbound_item.values,
      orgChinaList,
      this.props.history
    );
  }

  renderContent() {
    return (
      <form onSubmit={this.props.handleSubmit(() => this.handleFormSubmit())}>
        {this.renderFieldItemType()}
        {this.renderField()}

        {this.state.itemTypeId === 2 ? this.renderFieldCommission() : null}
        <ButtonFooter _id={this.state._id} />
      </form>
    );
  }

  render() {
    return (
      <div>{this.state ? this.renderContent() : <div>Not Found </div>}</div>
    );
  }
}

function validate(values) {
  const errors = {};

  if (!values["item_type"]) {
    errors["item_type"] = "Require a value";
  }

  _.each(FIELDS, ({ name }) => {
    if (!values[name]) {
      errors[name] = "Require a value";
    }

    if (values["item_code"] && isNaN(values["item_code"])) {
      errors["item_code"] = "Require a number only";
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
  form: "inbound_item"
})(
  connect(
    mapStateToProps,
    { fetchInbound_Org, updateInbound_Item }
  )(withRouter(FormINVView))
);
