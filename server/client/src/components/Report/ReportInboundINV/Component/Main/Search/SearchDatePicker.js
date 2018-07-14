import React, { Component } from "react";
import { connect } from "react-redux";
import { reduxForm, Field } from "redux-form";
import moment from "moment";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

class SearchDatePicker extends Component {
  handleSearchSubmit() {
    // const { select_date } = this.props.report_inbound_inv_filter.values;

    console.log("gg");
  }

  render() {
    return (
      <form onSubmit={this.props.handleSubmit(() => this.handleSearchSubmit())}>
        <div className="datepicker_inboundINV">
          <Field
            name="select_date"
            component={props => (
              <div>
                <div>
                  <DatePicker
                    value={
                      props.input.value
                        ? moment(props.input.value).format("YYYY-MM-DD")
                        : null
                    }
                    onChange={props.input.onChange}
                    placeholderText="Search Date"
                  />
                </div>

                <div className="red-text">
                  {props.meta.touched && props.meta.error}
                </div>
              </div>
            )}
          />

          <button
            type="submit"
            className="green btn-flat white-text"
            style={{ marginLeft: "10px" }}
          >
            Search
          </button>
          <button type="button" className="red btn-flat white-text">
            Clear
          </button>
        </div>
      </form>
    );
  }
}

function validate(values) {
  const errors = {};
  if (!values["select_date"]) {
    errors["select_date"] = "Require a value";
  }

  return errors;
}

function mapStateToProps({ form: { report_inbound_inv_filter } }) {
  return { report_inbound_inv_filter };
}

export default reduxForm({
  validate,
  form: "report_inbound_inv_filter"
})(connect(mapStateToProps)(SearchDatePicker));
