import React, { Component } from "react";
import _ from "lodash";
import numeral from "numeral";
import { withRouter, Link } from "react-router-dom";
import { connect } from "react-redux";
import { CSVLink } from "react-csv";

class ReportViewDetail extends Component {
  constructor(props) {
    super(props);

    const { GroupId, filename } = props.location.state;

    const { _PO, OrgName, GroupCode } = _.find(
      props.report_daily_com,
      ({ GroupId: _GroupId }) => {
        return _GroupId === GroupId;
      }
    );

    this.state = {
      filename,
      export_data: [],
      GroupId,
      OrgName,
      GroupCode,
      _PO
    };
  }

  componentDidMount() {
    const { _PO } = this.state;

    let export_data = [];

    _.map(_PO, (value, index) => {
      value.index = index;

      const _data = this.prepareExportData(value);
      export_data.push(_data);
    });

    this.setState({ export_data });
  }

  prepareExportData(value) {
    const {
      index,
      orderId,
      RecordDate,
      RecordNameBy,
      itemList,
      discountPercent,
      org: { orgComA, orgComB }
    } = value;

    const itemListA = _.filter(itemList, ({ itemTypeId, itemTypeName }) => {
      return itemTypeId === 1 && itemTypeName === "A";
    });
    const itemListB = _.filter(itemList, ({ itemTypeId, itemTypeName }) => {
      return itemTypeId === 2 && itemTypeName === "B";
    });

    const total_itemListA = _.sumBy(itemListA, ({ item_price, countQty }) => {
      return item_price * countQty;
    });

    const total_itemListB = _.sumBy(itemListB, ({ item_price, countQty }) => {
      return item_price * countQty;
    });

    const discount_itemListA = total_itemListA * (discountPercent / 100);
    const discount_itemListB = total_itemListB * (discountPercent / 100);

    const grandtotal_itemListA = total_itemListA - discount_itemListA;
    const grandtotal_itemListB = total_itemListB - discount_itemListB;

    const com_itemListA = grandtotal_itemListA * (orgComA / 100);
    orgComB !== 0 ? orgComB : orgComA;
    const com_itemListB = grandtotal_itemListB * (orgComB / 100);

    return {
      "#": index,
      "Order Id": `#${orderId}`,
      Date: `${new Date(RecordDate).toLocaleDateString()} ${new Date(
        RecordDate
      ).toLocaleTimeString()}`,
      "RecordName By": RecordNameBy,
      "Amount (Item A)": numeral(total_itemListA).format("0,0.00"),
      "Amount (Item B)": numeral(total_itemListB).format("0,0.00"),
      "Discount (Item A)": numeral(discount_itemListA).format("0,0.00"),
      "Discount (Item B)": numeral(discount_itemListB).format("0,0.00"),
      "Grand Total (Item A)": numeral(grandtotal_itemListA).format("0,0.00"),
      "Grand Total (Item B)": numeral(grandtotal_itemListB).format("0,0.00"),
      "Com (A)(%)": orgComA,
      "Com (B)(%)": orgComB !== 0 ? orgComB : orgComA,
      "Total Com (Item A)": numeral(com_itemListA).format("0,0.00"),
      "Total Com (Item B)": numeral(com_itemListB).format("0,0.00")
    };
  }

  render() {
    return (
      <div className="container">
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            marginTop: "10px"
          }}
        >
          <h4 className="center" style={{ margin: "0px" }}>
            Summary Commission -{" "}
            {`${this.state.GroupCode} (${this.state.OrgName})`}
          </h4>
          <CSVLink
            data={this.state.export_data}
            filename={`daily-com-${this.state.GroupCode}(${
              this.state.OrgName
            })@${this.state.filename}.csv`}
          >
            <button className="waves-effect waves-light btn">
              <i className="material-icons left">cloud_download</i>
              Download
            </button>
          </CSVLink>
        </div>
        <div style={{ marginTop: "10px" }} />
        <table className="responsive-table">
          <thead>
            <tr>
              <th>Order Id</th>
              <th>RecordDate</th>
              <th>RecordNameBy</th>
              <th>Amount (Item A)</th>
              <th>Amount (Item B)</th>
              <th>Discount (Item A)</th>
              <th>Discount (Item B)</th>
              <th>Grand Total (Item A)</th>
              <th>Grand Total (Item B)</th>
              <th>Total Com (Item A)</th>
              <th>Total Com (Item B)</th>
            </tr>
          </thead>

          <tbody>
            {_.map(
              this.state._PO,
              ({
                itemList,
                org: { orgComA, orgComB },
                discountPercent,
                orderId,
                RecordDate,
                RecordNameBy
              }) => {
                const itemListA = _.filter(
                  itemList,
                  ({ itemTypeId, itemTypeName }) => {
                    return itemTypeId === 1 && itemTypeName === "A";
                  }
                );
                const itemListB = _.filter(
                  itemList,
                  ({ itemTypeId, itemTypeName }) => {
                    return itemTypeId === 2 && itemTypeName === "B";
                  }
                );

                const total_itemListA = _.sumBy(
                  itemListA,
                  ({ item_price, countQty }) => {
                    return item_price * countQty;
                  }
                );

                const total_itemListB = _.sumBy(
                  itemListB,
                  ({ item_price, countQty }) => {
                    return item_price * countQty;
                  }
                );

                const discount_itemListA =
                  total_itemListA * (discountPercent / 100);
                const discount_itemListB =
                  total_itemListB * (discountPercent / 100);

                const grandtotal_itemListA =
                  total_itemListA - discount_itemListA;
                const grandtotal_itemListB =
                  total_itemListB - discount_itemListB;

                const com_itemListA = grandtotal_itemListA * (orgComA / 100);
                orgComB !== 0 ? orgComB : orgComA;
                const com_itemListB = grandtotal_itemListB * (orgComB / 100);

                return (
                  <tr key={orderId}>
                    <th>{orderId}</th>
                    <th>
                      {new Date(RecordDate).toLocaleDateString()}{" "}
                      {new Date(RecordDate).toLocaleTimeString()}
                    </th>
                    <th>{RecordNameBy}</th>
                    <th>{numeral(total_itemListA).format("0,0.00")}</th>
                    <th>{numeral(total_itemListB).format("0,0.00")}</th>
                    <th>{numeral(discount_itemListA).format("0,0.00")}</th>
                    <th>{numeral(discount_itemListB).format("0,0.00")}</th>
                    <th>{numeral(grandtotal_itemListA).format("0,0.00")}</th>
                    <th>{numeral(grandtotal_itemListB).format("0,0.00")}</th>
                    <th>{`${numeral(com_itemListA).format(
                      "0,0.00"
                    )}(${orgComA}%)`}</th>
                    <th>{`${numeral(com_itemListB).format("0,0.00")}(${
                      orgComB !== 0 ? orgComB : orgComA
                    })%`}</th>
                  </tr>
                );
              }
            )}
          </tbody>
        </table>
      </div>
    );
  }
}

function mapStateToProps({ report_daily_com }) {
  return { report_daily_com };
}

export default connect(mapStateToProps)(withRouter(ReportViewDetail));
