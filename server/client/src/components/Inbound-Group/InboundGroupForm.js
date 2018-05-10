import React, { Component } from "react";
import _ from "lodash";
import { Link } from "react-router-dom";
import { reduxForm, Field } from "redux-form";
// import FIELDS from "./formFields";

class SurveyForm extends Component {
  // renderField() {
  //   return _.map(FIELDS, ({ label, name }) => {
  //     return (
  //       <Field
  //         key={name}
  //         component={SurveyField}
  //         type="text"
  //         label={label}
  //         name={name}
  //       />
  //     );
  //   });
  // }

  render() {
    return (
      <div>
        <form onSubmit={}>
          {/* {this.renderField()} */}
          <Link to="/home" className="red btn-flat white-text">
            Cancal
          </Link>
          <button type="submit" className="teal btn-flat right white-text">
            Submit
            <i className="material-icons right">done</i>
          </button>
        </form>
      </div>
    );
  }
}

function validate(values) {
  const errors = {};

  _.each(FIELDS, ({ name }) => {
    if (!values[name]) {
      errors[name] = "Require a value";
    }
  });

  return errors;
}

export default reduxForm({
  // validate,
  form: "InboundGroupForm",
  destroyOnUnmount: false
})(SurveyForm);
