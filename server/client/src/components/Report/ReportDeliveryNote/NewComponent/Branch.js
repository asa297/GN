import React, { Component } from "react";
import _ from "lodash";
import { fetchBranch } from "../../../../actions";

import { connect } from "react-redux";
import { reduxForm, Field, change } from "redux-form";
import Select from "react-select";

class Branch extends Component {
  constructor() {
    super();
    this.state = {
      branch_origin: null,
      branch_destination: null,
      branches_list: [],
      setOrigin: false
    };
  }
  componentDidMount() {
    this.props.fetchBranch();
  }

  componentWillReceiveProps({ branches, dn_form }) {
    if (branches && !this.state.setOrigin) {
      const branches_list = _.map(
        branches,
        ({ _id, branch_Id, branch_Name }) => {
          return {
            _id,
            branch_Id,
            branch_Name,
            label: branch_Name,
            value: branch_Name
          };
        }
      );

      //set Location
      const branch_origin = _.find(branches_list, ({ branch_Id }) => {
        return branch_Id === 2;
      });

      if (branch_origin) {
        this.props.dispatch(change("dn_form", "branch_origin", branch_origin));

        const branches_list_RejectOrigin = _.without(
          branches_list,
          branch_origin
        );

        this.setState({
          branches_list: branches_list_RejectOrigin,
          setOrigin: true
        });
      }
    }

    if (dn_form.values) {
      const { branch_destination } = dn_form.values;

      if (branch_destination) {
        const result = _.reject(this.state.branches_list, ({ branch_Id }) => {
          return branch_Id === branch_destination.branch_Id;
        });
        this.setState({
          branch_destination: branch_destination.branch_Id,
          branches_list: result
        });
      }
    }
  }

  OriginBranchField() {
    return (
      <div style={{ width: "47.5%" }}>
        <label>Origin</label>
        <Field
          name="branch_origin"
          component={props => (
            <div>
              <Select
                value={props.input.value}
                options={this.state.branches_list}
                onChange={props.input.onChange}
                className="basic-single"
                isDisabled={true}
                simpleValue
              />
              <div className="red-text" style={{ marginBottom: "20px" }}>
                {props.meta.touched && props.meta.error}
              </div>
            </div>
          )}
        />
      </div>
    );
  }

  DestinationBranchField() {
    return (
      <div style={{ width: "47.5%" }}>
        <label>Destination</label>
        <Field
          name="branch_destination"
          component={props => (
            <div>
              <Select
                value={props.input.value}
                options={this.state.branches_list}
                onChange={props.input.onChange}
                className="basic-single"
                simpleValue
              />
              <div className="red-text" style={{ marginBottom: "20px" }}>
                {props.meta.touched && props.meta.error}
              </div>
            </div>
          )}
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

function mapStateToProps({ branches, form: { dn_form } }) {
  return { branches, dn_form };
}

export default reduxForm({
  form: "dn_form"
})(
  connect(
    mapStateToProps,
    { fetchBranch }
  )(Branch)
);
