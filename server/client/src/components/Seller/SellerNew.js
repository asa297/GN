import React, { Component } from "react";
import { reduxForm } from "redux-form";
import SellerForm from "./SellerForm";
import SellerReview from "./SellerReview";

class InboundSellerNew extends Component {
  state = { showFormReview: false };

  renderContent() {
    if (this.state.showFormReview) {
      return (
        <SellerReview
          onCancel={() => this.setState({ showFormReview: false })}
        />
      );
    }

    return (
      <SellerForm onSubmit={() => this.setState({ showFormReview: true })} />
    );
  }

  render() {
    return <div>{this.renderContent()}</div>;
  }
}

export default reduxForm({
  form: "seller_form"
})(InboundSellerNew);
