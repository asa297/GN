import React, { Component } from "react";
import { connect } from "react-redux";
import { reduxForm, Field } from "redux-form";
import { PostAuth } from "../actions";
import { withRouter } from "react-router-dom";
import CircularLoader from "./utils/CircularLoaderBlue";

const UserNameInput = ({
  input,
  label,
  placeholder,
  type,
  meta: { error, touched }
}) => {
  return (
    <div>
      <label>{label}</label>
      <input {...input} placeholder={placeholder} type={type ? type : "text"} />

      <div className="red-text" style={{ marginBottom: "20px" }}>
        {touched && error}
      </div>
    </div>
  );
};

class Login extends Component {
  state = {
    submit: false
  };

  async authlogin() {
    const { values } = this.props.form.login_form;
    this.setState({ submit: true });
    await this.props.PostAuth(values, this.props.history);
    this.setState({ submit: false });
  }

  render() {
    return (
      <div className="container">
        <form onSubmit={this.props.handleSubmit(() => this.authlogin())}>
          <h3 style={{ display: "flex", justifyContent: "center" }}>
            User Authentication
          </h3>
          <div class="row">
            <Field
              key="username"
              component={UserNameInput}
              type="text"
              label="Username"
              name="username"
              placeholder="Username"
            />

            <Field
              key="password"
              component={UserNameInput}
              type="password"
              label="Password"
              name="password"
              placeholder="Password"
            />
          </div>
          <div style={{ display: "flex", justifyContent: "center" }}>
            {this.state.submit ? (
              <div style={{ marginRight: "10px" }}>
                <CircularLoader />
              </div>
            ) : null}
            <button type="submit" className="teal btn-flat white-text">
              Login
              <i className="material-icons right">lock</i>
            </button>
          </div>
        </form>
      </div>
      // <div className="container">

      //   {this.state.ready ? <div>test</div> : <Preloader />}
      // </div>
    );
  }
}

function validate(values) {
  const errors = {};

  if (!values["username"]) {
    errors["username"] = "Require a value";
  }

  if (!values["password"]) {
    errors["password"] = "Require a value";
  }

  return errors;
}

export default reduxForm({
  validate,
  form: "login_form"
})(
  connect(
    ({ form }) => ({ form }),
    { PostAuth }
  )(withRouter(Login))
);
