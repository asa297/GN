import React, { Component } from "react";
import _ from "lodash";
import { fetchInbound_ItemElement } from "../../../../../actions";
import { connect } from "react-redux";
import ReactTable from "react-table";
import numeral from "numeral";

import "react-table/react-table.css";

class List extends Component {
  componentDidMount() {
    this.props.fetchInbound_ItemElement();
  }

  componentWillReceiveProps({ reports_inbound_item }) {
    if (reports_inbound_item) {
      _.map(reports_inbound_item, (value, index) => {
        value.RecordDate_moment =
          new Date(value.RecordDate).toLocaleDateString() +
          " " +
          new Date(value.RecordDate).toLocaleTimeString();
        value.index = index;
      });
    }
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
            Header: "Item Code",
            accessor: "item_code",
            width: 100,
            style: { fontWeight: "bold", textAlign: "center" }
          },
          {
            Header: "Item Name",
            accessor: "item_name",
            style: { textAlign: "center" }
          },
          {
            Header: "Inbound Quantity",
            accessor: "item_qty",
            Cell: row => <div>{numeral(row.value).format("0,0")}</div>,
            width: 200,
            style: { fontWeight: "bold", textAlign: "center", color: "green" }
          },
          {
            Header: "Remarks",
            accessor: "remarks",
            width: 300,
            style: { textAlign: "center" }
          },
          {
            Header: "Record By",
            accessor: "RecordNameBy",
            style: { textAlign: "center" }
          },
          {
            Header: "Record Date",
            accessor: "RecordDate_moment",
            style: { textAlign: "center" }
          }
        ]
      }
    ];
  }

  render() {
    return (
      <div>
        <ReactTable
          data={this.props.reports_inbound_item}
          noDataText="Oh Noes!"
          columns={this.settingColumn()}
          defaultPageSize={15}
          className="-striped -highlight"
        />
      </div>
    );
  }
}

function mapStateToProps({ reports_inbound_item }) {
  return { reports_inbound_item: _.reverse(reports_inbound_item) };
}

export default connect(
  mapStateToProps,
  { fetchInbound_ItemElement }
)(List);
