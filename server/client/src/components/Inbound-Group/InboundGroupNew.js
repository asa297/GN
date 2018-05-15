import React, { Component } from "react";
import { reduxForm } from "redux-form";
import InboundGroupForm from "./InboundGroupForm";
import InboundGroupReview from "./InboundGroupReview";

class InboundGroupNew extends Component {
  state = { showFormReview: false };

  renderContent() {
    if (this.state.showFormReview) {
      return (
        <InboundGroupReview
          onCancel={() => this.setState({ showFormReview: false })}
        />
      );
    }

    return (
      <InboundGroupForm
        onSubmit={() => this.setState({ showFormReview: true })}
      />
    );
  }

  render() {
    return <div>{this.renderContent()}</div>;
  }
}

export default reduxForm({
  form: "inbound_group"
})(InboundGroupNew);
