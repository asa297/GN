import React, { Component } from "react";
import { reduxForm } from "redux-form";
import ItemForm from "./ItemForm";
import ItemReview from "./ItemReview";

class SellerNew extends Component {
  state = { showFormReview: false };

  renderContent() {
    if (this.state.showFormReview) {
      return (
        <ItemReview onCancel={() => this.setState({ showFormReview: false })} />
      );
    }

    return (
      <ItemForm onSubmit={() => this.setState({ showFormReview: true })} />
    );
  }

  render() {
    return <div>{this.renderContent()}</div>;
  }
}

export default reduxForm({
  form: "item_form"
})(SellerNew);
