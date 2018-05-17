import React, { Component } from "react";
import { reduxForm } from "redux-form";
import InboundItemForm from "./InboundItemForm";
import InboundItemReview from "./InboundItemReview";

class InboundSellerNew extends Component {
  state = { showFormReview: false };

  renderContent() {
    if (this.state.showFormReview) {
      return (
        <InboundItemReview
          onCancel={() => this.setState({ showFormReview: false })}
        />
      );
    }

    return (
      <InboundItemForm
        onSubmit={() => this.setState({ showFormReview: true })}
      />
    );
  }

  render() {
    return <div>{this.renderContent()}</div>;
  }
}

export default reduxForm({
  form: "inbound_item"
})(InboundSellerNew);
