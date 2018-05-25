import React from "react";
import _ from "lodash";
import { connect } from "react-redux";

const POReview = ({ formValues }) => {
  const GroupSelectFields = (
    <div key={formValues.group_select._id}>
      <label>Group</label>
      <div>{formValues["group_select"].label}</div>
    </div>
  );

  const SellerSelectFields = (
    <div key={formValues.seller_select._id}>
      <label>Seller</label>
      <div>{formValues["seller_select"].label}</div>
    </div>
  );

  const ItemListFields = (
    <table>
      <thead>
        <tr>
          <th>item_code</th>
          <th>item_name</th>
          <th>QTY</th>
          <th>Price</th>
        </tr>
      </thead>
      <tbody>
        {_.map(
          formValues.itemList,
          ({ _id, item_code, item_name, item_price, countQty }) => {
            return (
              <tr key={_id}>
                <th>{item_code}</th>
                <th>{item_name}</th>
                <th>{countQty}</th>
                <th>{item_price.toLocaleString()}</th>
              </tr>
            );
          }
        )}
      </tbody>
    </table>
  );

  const PaymentsFields = (
    <div key={formValues.grandtotal}>
      <label>Grand Total</label>
      <div>
        {formValues["grandtotal"]
          ? formValues["grandtotal"].toLocaleString()
          : null}
      </div>
      <label>Discount</label>
      <div>
        {formValues["discount"]} % ({formValues["total"] *
          (parseInt(formValues["discount"], 10) / 100)})
      </div>
      <label>Credit</label>
      <div>
        {formValues["credit"]
          ? parseInt(formValues["credit"], 10).toLocaleString()
          : null}
      </div>
    </div>
  );

  return (
    <div className="container">
      <h5>Please confirm your entries</h5>
      {GroupSelectFields}
      {SellerSelectFields}
      {ItemListFields}
      {PaymentsFields}
      <button
        className="yellow darken-3 white-text btn-flat"
        // onClick={onCancel}
      >
        Back
      </button>
      <button
        className="green btn-flat right white-text"
        // onClick={() =>
        //   onUpdateOrg
        //     ? updateInbound_Org(org_id, formValues, onUpdateOrg)
        //     : submitInboundOrg(formValues, history)
        // }
      >
        Save Inbound Org
        <i className="material-icons right">email</i>
      </button>
    </div>
  );
};

function mapStateToProps({ form: { inbound_po } }) {
  console.log(inbound_po);
  return { formValues: inbound_po.values };
}

export default connect(mapStateToProps, null)(POReview);
