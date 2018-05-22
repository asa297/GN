import React, { Component } from "react";
import _ from "lodash";
import { connect } from "react-redux";
import { reduxForm, Field } from "redux-form";
import { fetchInbound_Seller } from "../../actions";

import Select from "react-select";

import PO_CSS from "../../Style/CSS/PO_CSS.css";

class POSelectSeller extends Component {
  componentDidMount() {
    this.props.fetchInbound_Seller();
  }

  renderSellerFieldSelect() {
    const seller_list = _.map(
      this.props.inbound_sellers,
      ({ _id, sellerName }) => {
        return {
          _id,
          sellerName,
          label: sellerName,
          value: sellerName
        };
      }
    );
    return (
      <div>
        <Field
          name="seller_select"
          component={props => (
            <div style={{ width: "500px" }}>
              <Select
                value={props.input.value}
                options={seller_list}
                onChange={props.input.onChange}
                placeholder={props.meta.touched && props.meta.error}
                className="form-control"
                simpleValue
              />
            </div>
          )}
        />
      </div>
    );
  }

  render() {
    return (
      <div className="container">
        <form onSubmit={this.props.handleSubmit(this.props.onSubmit)}>
          <div className={PO_CSS.container_top}>
            <h3 className="center">
              <i>Step #2 -</i> Seller Selection
            </h3>
            <div className={PO_CSS.flex_center}>
              {this.renderSellerFieldSelect()}
            </div>
            <div className="center">
              <button
                onClick={this.props.onCancal}
                className="red btn-flat white-text"
                style={{ marginTop: "30px" }}
              >
                Back
              </button>
              <button
                className="green btn-flat white-text"
                style={{ marginTop: "30px" }}
                type="submit"
              >
                Next
              </button>
            </div>
          </div>
        </form>
      </div>
    );
  }
}

function validate(values) {
  const errors = {};
  if (!values["seller_select"]) {
    errors["seller_select"] = "Require a value ";
  }
  return errors;
}

function mapStateToProps({ inbound_sellers }) {
  return { inbound_sellers };
}

export default reduxForm({
  validate,
  form: "inbound_po",
  destroyOnUnmount: false
})(connect(mapStateToProps, { fetchInbound_Seller })(POSelectSeller));
