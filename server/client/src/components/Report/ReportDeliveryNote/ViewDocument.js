import React, { Component } from "react";
import { connect } from "react-redux";
import { reduxForm } from "redux-form";
import { withRouter } from "react-router-dom";
import ReactToPrint from "react-to-print";
import Alert from "react-s-alert";
import Header from "./ViewComponent/Header";
import Branch from "./ViewComponent/Branch";
import DocRearmks from "./ViewComponent/DocRemarks";
import Grid from "./ViewComponent/Grid";

import {
  ApproveDeliveryNote,
  RejectDeliveryNote,
  SaveDeliveryNote
} from "../../../actions";
import ComponentToPrint from "../ReportPringService/DeliveryNotePrint/TemplatePrint";

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
    let { values } = this.props.dn_form_edit;
    if (approve) {
      const response = await this.props.ApproveDeliveryNote(this.state.DN._id);
      if (response.status === 200) {
        Alert.success(`The Delivery Note is approved`, {
          position: "bottom",
          timeout: 2000
        });

        setTimeout(() => {
          this.props.history.push({
            pathname: "/report/reportdeliverynote"
          });
        }, 3000);
      } else {
        Alert.error(`The Approved Delivery Note is interrupted.`, {
          position: "bottom",
          timeout: 2000
        });
      }
    } else if (reject) {
      const response = await this.props.RejectDeliveryNote(this.state.DN._id);
      if (response.status === 200) {
        Alert.success(`The Delivery Note is rejected`, {
          position: "bottom",
          timeout: 2000
        });

        setTimeout(() => {
          this.props.history.push({
            pathname: "/report/reportdeliverynote"
          });
        }, 3000);
      } else {
        Alert.error(`The Rejected Delivery Note is interrupted.`, {
          position: "bottom",
          timeout: 2000
        });
      }
    } else if (edit) {
      const response = await this.props.SaveDeliveryNote(
        values,
        this.state.DN._id
      );
      if (response.status === 200) {
        Alert.success(`The Delivery Note is edtied`, {
          position: "bottom",
          timeout: 2000
        });

        setTimeout(() => {
          this.props.history.push({
            pathname: "/report/reportdeliverynote"
          });
        }, 3000);
      } else {
        Alert.error(`The edited Delivery Note is interrupted.`, {
          position: "bottom",
          timeout: 2000
        });
      }
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

          <div style={{ display: "none" }}>
            <ComponentToPrint
              ref={el => (this.componentRef = el)}
              print_value={this.state.DN}
            />
          </div>

          <div style={{ display: "flex ", justifyContent: "center" }}>
            {this.state.DN.DN_Status === 1 || this.state.DN.DN_Status === 4 ? (
              <div>
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

                {this.props.auth.priority === 1 ? (
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
                ) : null}
              </div>
            ) : null}

            <ReactToPrint
              trigger={() => (
                <button
                  className="blue darken-4 btn-flat white-text waves-effect waves-light"
                  style={{ marginLeft: "10px" }}
                >
                  <i className="material-icons left">local_printshop</i>
                  Print
                </button>
              )}
              content={() => this.componentRef}
            />
          </div>
        </form>
      </div>
    );
  }
}

function mapStateToProps({ form: { dn_form_edit }, auth }) {
  return { dn_form_edit, auth };
}

export default reduxForm({
  // validate,
  form: "dn_form_edit"
})(
  connect(
    mapStateToProps,
    { ApproveDeliveryNote, RejectDeliveryNote, SaveDeliveryNote }
  )(withRouter(ViewDocument))
);
