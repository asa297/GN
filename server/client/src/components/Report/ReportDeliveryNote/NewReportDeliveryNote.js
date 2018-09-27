import React, { Component } from "react";
import { connect } from "react-redux";
import { reduxForm } from "redux-form";
import Alert from "react-s-alert";
import { withRouter } from "react-router-dom";
import { SubmitDeliveryNote } from "../../../actions";
import Header from "./NewComponent/Header";
import Branch from "./NewComponent/Branch";
import DocRemarks from "./NewComponent/DocRemarks";
import Grid from "./NewComponent/Grid";
import Preloader from "../../utils/Preloader";

class NewReportDeliveryNote extends Component {
  constructor() {
    super();
    this.state = {
      submit: false
    };
  }
  async handleSubmitDN() {
    const { submit } = this.state;
    if (submit) {
      const { values } = this.props.dn_form;
      const reponse = await this.props.SubmitDeliveryNote(values);

      if (reponse.status == 200) {
        Alert.success(
          `Create Delivery Note is Success. Your Delivery Note ID is ${
            reponse.data.DN_Id
          }.`,
          {
            position: "bottom",
            timeout: 2000
          }
        );
      } else {
        Alert.error(`The Delivery Note can't create in system.`, {
          position: "bottom",
          timeout: 2000
        });
      }
      this.setState({ submit: false });
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
        {this.state.submit ? <Preloader /> : null}
        <form onSubmit={this.props.handleSubmit(() => this.handleSubmitDN())}>
          <Header />
          <Branch />
          <DocRemarks />
          <Grid />
          <div style={{ display: "flex ", justifyContent: "center" }}>
            <button
              className="green btn-flat white-text"
              onClick={() => this.setState({ submit: true })}
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    );
  }
}

function mapStateToProps({ form: { dn_form } }) {
  return { dn_form };
}

function validate(values) {
  const errors = {};
  if (!values["branch_origin"]) {
    errors["branch_origin"] = "Require a value ";
  }

  if (!values["branch_destination"]) {
    errors["branch_destination"] = "Require a value ";
  }

  return errors;
}

export default reduxForm({
  validate,
  form: "dn_form"
})(
  connect(
    mapStateToProps,
    { SubmitDeliveryNote }
  )(withRouter(NewReportDeliveryNote))
);
