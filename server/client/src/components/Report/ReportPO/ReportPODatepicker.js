import React, { Component } from "react";
import { connect } from "react-redux";
import { reduxForm, Field, reset } from "redux-form";
import { fetch_ReportPO, fetch_ReportPO_Filter } from "../../../actions";

import DatePicker from "react-datepicker";
import moment from "moment";
import "react-datepicker/dist/react-datepicker.css";

import Report_PO_CSS from "../../../Style/CSS/Report_PO_CSS.css";
import CircularLoaderBlue from "../../utils//CircularLoaderBlue";

class ReportPODatepicker extends Component {
  constructor() {
    super();

    this.state = {
      searching: false
    };
  }

  async handleSearchDateSubmit() {
    this.setState({ searching: true });
    if (this.props.report_po.values) {
      const { start_date, end_date } = this.props.report_po.values;

      const time_selected = {
        values: {
          start_date: moment(start_date),
          end_date: moment(end_date)
        }
      };

      await this.props.fetch_ReportPO_Filter(time_selected);
    }

    this.setState({ searching: false });
  }

  async handleClearSearch() {
    this.props.dispatch(reset("report_po"));

    this.setState({ searching: true });
    await this.props.fetch_ReportPO();
    this.setState({ searching: false });
  }

  renderDateSelect() {
    return (
      <div>
        <form
          onSubmit={this.props.handleSubmit(() =>
            this.handleSearchDateSubmit()
          )}
        >
          <div className={Report_PO_CSS.datepicker}>
            <div style={{ marginRight: "5px" }}>
              {this.state.searching ? <CircularLoaderBlue /> : null}
            </div>
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
                    placeholderText={"start date"}
                  />
                  {props.meta.error && props.meta.touched ? (
                    <div className="red-text"> {props.meta.error}</div>
                  ) : null}
                </div>
              )}
              // validate={[required]}
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
                    placeholderText={"end date"}
                  />
                  {props.meta.error && props.meta.touched ? (
                    <div className="red-text"> {props.meta.error}</div>
                  ) : null}
                </div>
              )}
              // validate={[required]}
            />
            <button type="submit" className="green btn-flat white-text">
              Filter
            </button>
            <button
              type="button"
              className="red btn-flat white-text"
              onClick={() => this.handleClearSearch()}
            >
              Clear
            </button>
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

  if (!values["start_date"]) {
    errors["start_date"] = "Require a value";
  }
  if (!values["end_date"]) {
    errors["end_date"] = "Require a value";
  }

  return errors;
}

function mapStateToProps({ form: { report_po } }) {
  return { report_po };
}

export default reduxForm({
  validate,
  form: "report_po"
})(
  connect(
    mapStateToProps,
    { fetch_ReportPO, fetch_ReportPO_Filter }
  )(ReportPODatepicker)
);
