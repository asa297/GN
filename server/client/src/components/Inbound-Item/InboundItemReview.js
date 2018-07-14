import React from "react";
import _ from "lodash";
import { connect } from "react-redux";
import formFields from "./formFields";
import * as actions from "../../actions";
import { withRouter } from "react-router-dom";

const InboundItemReview = ({
  onCancel,
  onUpdateItem,
  formValues,
  orgs,
  submitInboundItem,
  update_Item,
  history,
  item_id
}) => {
  let orgChinaList = null;

  if (formValues.item_type.itemTypeId === 2) {
    orgChinaList = _.forEach(
      _.filter(orgs, ({ _id, orgTypeId, orgName }) => {
        return orgTypeId === 2;
      }),
      values => {
        values.orgCom_B = parseInt(formValues[values._id], 10);
      }
    );
  }

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

  const headerItemTypeB_COM = (
    <div>
      <hr />
      <h3 className="center">Item Type B - Commission List</h3>
    </div>
  );

  const reviewItemTypeB_COM = _.map(orgChinaList, ({ _id, orgName }) => {
    return (
      <div className="container" key={_id}>
        <label>{orgName}</label>
        <div>{formValues[_id]}</div>
      </div>
    );
  });

  const submitUpdateItem = async () => {
    await update_Item(item_id, formValues, orgChinaList);
    onUpdateItem();
  };

  return (
    <div className="container">
      <h5>Please confirm your entries</h5>
      {ItemTypeFields}
      {reviewFields}
      {formValues.item_type.itemTypeId === 2 ? headerItemTypeB_COM : null}
      {formValues.item_type.itemTypeId === 2 ? reviewItemTypeB_COM : null}

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
            : submitInboundItem(formValues, orgChinaList, history)
        }
      >
        Save Inbound Org
        <i className="material-icons right">email</i>
      </button>
    </div>
  );
};

function mapStateToProps({ form, orgs }) {
  return { formValues: form.inbound_item.values, orgs };
}

export default connect(
  mapStateToProps,
  actions
)(withRouter(InboundItemReview));
