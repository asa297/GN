import React from "react";
import _ from "lodash";
import { connect } from "react-redux";
import formFields from "./formFields";
import * as actions from "../../actions";
import { withRouter } from "react-router-dom";

const OrgReview = ({
  onCancel,
  onUpdateOrg,
  formValues,
  submitOrg,
  update_Org,
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
        <div>
          {formValues[name]} {name === "org_com" ? "%" : ""}
        </div>
      </div>
    );
  });

  return (
    <div className={onUpdateOrg ? null : "container"}>
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
            ? update_Org(org_id, formValues, onUpdateOrg)
            : submitOrg(formValues, history)
        }
      >
        Save Org
        <i className="material-icons right">email</i>
      </button>
    </div>
  );
};

function mapStateToProps(state) {
  return { formValues: state.form.org_form.values };
}

export default connect(
  mapStateToProps,
  actions
)(withRouter(OrgReview));
