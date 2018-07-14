import React, { Component } from "react";
import _ from "lodash";
import { connect } from "react-redux";
import ReactTable from "react-table";
import { Link } from "react-router-dom";
import numeral from "numeral";

import "react-table/react-table.css";

import { fetchInbound_Item } from "../../../actions";
import Report_INV_CSS from "../../../Style/CSS/Report_INV_CSS.css";

class ReportPOList extends Component {
  componentDidMount() {
    this.props.fetchInbound_Item();
  }

  settingColumn() {
    return [
      {
        columns: [
          {
            Header: "#",
            accessor: "index",
            width: 30,
            style: { textAlign: "center" }
          },
          {
            accessor: "_id",
            width: 50,
            Cell: row => (
              <div className={Report_INV_CSS.viewReportINV}>
                <Link
                  to={{
                    pathname: "/report/reportinv/view",
                    state: { _id: row.value }
                  }}
                >
                  <i className="tiny material-icons">content_paste</i>
                </Link>
              </div>
            )
          },
          {
            Header: "S.V.",
            accessor: "item_factory",
            style: { textAlign: "center" },
            width: 100
          },
          {
            Header: "Item Code",
            accessor: "item_code",
            style: { fontWeight: "bold", textAlign: "center" }
          },
          {
            Header: "Item Name",
            accessor: "item_name",
            style: { textAlign: "center" },
            width: 300
          },
          {
            Header: "Price",
            accessor: "item_price",
            Cell: row => <div>{numeral(row.value).format("0,0.00")}</div>,
            style: { fontWeight: "bold", textAlign: "right", color: "green" }
          },
          {
            Header: "Remarks",
            accessor: "item_remarks",
            style: { textAlign: "center", fontWeight: "lighter" },
            width: 300
          },
          {
            Header: "Skin",
            accessor: "item_skin",
            style: { textAlign: "center", fontWeight: "lighter" }
          },
          {
            Header: "Color",
            accessor: "item_color",
            style: { textAlign: "center", fontWeight: "lighter" }
          },
          {
            Header: "QTY",
            accessor: "item_qty",
            width: 100,
            style: { textAlign: "right" }
          },
          {
            Header: "Item Grade",
            accessor: "itemTypeName",
            style: { textAlign: "center", fontWeight: "lighter" }
          },
          {
            Header: "Date",
            accessor: "LastModifyDate_moment",
            style: { textAlign: "center" }
          },
          {
            Header: "LastModifyByName",
            accessor: "LastModifyByName",
            style: { textAlign: "center" }
          }
        ]
      }
    ];
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.items) {
      _.map(nextProps.items, (value, index) => {
        value.LastModifyDate_moment =
          new Date(value.LastModifyDate).toLocaleDateString() +
          " " +
          new Date(value.LastModifyDate).toLocaleTimeString();

        value.index = index;
      });
    }
  }

  render() {
    return (
      <div>
        <ReactTable
          data={this.props.items}
          noDataText="Oh Noes!"
          columns={this.settingColumn()}
          defaultPageSize={15}
          className="-striped -highlight"
        />
        <br />
      </div>
    );
  }
}

function mapStateToProps({ items }) {
  return { items: _.orderBy(items, ["item_code"], ["asc"]) };
}

export default connect(
  mapStateToProps,
  { fetchInbound_Item }
)(ReportPOList);
