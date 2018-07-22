import React, { Component } from "react";
import { connect } from "react-redux";
import { reduxForm, Field, reset } from "redux-form";
import {
  fetchInbound_ItemElement,
  fetchInbound_ItemElement_Filter
} from "../../../../../../actions";
import moment from "moment";
import CircularLoaderBlue from "../../../../../utils/CircularLoaderBlue";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

class SearchDatePicker extends Component {
  constructor() {
    super();

    this.state = {
      searching: false
    };
  }
  async handleSearchSubmit() {
    if (this.props.report_inbound_inv_filter.values) {
      const {
        start_date,
        end_date
      } = this.props.report_inbound_inv_filter.values;

      const time_selected = {
        start_date: moment(start_date),
        end_date: moment(end_date)
      };

      this.setState({ searching: true });
      await this.props.fetchInbound_ItemElement_Filter(time_selected);
      this.setState({ searching: false });
    }
  }

  async handleClearSearch() {
    this.props.dispatch(reset("report_inbound_inv_filter"));
    this.setState({ searching: true });
    await this.props.fetchInbound_ItemElement();
    this.setState({ searching: false });
  }

  render() {
    return (
      <form onSubmit={this.props.handleSubmit(() => this.handleSearchSubmit())}>
        <div className="datepicker_inboundINV">
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
          />

          <div style={{ display: "flex" }}>
            <div style={{ marginRight: "5px" }}>
              {this.state.searching ? <CircularLoaderBlue /> : null}
            </div>
            <button
              type="submit"
              className="green btn-flat white-text"
              style={{ marginLeft: "10px" }}
            >
              Search
            </button>
            <button
              type="button"
              className="red btn-flat white-text"
              onClick={() => this.handleClearSearch()}
            >
              Clear
            </button>
          </div>
        </div>
      </form>
    );
  }
}

function validate(values) {
  const errors = {};
  // if (values["start_date"] || values["end_date"]) {
  //   if (!values["start_date"]) {
  //     errors["start_date"] = "Require a value";
  //   } else if (!values["end_date"]) {
  //     errors["end_date"] = "Require a value";
  //   }
  // }

  if (!values["start_date"]) {
    errors["start_date"] = "Require a value";
  }
  if (!values["end_date"]) {
    errors["end_date"] = "Require a value";
  }

  return errors;
}

function mapStateToProps({ form: { report_inbound_inv_filter } }) {
  return { report_inbound_inv_filter };
}

export default reduxForm({
  validate,
  form: "report_inbound_inv_filter"
})(
  connect(
    mapStateToProps,
    { fetchInbound_ItemElement, fetchInbound_ItemElement_Filter }
  )(SearchDatePicker)
);
