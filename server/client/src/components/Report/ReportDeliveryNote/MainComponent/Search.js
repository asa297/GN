import React, { Component } from "react";
import { reduxForm } from "redux-form";
import { Field } from "redux-form";
import { withRouter } from "react-router-dom";
import CircularLoaderBlue from "../../../utils/CircularLoaderBlue";

const SearchPOField = ({ input, meta: { error, touched } }) => {
  return (
    <div>
      <input {...input} style={{ margin: "0px" }} placeholder="Search DN ID" />
      <div className="red-text"> {touched && error}</div>
    </div>
  );
};

class Search extends Component {
  constructor() {
    super();
    this.state = {
      searching: false
    };
  }
  render() {
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "flex-start",
          alignItems: "center"
        }}
      >
        <div style={{ width: "300px", marginRight: "10px" }}>
          <Field
            key={"orderId"}
            component={SearchPOField}
            type="text"
            name={"orderId"}
          />
        </div>
        <button className="green btn-flat white-text" type="submit">
          Search
        </button>
        <div style={{ marginLeft: "5px" }}>
          {this.state.searching ? <CircularLoaderBlue /> : null}
        </div>
      </div>
    );
  }
}

export default reduxForm({
  // validate,
  form: "search_dn"
})(withRouter(Search));
