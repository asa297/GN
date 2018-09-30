import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import ReactToPrint from "react-to-print";
import Alert from "react-s-alert";
import Header from "./ViewComponent/Header";
import Branch from "./ViewComponent/Branch";
import DocRearmks from "./ViewComponent/DocRemarks";
import Grid from "./ViewComponent/Grid";
import Preloader from "../../utils/Preloader";

import { ApproveDeliveryNote, RejectDeliveryNote } from "../../../actions";
import ComponentToPrint from "../ReportPrintService/DeliveryNotePrint/TemplatePrint";

class ViewDocument extends Component {
  constructor(props) {
    super(props);
    const { DN } = props.location.state;

    this.state = {
      DN,
      branch_now: 2,
      action: false
    };
  }

  async handleSubmitApproveDN(status) {
    this.setState({ action: true });
    if (status === 2) {
      const response = await this.props.ApproveDeliveryNote(this.state.DN._id);
      if (response.status === 200) {
        Alert.success(`The Delivery Note is approved`, {
          position: "bottom",
          timeout: 2000
        });
      } else {
        Alert.error(`The Approved Delivery Note is interrupted.`, {
          position: "bottom",
          timeout: 2000
        });
      }
      this.setState({ action: false });
      setTimeout(() => {
        this.props.history.push({
          pathname: "/report/reportdeliverynote"
        });
      }, 2000);
    } else if (status === 3) {
      const response = await this.props.RejectDeliveryNote(this.state.DN._id);
      if (response.status === 200) {
        Alert.success(`The Delivery Note is rejected`, {
          position: "bottom",
          timeout: 2000
        });
      } else {
        Alert.error(`The Rejected Delivery Note is interrupted.`, {
          position: "bottom",
          timeout: 2000
        });
      }
      this.setState({ action: false });
      setTimeout(() => {
        this.props.history.push({
          pathname: "/report/reportdeliverynote"
        });
      }, 2000);
    }
  }

  render() {
    return (
      <div className="container">
        {this.state.DN ? (
          <div>
            {this.state.action ? <Preloader /> : null}

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
              {this.state.DN.DN_Status === 1 ? (
                <div>
                  {this.state.DN.branch_destination.branch_Id ===
                  this.state.branch_now ? (
                    <button
                      className="green btn-flat white-text waves-effect waves-light"
                      onClick={() => {
                        this.handleSubmitApproveDN(2);
                      }}
                    >
                      <i className="material-icons left">check</i>
                      Approve
                    </button>
                  ) : null}

                  <button
                    className="red btn-flat white-text waves-effect waves-light"
                    style={{ marginLeft: "10px" }}
                    onClick={() => {
                      this.handleSubmitApproveDN(3);
                    }}
                  >
                    <i className="material-icons left">cancel</i>
                    Reject
                  </button>
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
          </div>
        ) : null}
      </div>
    );
  }
}

function mapStateToProps({ auth }) {
  return { auth };
}

export default connect(
  mapStateToProps,
  { ApproveDeliveryNote, RejectDeliveryNote }
)(withRouter(ViewDocument));
