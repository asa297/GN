import React, { Component } from "react";
import _ from "lodash";
import { connect } from "react-redux";
import { Field } from "redux-form";
import { fetchInbound_Seller } from "../../actions";

import Select from "react-select";

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
        <label>Seller Selection</label>
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
    return <div>{this.renderSellerFieldSelect()}</div>;
  }
}

function mapStateToProps({ inbound_sellers }) {
  return { inbound_sellers };
}

export default connect(mapStateToProps, { fetchInbound_Seller })(
  POSelectSeller
);
