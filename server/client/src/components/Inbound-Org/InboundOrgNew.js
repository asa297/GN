import React, { Component } from "react";
import { reduxForm, reset } from "redux-form";
import InboundOrgForm from "./InboundOrgForm";
import InboundOrgReview from "./InboundOrgReview";

class InboundOrgNew extends Component {
  componentDidMount() {
    this.props.dispatch(reset("inbound_org"));
  }

  state = { showFormReview: false };

  renderContent() {
    if (this.state.showFormReview) {
      return (
        <InboundOrgReview
          onCancel={() => this.setState({ showFormReview: false })}
        />
      );
    }

    return (
      <InboundOrgForm
        onSurveySubmit={() => this.setState({ showFormReview: true })}
      />
    );
  }

  render() {
    return <div>{this.renderContent()}</div>;
  }
}

export default reduxForm({
  form: "inbound_org"
})(InboundOrgNew);
