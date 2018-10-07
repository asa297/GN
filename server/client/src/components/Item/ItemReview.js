import React from "react";
import _ from "lodash";
import { connect } from "react-redux";
import formFields from "./formFields";
import * as actions from "../../actions";
import { withRouter } from "react-router-dom";

const ItemReview = ({
  onCancel,
  onUpdateItem,
  formValues,
  submitInboundItem,
  update_Item,
  history,
  item_id
}) => {
  const ItemTypeFields = (
    <div key={formValues.item_type}>
      <label>Item Type</label>
      <div>{formValues["item_type"].label}</div>
    </div>
  );

  const reviewFields = _.map(formFields, ({ name, label }) => {
    return (
      <div key={name}>
        <label>{label}</label>
        <div>{formValues[name]}</div>
      </div>
    );
  });

  const submitUpdateItem = async () => {
    await update_Item(item_id, formValues);
    onUpdateItem();
  };

  return (
    <div className={onUpdateItem ? null : "container"}>
      <h5>Please confirm your entries</h5>
      {ItemTypeFields}
      {reviewFields}

      <button
        className="yellow darken-3 white-text btn-flat"
        onClick={onCancel}
      >
        Back
      </button>
      <button
        className="green btn-flat right white-text"
        onClick={() =>
          onUpdateItem
            ? submitUpdateItem()
            : submitInboundItem(formValues, history)
        }
      >
        Save Item
        <i className="material-icons right">email</i>
      </button>
    </div>
  );
};

function mapStateToProps({ form }) {
  return { formValues: form.item_form.values };
}

export default connect(
  mapStateToProps,
  actions
)(withRouter(ItemReview));
