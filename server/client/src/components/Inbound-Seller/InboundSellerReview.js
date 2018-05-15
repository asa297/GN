import React from "react";
import _ from "lodash";
import { connect } from "react-redux";
import formFields from "./formFields";
import * as actions from "../../actions";
import { withRouter } from "react-router-dom";

const InboundSellerReview = ({
  onCancel,
  onUpdateSeller,
  formValues,
  submitInboundSeller,
  updateInbound_Seller,
  history,
  seller_id
}) => {
  const reviewFields = _.map(formFields, ({ name, label }) => {
    return (
      <div key={name}>
        <label>{label}</label>
        <div>
          {formValues[name]} {name === "seller_com" ? "%" : ""}
        </div>
      </div>
    );
  });

  return (
    <div className="container">
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
          onUpdateSeller
            ? updateInbound_Seller(seller_id, formValues, onUpdateSeller)
            : submitInboundSeller(formValues, history)
        }
      >
        Save Inbound Seller
        <i className="material-icons right">email</i>
      </button>
    </div>
  );
};

function mapStateToProps(state) {
  return { formValues: state.form.inbound_seller.values };
}

export default connect(mapStateToProps, actions)(
  withRouter(InboundSellerReview)
);
