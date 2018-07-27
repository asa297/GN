import React from "react";
import { Field } from "redux-form";
import moment from "moment";
import DatePicker from "react-datepicker";
import CircularLoaderBlue from "../../../utils/CircularLoaderBlue";
import "react-datepicker/dist/react-datepicker.css";

const SearchDatePicker = ({ searching }) => {
  return (
    <div className="datepicker_report_daily_cashbalance">
      <Field
        name="start_date"
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
                placeholderText="Select Date"
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

      {searching ? (
        <div style={{ marginLeft: "5px" }}>
          <CircularLoaderBlue />
        </div>
      ) : null}
    </div>
  );
};

export default SearchDatePicker;
