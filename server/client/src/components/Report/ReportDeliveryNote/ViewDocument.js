import React, { Component } from "react";
import _ from "lodash";
import { connect } from "react-redux";
import { reduxForm } from "redux-form";
import { withRouter } from "react-router-dom";
import Header from "./ViewComponent/Header";
import Branch from "./ViewComponent/Branch";
import DocRearmks from "./ViewComponent/DocRemarks";
import Grid from "./ViewComponent/Grid";

import { ApproveDeliveryNote } from "../../../actions";

class ViewDocument extends Component {
  constructor(props) {
    super(props);
    const { DN } = props.location.state;

    this.state = {
      DN,
      approve: false,
      reject: false,
      edit: false
    };
  }

  async handleSubmitApproveDN() {
    const { approve, reject, edit } = this.state;
    if (approve || reject || edit) {
      const au = _.find(this.state, value => {
        return value;
      });
      console.log(au);
    }
  }

  render() {
    return (
      <div className="container">
        <form
          onSubmit={this.props.handleSubmit(() => this.handleSubmitApproveDN())}
        >
          <Header
            DN_Id={this.state.DN.DN_Id}
            DN_Status={this.state.DN.DN_Status}
            DN_StatusName={this.state.DN.DN_StatusName}
          />
          <Branch
            branch_origin={this.state.DN.branch_origin}
            branch_destination={this.state.DN.branch_destination}
          />
          <DocRearmks DN_Remark={this.state.DN.DN_Remark} />
          <Grid ItemList={this.state.DN.ItemList} />
          <div style={{ display: "flex ", justifyContent: "center" }}>
            <button
              className="green btn-flat white-text waves-effect waves-light"
              onClick={() => {
                this.setState({ approve: true });
              }}
            >
              <i className="material-icons left">check</i>
              Approve
            </button>

            <button
              className="red btn-flat white-text waves-effect waves-light"
              style={{ marginLeft: "10px" }}
              onClick={() => {
                this.setState({ reject: true });
              }}
            >
              <i className="material-icons left">cancel</i>
              Reject
            </button>

            <button
              className="blue btn-flat white-text waves-effect waves-light"
              style={{ marginLeft: "10px" }}
              onClick={() => {
                this.setState({ edit: true });
              }}
            >
              <i className="material-icons left">edit</i>
              Edit and Save
            </button>
          </div>
        </form>
      </div>
    );
  }
}

function mapStateToProps({ form: { dn_form_edit } }) {
  return { dn_form_edit };
}

export default reduxForm({
  // validate,
  form: "dn_form_edit"
})(
  connect(
    mapStateToProps,
    { ApproveDeliveryNote }
  )(withRouter(ViewDocument))
);
