import React from "react";
import { Field } from "redux-form";
import moment from "moment";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

import Report_CSS from "../../../../Style/CSS/Report_OUT_INV_CSS.css";

const SearchDatePicker = () => {
  return (
    <div className={Report_CSS.datepicker}>
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
    </div>
  );
};

export default SearchDatePicker;
