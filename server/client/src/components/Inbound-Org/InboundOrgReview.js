import React from "react";
import _ from "lodash";
import { connect } from "react-redux";
import formFields from "./formFields";
import * as actions from "../../actions";
import { withRouter } from "react-router-dom";

const InboundOrgReview = ({
  onCancel,
  onUpdateOrg,
  formValues,
  submitInboundOrg,
  updateInbound_Org,
  history,
  org_id
}) => {
  const OrgTypeFields = (
    <div key={formValues.org_typeName}>
      <label>Organization Type</label>
      <div>{formValues["org_type"].label}</div>
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

  return (
    <div className="container">
      <h5>Please confirm your entries</h5>
      {OrgTypeFields}
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
          onUpdateOrg
            ? updateInbound_Org(org_id, formValues, onUpdateOrg)
            : submitInboundOrg(formValues, history)
        }
      >
        Save Inbound Org
        <i className="material-icons right">email</i>
      </button>
    </div>
  );
};

function mapStateToProps(state) {
  return { formValues: state.form.inbound_org.values };
}

export default connect(mapStateToProps, actions)(withRouter(InboundOrgReview));
