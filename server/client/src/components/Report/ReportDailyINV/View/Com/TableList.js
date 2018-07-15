import React from "react";
import ReactTable from "react-table";
import Result from "./Result";

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
        style: { fontWeight: "bold" }
      },
      {
        Header: "Item Name",
        accessor: "item_name",
        style: { textAlign: "center" }
      },
      {
        Header: "QTY",
        accessor: "QTY.item_qty"
      },
      {
        Header: "SOLD",
        accessor: "sold"
      },
      {
        Header: "Remain QTY",
        accessor: "remainQTY",
        style: { textAlign: "center" }
      }
    ]
  }
];

const TableList = ({ reports_po }) => {
  return (
    <div>
      <ReactTable
        data={Result(reports_po)}
        noDataText="Oh Noes!"
        columns={settingColumn}
        defaultPageSize={15}
        className="-striped -highlight"
      />
    </div>
  );
};

function mapStateToProps({ reports_po }) {
  return { reports_po };
}

export default connect(mapStateToProps)(TableList);
