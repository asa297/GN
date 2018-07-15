import React, { Component } from "react";
import { reduxForm } from "redux-form";
import GroupForm from "./GroupForm";
import GroupReview from "./GroupReview";

class GroupNew extends Component {
  state = { showFormReview: false };

  renderContent() {
    if (this.state.showFormReview) {
      return (
        <GroupReview
          onCancel={() => this.setState({ showFormReview: false })}
        />
      );
    }

    return (
      <GroupForm onSubmit={() => this.setState({ showFormReview: true })} />
    );
  }

  render() {
    return <div>{this.renderContent()}</div>;
  }
}

export default reduxForm({
  form: "group_form"
})(GroupNew);
