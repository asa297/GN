import React, { Component } from "react";
import _ from "lodash";
import { connect } from "react-redux";
import { reduxForm, Field } from "redux-form";
import { fetchInbound_Item } from "../../actions";

import Select from "react-select";

import PO_CSS from "../../Style/CSS/PO_CSS.css";
import POScanQR from "./POScanQR";
import POSelectSeller from "./POSelectSeller";

class POItemOrder extends Component {
  componentDidMount() {
    this.props.fetchInbound_Item();
  }

  renderContentField() {
    return <POSelectSeller />;
  }

  render() {
    return (
      <div className="container">
        <form
          onSubmit={this.props.handleSubmit(() => {
            console.log("gg");
          })}
        >
          {this.renderContentField()}
          <POScanQR
            onData={data => {
              console.log(data);
            }}
          />
        </form>
      </div>
    );
  }
}

function validate(values) {
  const errors = {};
  if (!values["group_select"]) {
    errors["group_select"] = "Require a value ";
  }
  return errors;
}

function mapStateToProps({ inbound_items }) {
  return { inbound_items };
}

export default reduxForm({
  validate,
  form: "inbound_po",
  destroyOnUnmount: false
})(connect(mapStateToProps, { fetchInbound_Item })(POItemOrder));
