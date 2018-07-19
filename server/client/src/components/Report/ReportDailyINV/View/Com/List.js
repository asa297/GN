import React from "react";
import _ from "lodash";
import ReactTable from "react-table";
import { connect } from "react-redux";

import "react-table/react-table.css";

const settingColumn = [
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
        width: 150,
        style: { textAlign: "center", fontWeight: "bold" }
      },
      {
        Header: "Item Name",
        accessor: "item_name",
        width: 300,
        style: { textAlign: "center" }
      },
      {
        Header: "Inbound",
        accessor: "Inbound",
        style: { textAlign: "center", color: "green", fontWeight: "bold" }
      },
      {
        Header: "Outbound",
        accessor: "Outbound",
        style: { textAlign: "center", color: "red", fontWeight: "bold" }
      },
      {
        Header: "SOLD",
        accessor: "Sold",
        style: { textAlign: "center", color: "red", fontWeight: "bold" }
      },
      {
        Header: "Remain",
        accessor: "Remain",
        style: { textAlign: "center", color: "blue", fontWeight: "bold" }
      }
    ]
  }
];

const TableList = ({ reports_daily_inv_item }) => {
  const _PrepareData = () => {
    const result = _.sortBy(reports_daily_inv_item, "item_code");
    _.map(result, (value, index) => {
      return (value.index = index);
    });
    return result;
  };

  return (
    <div>
      <ReactTable
        data={_PrepareData()}
        noDataText="Oh Noes!"
        columns={settingColumn}
        defaultPageSize={15}
        className="-striped -highlight"
      />
    </div>
  );
};

function mapStateToProps({ reports_daily_inv_item }) {
  return { reports_daily_inv_item };
}

export default connect(mapStateToProps)(TableList);
