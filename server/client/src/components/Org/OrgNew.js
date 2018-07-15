import React, { Component } from "react";
import { reduxForm } from "redux-form";
import OrgForm from "./OrgForm";
import OrgReview from "./OrgReview";

class OrgNew extends Component {
  state = { showFormReview: false };

  renderContent() {
    if (this.state.showFormReview) {
      return (
        <OrgReview onCancel={() => this.setState({ showFormReview: false })} />
      );
    }

    return <OrgForm onSubmit={() => this.setState({ showFormReview: true })} />;
  }

  render() {
    return <div>{this.renderContent()}</div>;
  }
}

export default reduxForm({
  form: "org_form"
})(OrgNew);
