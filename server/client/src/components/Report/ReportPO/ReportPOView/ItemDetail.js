import React, { Component } from "react";
import { connect } from "react-redux";
import _ from "lodash";
import numeral from "numeral";

class ItemDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      itemList: []
    };
  }

  // componentDidMount() {
  //   const report_PO = _.find(this.props.inbound_reports_po, ({ orderId }) => {
  //     return orderId === this.props.orderId;
  //   });
  //   if (report_PO) {
  //     _.map(this.state, (value, key) => {
  //       this.setState({ [key]: report_PO[key] });
  //     });
  //   }
  // }

  componentWillReceiveProps(nextProps) {
    if (nextProps.report_PO) {
      _.map(this.state, (value, key) => {
        this.setState({ [key]: nextProps.report_PO[key] });
      });
    }
  }

  renderitemList() {
    return (
      <table>
        <thead>
          <tr>
            <th>item_code</th>
            <th>item_name</th>
            <th>QTY</th>
            <th>Price</th>
          </tr>
        </thead>
        <tbody>
          {_.map(
            this.state.itemList,
            ({ _id, item_code, item_name, item_price, countQty }) => {
              return (
                <tr key={_id}>
                  <th>{item_code}</th>
                  <th>{item_name}</th>
                  <th>{countQty}</th>
                  <th>{numeral(item_price).format("0,0.00")}</th>
                </tr>
              );
            }
          )}
        </tbody>
      </table>
    );
  }

  render() {
    return <div>{this.renderitemList()}</div>;
  }
}

function mapStateToProps({ inbound_reports_po }) {
  return { inbound_reports_po };
}

export default connect(mapStateToProps)(ItemDetail);
