import React, { Component } from "react";
import { reduxForm } from "redux-form";
import InboundSellerForm from "./InboundSellerForm";
import InboundSellerReview from "./InboundSellerReview";

class InboundSellerNew extends Component {
  state = { showFormReview: false };

  renderContent() {
    if (this.state.showFormReview) {
      return (
        <InboundSellerReview
          onCancel={() => this.setState({ showFormReview: false })}
        />
      );
    }

    return (
      <InboundSellerForm
        onSubmit={() => this.setState({ showFormReview: true })}
      />
    );
  }

  render() {
    return <div>{this.renderContent()}</div>;
  }
}

export default reduxForm({
  form: "inbound_seller"
})(InboundSellerNew);
