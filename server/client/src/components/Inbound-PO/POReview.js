import React from "react";
import _ from "lodash";
import { connect } from "react-redux";
import { submitInboundOrder } from "../../actions";
import { withRouter } from "react-router-dom";

const POReview = ({
  formValues,
  submitInboundOrder,
  history,
  onCancal,
  onSubmit
}) => {
  async function au() {
    const au = await submitInboundOrder(formValues, history);
    onSubmit();
  }

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
      <label>Discount</label>
      <div>
        {formValues["discount"]} % ({parseFloat(
          formValues["total"] * (parseInt(formValues["discount"], 10) / 100)
        )
          .toFixed(2)
          .toLocaleString()}
        <b> ฿</b>)
      </div>
      <label>Credit</label>
      <div>
        {formValues["credit"]
          ? parseFloat(formValues["credit"], 10)
              .toFixed(2)
              .toLocaleString()
          : null}
        <b> ฿</b>
      </div>
      <label>Cash</label>
      <div>
        {formValues["grandtotal"]
          ? parseFloat(formValues["grandtotal"] - formValues["credit"])
              .toFixed(2)
              .toLocaleString()
          : null}
        <b> ฿</b>
      </div>
      <label>ReceiveCash</label>
      <div>
        {formValues["receivecash"]
          ? formValues["receivecash"].toLocaleString()
          : null}
        <b> ฿</b>
      </div>
      <label>ChangeCash</label>
      <div>
        {formValues["receivecash"]
          ? parseFloat(
              formValues["receivecash"] -
                parseFloat(
                  formValues["grandtotal"] - formValues["credit"]
                ).toFixed(2)
            )
              .toFixed(2)
              .toLocaleString()
          : null}
        <b> ฿</b>
      </div>

      <h3 className="center">
        Grand Total ={" "}
        {formValues["grandtotal"]
          ? formValues["grandtotal"].toLocaleString()
          : null}
        <b> ฿</b>
      </h3>
    </div>
  );

  return (
    <div className="container">
      <h3 className="center">
        <i>Step #5 -</i> Confirm Orders
      </h3>
      {GroupSelectFields}
      {SellerSelectFields}
      <hr />
      {ItemListFields}

      <hr />
      {PaymentsFields}
      <button className="red darken-3 white-text btn-flat" onClick={onCancal}>
        Back
      </button>
      <button className="green btn-flat right white-text" onClick={() => au()}>
        Confirm Order
        <i className="material-icons right">email</i>
      </button>
    </div>
  );
};

function mapStateToProps({ form: { inbound_po } }) {
  return { formValues: inbound_po.values };
}

export default connect(mapStateToProps, { submitInboundOrder })(
  withRouter(POReview)
);
