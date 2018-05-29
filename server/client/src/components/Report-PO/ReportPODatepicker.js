import React, { Component } from "react";
import { connect } from "react-redux";
import { reduxForm, Field } from "redux-form";
import { fetchInbound_ReportPO_Filter } from "../../actions";

import DatePicker from "react-datepicker";
import moment from "moment";
import "react-datepicker/dist/react-datepicker.css";

import Report_PO_CSS from "../../Style/CSS/Report_PO_CSS.css";

class ReportPODatepicker extends Component {
  renderDateSelect() {
    return (
      <div>
        <form
          onSubmit={this.props.handleSubmit(() =>
            this.props.fetchInbound_ReportPO_Filter(this.props.report_po)
          )}
        >
          <div className={Report_PO_CSS.datepicker}>
            <div style={{ marginRight: "10px" }}>
              <label>Filter Date</label>
            </div>
            <Field
              name="start_date"
              component={props => (
                <div style={{ width: "200px" }}>
                  <DatePicker
                    value={
                      props.input.value
                        ? moment(props.input.value).format("YYYY-MM-DD")
                        : null
                    }
                    onChange={props.input.onChange}
                    placeholderText={
                      props.meta.error ? props.meta.error : "start date"
                    }
                  />
                </div>
              )}
            />
            <div>
              <b>to</b>
            </div>
            <Field
              name="end_date"
              component={props => (
                <div style={{ width: "200px", marginLeft: "20px" }}>
                  <DatePicker
                    value={
                      props.input.value
                        ? moment(props.input.value).format("YYYY-MM-DD")
                        : null
                    }
                    onChange={props.input.onChange}
                    placeholderText={
                      props.meta.error ? props.meta.error : "end date"
                    }
                  />
                </div>
              )}
            />
            <button className="green btn-flat white-text">Filter</button>
          </div>
        </form>
      </div>
    );
  }

  render() {
    return <div>{this.renderDateSelect()}</div>;
  }
}

function validate(values) {
  const errors = {};

  if (values["start_date"] || values["end_date"]) {
    if (!values["start_date"]) {
      errors["start_date"] = "Require a value";
    } else if (!values["end_date"]) {
      errors["end_date"] = "Require a value";
    }
  }

  return errors;
}

function mapStateToProps({ form: report_po }) {
  return { report_po };
}

export default reduxForm({
  validate,
  form: "report_po",
  destroyOnUnmount: false
})(
  connect(mapStateToProps, { fetchInbound_ReportPO_Filter })(ReportPODatepicker)
);
