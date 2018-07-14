import React, { Component } from "react";
import _ from "lodash";
import { connect } from "react-redux";
import { reduxForm, Field, change, reset } from "redux-form";
import Select from "react-select";

import FIELDS from "./formFields/formFields";
import itemType_list from "../../../../../utils/ItemTypeLIst";

// const required = value => (value ? undefined : "Required");

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

class InboundItem extends Component {
  constructor(props) {
    super(props);

    const { item_code } = this.props.location.state;
    const { items } = this.props;
    const itemType_selected = _.find(itemType_list, ({ itemTypeId }) => {
      return itemTypeId === items.itemTypeId;
    });
    // const orgChina = _.filter(
    //   this.props.orgs,
    //   ({ _id, orgTypeId, orgName }) => {
    //     return orgTypeId === 2;
    //   }
    // );

    this.state = {
      item_code,
      itemType_selected,
      // orgChina,
      items
    };
  }

  componentDidMount() {
    _.map(FIELDS, ({ name, key }) => {
      this.props.dispatch(change("inbound_item", name, this.state.items[name]));
    });
    this.props.dispatch(
      change("inbound_item", "item_type", this.state.itemType_selected)
    );
  }

  renderHeader() {
    return <h3 className="center">Inbound Item : {this.state.item_code}</h3>;
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
                className="form-control"
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
          valueField={this.state.items[name]}
          onChange={event =>
            this.setState(prevState => ({
              items: {
                ...prevState.items,
                [name]: event.target.value
              }
            }))
          }
        />
      );
    });
  }

  // renderFieldCommission() {
  //   return _.map(this.state.orgChina, ({ _id, orgName }) => {
  //     return (
  //       <div className="container" key={_id}>
  //         <b>{orgName}</b>
  //         <Field
  //           value={this.state[_id]}
  //           key={_id}
  //           name={_id}
  //           component={InboundItemField}
  //           placeholder={orgName}
  //           valueField={this.state[_id]}
  //           onChange={event => this.setState({ [_id]: event.target.value })}
  //           validate={[required]}
  //         />
  //       </div>
  //     );
  //   });
  // }

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
      </div>
    );
  }

  renderContent() {
    return (
      <div>
        {this.renderHeader()}
        {this.renderFieldItemType()}
        {this.renderField()}
        {/* {this.state.itemType_selected.itemTypeId === 2
          ? this.renderFieldCommission()
          : null} */}
        {this.renderButtonAction()}
      </div>
    );
  }
  render() {
    return (
      <div className="container">
        {this.state.items.length !== 0 ? this.renderContent() : "Not Found"}
      </div>
    );
  }
}

function mapStateToProps({ items, orgs, form }) {
  return { items, orgs, form };
}

export default reduxForm({
  // validate,
  form: "inbound_item"
})(connect(mapStateToProps)(InboundItem));
