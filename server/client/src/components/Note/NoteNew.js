import React, { Component } from "react";
import _ from "lodash";
import { SubmitNote } from "../../actions";
import { reduxForm, Field, reset } from "redux-form";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";

import NoteField from "./NoteField";
import FIELDS from "./formFields";

class NoteNew extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false
    };
  }

  componentDidMount() {
    this.props.dispatch(reset("note_form"));
  }

  renderField() {
    return _.map(FIELDS, ({ label, name }) => {
      return (
        <Field
          key={name}
          component={NoteField}
          type="text"
          label={label}
          name={name}
        />
      );
    });
  }

  async handleSubmit() {
    const form_value = this.props.note_form.values;

    await this.props.SubmitNote(form_value);
    this.props.history.push("/home");
  }

  render() {
    return (
      <div className="container">
        <form onSubmit={this.props.handleSubmit(() => this.handleSubmit())}>
          {this.renderField()}

          <Link to="/home" className="red btn-flat white-text">
            Cancal
          </Link>
          <button type="submit" className="teal btn-flat right white-text">
            Next
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

function mapStateToProps({ orgs, form: { note_form } }) {
  return { orgs, note_form };
}

export default reduxForm({
  validate,
  form: "note_form"
})(
  connect(
    mapStateToProps,
    { SubmitNote }
  )(withRouter(NoteNew))
);
