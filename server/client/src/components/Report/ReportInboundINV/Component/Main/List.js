import React, { Component } from "react";
import { Link } from "react-router-dom";
import ReactTable from "react-table";

import "react-table/react-table.css";

class List extends Component {
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
            accessor: "orderId",
            width: 50,
            Cell: row => (
              <div>
                <Link
                  to={{
                    pathname: "/report/reportpo/view",
                    state: { orderId: row.value }
                  }}
                >
                  <i className="tiny material-icons">content_paste</i>
                </Link>
              </div>
            )
          },
          {
            Header: "Order Id",
            accessor: "orderId",
            style: { fontWeight: "bold" }
          },
          {
            Header: "Date",
            accessor: "RecordDate_moment",
            style: { textAlign: "center" }
          },
          {
            Header: "Org Name",
            accessor: "orgName",
            width: 500
          },
          {
            Header: "Org Type",
            accessor: "orgTypeName",
            width: 100
          },
          {
            Header: "GroupCode",
            accessor: "groupCode",
            style: { textAlign: "center" }
          },
          {
            Header: "Total",
            accessor: "grandtotal",
            style: { textAlign: "right", fontWeight: "bold" }
          },
          {
            Header: "Credit",
            accessor: "credit",
            style: { textAlign: "right" }
          },
          {
            Header: "Cash",
            accessor: "cash",
            style: { textAlign: "right" }
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

  render() {
    return (
      <div>
        <ReactTable
          data={this.props.inbound_reports_po}
          noDataText="Oh Noes!"
          columns={this.settingColumn()}
          defaultPageSize={15}
          className="-striped -highlight"
        />
      </div>
    );
  }
}

export default List;
