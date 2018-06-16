import React, { Component } from "react";
import _ from "lodash";
import { connect } from "react-redux";
import { Field } from "redux-form";

import Select from "react-select";

import PO_CSS from "../../Style/CSS/PO_CSS.css";

class POSelectSeller extends Component {
  renderSellerFieldSelect() {
    const seller_list = _.map(
      this.props.inbound_sellers,
      ({ _id, sellerName, sellerCom }) => {
        return {
          _id,
          sellerName,
          sellerCom,
          label: sellerName,
          value: sellerName
        };
      }
    );
    return (
      <Field
        name="seller_select"
        component={props => (
          <div>
            <div className={PO_CSS.POSelectGruop}>
              <label>Seller&nbsp;:&nbsp;</label>
              <div style={{ width: "100%" }}>
                <Select
                  value={props.input.value}
                  options={seller_list}
                  onChange={props.input.onChange}
                  placeholder="Select Seller"
                  className="form-control"
                  simpleValue
                />
              </div>
            </div>

            <div className="red-text" style={{ marginBottom: "20px" }}>
              {props.meta.touched && props.meta.error}
            </div>
          </div>
        )}
      />
    );
  }

  renderContent() {
    return <div>{this.renderSellerFieldSelect()}</div>;
  }

  render() {
    return <div>{this.renderContent()}</div>;
  }
}

function mapStateToProps({ inbound_sellers }) {
  return { inbound_sellers };
}

export default connect(mapStateToProps)(POSelectSeller);
