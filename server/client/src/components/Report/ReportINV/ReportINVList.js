import React, { Component } from "react";
import _ from "lodash";
import { connect } from "react-redux";
import ReactTable from "react-table";
import { Link } from "react-router-dom";

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
            accessor: "item_code",
            width: 50,
            Cell: row => (
              <div className={Report_INV_CSS.viewReportINV}>
                <Link
                  to={{
                    pathname: "/report/reportinv/view",
                    state: { item_code: row.value }
                  }}
                >
                  <i className="tiny material-icons">content_paste</i>
                </Link>
              </div>
            )
          },
          {
            Header: "Item Code",
            accessor: "item_code",
            style: { fontWeight: "bold" }
          },
          {
            Header: "Item Name",
            accessor: "item_name",
            width: 500
          },
          {
            Header: "QTY",
            accessor: "item_qty",
            width: 100,
            style: { textAlign: "right" }
          },
          {
            Header: "Price",
            accessor: "item_price",
            Cell: row => <div>{row.value.toLocaleString()}</div>,
            style: { textAlign: "right" }
          },
          {
            Header: "Item Grade",
            accessor: "itemTypeId",
            Cell: row => (
              <div
                className={
                  row.value === 1 ? Report_INV_CSS.itemA : Report_INV_CSS.itemB
                }
              />
            )
          },
          {
            Header: "Date",
            accessor: "RecordDate_moment",
            style: { textAlign: "center" }
          },
          {
            Header: "RecordBy",
            accessor: "RecordNameBy",
            style: { textAlign: "center" }
          }
        ]
      }
    ];
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.inbound_items) {
      _.map(nextProps.inbound_items, (value, index) => {
        value.RecordDate_moment = new Date(
          value.RecordDate
        ).toLocaleDateString();
        value.index = index;
      });
    }
  }

  render() {
    return (
      <div>
        <ReactTable
          data={this.props.inbound_items}
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

function mapStateToProps({ inbound_items }) {
  return { inbound_items: _.orderBy(inbound_items, ["item_code"], ["asc"]) };
}

export default connect(mapStateToProps, { fetchInbound_Item })(ReportPOList);
