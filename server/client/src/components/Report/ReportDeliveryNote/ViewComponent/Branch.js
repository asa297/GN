import React, { Component } from "react";
import { reduxForm, change } from "redux-form";
import Select from "react-select";

class Branch extends Component {
  constructor(props) {
    super(props);

    let { branch_origin, branch_destination } = props;

    branch_origin.label = branch_origin.branch_Name;
    branch_destination.label = branch_destination.branch_Name;

    this.state = {
      branch_origin,
      branch_destination
    };
  }

  componentDidMount() {
    this.props.dispatch(
      change("dn_form_edit", "branch_origin", this.state.branch_origin)
    );
    this.props.dispatch(
      change(
        "dn_form_edit",
        "branch_destination",
        this.state.branch_destination
      )
    );
  }

  OriginBranchField() {
    return (
      <div style={{ width: "47.5%" }}>
        <label>Origin</label>
        <Select
          value={this.state.branch_origin}
          className="basic-single"
          isDisabled={true}
          simpleValue
        />
      </div>
    );
  }

  DestinationBranchField() {
    return (
      <div style={{ width: "47.5%" }}>
        <label>Destination</label>
        <Select
          value={this.state.branch_destination}
          className="basic-single"
          isDisabled={true}
          simpleValue
        />
      </div>
    );
  }

  renderBranchField() {
    return (
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        {this.OriginBranchField()}
        {this.DestinationBranchField()}
      </div>
    );
  }

  render() {
    return <div>{this.renderBranchField()}</div>;
  }
}

export default reduxForm({
  form: "dn_form_edit"
})(Branch);
