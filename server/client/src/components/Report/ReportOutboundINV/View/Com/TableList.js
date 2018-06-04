import React from "react";
import ReactTable from "react-table";
import Result from "./Result";

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
      // {
      //   accessor: "orderId",
      //   width: 50,
      //   Cell: row => (
      //     <div className={Report_PO_CSS.viewReportPO}>
      //       <Link
      //         to={{
      //           pathname: "/report/reportpo/view",
      //           state: { orderId: row.value }
      //         }}
      //       >
      //         <i className="tiny material-icons">content_paste</i>
      //       </Link>
      //     </div>
      //   )
      // },
      {
        Header: "Item Code",
        accessor: "orderId",
        style: { fontWeight: "bold" }
      },
      {
        Header: "Item Name",
        accessor: "RecordDate_moment",
        style: { textAlign: "center" }
      },
      {
        Header: "QTY",
        accessor: "orgName",
        width: 500
      },
      {
        Header: "SOLD",
        accessor: "orgTypeName",
        width: 100
      },
      {
        Header: "Remain QTY",
        accessor: "groupCode",
        style: { textAlign: "center" }
      }
    ]
  }
];

const TableList = ({ inbound_reports_po }) => {
  return (
    <div>
      <Result />
      <ReactTable
        data={inbound_reports_po}
        noDataText="Oh Noes!"
        columns={settingColumn}
        defaultPageSize={15}
        className="-striped -highlight"
      />
    </div>
  );
};

export default TableList;
