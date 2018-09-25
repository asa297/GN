import React, { Component } from "react";
import _ from "lodash";
import {
  updateStock_Item,
  submitInbound_ItemElement
} from "../../../../../actions";
import { connect } from "react-redux";
import { reduxForm, Field, change } from "redux-form";
import { Link, withRouter } from "react-router-dom";
import Select from "react-select";

import FIELDS from "./formFields/formFields";
import itemType_list from "../../../../../utils/ItemTypeLIst";
import CircularLoaderBlue from "../../../../utils/CircularLoaderBlue";
import {
  required,
  isNumber,
  NagativeNumber,
  ZeroNumber
} from "../../../../utils/validation";

const InboundItemField = ({
  valueField,
  input,
  label,
  disabled,
  meta: { error, touched }
}) => {
  return (
    <div>
      <label>{label}</label>
      {disabled ? (
        <input
          {...input}
          style={{ marginBottom: "5px", color: "red" }}
          value={valueField}
          disabled
        />
      ) : (
        <input {...input} style={{ marginBottom: "5px" }} value={valueField} />
      )}

      <div className="red-text" style={{ marginBottom: "20px" }}>
        {touched && error}
      </div>
    </div>
  );
};

class Item extends Component {
  constructor(props) {
    super(props);

    const { item_code } = this.props.location.state;
    const { items } = this.props;
    const itemType_selected = _.find(itemType_list, ({ itemTypeId }) => {
      return itemTypeId === items.itemTypeId;
    });

    this.state = {
      item_code,
      itemType_selected,
      items,
      saving: false
    };
  }

  componentDidMount() {
    _.map(FIELDS, ({ name, key }) => {
      this.props.dispatch(
        change("item_inbound_form", name, this.state.items[name])
      );
    });
    this.props.dispatch(
      change("item_inbound_form", "item_type", this.state.itemType_selected)
    );
  }

  renderHeader() {
    return (
      <div className="header_report_view">
        <div>
          <Link to="/report/reportinboundinv">
            <i className="medium material-icons">chevron_left</i>
          </Link>
        </div>
        <div>
          <h3 className="center" style={{ margin: "0px" }}>
            Inbound Item : {this.state.item_code}
          </h3>
        </div>
        <div />
      </div>
    );
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
                isDisabled={true}
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

  renderField() {
    return _.map(FIELDS, ({ label, name, disabled }) => {
      return (
        <Field
          key={name}
          component={InboundItemField}
          disabled={disabled}
          type="text"
          label={label}
          name={name}
          valueField={
            this.state.items[name] || this.state.items[name] === 0
              ? this.state.items[name]
              : ""
          }
          onChange={event =>
            this.setState(prevState => ({
              items: {
                ...prevState.items,
                [name]: event.target.value
              }
            }))
          }
          validate={
            name === "qty"
              ? [required, isNumber, NagativeNumber, ZeroNumber]
              : []
          }
        />
      );
    });
  }

  renderButtonAction() {
    return (
      <div className="buttonAction_inboundINV">
        <button
          type="submit"
          className="teal btn-flat center white-text"
          style={{ marginBottom: "10px" }}
        >
          Inbound Item
          <i className="material-icons left">save</i>
        </button>
        <div style={{ marginLeft: "10px" }}>
          {this.state.saving ? <CircularLoaderBlue /> : null}
        </div>
      </div>
    );
  }

  renderContent() {
    return (
      <div>
        {this.renderHeader()}
        {this.renderFieldItemType()}
        {this.renderField()}
        {this.renderButtonAction()}
      </div>
    );
  }

  async sumbitInboundItem() {
    const { _id } = this.state.items;
    const { values } = this.props.item_inbound_form;
    values._id = _id;
    values.qty = Number(values.qty);
    values.stock_status = 1;

    this.setState({ saving: true });

    await this.props.updateStock_Item(_id, values);
    await this.props.submitInbound_ItemElement(values);
    this.props.history.push({
      pathname: "/report/reportinboundinv"
    });
  }

  render() {
    return (
      <form onSubmit={this.props.handleSubmit(() => this.sumbitInboundItem())}>
        <div className="container">
          {this.state.items.length !== 0 ? this.renderContent() : "Not Found"}
        </div>
      </form>
    );
  }
}

function mapStateToProps({ items, orgs, form: { item_inbound_form } }) {
  return { items, orgs, item_inbound_form };
}

export default reduxForm({
  form: "item_inbound_form"
})(
  connect(
    mapStateToProps,
    {
      updateStock_Item,
      submitInbound_ItemElement
    }
  )(withRouter(Item))
);
